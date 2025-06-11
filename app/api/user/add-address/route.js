import connectDB from "@/config/db";
import Address from "@/models/address";
import { getAuth } from "@clerk/nextjs/server";


export async function POST(request) {
    try {
        
        const {userId} = getAuth()
        const {address} = await request.json()

        await connectDB()
        const newAddress = await Address.create({...address,userId}) 

        return Nextresponse.json({ success: true, mesage: "Address added successfully", newAddress })

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message});
        
    }
}