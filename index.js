const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")
dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: "*",
  credentials: true
}))

// Routers
const BlogRouter = require("./routers/blog.router");
const GalleryRouter = require("./routers/gallery.router");
const EnquiryRouter = require("./routers/enquiries.router");
const AdminRouter = require("./routers/admin.router");
const AdmissionRouter = require("./routers/admission.router");

const PORT = process.env.PORT || 3012;

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Something's wrong with Port ${PORT}`);
  } else {
    console.log(`Server's running smoothly on Port ${PORT}`);
  }
});

const { connectMyDB } = require("./connect");

connectMyDB();

app.use("/api/cbma", BlogRouter);
app.use("/api/cbma", GalleryRouter);
app.use("/api/cbma", EnquiryRouter);
app.use("/api/cbma", AdminRouter);
app.use("/api/cbma", AdmissionRouter);
