'use client'
import Navbar from "@/components/Navbar";
import Checkout from "./(section)/Checkout";
import Image from "next/image";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

const page = ({ }) => {
    return (
        <main className="relative flex flex-col h-full w-full">
            <div className="w-full hidden md:block">
                <Navbar />
            </div>
            <div className="w-full bg-black h-[10vh] flex justify-center items-center md:hidden">
                <div className="w-[38%] h-full flex justify-start items-center px-3">
                    <Link href='/cart'>
                        <MoveLeft />
                    </Link>
                </div>
                <div className="w-[62%] flex items-center justify-start">
                    <Link href="/">
                        <Image
                            src="/images/logo.png"
                            width={177}
                            height={101}
                            alt="logo "
                            className="w-20 md:w-32 md:mt-1"
                        />
                    </Link>
                </div>
            </div>
            <div className="flex h-full w-full flex-col items-center justify-center">
                <Checkout />
            </div>
        </main >
    );
};

export default page;
