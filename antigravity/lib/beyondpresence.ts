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

export async function createBeyondPresenceSession(data: CreateSessionRequest): Promise<CreateSessionResponse> {
    const API_KEY = process.env.ANAM_API_KEY || process.env.BP_API_KEY || process.env.BEYOND_PRESENCE_API_KEY;
    const API_URL = process.env.ANAM_API_URL || process.env.BEYOND_PRESENCE_API_URL || "https://api.anam.ai/v1";

    console.log(`[Session] Attempting to create session for avatar: ${data.avatar_id}`);

    if (!API_KEY) {
        console.error("[Session] Error: No API key found in environment variables.");
        throw new Error("API Key is not defined in environment variables (ANAM_API_KEY or BP_API_KEY)");
    }

    // For development/certificate issues, we can bypass strict SSL (use with caution)
    if (process.env.NODE_ENV === 'development') {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    }

    const body = {
        personaConfig: {
            avatarId: data.avatar_id,
            systemPrompt: data.prompt,
            // You can add voiceId here if you have them, otherwise it uses default
            // voiceId: data.voice 
        }
    };

    const response = await fetch(`${API_URL}/auth/session-token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`,
            "x-api-key": API_KEY, // Backwards compatibility if they use multiple headers
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Anam AI API Error Details:", errorText);
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

    const result = await response.json();

    // Anam AI returns a sessionToken. We might need to map it to a URL or just return it.
    // For now, let's return it as session_id and provide a fallback session_url if we know it.
    return {
        session_id: result.sessionToken,
        session_url: `https://anam.ai/session/${result.sessionToken}` // Guessed current URL format
    };
}
