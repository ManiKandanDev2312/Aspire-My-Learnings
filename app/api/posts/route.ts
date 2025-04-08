import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server"

const prisma = new PrismaClient();

export async function GET(){
    try{
        const hotelDetails = await prisma.hotel.findMany();

        return NextResponse.json(hotelDetails);
    }catch(error){
        return NextResponse.json({error:"failed to fetch hotel Details"},{status:500});
    }
}