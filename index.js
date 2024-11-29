const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = 3001;

const app = express();
app.use(express.json());
app.use(cors());

const authrouter = require("./routes/authRouter");
app.use(authrouter);
const AdminRouter = require("./routes/AdminRouter");
app.use(AdminRouter);
const userRouter = require("./routes/userRouter");
app.use(userRouter);
const moderatorRouter = require("./routes/moderatorRouter");
app.use(moderatorRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
