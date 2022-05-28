import twilio from 'twilio'

const accountSid = 'AC33630fd76eb219c5d519973ae212803f'
const authToken = '127222b6dae185f5388ba54fe1d5e205'

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
