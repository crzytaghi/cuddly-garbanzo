const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.urlencoded({
  extended: false
})) // extended: false - does not allow nested objects in query strings
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.status(404).json('Sorry, page not found')
})

const beansController = require('./controllers/beans');
app.use('/beans', beansController);

mongoose.connect('mongodb://localhost:27017/beansapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
});

mongoose.connection.once('open', () => {
  console.log('connected to mongoose');
});

app.listen(3000, () => {
  console.log('listening...');
})