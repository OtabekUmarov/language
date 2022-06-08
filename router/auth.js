const {
    Router
} = require('express')
const router = Router()


router.get('/login', async (req, res) => {
    res.render('admin/auth/login', {
        title: 'Tizimga kirish',
        error: req.flash('error'),
        layout: 'nohead'
    })
})

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err
        res.redirect('/admin/auth/login')
    })
})

router.post('/login', async (req, res) => {
    const {
        name,
        password
    } = req.body
    if (name == "zilola" && password == "123123d.") {
        req.session.user = "admin"
        req.session.isAuthed = true
        req.session.save((err) => {
            if (err) throw err
            else res.redirect('/admin/language')
        })
    } else {
        req.flash('error', 'Login yoki parol noto\'gri kiritildi')
        res.redirect('/admin/auth/login')
    }
})



module.exports = router