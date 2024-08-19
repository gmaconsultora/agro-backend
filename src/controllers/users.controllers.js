import { User } from "../models/User.js";
import { sequelize } from "../database/database.js";
import { QueryTypes } from "sequelize";
import { Op } from "sequelize";

import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const { limit, pagination, query } = req.params;

    let queryAdd = ``;
    if (query !== ":query") {
      queryAdd = `
           WHERE (
            p.id::VARCHAR ILIKE '%${query}%'
            OR p.username ILIKE '%${query}%'
            OR p.email ILIKE '%${query}%'
          ) `;
    }

    let sql = `select * from users p ${queryAdd} 
        ORDER BY
        p.username asc 
    LIMIT
      ${limit}
    OFFSET
      ${pagination}
        `;

    const users = await sequelize.query(sql, {
      type: QueryTypes.SELECT,
    });

    res.status(200).json({ ok: true, users });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: { id },
    });

    res.json({ ok: true, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserEmail = async (req, res) => {
  try {
    const { id } = req.params; // ID del usuario que se quiere actualizar
    const { email } = req.body; // Nuevo correo electrónico

    // Busca un usuario que ya tenga el email en la base de datos
    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      // Si ya existe un usuario con ese email, devuelve un error
      return res
        .status(200)
        .json({ ok: false, message: "El correo electrónico ya está en uso" });
    }

    // Si no se encuentra, actualiza el email del usuario con el ID especificado
    const user = await User.findOne({
      where: { id },
    });

    if (!user) {
      // Si no se encuentra un usuario con el ID proporcionado
      return res
        .status(404)
        .json({ ok: false, message: "Usuario no encontrado" });
    }

    // Actualiza el email del usuario
    user.email = email;
    await user.save();

    // Devuelve el usuario actualizado
    res.json({ ok: true, user });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

    // Verificar si el username o el email ya existen
    const existingUser = await User.findOne({
      where: { [Op.or]: [{ username }, { email }] },
    });

    if (existingUser) {
      const field = existingUser.username === username ? "username" : "email";
      return res
        .status(200)
        .json({
          ok: false,
          message: `Ya existe el ${field}: ${existingUser[field]}`,
        });
    }

    // Verificar la longitud de la contraseña
    if (password.length < 6) {
      return res
        .status(200)
        .json({
          ok: false,
          message: "La contraseña debe tener al menos 6 caracteres",
        });
    }

    // Verificar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(200)
        .json({
          ok: false,
          message: "El formato del correo electrónico no es válido",
        });
    }

    // Hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear un nuevo usuario
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      roles,
    });

    res.json({ ok: true, user });
  } catch (error) {
    res.status(200).json({ ok: false, message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;

    const user = await User.findByPk(id);

    user.username = username;
    (user.email = email), (user.password = password);

    await user.save();

    res.json({ ok: true, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteUser = await User.destroy({
      where: {
        id,
      },
    });

    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
