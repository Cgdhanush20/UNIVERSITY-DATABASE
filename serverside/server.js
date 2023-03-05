const express = require('express');
const fs = require('fs');
const {students, faculty} = require('./modules/models')

const port = 8080 || process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/../clientside`));
app.use(express.urlencoded({ extended: false }));



app.get('/', async (req, res) => {
    res.redirect('/student');
})

// respond from server to client
app.get('/student', (req,res) => {
    const studentIndex = fs.readFileSync(`${__dirname}/../clientside/studentForm.html`);
    res.writeHead(200,{
        'Content-type':'text/html'
    })
    res.end(studentIndex);
})

// from client to server
app.post('/student', async (req,res) => {
    console.log(req.body);
    try{
        await students.create(req.body).then((data)=>{
            console.log("uploaded student data")
        });
        res.redirect("/student")
    }catch(err){
        res.status(404).json({
            'status':'failed',
            'message':err
        })
    }
})

app.get('/faculty', (req,res) => {
    const facultyIndex = fs.readFileSync(`${__dirname}/../clientside/facultyForm.html`);
    res.writeHead(200,{
        'Content-type':'text/html'
    })
    res.end(facultyIndex);
})

app.post('/faculty', async (req,res) => {
    console.log(req.body);
    try{
        await faculty.create(req.body).then((data)=>{
            console.log("uploaded faculty data")
        });
        res.redirect('/faculty');
    }catch(err){
        res.status(404).json({
            'status':'failed',
            'message':err
        })
    }
})

// app.get('/student_details', async (req,res) => {
//     const student_info = fs.readFileSync(`${__dirname}/../clientside/studentTable.html`);
//     res.writeHead(200,{
//         'Content-type':'text/html'
//     })
//     const studentData = await students.find().then(data => console.log("retrived data!"))
//     console.log(studentData)
//     res.render(student_info, {studentData})
// })



app.listen(port, (err) => {
    if(err) console.log("Server error: ", err);
    else console.log(`Server listening at port ${port}`);
})