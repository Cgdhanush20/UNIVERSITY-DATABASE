const express = require('express');
const fs = require('fs');
const {students, faculty} = require('./modules/models')
const ejs = require('ejs')

const port = 8080 || process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/../clientside`));
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views',`${__dirname}/../clientside`)


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

app.get('/student_details', async (req,res) => {
  
    let data = null;
    await students.find().then((studentData) => {
        console.log(studentData)
        data = studentData;
    })
    res.render('studentTable', {data},(err,html) => {res.end(html)}, {async:true});
})

app.get('/faculty_details', async (req,res) => {

    let data = null;
    await faculty.find().then((facultyData) => {
        data = facultyData;
    })
    res.render('facultyTable', {data},(err,html) => {res.end(html)}, {async:true});
})



app.listen(port, (err) => {
    if(err) console.log("Server error: ", err);
    else console.log(`Server listening at port ${port}`);
})