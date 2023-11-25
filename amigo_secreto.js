const nodemailer = require("nodemailer")
require('dotenv').config()

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
})

let amigos = [
    {
        email: process.env.EMAIL_KAYKY,
        name: "Kayky",
    },
    {
        email: process.env.EMAIL_LUCAS,
        name: "Lucas",
    },
    {
        email: process.env.EMAIL_FILIPE,
        name: "Filipe",
    },
    {
        email: process.env.EMAIL_VINI,
        name: "Vinicius",
    },
    {
        email: process.env.EMAIL_RYAN,
        name: "Ryan",
    },
    {
        email: process.env.EMAIL_LEO,
        name: "Leonardo",
    }
]

let amigosNomes = ["Kayky", "Lucas", "Filipe", "Vinicius", "Ryan", "Leonardo"]

let amigoAleatorio = () => {
    let numeroAleatorio = Math.floor(Math.random() * amigosNomes.length)
    return amigosNomes[numeroAleatorio]
}

let gerarAmigo = () => {
    amigos.forEach(amigo => {
        let amigoNovo = amigoAleatorio()
        while(amigo.name == amigoNovo) {
            amigoNovo = amigoAleatorio()
        }
        amigo.amigo = amigoNovo
        let indexAmigo = amigosNomes.indexOf(amigoNovo)
        amigosNomes.splice(indexAmigo, 1)
    })
}
gerarAmigo()

amigos.forEach( async (amigo) => {
    let info = await transporter.sendMail({
        from: process.env.EMAIL_LEO,
        to: `${amigo.email}`,
        subject: `Amigo Secreto do Sexteto`,
        html: `<h2>Olá ${amigo.name}</h2><p>o seu amigo secreto escolhido foi ${amigo.amigo}</p>`
    })
    console.log(`Mensagem enviada: ${info.messageId}`)
})