import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
const app = express()
const port = 3000

// 1) To log any http request
app.use(morgan('dev'))

// 2) Enable CORS to use this API anywhere
app.use(cors())

// 3) Rate limit setup for our api
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,    // [15 minutes]
    max: 5,     // limit each IP to 5 requests per windowMs
    message: 'To many requests from this IP, please try after 15 minutes!',
    standardHeaders: true,    // Return rate limit info in the `RateLimit`
    legacyHeaders: false      // Disable the `X-RateLimit-*` headers
})
app.use('/api/data', limiter)   // we are putting a limit for path => [/]


app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/api/data', (req, res) => {
    res.json({ msg: 'Sample api response.' })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
