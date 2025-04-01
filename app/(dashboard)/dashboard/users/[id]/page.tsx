"use client";

import { use } from "react";

const Page = ({params}: {params: Promise<{id:string}>})=>{

    const {id} = use(params);
    return(
        <h1>user Id : {id}</h1>
    )
}

export default Page;