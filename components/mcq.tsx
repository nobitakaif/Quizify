"use client"
import axios from "axios"
import {  useRef, useState } from "react"
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import { useRouter } from "next/navigation";
import Popup from "./Rank";
import { toast } from 'sonner';


export default function MCQuiz() {
  const router = useRouter()
  const [isDisable,setDisable] = useState<Boolean>(false)
  const [showPopup, setShowPopup] = useState(false);
  const [checkResult, setCheckResult] = useState<Boolean>(false)
  

  const [correctAnswer,setCorrectAnswer] = useState<number | string>()
  const [totalQuestion,setTotalQuestoin] = useState<number | string>()
  const [value, setValue] = useState<any>([]);
  const [ allQuestion, setAllQuestion ] = useState<any[]>([])
  
  const [selectedOptions, setSelectedOptions] = useState<any>({});
  const pointRef = useRef<any>(null);
  const questionRef = useRef<any>(null);
  const levelRef = useRef<any>(null);

  const handleOptionChange = (questionNumber: number, selected: string ) => {
    setSelectedOptions((prev: any) => ({
      ...prev,
      [questionNumber]: selected,
    }));
  };

  const fixInvalidJSON = (data: string) => {
    let fixedData = data;
    fixedData = fixedData.replace(/```json|```/g, "");
    fixedData = fixedData.replace(/'/g, '"');
    fixedData = fixedData.replace(/(\w)"(\w)/g, '$1\\"$2');
    fixedData = fixedData.replace(/,\s*([}\]])/g, "$1");
    fixedData = fixedData.replace(/\n/g, "");
    if (fixedData.startsWith("json")) {
      fixedData = fixedData.replace("json", "").trim();
    }
    return fixedData;
  };

  const getMCQ = async () => {
    const level = levelRef.current.value;
    const topic = pointRef.current.value;
    const question = questionRef.current.value;

    if (!question || !topic || !level) {
      alert("Please fill all the details");
      return;
    }

    
    let parsedData = null
    try {
      const response = await axios.post("http://34.132.150.238:3002/checkbox", {
        difficultyLevel: level,
        topic: topic,
        question: question,
      }
      
    );

      let finalData = response.data.finalAnswer;
      
      if (typeof finalData === "string") {
        const cleanedData = fixInvalidJSON(finalData);
        
        try {
          console.log("this is clean data ",cleanedData)
          parsedData = await JSON.parse(cleanedData);
          
          console.log("this is current state of allQestion",allQuestion)
          console.log("this is parsed data ",parsedData)
          setDisable(true)
          
          setSelectedOptions({});
          
         
          console.log("this is all question from response ",allQuestion)
          
        } catch (err) {
          console.error("JSON Parsing Error:", err);
          console.log("Data after fixing:", cleanedData);
          alert("Invalid response from server. Please try again later.");
        }
      } else {
        setValue(finalData);
        setSelectedOptions({});
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("Something went wrong. Please try again later.");
    }
    setValue([]);
    console.log("this is current value ",value )
    console.log(parsedData[0][`Q.1`])
     for(let i =0 ;i<question;i++){
        const getQuestion = parsedData[i][`Q.${(i+1)}`]
        console.log("this is getQueston : ", getQuestion + " ",i+1)
        // setAllQuestion((prev:any) => ([...prev,parsedData[i][`Q.${i+1}`]]))
        // console.log("after iterate the state of allQuestion ",allQuestion)
        setValue((prev:any)=>([...prev,parsedData[i]]))
      }
      console.log("afte iterate the value ",value)
  };

  const submit = async ()=>{
    setCorrectAnswer(0)
    console.log(selectedOptions)
    
    setDisable(false)
    let tempQuestion = []
    let tempAnswer:any = []
    let count:number = 1;
    console.log("this is value inside in sub",value)
    console.log("size of value",value.length)
    for(let i =0;i<value.length;i++){
      if(typeof(selectedOptions[`${i+1}`])!=undefined){
        console.log("inside inside")
        count=count+1
      } 
      const getQuestion = value[i][`Q.${i+1}`]
      console.log("this is get question form the values ",getQuestion) 
      
      tempQuestion.push(getQuestion)
      tempAnswer.push(selectedOptions[`${i+1}`])
    }
    if(count<value.length){
      console.log(count)
      console.log(value.length)
      toast.error("please all question")
      return
    }
    console.log("this temp Question",tempQuestion)
    setAllQuestion(tempQuestion)
    console.log("this is all Question ",allQuestion)
    console.log(selectedOptions)
    
    console.log(tempAnswer)
    
    // let answer =[]
    //  answer=["Concurrency boost","Cycle detection","Dynamic class alteration","Shallow vs. deep clone","Intermediate representation"]
    //  console.log("the value of answer " , answer)
    //  const demoQuestion = ["What's the worst-case time complexity for deleting an arbitrary node in a self-balancing AVL tree?","who develop c language?"]
    //  const demoAnswer = ["O(n)","Dennis Ritchie "]
    const response = await axios.post(`http://34.132.150.238:3002/quizy`,{
      one:tempQuestion,
      sec:tempAnswer
    })
   
    {response.data && toast.success("now you can check the result")  }
    console.log(response.data);
    setTotalQuestoin(value.length)
    setCorrectAnswer(response.data.totalCorrect)
    
    setCheckResult(true)
  }

  
  return (
    <div className=" flex gap-4 overflow-y-auto scrollbar-hide max-sm:flex-col">
        <div className=" w-[25%] max-sm:w-full max-sm:p-5 rounded-2xl  flex justify-center items-center h-[90vh]">
          
            <div className="flex flex-col w-72 items-center gap-3 p-8 border max-sm:w-full  rounded-xl  ">
                <Input type="text" ref={pointRef} placeholder="Enter your topic" />
                <Input type="text" ref={levelRef} placeholder="Difficulty level" />
                <Input type="text" ref={questionRef} placeholder="Number of questions" />
                <Button onClick={getMCQ} className="w-full cursor-pointer text-lg font-bold" asChild><button>Get MCQ</button></Button>
                <Button asChild className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white text-lg font-bold" onClick={submit} suppressHydrationWarning ><button>submit</button></Button>
                <Button onClick={()=>{
                  setShowPopup(true)
                  setDisable(true)
                }} className="bg-blue-500 hover:bg-blue-600 w-full cursor-pointer font-bold text-lg  text-white" disabled={!checkResult} >show Result</Button>
                {showPopup && <Popup onClose={()=>setShowPopup(false) } totalQuestion={totalQuestion!} correctAnswer={correctAnswer!}/>}
            </div>
        </div>
      

      <div className="flex flex-col gap-4 border rounded-2xl p-10 w-[70%]  h-[90vh] overflow-y-auto max-sm:w-full max-sm:m-3">

        {value.map((item: any, idx: number) => {
            const questionNumber = idx + 1;
            return (
            <div key={questionNumber} className="border rounded-2xl p-4 flex flex-col gap-4">
                <h3 className="font-bold text-2xl">Q.{questionNumber} {String(Object.values(item)[0])}</h3>
                {item.options.map((opt: any, idx2: number) => (
                <div key={idx2}>
                    {Object.entries(opt).map(([key, val]) => (
                    <div key={key} style={{
                        display:"flex",
                        
                    }}>
                        <input
                        type="radio"
                        name={`question-${questionNumber}`}
                        value={key}
                        checked={selectedOptions[questionNumber] === String(val)}
                        onChange={() => handleOptionChange(questionNumber, String(val))}
                        className="cursor-pointer"
                        />
                        <strong> {key.toLowerCase()} :  {" "} </strong>  { String( val)}
                    </div>
                    ))}
                </div>
                ))}
            </div>
            );
        })}
      </div>
    </div>
  );
}
