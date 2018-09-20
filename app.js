var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/about', function(req, res) {
  res.render('about');
});

app.get('/contact', function(req, res) {
  res.render('contact');
});

app.post('/contact/send', function(req, res) {
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'gengulay@gmail.com',
      pass: 'bfadmin1'
    }
  });

  console.log(req.body);

  var mailOptions = {
    from: 'Gen Gulay <gengulay@gmail.com>',
    to: 'gengulay@gmail.com',
    subject: 'Website Submission',
    text: 'You have a submission with the following details...Name: ' + req.body.name + 'Email: ' + req.body.email + 'Message: ' + req.body.msg,
    html: '<p>You have a submission with the following details...</p><ul><li>' + req.body.name + '</li><li>Email:' + req.body.email + '</li><li> Message:' + req.body.msg + '</li> </ul>'
  }
  transporter.sendMail(mailOptions, function(error, info) {
    if(error) {
      console.log(error);
      res.redirect('/');
    }
    else {
      console.log('Message sent: ' + info.response );
      res.redirect('/');
    }
  });
});

var port = 4000;
app.listen(port);
console.log('server is running on port ' + port);
