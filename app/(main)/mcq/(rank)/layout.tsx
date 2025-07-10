
import { ModeToggle } from "@/components/ui/ModeToggle";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { ReactNode } from "react";


const RankLayout=({children}:{children:ReactNode})=>{
    return <div className="h-screen w-full">
        
        {children}
        
    </div>
}

export default RankLayout