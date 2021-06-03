import express, { Express } from "express"
import cors from "cors"

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
)