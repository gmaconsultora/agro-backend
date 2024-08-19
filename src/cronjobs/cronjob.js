// cronJobs.js

import cron from "node-cron";
import { Sequelize } from "sequelize";
import { Proyecto } from "../models/Proyecto.js";
import { Notificacion } from "../models/Notificacion.js";
import { sendNotification } from "../app.js";
import moment from "moment-timezone";

const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};

const scheduleNotification = (days) => {
  cron.schedule("0 * * * *", async () => {
    console.log(
      `Cron job ejecutado: Verificando proyectos próximos a vencer en ${days} días...`
    );

    try {
      const currentDate = moment()
        .tz("America/Asuncion")
        .startOf("day")
        .toDate();
      const targetDate = new Date(currentDate);
      targetDate.setDate(currentDate.getDate() + days);

      const targetDateString = formatDate(targetDate);

      const proyectos = await Proyecto.findAll({
        where: Sequelize.where(
          Sequelize.fn("DATE", Sequelize.col("pro_fecha_fin")),
          targetDateString
        ),
      });

      for (const proyecto of proyectos) {
        const notificaciones = await Notificacion.findAll({
          where: { pro_codigo: proyecto.pro_codigo },
        });

        let isExisted = notificaciones.some((n) => n.noti_rango === days);

        if (!isExisted) {
          const fechaFin = formatDate(new Date(proyecto.pro_fecha_fin));
          const mensaje = `El proyecto "${proyecto.pro_nombre}" se vencerá el ${fechaFin}. (${days} días)`;

          let notificacion = await Notificacion.create({
            noti_mensaje: mensaje,
            noti_visto: false,
            pro_codigo: proyecto.pro_codigo,
            noti_rango: days,
          });

          sendNotification(notificacion);

          console.log(
            `---------Notificación creada para el proyecto ${proyecto.pro_nombre}. ${days} días...---------`
          );
        } else {
          console.log(
            `Ya existen notificaciones de ${days} días para el proyecto ${proyecto.pro_nombre}.`
          );
        }
      }

      console.log("Verificación de proyectos completada.");
    } catch (error) {
      console.error("Error al verificar proyectos próximos a vencer:", error);
    }
  });
};

scheduleNotification(30);
scheduleNotification(15);
scheduleNotification(7);
