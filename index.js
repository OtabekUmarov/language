const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const session = require('express-session')
const csrf = require('csurf')
const MongoStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash') // !
const path = require('path');
// Routerlar
const routers = require('./routers')

// middleWare lar
const varMid = require('./middleware/var')
const fileMiddleware = require('./middleware/file')
const keys = require('./keys/pro')

const app = express()
const hbs = exphbs.create({
    defaultLayout: 'admin',
    extname: '.hbs'
})
hbs.handlebars.registerHelper("increment", function (index) {
    return parseInt(index) + 1
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(express.urlencoded({
    extended: true
}))


app.use(express.static(path.join(__dirname,'/assets/')))
app.use('/media', express.static('media')) // !
const MONGODB_URI = 'mongodb://127.0.0.1:27017/language'

const store = new MongoStore({
    collection: 'session',
    uri: MONGODB_URI
})
app.use(session({
    secret: 'some secret key',
    saveUninitialized: false,
    resave: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 10,
        secure: false 
    },
    store
}))

app.use(fileMiddleware.single('img'))
// app.use(csrf())
app.use(flash()) // !
app.use(varMid)

app.use(routers)

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, X-CSRF-Token');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const PORT = 3001

async function dev() {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true
        })
        app.listen(PORT, () => {
            console.log(`Server is running ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}
dev()