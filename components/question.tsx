"use client"
import axios from "axios"
import { useRef, useState } from "react"
import Quiz from "./quiz"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"


export default function QnA(){
    const [question , setQuestion ] = useState<any[]>([])
    const [answer, setAnswer] = useState<any[]>([])
    const topicRef = useRef<any>(null)
    const questionRef = useRef<any>(null)
    const levelRef = useRef<any>(null)
    const answerRefs = useRef<(HTMLTextAreaElement | null)[]>([]);

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
        const response = await axios.post("http://10.172.125.196:3002/prompt",{
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
            setQuestion(parsedData)
        } catch(err){
            console.error("Parsing error:", err)
            console.log("Fixed Data:", fixedData)
        }
        console.log("value inside if",question)
    }
    else{
        // console.log("inside else block")
        setQuestion(response.data)
        console.log("value inside in else",typeof(response.data))
    }
        // console.log(fixedData)
        console.log("value outside ",question)
        // console.log(parsedData)
        // setValue(parsedData)
    }

    const onSubmit=async()=>{
        
        const answers = answerRefs.current.map(ref => ref?.value );
        console.log('question from ai',question)
        console.log("Submitted Answers:", answers);
    }
    return <div className="flex gap-4 overflow-y-auto scrollbar-hide max-sm:flex-col mt-10  overflow-hidden">
        
        
        <div className="flex flex-col w-72 items-center gap-3 p-8  max-sm:w-full  rounded-xl  ">
            <div className="flex flex-col w-72 items-center gap-3 p-8 border rounded-xl min-lg:absolute top-[25%] min-sm:ml-20">
                <Input type="text" placeholder="enter user topic" ref={topicRef}/>
            
                <Input type="text" placeholder="enter difficulty level" ref={levelRef}/>
        
                <Input type="text" placeholder="enter number of question" ref={questionRef}/>
            
                <Button onClick={getQuestion} className="cursor-pointer w-full text-lg font-semibold">Get Topic</Button>
                <Button onClick={onSubmit} className="cursor-pointer w-full bg-blue-500 text-white text-lg font-semibold">Submit</Button>
            </div>
        </div>
        {/* { value.map((item:any,idx)=>{
            return <div key={Math.random()+Math.random()+Math.random()}>
                Q.{++idx} {item}
            </div>
        })} */}
        <div className="flex flex-col gap-4 border rounded-2xl p-2 ml-15 min-lg:w-[75%]     max-sm:w-full max-sm:m-3">
            <div className=" w-[100%] max-sm:w-full p-2">
                 {question.map((item, index) => (
                    <div key={index}>
                    <div className="font-semibold text-xl">
                        Q.{index + 1} {item}
                    </div>
                    <Textarea
                        className="h-24 mb-2 w-full"
                        placeholder="Write your answer here..."
                        ref={el => { answerRefs.current[index] = el; }}
                    />
                    </div>
                ))}
            </div>
        </div>
    </div>
}