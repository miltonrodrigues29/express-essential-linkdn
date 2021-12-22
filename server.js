const express = require("express");
const app = express();
const favicon = require("serve-favicon");
const path = require("path");
const data = require("./data/data.json");

const port = 3000;
app.use(express.static("public"));
app.use("/images", express.static("images"));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.get("/", (req, res) => {
  console.log(req.originalUrl);
  console.log(req.method);
  res.json(data);
});

// app.post("/item", (req, res) => {
//   res.send(`post request on root route on port ${port}`);
// });

// app.get("/item", (req, res) => {
//   res.send(`post request on root route on port ${port}`);
// });

// app.put("/item", (req, res) => {
//   res.send(`put request on root route on port ${port}`);
// });

// app.delete("/item", (req, res) => {
//   res.send(`delete request on root route on port ${port}`);
// });

app
  .route("/item")
  .get((req, res) => {
    throw new Error();
    res.send(`get request on root route on port ${port}`);
  })
  .post((req, res) => {
    res.send(`post request on root route on port ${port}`);
  })
  .delete((req, res) => {
    res.send(`delete request on root route on port ${port}`);
  })
  .put((req, res) => {
    res.send(`put request on root route on port ${port}`);
  });

app.get("/images", (req, res) => {
  res.download("images/rocket.jpg");
  // res.redirect("https://www.linkedin.com/in/milton-rodrigues/");
});

app.get(
  "/item/:id",
  (req, res, next) => {
    console.log(req.params.id);
    let user = Number(req.params.id);
    console.log(user);
    console.log(data[user]);
    res.send(data[user]);
    next();
  },
  (req, res) => {
    console.log("Did you get the right data");
  }
);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send(`Red Alert! Red Alert ${err.stack}`);
});

app.listen(3000, () => {
  console.log(`Server listening at port ${port}`);
});
