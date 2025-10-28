const express = require('express')
const router = require('./Utils/router')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const mongoConnection = process.env.MONGO_URL

const app = express()

mongoose.connect(mongoConnection)
    .then(() => console.log('✅ Conectado ao MongoDB'))
    .catch(err => console.error('❌ Erro ao conectar ao MongoDB:', err.message))

app.use(cors())
app.use(express.json());
app.use(router)

app.listen(process.env.PORT || 3333, () => console.log('server runing'))

