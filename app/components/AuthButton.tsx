"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton(){
    const {data:session,status} = useSession();

    if(status === "loading")
        return <p>Loading...................</p>

    return(
        <div>
            {session?(
                <div>
                    <p>Welcome, {session.user?.name}</p>
                    <button onClick={()=>signOut()}>sign out</button>
                </div>
            ):(
                <button onClick={()=>signIn()}>sign In</button>
            )}
        </div>
    )

}