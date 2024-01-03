require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const PadService = require('./models/padServiceModel');
const cycleRoutes = require("./routes/cycles");
const userRoutes = require("./routes/user");
const padServiceRoutes = require("./routes/padService");
const blogroutes = require("./routes/blogs");

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/cycles", cycleRoutes);
app.use("/api/user", userRoutes);
app.use("/api/pads", padServiceRoutes);
app.use("/api/blogs", blogroutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // create nodemailer transport for sending emails
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'lit2020021@iiitl.ac.in', // sender email address
        pass: 'az(>pB7q' // sender email password
      }
    });

    // create cron job to run every 30 days
    cron.schedule('0 0 1 * *', async () => {
      try {
        // fetch all pad services from database
        const padServices = await PadService.find({});

        // calculate total number of pads required
        const totalPadsRequired = padServices.reduce((acc, curr) => acc + curr.numberOfPads, 0);

        // send email to admin
          const mailOptions = {
            from: 'lit2020021@iiitl.ac.in',
            to: 'lcs2020050@iiitl.ac.in',
            subject: `Pads Required - ${totalPadsRequired} pads`,
            text: `There are currently ${totalPadsRequired} pads required.`
          };

          await transporter.sendMail(mailOptions);
          console.log(`Email sent to admin at ${new Date()}`);
      } catch (error) {
        console.log(error);
      }
    });

    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db and listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
