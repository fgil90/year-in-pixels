const Joi = require('joi')
const express = require('express')
const app = express()

app.use(express.json())

const cors = require('cors');
app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));

const moods = [
    { id: 1, year:2019, data: [] },
    { id: 2, year:2020, data: [] },
    { id: 3, year:2021, data: [] }
]

app.get('/api/moods', (req, res) => {
    res.send(moods)
});

app.get('/api/moods/:id', (req, res) => {
    const mood = moods.find((c) => c.id === parseInt(req.params.id))
    if (!mood) {
        return res.status(404).send('The mood with the given ID was not found')
    }
    res.send(mood)
})

function validateMood(mood){
    const schema = Joi.object({
        year: Joi.number().min(2000).required(),
        data: Joi.array().items(Joi.number().min(0).max(9)).required(),
    })
    return schema.validate(mood)
}

app.post('/api/moods', (req, res)=>{
    const {error} = validateMood(req.body)
    if (error) return res.status(400). send(error.details[0].message)

    const mood = {
        id:moods.length+1,
        year: req.body.year,
        data: req.body.data,
    }
    moods.push(mood)
    res.send(mood)
})
app.put('/api/moods/:id', (req, res)=>{

    const mood = moods.find((c) => c.id === parseInt(req.params.id))
    if (!mood) {
        return res.status(404).send('The mood with the given ID was not found')
    }
    const {error} = validateMood(req.body)
    if (error) return res.status(400). send(error.details[0].message)

    mood.year = req.body.year
    mood.data = req.body.data
    res.send(mood)
})

app.delete('/api/moods/:id', (req, res)=>{

    const mood = moods.find((c) => c.id === parseInt(req.params.id))
    if (!mood) {
        return res.status(404).send('The mood with the given ID was not found')
    }

    const index = moods.indexOf(mood)
    moods.splice(index, 1)
    res.send(mood)
})

const port = process.env.PORT || 3000
app.listen(port, () =>
    console.log(`Listening on port ${port}...`))

