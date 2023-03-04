const express = require('express');
const {students, faculty} = require('./modules/models')

const port = 8080 || process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/clientside`));

app.get('/', async (req, res) => {
    res.redirect('/students');
})

// respond from server to client
app.get('/students', (req,res) => {
    res.status(200).json({
        status: "sucess"
    })
})

// from client to server
app.post('/students', async (req,res) => {
    console.log(req.body);
    try{
        await students.create(req.body).then((data)=>{
            res.status(201).json({
                'status': 'sucess',
                'data':{
                    'user': {
                        data
                    }
                }
            }) 
        });
    }catch(err){
        res.status(404).json({
            'status':'failed',
            'message':err
        })
    }
})

app.get('/faculty', (req,res) => {
    res.status(200).json({
        status: "sucess"
    })
})

app.post('/faculty', async (req,res) => {
    console.log(req.body);
    try{
        await faculty.create(req.body).then((data)=>{
            res.status(201).json({
                'status': 'sucess',
                'data':{
                    'user': {
                        data
                    }
                }
            }) 
        });
    }catch(err){
        res.status(404).json({
            'status':'failed',
            'message':err
        })
    }
})

app.listen(port, (err) => {
    if(err) console.log("Server error: ", err);
    else console.log(`Server listening at port ${port}`);
})