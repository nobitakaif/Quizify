"use client"
import axios from "axios"
import { useRef, useState } from "react"
import Quiz from "./quiz"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

export default function QnA(){
    const [value , setValue ] = useState<any[]>([])
    const topicRef = useRef<any>(null)
    const questionRef = useRef<any>(null)
    const levelRef = useRef<any>(null)

    const getQuestion= async()=>{
        
        
        const topic = topicRef.current.value
        let question = questionRef.current.value
        const level = levelRef.current.value
        if(Number(question)>10){
            question = 10
        }
        if(!topic || !question || !level){
            alert("please fill the details for better response")
            return
        }
        const response = await axios.post("https://quiziy-backend.onrender.com/prompt",{
            difficultyLevel : level,
            topic: topic,
            question : question
        })
        // console.log(topic)
        // console.log(typeof(response.data.finalAnswer))
        // console.log(response.data)

        // setValue(response.data)
        let fixedData;
        let parsedData;
        // response.data= JSON.stringify(response.data)
    if(typeof(response.data.finalAnswer) == 'string'){
        // console.log("inside string block")
        fixedData = response.data.finalAnswer
            .replace(/`/g, "")     // remove backticks
            .replace(/'/g, '"')    // replace single quotes with double quotes
            .replace(/,(\s*\])/g, '$1')  // remove extra comma before closing ]

            // console.log("replace is done")
        try {
            // console.log("this is final fixeddata"+fixedData)
            // const jsonString = JSON.stringify(fixedData); 
            parsedData = JSON.parse(fixedData)
            setValue(parsedData)
        } catch(err){
            console.error("Parsing error:", err)
            console.log("Fixed Data:", fixedData)
        }
    }
    else{
        // console.log("inside else block")
        setValue(response.data)
    }
        // console.log(fixedData)
        
        // console.log(parsedData)
        // setValue(parsedData)
    }
    return <div className="flex gap-4 overflow-y-auto scrollbar-hide">
        
        <div className="w-[25%] rounded-2xl  flex justify-center items-center h-[90vh]">
            <div className="flex flex-col w-72 items-center gap-3 p-8 border rounded-xl  ">
                <Input type="text" placeholder="enter user topic" ref={topicRef}/>
            
                <Input type="text" placeholder="enter difficulty level" ref={levelRef}/>
        
                <Input type="text" placeholder="enter number of question" ref={questionRef}/>
            
                <Button onClick={getQuestion} className="cursor-pointer">Get Topic</Button>
            </div>
        </div>
        {/* { value.map((item:any,idx)=>{
            return <div key={Math.random()+Math.random()+Math.random()}>
                Q.{++idx} {item}
            </div>
        })} */}
        <div style={{
            width:"100%"
        }}>
            <Quiz value={value}/>    
        </div>
        
    </div>
}