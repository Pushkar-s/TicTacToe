var express = require("express");
var app  = express();


app.use(express.static(__dirname+"/public"));



app.get("/",function(req,res){
    res.render("index.ejs");
});

app.get("/ourteam", function(req,res) {
    res.render("ourteam.ejs");
});


app.listen(process.env.PORT || 3000,function(){
    console.log("server on port 3000");
});