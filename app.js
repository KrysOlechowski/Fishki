const express = require("express");
const bcrypt = require('bcryptjs')
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser')
// Authentication:
const session = require('express-session')
const MongoStore = require('connect-mongo');


const app = express();
require("dotenv").config();
const Card = require("./models/card");
const UserModel = require('./models/user');
const CollectionsNames = require("./models/collections");

const DBUri = process.env.DBUri;
const PORT = process.env.PORT || 3003;
const cors = require("cors");

const ENV = process.env.NODE_ENV;
const IS_PROD = ENV === "production";

const SESS_NAME = "SID"

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
app.use(cookieParser())

app.use(session({
   secret: "secret cookie key",
   resave: false,
   saveUninitialized: false,
   store: MongoStore.create({ mongoUrl: DBUri, }),
}))

//AUTHENTICATION ROUTES:

app.post("/session", async (req, res) => {
   const { cookie } = req.body
   console.log(cookie)

   mongoose.connection.db.collection("sessions").find({ "_id": cookie }).toArray((err, info) => {
      console.log("info")
      console.log(info)
      if (info.length > 0) {
         res.send({
            cookieExist: true,
            cookie: info
         })
      } else {
         res.send({
            cookieExist: false
         })
      }
   })
});

app.post('/register', async (req, res) => {
   const { username, email, password } = req.body
   console.log(req.body)

   let user = await UserModel.findOne({ email })

   if (user) {
      res.send({ user: "exists" })
   } else {
      const hashedPassword = await bcrypt.hash(password, 12)
      user = new UserModel({
         username,
         email,
         password: hashedPassword
      })
      await user.save()
      res.send({
         user: "user created"
      })
   }
})

app.post('/login', async (req, res) => {
   const { email, password } = req.body
   const user = await UserModel.findOne({ email })

   if (!user) {
      return res.send({ user: "Not Finded" })
   }

   const isPasswordMatch = await bcrypt.compare(password, user.password)

   if (!isPasswordMatch) {
      return res.send({ isMatch: isPasswordMatch, user: "Password Not Match" })
   }

   req.session.isAuth = true
   res.send({ isMatch: isPasswordMatch, user: user, sessionId: req.session.id })
})


app.post('/logout', async (req, res) => {
   const { cookieId } = req.body
   mongoose.connection.db.collection("sessions").deleteOne({ "_id": cookieId }).then(result => {
      if (result.deletedCount > 0) {
         return res.send({ cookieDeleted: true, cookieId: cookieId })
      } else {
         return res.send({ cookieDeleted: false, cookieId: cookieId })
      }
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
