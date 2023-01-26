import express from 'express'
import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import viewsRouter from './routes/views.router.js'
import realTimeViewsRouter from './routes/real.time.views.router.js'



const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

app.use('/', viewsRouter)
app.use('/realtimeproducts', realTimeViewsRouter)

app.engine('handlebars', handlebars.engine()) 
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

const PORT = 8080

let products = []

const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`)
})

const socketServer = new Server(httpServer)

socketServer.on('connection', socket => {
    console.log('Conexion con el cliente establecida')

    socket.on ('productData', product => {
        products.push(product)
        socket.emit('loadProducts', products)
        console.log(product)
    })
})

