const {
  Router
} = require('express')
const router = Router()

const Translate = require('../modeles/translate')
const Text = require('../modeles/text')
const Language = require('../modeles/language')


router.get('/',async (req, res) => {
  let list = await Translate.find().lean()
  res.render('admin/translate', {
      title:"Lug'at",
      layout: "admin",
      isTranslate: true, 
      list
  })
})

router.post('/', async (req, res) => {
  const { koreys, uzbek } = req.body
  const translate = await new Translate({koreys, uzbek})
  await translate.save()
  res.redirect(`/admin/translate`)
})

router.post('/update', async (req, res) => {
  const { title, content, languageId, uzbek } = req.body
  const text = await new Text({title, content, languageId, uzbek})
  await text.save()
  res.redirect(`/admin/text`)
})

router.get('/delete/:id', async (req, res) => {
  let _id = req.params.id
  await Translate.findByIdAndDelete(
    _id
  )
  res.redirect(`/admin/translate`)
})

module.exports = router