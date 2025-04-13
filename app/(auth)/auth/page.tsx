import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";

export default function Auth(){
    return <div className="flex h-screen justify-center items-center">
        <SignedOut >
            <Button className="cursor-pointer px-8" asChild><SignInButton mode="modal"/></Button>
        </SignedOut>
        <SignedIn>
            <UserButton/>
        </SignedIn>
    </div>
}