import { ReactNode } from "react";

const MCQLayout=({children}:{children:ReactNode})=>{
    return <div suppressContentEditableWarning>
        
        {children}
        
    </div>
}

export default MCQLayout