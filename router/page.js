const {
    Router
} = require('express')
const router = Router()
const auth = require('../middleware/auth')
const Gallery = require('../modeles/gallery')
const GalleryMenu = require('../modeles/language')
// const GallerySubMenu = require('../modeles/gallerysubmenu')
const Message = require('../modeles/message')
const Classes = require('../modeles/classes')
const Seat = require('../modeles/seat')
const Text = require('../modeles/text')
const Translate = require('../modeles/translate')
const Letter = require('../modeles/letter')


router.get('/', async (req, res) => {
    let menu = await GalleryMenu.find().lean()
    res.render('index', {
        title: 'Home',
        layout: "site",
        success: req.flash('success'),
        error: req.flash('error'),
        isHome: true, menu
    })
})

router.get('/about',async (req, res) => {
    let menu = await GalleryMenu.find().lean()
    res.render('about', {
        title: 'Koreys tili haqida',
        layout: "site",
        isAbout: true, menu
    })
})
router.get('/text',async (req, res) => {
    let text = await Text.find().lean()
    res.render('text', {
        title: 'Matnlar',
        layout: "site",
        isText: true, text
    })
})
router.get('/writing',async (req, res) => {
    res.render('writing', {
        title: "O'zingizni sinang",
        layout: "site",
        isWriting: true,
    })
})
router.get('/translate',async (req, res) => {
    let list = await Translate.find().lean()
    res.render('translate', {
        title: "Lug'at",
        layout: "site",
        isTranslate: true,
        list
    })
})
router.get('/letters',async (req, res) => {
    let list = await Letter.find().lean()
    res.render('letters', {
        title: "Lug'at",
        layout: "site",
        isLetters: true,
        list
    })
})
router.get('/api/text/:id',async (req, res) => {
    let _id = req.params.id
    let text = await Text.findOne({_id}).lean()
    res.send(text)
})

router.get('/class', async(req, res) => {
    let menu = await GalleryMenu.find().lean()
    let classes = await Classes.find().lean()
    res.render('class', {
        title: 'Classes',
        layout: "site",
        isClass: true,menu,classes
    })
})

router.get('/team', async (req, res) => {
    let menu = await GalleryMenu.find().lean()
    res.render('team', {
        title: 'Teachers',
        layout: "site",
        isTeam: true,menu
    })
})

router.get('/contact', async(req, res) => {
    let menu = await GalleryMenu.find().lean()
    res.render('contact', {
        title: 'Contact',
        layout: "site",
        success: req.flash('success'),
        error: req.flash('error'),
        isContact: true,menu
    })
})
router.get('/admin', auth,(req, res) => {
    res.render('admin', {
        title: 'Dashboard',
        layout: "admin",
        isAdmin: true
    })
})


router.post('/message', async (req, res) => {
    const { fullname,email,phone,message } = req.body
    const messages = await new Message({fullname,email,phone,message})
    await messages.save()
    req.flash('success', 'Xabaringiz adminlar uchun yuborildi!')
    res.redirect('/contact')
  })
router.post('/class/seat', async (req, res) => {
    const { fullname,phone,classId } = req.body
    const seat = await new Seat({fullname,phone,classId})
    await seat.save()
    res.redirect('/class')
  })

module.exports = router