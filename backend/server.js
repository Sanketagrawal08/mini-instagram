require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express(); //  Pehle express initialize karo
const cookieParser = require("cookie-parser");
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["https://mini-insta-frontend.onrender.com", "http://localhost:5173"], // Add your local frontend URL
    credentials: true, // Allow cookies if needed
  })
);

app.use(cookieParser());
const connect = require("./src/db/db");
const userRoutes = require("./src/routes/users.routes");
const postRoutes = require("./src/routes/posts.routes")
connect();

// Routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes)

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
