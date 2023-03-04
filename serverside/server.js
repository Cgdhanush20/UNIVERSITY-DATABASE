const express = require('express');

const port = 8080 || process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/clientside`));

app.get('/', async (req, res) => {
    res.status(200).json({
        status: "sucess"
    })
})

app.get('/student', (req,res) => {
    res.status(200).json({
        status: "sucess"
    })
})

app.post('/student', async (req,res) => {
    res.status(200).json({
        status: "sucess"
    })
})

app.get('/faculty', (req,res) => {
    res.status(200).json({
        status: "sucess"
    })
})

app.post('/faculty', async (req,res) => {
    res.status(200).json({
        status: "sucess"
    })
})

app.listen(port, (err) => {
    if(err) console.log("Server error: ", err);
    else console.log(`Server listening at port ${port}`);
})