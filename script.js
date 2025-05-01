const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  fs.readdir(`./files`, function (err, files) {
    res.render("index", { files: files });
  });
});

app.get("/file/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf8", function (err, data) {
    res.render("show", { file: req.params.filename, data: data });
  });
});

app.get("/all-tasks", (req, res) => {
  fs.readdir("./files", (err, files) => {
    if (err) {
      console.error(err);
      res.send("Error reading files");
    } else {
      res.render("tasklist", { files });
    }
  });
});

app.post("/delete-task/:filename", (req, res) => {
  fs.unlink(`./files/${req.params.filename}`, function (err) {
    if (err) {
      console.log(err);
      res.send("Error deleting file");
    } else {
      res.redirect("/");
    }
  });
});

app.post("/update-task/:filename", (req, res) => {
  fs.writeFile(
    `./files/${req.params.filename}`,
    req.body.updatedData,
    function (err) {
      if (err) {
        console.log(err);
        res.send("Error updating file");
      } else {
        res.redirect(`/file/${req.params.filename}`);
      }
    }
  );
});

app.post("/create", (req, res) => {
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("_")}.txt`,
    req.body.details,
    function (err) {
      if (err) {
        console.log(err);
        res.send("Error creating file");
      } else {
        res.redirect("/");
      }
    }
  );
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 : http://localhost:3000");
});
