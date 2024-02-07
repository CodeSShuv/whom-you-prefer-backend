const express = require("express");
const leaderBoardData = require("./leaderBoard.json");
const data = require("./data.json");
const cors = require('cors');
const fileSupport = require("fs");
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
app.get("/api/studentlist",(req,res)=>{
    // ranking()
    res.json(leaderBoardData);
});
app.get("/api/questions",(req,res)=>{
    res.json(data)
});
app.post("/api/update-data",(req,res)=>{
    for(let i = 0 ; i<leaderBoardData.student.length;i++){
        // console.log(leaderBoardData.student[i].matches)
        for(let j = 0 ; j < leaderBoardData.student[i].matches.length; j++){
            // console.log(req.body.answer)
            
            if(req.body.answer.toLowerCase() === leaderBoardData.student[i].matches[j].toLowerCase() || req.body.answer.toLowerCase() === leaderBoardData.student[i].name.toLowerCase()){
                leaderBoardData.student[i].points[req.body.questionNo] =  leaderBoardData.student[i].points[req.body.questionNo] + 1; 
                console.log(leaderBoardData.student[i].points[parseInt(req.body.questionNo)])
                fileSupport.writeFile("./leaderBoard.json",JSON.stringify(leaderBoardData),(err) => {
                    if (err)
                      console.log(err);
                    else {
                      console.log("File written successfully\n");
                      console.log();
                      res.sendStatus(200);
                    }});
                return; 
            }
        }
    }
    res.sendStatus(200)
   
});

app.listen(port,()=>{
    console.log("I am listening");
})

