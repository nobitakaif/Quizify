import { ModeToggle } from "@/components/ui/ModeToggle";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { ReactNode } from "react";


export default function MainLayout({children}:{children:ReactNode}){
    return <div suppressContentEditableWarning>
        <div className="flex mt-8 w-[25%] justify-between items-center px-8 max-sm:w-full">
            <div>
                <SignedIn>
                    <UserButton/>
                </SignedIn>
            </div>
            <div >
               <ModeToggle />
            </div>
        </div>
        {children}
        
    </div>
}