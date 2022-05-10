const {
  Router
} = require('express')
const router = Router()

const Letter = require('../modeles/letter')
const Language = require('../modeles/language')

router.get('/',async (req, res) => {
  let letters = await Letter.find().populate('languageId').lean()
  let languages = await Language.find().lean()
  res.render('admin/letter', {
      title: 'Harflar',
      layout: "admin",
      success: req.flash('success'),
      error: req.flash('error'),
      isLetter: true, 
      letters,languages
  })
})
router.get('/:id',async (req, res) => {
  let _id = req.params.id
  let letters = await Letter.find({languageId:_id}).lean()
  let languages = await Language.find().lean()
  let language = await Language.findOne({_id}).lean()
  res.render('admin/letter/create', {
      title: `${language.title} harflari`,
      layout: "admin",
      success: req.flash('success'),
      error: req.flash('error'),
      isLetter: true, 
      letters,languages, language:language._id
  })
})

router.post('/', async (req, res) => {
  const { title, description, languageId } = req.body
  const letter = await new Letter({title, description, languageId})
  await letter.save()
  res.redirect(`/admin/letter/${languageId}`)
})

router.get('/delete/:id/:languageId', async (req, res) => {
  let _id = req.params.id
  await Letter.findByIdAndDelete(
    _id
  )
  res.redirect(`/admin/letter/${req.params.languageId}`)
})

module.exports = router