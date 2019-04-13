require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors')

const router = require('./routes')


app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())

app.use('/', router)



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})