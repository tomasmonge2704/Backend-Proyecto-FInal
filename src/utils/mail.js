import nodemailer, { createTransport } from 'nodemailer';
import { loggerTodos } from './log4js.js';
import config from '../config.js';
const TEST_MAIL = config.mailAdmin

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: TEST_MAIL,
        pass: 'crdibglnidphzsqn'
    }
});

async function mailUser(elem) {
    console.log(elem)
    const mailOptions = {
        from: 'Servidor Node.js',
        to: TEST_MAIL,
        subject: 'Nuevo registro',
        html: `<h1 style="color: blue;">username: <span style="color: green;">${elem.username}</span></h1>
        <h1 style="color: blue;">password: <span style="color: green;">${elem.password}</span></h1>
        <h1 style="color: blue;">mail: <span style="color: green;">${elem.mail}</span></h1>
        <h1 style="color: blue;">nombre: <span style="color: green;">${elem.nombre}</span></h1>
        <h1 style="color: blue;">apellido: <span style="color: green;">${elem.apellido}</span></h1>
        <h1 style="color: blue;">edad: <span style="color: green;">${elem.edad}</span></h1>
        <h1 style="color: blue;">telefono: <span style="color: green;">${elem.telefono}</span></h1>`
    }
    try {
        const info = await transporter.sendMail(mailOptions)
        loggerTodos.info(info)
    } catch (error) {
        loggerTodos.error(error)
    }
}
async function mailProductos(user, elem) {
    const mailOptions = {
        from: 'Servidor Node.js',
        to: TEST_MAIL,
        subject: `Nuevo pedido de ${user.username}`,
        html: `<h1 style="color: red;">Productos:</h1>` + elem.map(e =>
            `
        <h1 style="color: blue;">producto: <span style="color: green;">${JSON.stringify(e)}</span></h1>`
        )
    }
    try {
        const info = await transporter.sendMail(mailOptions)
        loggerTodos.info(info)
    } catch (error) {
        loggerTodos.error(error)
    }
}
export { mailUser, mailProductos }