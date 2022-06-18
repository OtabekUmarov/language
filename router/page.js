const {
    Router
} = require('express')
const router = Router()
const auth = require('../middleware/auth')
const Message = require('../modeles/message')
const Text = require('../modeles/text')
const Test = require('../modeles/test')
const Translate = require('../modeles/translate')
const Letter = require('../modeles/letter')


router.get('/', async (req, res) => {
    res.render('index', {
        title: 'Bosh sahifa',
        layout: "site",
        isHome: true
    })
})

router.get('/about',async (req, res) => {
    res.render('about', {
        title: 'Koreys tili haqida',
        layout: "site",
        isAbout: true
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
        title: "Koreys alifbosi",
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



router.get('/contact', async(req, res) => {
    res.render('contact', {
        title: 'Aloqa',
        layout: "site",
        success: req.flash('success'),
        error: req.flash('error'),
        isContact: true
    })
})




router.get('/admin', auth,(req, res) => {
    res.render('admin/language', {
        title: 'Dashboard',
        layout: "admin",
        isLanguage: true
    })
})


router.post('/message', async (req, res) => {
    const { fullname,email,phone,message } = req.body
    const messages = await new Message({fullname,email,phone,message})
    await messages.save()
    req.flash('success', 'Xabaringiz adminlar uchun yuborildi!')
    res.redirect('/contact')
})

router.get('/test', async(req, res) => {
    let test = await Test.find().sort({_id:-1}).lean()
    test.forEach(element => {
        element.answers = shuffle(element.answers)
    })
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
        while (currentIndex != 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
    }
    res.render('test', {
        title: 'Test',
        layout: "site",
        success: req.flash('success'),
        error: req.flash('error'),
        isTest: true, test
    })
})

router.post('/product', async (req, res) => {
    let answers = req.body
    let correct = 0
    Object.keys(answers).forEach( async key => {
        let test = await Test.findOne({_id: key}).lean()
        test.answers.forEach( answer => {
            if(answer.title === answers[key]){
                if(answer.iscorrect){
                    correct++
                }
            } 
        })
    })
    setTimeout(() => {
        res.send(JSON.stringify(correct))
    }, 200);
})
module.exports = router