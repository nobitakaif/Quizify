"use client"
import axios from "axios"
import {  useRef, useState } from "react"
import { Input } from "./ui/input";
import { Button } from "./ui/button";




export default function MCQuiz() {
  const [value, setValue] = useState<any>([]);
  const [selectedOptions, setSelectedOptions] = useState<any>({});
  const pointRef = useRef<any>(null);
  const questionRef = useRef<any>(null);
  const levelRef = useRef<any>(null);

  const handleOptionChange = (questionNumber: number, selected: string) => {
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

    try {
      const response = await axios.post("http://localhost:3002/checkbox", {
        difficultyLevel: level,
        topic: topic,
        question: question,
      });

      let finalData = response.data.finalAnswer;

      if (typeof finalData === "string") {
        const cleanedData = fixInvalidJSON(finalData);
        try {
          const parsedData = JSON.parse(cleanedData);
          setValue(parsedData);
          setSelectedOptions({});
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
  };

  return (
    <div className=" flex gap-4 overflow-y-auto scrollbar-hide">
        <div className=" w-[25%] rounded-2xl  flex justify-center items-center h-[90vh]">
          
            <div className="flex flex-col w-72 items-center gap-3 p-8 border rounded-xl  ">
                <Input type="text" ref={pointRef} placeholder="Enter your topic" />
                <Input type="text" ref={levelRef} placeholder="Difficulty level" />
                <Input type="text" ref={questionRef} placeholder="Number of questions" />
                <Button onClick={getMCQ} className="w-full cursor-pointer" asChild><button>Get MCQ</button></Button>
                <Button asChild className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600" disabled><button>Submit </button></Button>
            </div>
        </div>
      

      <div className="flex flex-col gap-4 border rounded-2xl p-10 w-[70%]  h-[90vh] overflow-y-auto">

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
                        checked={selectedOptions[questionNumber] === key}
                        onChange={() => handleOptionChange(questionNumber, key)}
                        className="cursor-pointer"
                        />
                        <strong> {key.toLowerCase()} :  </strong>  { String( val)}
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
