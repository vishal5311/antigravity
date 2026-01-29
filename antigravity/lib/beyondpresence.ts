export interface CreateSessionRequest {
    avatar_id: string;
    prompt: string;
    voice?: string;
    language?: string;
}

export interface CreateSessionResponse {
    session_url: string;
    session_id: string;
}

const API_KEY = process.env.BP_API_KEY;
const API_URL = process.env.BEYOND_PRESENCE_API_URL || "https://api.beyondpresence.com/v1";

export async function createBeyondPresenceSession(data: CreateSessionRequest): Promise<CreateSessionResponse> {
    if (!API_KEY) {
        throw new Error("BP_API_KEY is not defined in environment variables");
    }

    // For development/certificate issues, we can bypass strict SSL (use with caution)
    if (process.env.NODE_ENV === 'development') {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    }

    const response = await fetch(`${API_URL}/sessions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY,
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Beyond Presence API Error Details:", errorText);
        let message = `Failed to create session: ${response.status} ${response.statusText}`;
        try {
            const parsed = JSON.parse(errorText);
            if (parsed.message) message = parsed.message;
            else if (parsed.error) message = parsed.error;
        } catch (e) {
            if (errorText) message = errorText;
        }
        throw new Error(message);
    }

    return response.json();
}
