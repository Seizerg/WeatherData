const express= require("express");
const bodyparser= require("body-parser");
const app= express();
app.use(bodyparser.urlencoded({extended: true}))
app.use(express.static("public"));
const https= require("https");
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})
app.post("/",function(req,res){
  var city= req.body.cityName;
  var units=req.body.unit;
  console.log(units);
  const apiKey= "52222a1495086b16af5bba80bc3a8307";
  https.get("https://api.openweathermap.org/data/2.5/weather?q="+city+"&units="+units+"&appid="+apiKey+"",function(response){
   response.on("data",function(data){
     const jdata= JSON.parse(data);
     res.send("ur city temperature is "+jdata.main.temp+"")

   })
  })
})





app.listen(3000,function(){
  console.log("your server is working");
})
