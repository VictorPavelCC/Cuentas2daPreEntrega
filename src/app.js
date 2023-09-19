const express = require("express")
const mongoose = require("mongoose")
const cartRouter = require("./routes/carts.router")
const productRouter = require("./routes/products.router")
const userRouter = require("./routes/user.router");
const handlebars = require("express-handlebars")
const path = require("path");

const app = express()
const PORT = 8080


app.engine(
    "handlebars",
    handlebars.engine({
      extname: "handlebars",
      defaultLayout: false,
      layoutsDir: "views/",
    })
  );
  app.set("views", path.join(__dirname + "/views"));
  app.set("view engine", "handlebars");

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

app.use(express.json())

// Mongoose
mongoose
  .connect(
    "mongodb+srv://pavelcuentas:Tsuna_ZERO2@projectsplus.awa4d2q.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((error) => {
    console.log(`${error} error`)
  })

  app.use("/api/products", productRouter);
  app.use("/api/carts", cartRouter);  