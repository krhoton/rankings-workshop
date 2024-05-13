const express = require('express');
const {PostMatch, GetMatch, GetMatches} = require("./matches");
const app = express();
app.use(express.json())

app.post("/matches", PostMatch);
app.get("/matches/:id", GetMatch);
app.get("/matches", GetMatches);

app.listen(3000);

