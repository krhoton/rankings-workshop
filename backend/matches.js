let matches = [];


function PostMatch(req, res){
  if (("players" in req.body) && ("results" in req.body)) {
    matches.push({
      players: req.body.players,
      results: req.body.results
    });
    res.json({...req.body, id: matches.length-1});
  } else {
    res.status(400);
    res.send("Bad Request")
  }
}

function GetMatch(req, res) {
  if (req.params.id in matches) {
    res.json(matches[req.params.id]);
  } else {
    res.status(404);
    res.send("Not found!");
  }
}

function GetMatches(_, res) {
  res.json(matches);
}

module.exports = {PostMatch, GetMatch, GetMatches};
