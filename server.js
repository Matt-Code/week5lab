//initialising express into the project
let express = require('express');
//initialising an instance of express for the app
let app = express();
//initialising bodyparser so that we are able to automatically transforms body into an object
let bodyParser = require('body-parser');

//initialising a pathName variable which will be used to reference where static webpages will be stored
let path2Views = __dirname + "/views/";

//initialising the rendering engine that will be using the EJS engine which will be able to renderFile
app.engine('html', require('ejs').renderFile);
//setting the view engine to be used for html
app.set('view engine', 'html');

//telling the app that static image will be stored in the folder, image and express can look for it from there
app.use(express.static('image'));
//telling the app that static css files will be stored in the folder, css and express can look for it from there
app.use(express.static('css'));

//if the app receives a request for http://localhost:8080, which is the homepage
//it will return the index.html page
app.get('/', function (req, res) {
    res.sendFile(path2Views + "index.html");
});

//the app will use bodyParser to transforms the body into an object so that it can be used
//it will be used to identify the elements within the url and transforms them into a body object
app.use(bodyParser.urlencoded({
    extended: false
}));

//a GET request for http://localhost:8080/newTask
//this will return the file, newTask.html to the client
app.get('/newTask', function (req, res) {
    res.sendFile(path2Views + "newTask.html");
});

//a GET request for http://localhost:8080/listTask
app.get('/listTask', function (req, res) {
    //if the database is not empty
    if (0 != db.length)
        //returns the page, listTask.html to the client with the taskDb from the html file
        //template + data
        res.render(path2Views + 'listTask.html', {
            taskDb: db
        });
    //if the database is empty
    else
        //return the error html page to the client providing an error message
        res.sendFile(path2Views + 'error.html', {
            error: "No task in database!"
        });
});

//initialising a database array
let db = [];

//a POST request that will be sent to 
app.post('/addNewTask', function (req, res) {
    //creating a newRecord object which will contain 3 attributes to them
    //1st attribute is the taskname, 2nd attribute is the time of the task due
    //3rd attribute is the task description
    let newRec = {
        taskname: req.body.taskname,
        taskdue: req.body.taskdue,
        taskdesc: req.body.taskdesc,
    }
    
    //if the input fields are empty and the client clicks on submit, return the error page back to the client
    if (newRec.taskname == '' || newRec.taskdue == '' || newRec.taskdesc == '')
        //sending the error file to the client
        res.sendFile(path2Views + 'error.html', {
            //giving the client an error saying to fill in all information of task
            error: "Missing information! Please try again"
        })
    //if the input fields are not empty
    else {
        //push the new record to the database array
        db.push(newRec);
        //renders the template and the data together and send to client
        res.render(path2Views + 'listTask.html', {
            taskDb: db
        });
    }
})
//app will listen on the port 8080
app.listen(8080);

console.log('Server started at http://localhost:8080');