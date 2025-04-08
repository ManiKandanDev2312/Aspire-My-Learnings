import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";


export const authOptions:AuthOptions = {
       providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                username:{label:"username",type:"text"},
                password:{label:"password",type:"password"}
            },
            async authorize(credentials){
                if(!credentials?.username || !credentials?.password)
                    throw new Error("credentials are missing");

                const user = {id: "1", username: "manikandan", mailId: "manidhanush2001@gmail.com"};

                if(credentials?.username === "manikandan" && credentials?.password === "password")
                    return user;

                throw new Error("Invalid credentials");
            }
        })
    ],
    secret : process.env.NEXTAUTH_SECRET,
    session:{strategy:"jwt"}
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };