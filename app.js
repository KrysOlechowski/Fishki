const express = require("express");
const mongoose = require("mongoose");

// Authentication:
const session = require("express-session");
const MongoDbStore = require('connect-mongo');

const app = express();
require("dotenv").config();
const Card = require("./models/card");
const CollectionsNames = require("./models/collections");

const DBUri = process.env.DBUri;
const PORT = process.env.PORT || 3003;
const cors = require("cors");

const ENV = process.env.NODE_ENV;
const IS_PROD = ENV === "production";

const SESS_NAME = "SID"

const users = [
   { id: 1, username: "user", email: "email@", password: "pass" },
   { id: 2, username: "user2", email: "2email@", password: "pass2" },
   { id: 3, username: "user3", email: "3email@", password: "pass3" },
]

mongoose
   .connect(DBUri, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => {
      console.log("Connected to DB");
      app.listen(PORT, () => {
         console.log("Listening on PORT:3003");
      });
   })
   .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const routesArray = ['/session']

app.use(routesArray, session({
   secret: "key with secret",
   resave: false,
   store: MongoDbStore.create({
      mongoUrl: DBUri
   }),
   key: 'express.sessionID',
   saveUninitialized: false,
}))


//AUTHENTICATION ROUTES:

app.get("/session", (req, res) => {
   req.session.isAuth = true;
   console.log(req.session)
   console.log(req.session.id)
   res.send({ test: req.session })
});


app.post('/login', (req, res) => {
   console.log("login")
   const { username, password } = req.body
   const user = users.find(user => user.username === username && user.password === password)
   if (user) {
      // console.log(user.id)
      req.session.userId = user.id
      // console.log(req.session)
      res.send(req.session)
   } else {
      res.send({ "not-sended1": "not-sended2" })
   }
})


app.post('/logout', (req, res) => {
   console.log("logout")
   console.log(req.session)
   req.session.destroy((err) => {
      if (err) {
         console.log(err)
         return res.send(err)
      }
      console.log(req.session)
      res.clearCookie(SESS_NAME)
      res.send({ "Session": "Destroyed" })
   })
})

//CARDS ROUTES:

app.get("/cards", (req, res) => {
   console.log(req.session)
   Card.find()
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

//COLLECTION ROUTES:

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

app.get("/collections", (req, res) => {
   CollectionsNames.find()
      .then((result) => {
         res.send(result);
      })
      .catch((err) => {
         console.log(err);
      });
});
