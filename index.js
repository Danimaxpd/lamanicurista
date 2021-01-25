const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;
const productRoutes = require("./api/routes/global");

const SearchTree = require('./api/helpers/SearchTree');

SearchTree.onloadData();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", productRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;