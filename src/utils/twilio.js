import twilio from 'twilio'
import { loggerTodos } from './log4js.js'
const accountSid = 'AC33630fd76eb219c5d519973ae212803f'
const authToken = '99ef41f4e805e440c4728aed5c51d40a'

const client = twilio(accountSid, authToken)

async function twilioSMS(telefono){
    try {
        const message = await client.messages.create({
            body: 'su pedido ha sido recibido y se encuentra en proceso',
            from: '+17853908705',
            to: telefono
        })
     } catch (error) {
        loggerTodos.error("actualizar token de twilio!" + error)
     }
}
async function twilioWPP(telefono){
    try {
        const message = await client.messages.create({
            body: 'Hola soy un WSP desde Node.js!',
            mediaUrl: [ 'https://www.investingmoney.biz/public/img/art/xl/18012019161021Twilio-IoT.jpg' ],
            from: 'whatsapp:+17853908705',
            to: `whatsapp:+54911678433278`
         }
         )
     } catch (error) {
        loggerTodos.error(error)
     }
}

export {twilioSMS,twilioWPP}