import { Textarea } from "./ui/textarea"


export default function Quiz({value}:{value:any}){
    // console.log(typeof(value))
    // console.log(value)
    return <div className="flex flex-col gap-2">
        {value.map((item:any , index:any)=>{
            return <div key={index}>
                {/* {item} */}
                    <div className="font-semibold text-xl">Q.{++index} {item}</div>
                    <Textarea className="h-24 mb-2" placeholder="Write your Answer here...."/>
            </div>
        })}
    </div>
}