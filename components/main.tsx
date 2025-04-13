"use client"
import axios from "axios"
// import { useState } from "react"

import { useRef, useState } from "react"


export default function Main(){
    // const [ level, setLevel ]  = useState()
    const levelVal = useRef<HTMLInputElement>(null)
    const [val,setVal] = useState(null)

    const onClick= async ()=>{
        const level = levelVal.current?.value 
        console.log(level)
        const response = await axios.post('http://localhost:3002/prompt',{
        
            "difficultyLevel" : "high",
            "topic" : "web dev",
            "question" :"3"
            
        })
        setVal(response.data)
        // // const data = response.data

        // // console.log(response.data[2][0])
        // console.log(response.data[0][0]["Q.1"])
        // console.log(response.data.data[0][0]["Q.1"])

        // console.log(data)


        // console.log(response.data)
        console.log(response.data[0][0]["Q.1"])
    }
    return <div className="h-screen w-full ">
        <div className="h-72 w-72 border-2 flex justify-center">
            <div>
                level
                <input type="text" ref={levelVal}  className="border-2"/>
            </div>
            <button onClick={onClick} className="cursor-pointer">submit</button>
            
        </div>
        {val}
    </div>
}