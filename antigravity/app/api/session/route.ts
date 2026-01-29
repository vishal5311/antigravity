import { NextRequest, NextResponse } from "next/server";
import { createBeyondPresenceSession } from "@/lib/beyondpresence";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const session = await createBeyondPresenceSession(body);
        return NextResponse.json(session);
    } catch (error: any) {
        console.error("API Session Error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to create session" },
            { status: 500 }
        );
    }
}
