const {Router} = require('express')
const router = Router()
const auth = require('./middleware/auth')

router.use('/', require('./router/page'))
router.use('/admin/auth', require('./router/auth'))
router.use('/admin/users', auth, require('./router/users'))
router.use('/admin/language', auth, require('./router/language'))
router.use('/admin/text', auth, require('./router/text'))
router.use('/admin/letter', auth, require('./router/letter'))
router.use('/admin/messages', auth, require('./router/messages'))
router.use('/admin/class', auth, require('./router/class'))

module.exports = router
