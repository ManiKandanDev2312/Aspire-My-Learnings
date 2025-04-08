import { NextRequest, NextResponse } from "next/server";

export function middleware(req:NextRequest){
    console.log(`message : ${req.nextUrl.pathname}`);

    if(req.nextUrl.pathname.startsWith("/api/protected")){
        return NextResponse.json({error:"unauthorized user"}, {status: 401});
    }

    return NextResponse.next();
}

export const config = {
    matcher:["/api/:path*"]
}