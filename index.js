import express, { json } from "express";
import leaderBoardData from "./leaderBoard.json"assert { type: "json" };
import data from "./data.json" assert { type: "json" };
import cors from 'cors';
import { writeFile } from "fs";
const app = express();
const port = 5000;
app.use(cors());
app.use(json());
app.get("/api/studentlist",(req,res)=>{
    // ranking()
    res.json(leaderBoardData);
});
app.get("/api/questions",(req,res)=>{
    res.json(data)
});
app.post("/api/update-data",(req,res)=>{
    for(let i = 0 ; i<student.length;i++){
        // console.log(leaderBoardData.student[i].matches)
        for(let j = 0 ; j < student[i].matches.length; j++){
            // console.log(req.body.answer)
            
            if(req.body.answer.toLowerCase() === student[i].matches[j].toLowerCase() || req.body.answer.toLowerCase() === student[i].name.toLowerCase()){
                student[i].points[req.body.questionNo] =  student[i].points[req.body.questionNo] + 1; 
                console.log(student[i].points[parseInt(req.body.questionNo)])
                writeFile("./leaderBoard.json",JSON.stringify(leaderBoardData),(err) => {
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

