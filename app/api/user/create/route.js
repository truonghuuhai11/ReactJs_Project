// /api/user/create/route.js
import connectDB from "@/config/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { userId } = getAuth(request);
        const body = await request.json();

        await connectDB();

        const existingUser = await User.findById(userId);
        if (existingUser) {
            return NextResponse.json({ success: true, message: "User already exists" });
        }

        const newUser = new User({
            _id: userId,
            name: body.name,
            email: body.email,
            imageUrl: body.imageUrl,
            cartItems: {},
        });

        await newUser.save();

        return NextResponse.json({ success: true, user: newUser });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}