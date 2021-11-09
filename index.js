const express = require('express');
var bodyParser = require('body-parser')
const mongoose = require("mongoose")
var cors = require('cors')


const app = express();
app.use(bodyParser.json())
app.use(cors());

const productRouter = require("./route/product.route.js")
const cartRouter = require("./route/cart.route.js")
const wishlistRouter = require("./route/wishlist.route.js")

const {dbconnection} = require("./db/db.js")

dbconnection()
app.use("/product",productRouter)
app.use("/cart",cartRouter)
app.use("/wishlist",wishlistRouter)

app.get('/', (req, res) => {
  res.json({text:'Hello world'})
});


app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
  console.log('server started');
});
