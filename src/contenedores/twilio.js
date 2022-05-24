import twilio from 'twilio'

const accountSid = 'AC33630fd76eb219c5d519973ae212803f'
const authToken = '35cc6f6e240dab67fa8c1a57c280e632'

const client = twilio(accountSid, authToken)

export default async function twilioo(telefono){
    try {
        const message = await client.messages.create({
            body: 'su pedido ha sido recibido y se encuentra en proceso',
            from: '+17853908705',
            to: telefono
        })
     } catch (error) {
        console.log(error)
     }
}
