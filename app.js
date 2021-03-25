const express = require('express');
const config = require('config');
const path = require('path')
const mongoose = require('mongoose');
const MONGODB_USER = "admin";
const MONGODB_PASS = "_Ty65R_FvBg%";

const app = express();

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/link.routes'));
app.use('/t', require('./routes/redirect.routes'));

if (process.env.NODE_ENV === "production") {
 app.use('/', express.static(path.join(__dirname, 'client', 'build')))
 app.get ('*', (req, res)=> {
 res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
 })

}


const PORT = config.get('port') || 5000
const authData =  {
 "user": MONGODB_USER,
 "pass": MONGODB_PASS,
 "useNewUrlParser": true,
 "useCreateIndex": true,
 "useUnifiedTopology": true
};

async function start () {
 try {
 await mongoose.connect(config.get('mongoUri'), authData);
  app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
 } catch (e) {
  console.log('Server Error', e.message);
  process.exit(1);
 }
}

start();


