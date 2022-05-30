import twilio from 'twilio'

const accountSid = 'AC33630fd76eb219c5d519973ae212803f'
const authToken = '1c8513338a7ac40001eef92342c1192d'

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
