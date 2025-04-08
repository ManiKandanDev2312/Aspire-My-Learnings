type blog = {
    id:number,
    title:string
}

export default async function BlogPage(){
    const res = await fetch(`https://dummyjson.com/posts?-limit=5`,{
        next:{revalidate:10}
    })
    
    if(!res.ok)
        throw new Error("failed to retrieve blogs");

    const data = await res.json();

    const blog:blog[] = data.posts;

    return(
        <div>
            {blog.map((post)=>(
                <p key={post.id}>{post.title}</p>
            ))}
        </div>
    )
}