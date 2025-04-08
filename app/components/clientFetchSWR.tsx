"use client";
import useSWR from "swr";

const fetcher = (url:string)=>fetch(url).then((res)=> res.json());

export default function clientFetcherSWR(){
    const {data,error,isLoading} = useSWR("https://dummyjson.com/posts", fetcher);

    if(isLoading)
        return <p>Loading......</p>;
    if(error)
        return <p>Error......</p>
    return(
        <div>
            {data.posts.slice(0,5).map((post:{id:number,title:string})=>{
               return <p key={post.id}>{post.title}</p>
            })}
        </div>
    )

}