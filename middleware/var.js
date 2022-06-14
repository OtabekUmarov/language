module.exports = (req, res, next) => {
    res.locals.isAuth = req.session.isAuthed
    res.locals.isUser = req.session.isUser
    
    res.locals.user = req.session.user
    next()
}

    // res.locals.csrf = req.csrfToken()
