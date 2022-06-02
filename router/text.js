const {
  Router
} = require('express')
const router = Router()

const Text = require('../modeles/text')
const Language = require('../modeles/language')


router.get('/',async (req, res) => {
  let texts = await Text.find().populate('languageId').lean()
  let languages = await Language.find().lean()
  res.render('admin/text', {
      title: 'Matnlar',
      layout: "admin",
      success: req.flash('success'),
      error: req.flash('error'),
      isText: true, 
      texts,languages
  })
})

router.post('/', async (req, res) => {
  const { title, content, languageId, uzbek } = req.body
  const text = await new Text({title, content, languageId, uzbek})
  await text.save()
  res.redirect(`/admin/text`)
})

router.post('/update', async (req, res) => {
  const { title, content, languageId, uzbek } = req.body
  const text = await new Text({title, content, languageId, uzbek})
  await text.save()
  res.redirect(`/admin/text`)
})

router.get('/delete/:id', async (req, res) => {
  let _id = req.params.id
  await Text.findByIdAndDelete(
    _id
  )
  res.redirect(`/admin/text`)
})

module.exports = router