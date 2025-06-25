import { ModeToggle } from "@/components/ui/ModeToggle";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { ReactNode } from "react";


const PageNotFound=({children}:{children:ReactNode})=>{
    return <div>
        
    
        {children}
        
    </div>
}

export default PageNotFound