
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
const sgMail = require('@sendgrid/mail'); //sendgrid library to send emails 
const bodyParser = require('body-parser');
const News = require("./models/news");
const multer = require("multer");
var fs = require('fs');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

var cors = require('cors');
app.use(cors());


sgMail.setApiKey('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');

app.use(express.static(__dirname + '/client/build'));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '1000kb' }));

//DB config
const db = require("./config/keys").mongoURI;
//connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
app.use("/getlogo", express.static(__dirname + '/public/carLogos/'));
app.use("/getImages", express.static(__dirname + '/public/uploads/'));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    // cb(null, file.originalname);
    cb(null, "news-" + req.headers.id + path.extname(file.originalname));
  }
});

var upload = multer({ storage: storage });


app.post('/upload', upload.single('photo'), (req, res, next) => {
  var fn = req.file.filename;
  fs.readFile(req.file.path, (err, contents) => {
    if (err) {
      console.log('Error: ', err);
    }
    else{
    res.status(200)
    res.send(fn).end();
    }
  });
});
// const storage = multer.diskStorage({
//   destination: "./public/uploads/",
//   filename: function (req, file, cb) {
//     // console.log("aijazzzzzzzzzz")
//     // console.log(req.headers.id)
//     cb(null, "news-" + req.headers.id + path.extname(file.originalname));
//   }
// });

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1000000
//   },
// }).single("myImage");


// app.post('/upload', function (req, res) {
//   // console.log("aijazzzzzzzzzz hit")
//   upload(req, res, function (err) {
//     //  console.log("Request ---", req.body);
//     //  console.log("Request file ---", req.file);//Here you get file.
//     /*Now do where ever you want to do*/
//     if (!err) {
//       return res.send(200).end();
//     }
//   })
// })







// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



/* GET home page. */
app.get("/", (req, res) =>{ 
  // res.json({ msg: "Posts Works" })
  res.sendFile(path.join(__dirname, '/client/build/index.html'))
});


app.post("/postmessage", (req, res) => {
  console.log("yahan aya1")
  console.log(req.body)
  

  const { name, email, recipient, message, subject } = req.body; 

  //Sendgrid Data Requirements
  const msg = {
      to: recipient, 
      from: email,
      subject: subject,
      text: "name: "+name + "\n" + message,
  }
  //Send Email
  sgMail.send(msg)
  .then((msg) => console.log(msg));

});


app.get('/get/news', (req, res) => {
  News.find()
  .then(news => {
    res.json(news);
  })
  .catch(err => res.status(404).json(err));
}

);

app.get('/get/one/news/:id', (req, res) => {
  console.log(req.params.id)
  News.findOne({heading: req.params.id})
  .then(news => {
    res.json(news);
  })
  .catch(err => res.status(404).json(err));
}
);
app.post('/api/delete/news/:id', async (req, res) => {
  console.log(req.params.id)
  News.findOneAndRemove({_id: req.params.id}, function (err) {
    if (err) return console.error(err);
  });
  res.status(200).send({
    success: 'true',
    message: 'news Deleted',
  })
});




//post tournament
app.post('/api/post/news', async (req, res) => {
  console.log("Data.........")
  console.log(req.body)
  const news = new News({
    heading: req.body.heading,
    newHeading: req.body.newHeading,
    mainDetail: req.body.mainDetail,
    paragraphs: req.body.paragraphs
  });
  news.save(function (err) {
    if (err) return console.error(err);
  });
  console.log("res", news)
  res.status(200).send({
    success: 'true',
    message: 'news posted',
    news,
  })
});




app.all("/*", (req, res) =>{ 
  res.sendFile(path.join(__dirname, '/client/build/index.html'))
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

module.exports = app;
