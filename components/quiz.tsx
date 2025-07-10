

export default function Quiz({value}:{value:any}){
    // console.log(typeof(value))
    // console.log(value)
    return <div>
        {value.map((item:any , index:any)=>{
            return <div key={index}>
                {/* {item} */}
                    <h4>Q.{++index} {item}</h4>
            </div>
        })}
    </div>
}