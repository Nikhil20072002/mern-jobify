import * as dotenv from 'dotenv'
dotenv.config();
import express from "express";
import morgan from "morgan";
const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use(express.json())

try {
    const response = await fetch('https://www.course-api.com/react-useReducer-cart-project')
    const cartData = await response.json();
    console.log(cartData);
} catch (error) {
    console.log(error);
}

app.get('/', (req, res) => {
    const resp = fetch('localhost:5100/').then((res) => {
        return res.json()
    })
    res.json(resp)
});

app.post("/", (req, res) => {
    res.json({ message: 'Data received', data: req.body });
})

const port = process.env.PORT || 5100


app.listen(port, () => {
    console.log("Server is Up");
});