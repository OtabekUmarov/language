const {
  Router
} = require('express')
const router = Router()

const Test = require('../modeles/test')


router.get('/',async (req, res) => {
  let tests = await Test.find().lean()
  res.render('admin/test', {
      title: 'Testlar',
      layout: "admin",
      isTest: true, 
      tests
  })
})

router.post('/', async (req, res) => {
  const { question, correct, answer, answer1, answer2 } = req.body
  let answers = [
    {
      iscorrect: true,
      title: correct
    },
    {
      iscorrect: false,
      title: answer
    },
    {
      iscorrect: false,
      title: answer1
    },
    {
      iscorrect: false,
      title: answer2
    },
  ]
  console.log(answers)
  const test = await new Test({question, answers})
  await test.save()
  res.redirect(`/admin/test`)
})

router.post('/update', async (req, res) => {
  const { title, content, languageId, uzbek } = req.body
  const test = await new Test({title, content, languageId, uzbek})
  await test.save()
  res.redirect(`/admin/test`)
})

router.get('/delete/:id', async (req, res) => {
  let _id = req.params.id
  await Test.findByIdAndDelete(
    _id
  )
  res.redirect(`/admin/test`)
})

module.exports = router