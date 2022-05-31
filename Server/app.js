const express = require("express");
var bodyParser = require('body-parser')
const clear = require('console-clear');

const PORT = 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));
  
app.post("/resources", async function (req, res) {
    res.writeHead(200, {
        "access-control-allow-origin": "*",
      });
    const data = req.body;
    clear();
    console.log(data.src);
    res.end();
    return;
  });

app.listen(PORT, () => {
    console.log("Server started on Port: " + PORT);
  });
