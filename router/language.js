const {
  Router
} = require('express')
const router = Router()

const Language = require('../modeles/language')


router.get('/',async (req, res) => {
  let language = await Language.find().lean()
  res.render('admin/language', {
      title: 'Tillar',
      layout: "admin",
      success: req.flash('success'),
      error: req.flash('error'),
      isLanguage: true, 
      language
  })
})

router.post('/', async (req, res) => {
  const { menuId,menu } = req.body
  let img = req.file.path
  const gallery = await new Gallery({menuId,img, menu})
  await gallery.save()
  res.redirect(`/admin/gallery/photos/${menu}`)
})

router.get('/delete/:id/:menu', async (req, res) => {
  let _id = req.params.id
  let menu = req.params.menu
  await Gallery.findByIdAndDelete(
    _id
  )
  res.redirect(`/admin/gallery/photos/${menu}`)
})

module.exports = router