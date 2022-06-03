import twilio from "twilio";
import { loggerTodos } from "./log4js.js";
import config from "../config.js";
const accountSid = "AC33630fd76eb219c5d519973ae212803f";
const authToken = "99ef41f4e805e440c4728aed5c51d40a";

const client = twilio(accountSid, authToken);

async function twilioSMS(telefono) {
  try {
    const message = await client.messages.create({
      body: "su pedido ha sido recibido y se encuentra en proceso",
      from: "+17853908705",
      to: telefono,
    });
  } catch (error) {
    loggerTodos.error("actualizar token de twilio!" + error);
  }
}
async function twilioWPP(user, pedido) {
  try {
    client.messages
      .create({
        from: "whatsapp:+14155238886",
        body:
          `*nuevo pedido de ${user}*:` +
          pedido.map(
            (e) =>
              `
-Producto: id = ${e.id},nombre = ${e.nombre},codigo = ${e.codigo},precio = ${e.precio},stock = ${e.stock}`),
        to: `whatsapp:${config.telefono}`,
      })
      .then((message) => loggerTodos.info(message))
      .done();
  } catch (error) {
    loggerTodos.error(error);
  }
}

export { twilioSMS, twilioWPP };
