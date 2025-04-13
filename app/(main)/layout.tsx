import { ModeToggle } from "@/components/ui/ModeToggle";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { checkIsRoutePPREnabled } from "next/dist/server/lib/experimental/ppr";
import { ReactNode } from "react";


export default function MainLayout({children}:{children:ReactNode}){
    return <div suppressContentEditableWarning>
        <div className="flex mt-8 w-[25%] justify-between items-center px-8">
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