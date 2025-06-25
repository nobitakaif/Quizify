import MCQuiz from "@/components/mcq";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { SignedIn, UserButton } from "@clerk/nextjs";


export default function MCQ(){
    return <div>
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
        <MCQuiz/>
    </div>
}