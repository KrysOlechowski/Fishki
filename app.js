const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const Card = require("./models/card");
const CollectionsNames = require("./models/collections");

const DBUri = process.env.DBUri;
const PORT = process.env.PORT || 3003;
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(session({
//    name: "sess_name",
//    resave: false,
//    saveUninitialized: false,
//    secret: "secret",
//    cookie: {
//       httpOnly: false,
//       maxAge: 3600000,
//       path: '/',
//       secure: false //on prod change to true
//       // sameSite:true
//    }
// }))
const ENV = process.env.NODE_ENV
mongoose
   .connect(DBUri, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => {
      console.log("Connected to DB");
      app.listen(PORT, () => {
         console.log("Listening on PORT:3003");
      });
   })
   .catch((err) => console.log(err));

app.get("/cards", (req, res) => {
   res.send({ "LOL": ENV })
   Card.find()
      .then((result) => {
         res.send(result);
      })
      .catch((err) => {
         console.log(err);
      });
});

app.get("/collections", (req, res) => {
   CollectionsNames.find()
      .then((result) => {
         res.send(result);
      })
      .catch((err) => {
         console.log(err);
      });
});

app.post("/collections", (req, res) => {
   const collectionName = req.body.name;
   console.log("collectionName : " + collectionName);
   CollectionsNames.findOne({ _id: "606b0dd9c718f4532491e229" }, (err, coll) => {
      coll.names = ["kol1", "kol2", "kol3"];

      coll.save();
   })
      .then((result) => {
         res.send(result);
      })
      .catch((err) => {
         console.log(err);
      });
});

app.post("/add", (req, res) => {
   const body = req.body;

   const card = new Card({
      front: body.front,
      back: body.back,
      status: body.status,
      collectionName: body.collectionName,
      goodAnswers: 0,
      badAnswers: 0,
   });

   card
      .save()
      .then((result) => {
         res.send(result);
      })
      .catch((err) => {
         console.log(err);
      });
});

app.delete("/delete", (req, res) => {
   const body = req.body;
   Card.deleteOne({ _id: body.cardId }).then((result) => {
      res.send(result);
   });
});

app.post("/update", (req, res) => {
   const body = req.body;
   Card.updateOne(
      { _id: body.id },
      {
         ...body,
      }
   )
      .then((result) => {
         res.send(result);
      })
      .catch((err) => {
         res.send(err);
      });
});

app.get("/findById", (req, res) => {
   const id = "605a54e267ae914f2cdab9b6";
   Blog.findById(id)
      .then((result) => {
         res.send(result);
         console.log(result);
      })
      .catch((err) => {
         console.log(err);
      });
});
