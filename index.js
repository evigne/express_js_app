const express = require("express");
const path = require("path");
const exphbs = require('express-handlebars');
const members = require("./Members");
const logger = require("./middleware/logger")



const app = express();


// init middleware
// app.use(logger);

//Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json()); //to handle raw json
app.use(express.urlencoded({extended: false})) // to handle url encoded data

//Home PAge Rennder
app.get('/', (req, res) => res.render('index', {
  title: 'Member App',
  members
}))


// // USE ROUTER INSTEAD OF app.get
// //GEt all members
// app.get('/api/members', (req,res) => {
//     res.json(members);
// })

// //GEt single member
// app.get('/api/members/:id', (req, res) => {
//   const found = members.some(member => member.id === parseInt(req.params.id));
//   if (found) {
//     res.json(members.filter(member => member.id === parseInt(req.params.id)));
//   } else {
//     res.status(400).json({msg: `No member with id ${req.params.id}`})
//   }
  
// })

// app.get('/', (req, res) => {
//   res.send("<h1>Hello World</h1>")
// })
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html")); // including a boilerplate
// });

// Set Static Folder (TO avoid the top)   ==> important note we will not have both static and page render at same  ==> some time we have both
app.use(express.static(path.join(__dirname, "public"))); // This is middleware default with express

//Members API Route
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000; //check the env variable first during deployment
app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
