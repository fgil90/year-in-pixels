const Joi = require('joi')
const express = require('express')
const app = express()
const db = require('./moods')

app.use(express.json())

const cors = require('cors');
app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));

app.get('/api/moods', (req, res) => {
    db.getAllYears((err, row)=>{
        res.send(row)
    })
});

app.get('/api/moods/:id', (req, res) => {
    // const mood = moods.find((c) => c.id === parseInt(req.params.id))
    // if (!mood) {
    //     return res.status(404).send('The mood with the given ID was not found')
    // }
    // res.send(mood)
    db.getYear(parseInt(req.params.id), (err, row) => {
        if (err) {
            return res.status(500).send(err)
        }
        if (row === undefined) {
            return res.status(404).send('The mood with the given ID was not found')
        }
        res.send(row)
    });
})

function validateMood(mood) {
    const schema = Joi.object({
        year: Joi.number().min(2000).required(),
        data: Joi.array().items(Joi.number().min(0).max(9)).required(),
    })
    return schema.validate(mood)
}

app.post('/api/moods', (req, res) => {
    const { error } = validateMood(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const mood = {
        year: req.body.year,
        data: req.body.data,
    }
    db.insertYear(mood.year, mood.data)
    res.send(mood)
})
app.put('/api/moods/:id', (req, res) => {

    const mood = moods.find((c) => c.id === parseInt(req.params.id))
    if (!mood) {
        return res.status(404).send('The mood with the given ID was not found')
    }
    const { error } = validateMood(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    mood.year = req.body.year
    mood.data = req.body.data
    res.send(mood)
})

app.delete('/api/moods/:id', (req, res) => {

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

