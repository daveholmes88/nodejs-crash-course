// https://www.youtube.com/watch?v=_GJKAs7A0_4

const express = require('express')
const morgan = require('morgan')

// express app

const app = express()

// register view engine
app.set('view engine', 'ejs')

//listen for requests
app.listen(3000);

app.use(morgan('dev'))

// middleware & static files
app.use(express.static('public'))

app.get('/', (req, res) => {
    // res.send('<p>home page</p>')
    const blogs = [
        { title: "Yoshi Finds Eggs", snippet: 'blah blah blah ' },
        { title: "Mario Finds Stars", snippet: 'blah blah blah ' },
        { title: "How To Defeat Bowser", snippet: 'blah blah blah ' },
    ]
    res.render('index', { title: 'Home', blogs })
})

app.get('/about', (req, res) => {
    // res.send('<p>about page</p>')
    res.render('about', { title: 'About' })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create' })
})

// redirects
app.get('/about-us', (req, res) => {
    res.redirect('/about')
})

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