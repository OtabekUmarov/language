module.exports = (req, res, next) => {

    next()
}

// if (!req.session.isAuthed) {
//     return res.redirect('/admin/auth/login')
// }