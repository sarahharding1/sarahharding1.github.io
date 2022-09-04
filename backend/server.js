import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import orderRouter from "./routers/orderRouter.js";
import uploadRouter from "./routers/uploadRouter.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// eslint-disable-next-line no-undef
mongoose.connect(
  // eslint-disable-next-line no-undef
  process.env.MONGODB_URL ||
    "mongodb+srv://admin:admin@cluster0.o2riywz.mongodb.net/test",
  
);
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// mongoose.connect(

//   process.env.MONGODB_URL ||
//     "mongodb+srv://admin:admin@cluster0.o2riywz.mongodb.net/?retryWrites=true&w=majority",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );

app.get("/api/config/paypal", (req, res) => {
  // eslint-disable-next-line no-undef
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});
app.get("/api/config/google", (req, res) => {
  // eslint-disable-next-line no-undef
  res.send(process.env.GOOGLE_API_KEY || "");
});
// app.get("/", (req, res) => {
//   res.send("Server is ready");
// });

app.use("/api/uploads", uploadRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
);
// eslint-disable-next-line no-undef
const port = process.env.PORT || 5000;


app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
