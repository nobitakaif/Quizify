"use client"
import { HeroSection } from "@/components/home";
import { useRouter } from "next/navigation";

export default function Home(){

    const router = useRouter()
    const RedirectMCQ = ()=>{
        router.push('/mcq')
    }
    const RedirectQnA = () =>{
        router.push("/question")
    }
    // return <div className="h-screen w-full flex justify-center items-center border">
    //     <div className="border-solid p-4 h-44 w-44  flex flex-col gap-3 justify-center">
    //         <Button className="cursor-pointer" onClick={RedirectMCQ}>MCQ</Button>
    //         <Button className="cursor-pointer" onClick={RedirectQnA}>QnA</Button>
    //     </div>
    // </div>
    return <div>
        <HeroSection/>
    </div>
}