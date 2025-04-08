
type Post = {
    id: number,
    title: string
}

export default async function SSRPage(){
    const randomId = Math.floor(Math.random()*100)+1;
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${randomId}`,{
        cache: "no-store"
    })

    if(!res.ok){
        throw new Error("Failed to post request");
    }

    const post:Post = await res.json();

    return (
        <div>
            <h1>Example for SSR Rendering</h1>
            <p>Id : {post.id}</p>
            <p>title: {post.title}</p>
        </div>
    )
}