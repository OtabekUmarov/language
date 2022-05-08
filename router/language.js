const {
  Router
} = require('express')
const router = Router()

const Language = require('../modeles/language')


router.get('/',async (req, res) => {
  let languages = await Language.find().lean()
  res.render('admin/language', {
      title: 'Tillar',
      layout: "admin",
      success: req.flash('success'),
      error: req.flash('error'),
      isLanguage: true, 
      languages
  })
})

router.post('/', async (req, res) => {
  const { title } = req.body
  const language = await new Language({title})
  await language.save()
  res.redirect(`/admin/language`)
})

router.get('/delete/:id', async (req, res) => {
  let _id = req.params.id
  await Language.findByIdAndDelete(
    _id
  )
  res.redirect(`/admin/language`)
})

module.exports = router