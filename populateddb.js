#! /usr/bin/env node

var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
const async = require("async");
const Category = require("./models/category");
const Item = require("./models/item");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var categories = [];
var items = [];

function categoryCreate(name, desc, cb) {
  categoryDetail = { name: name, desc: desc };

  const category = new Category(categoryDetail);

  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Category: " + category);
    categories.push(category);
    cb(null, category);
  });
}

function itemCreate(name, desc, category, price, numInStock, src, cb) {
  itemDetail = {
    name: name,
    desc: desc,
    category: category,
    price: price,
    numInStock: numInStock,
    src: src,
  };

  const item = new Item(itemDetail);

  item.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Item: " + item);
    items.push(item);
    cb(null, item);
  });
}

function populateDB(cb) {
  async.series([
    function (callback) {
      categoryCreate("Home", "Toys", callback);
    },
    function (callback) {
      categoryCreate(
        "Home",
        "Lighting, Dining & Serveware",
        callback
      );
    },
    function (callback) {
      categoryCreate("Paintings", "Stylish Wal-poster", callback);
    },
    function (callback) {
      categoryCreate(
        "Toys",
        "Toys & games",
        callback
      );
    },
    function (callback) {
      itemCreate(
        "Friends Toys",
        "Baby games",
        categories[0],
        108999,
        1000,
        "https://m.media-amazon.com/images/I/71u1YMNoUgL._SX679_.jpg",
        callback
      );
    },
    function (callback) {
      itemCreate(
        "Stationary",
        "All study material",
        categories[0],
        200,
        500,
        "https://5.imimg.com/data5/YL/RI/OR/SELLER-95604177/stationeries-500x500-png-500x500.png",
        callback
      );
    },
    function (callback) {
        itemCreate(
          "Cello Puro Steel",
          "Cello Puro Steel-X Benz Stainless Steel Water Bottle with Inner Steel and Outer Plastic",
          categories[1],
          1499,
          1000,
          "https://m.media-amazon.com/images/I/51L0b7NLiBL._SL1280_.jpg",
          callback
        );
      },
    function (callback) {
      itemCreate(
        "Redmi Note 11",
        "Note 11 128 Gb,6Gb RAM",
        categories[1],
        15002,
        500,
        "https://www.reliancedigital.in/medias/REDMI-NOTE-11-Mobile-Phone-492849130-i-1-1200Wx1200H?context=bWFzdGVyfGltYWdlc3w4Nzk5NnxpbWFnZS9qcGVnfGltYWdlcy9oNDUvaDk0Lzk4MjAzMDk5MTM2MzAuanBnfDU3ZjMzYWNhODAzMmUwODA4NjlhZTE1Njc3M2EyMWY2NWZlZjJkNTFkYmViOTBkNTE1MDcyMjM2OWRjYjQxZjU",
        callback
      );
    },
  ]);
}

async.series(
  [populateDB],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("items: " + items);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);