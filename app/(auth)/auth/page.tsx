"use client"
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion"


export default function Auth(){
    return <div className="flex h-screen flex-col gap-3 justify-center items-center">
        <div className="font-bold text-2xl">
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
            >
                Please Log-in Before Go-head
            </motion.p>
        </div>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
        >
            <SignedOut >
                <Button className="cursor-pointer px-8" asChild><SignInButton mode="modal"/></Button>
            </SignedOut>
            <SignedIn>
                <UserButton/>
            </SignedIn>
        </motion.div>
    </div>
}