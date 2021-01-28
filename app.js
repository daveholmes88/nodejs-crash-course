// https://www.youtube.com/watch?v=VVGgacjzc2Y

const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')
require('dotenv/config')
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD

// connect to mongodb

const dbURI = `mongodb+srv://${user}:${password}@cluster0.pb5lj.mongodb.net/node-tuts?retryWrites=true&w=majority`
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err))
// express app

const app = express()

// register view engine
app.set('view engine', 'ejs')

//listen for requests
app.listen(3000);

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// middleware & static files
app.use(express.static('public'))

app.get('/', (req, res) => {
    // res.send('<p>home page</p>')
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    // res.send('<p>about page</p>')
    res.render('about', { title: 'About' })
})

// redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about')
})

//blog routes
app.use('/blogs', blogRoutes)


// 404 pages MUST GO AT THE BOTTOM used as a catch all
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})


// without ejs
// // register view engine
// app.set('view engine', 'ejs')

// //listen for requests
// app.listen(3000);

// app.get('/', (req, res) => {
//     // res.send('<p>home page</p>')
//     res.sendFile('./views/index.html', { root: __dirname })
// })

// app.get('/about', (req, res) => {
//     // res.send('<p>about page</p>')
//     res.sendFile('./views/about.html', { root: __dirname })
// })

// // redirects
// app.get('/about-us', (req, res) => {
//     res.redirect('/about')
// })

// // 404 pages MUST GO AT THE BOTTOM
// app.use((req, res) => {
//     res.status(404).sendFile('./views/404.html', { root: __dirname })
// })

// mongoose and mogo sandbox routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog 2',
//         snippet: 'about this new blog',
//         body: 'heres more information about this blog'
//     })

//     blog.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => console.log(err))
// })

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((results) => res.send(results))
//         .catch((err) => console.log(err))
// })

// app.get('/single-blog', (req, res) => {
//     Blog.findById('601044e2914de8cb4e8232e4')
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => console.log(err))
// })