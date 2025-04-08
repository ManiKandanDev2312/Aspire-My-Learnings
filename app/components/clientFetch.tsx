"use client"
import { useEffect, useState } from "react";

type post = {
    id:number,
    title:string
}

export default function clientFetch(){
    const [posts,setposts] = useState<post[]>([]);
    const [loading,setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        fetch("https://dummyjson.com/posts").then((res)=>{
            if(!res.ok)
                throw new Error("failed to fetch")
            return res.json()
        }
    ).then((data)=>{
        setposts(data.posts.slice(0,5));
        setLoading(false);
    }).catch((error)=>{
        setError(error);
        setLoading(false);
    })

})

if(loading)
    return(
     <p>Loading....</p>
    )
if(error)
    return(
<p>error: {error}</p>
    )
if(posts)
    return(
<div>
{posts.map((post) => {
    return <p key={post.id}>{post.title}</p>;
})}
</div>
)
}