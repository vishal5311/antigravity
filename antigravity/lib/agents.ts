export interface Agent {
    id: string;
    avatar_key: string;
    name: string;
    role: string;
    prompt: string;
    voice: string;
    language: string;
    image: string;
}

export const AGENTS: Agent[] = [
    {
        id: "jerome-medical",
        name: "Jerome Medical",
        avatar_key: "78fbef1c-47e4-4714-818d-200899f88b05",
        role: "Healthcare Expert",
        prompt: "I am your healthcare research analyst, dedicated to providing accurate medical insights and data analysis.",
        voice: "professional",
        language: "en",
        image: "/avatars/jerome-medical.jpg"
    },
    {
        id: "jerome-business",
        name: "Jerome Business",
        avatar_key: "2ad646ef-68dc-4296-a71c-29fc0b195832",
        role: "Business Strategist",
        prompt: "I am your corporate success partner, focused on driving growth and excellence in your business ventures.",
        voice: "authoritative",
        language: "en",
        image: "/avatars/jerome-business.jpg"
    },
    {
        id: "yuruo-office",
        name: "Yuruo Office",
        avatar_key: "eb31e831-52f0-4310-840e-ba7164d06afe",
        role: "Product Genius",
        prompt: "I am your technical product specialist, here to help you navigate complex product features and implementations.",
        voice: "friendly",
        language: "en",
        image: "/avatars/yuruo-office.jpg"
    },
    {
        id: "maya",
        name: "Maya",
        avatar_key: "f5ef2561-0eee-4567-88ab-25f4e831f0dc",
        role: "Digital Assistant",
        prompt: "I am Maya, your helpful digital assistant.",
        voice: "friendly",
        language: "en",
        image: "/avatars/nelly.jpg" // Using placeholder
    },
    {
        id: "saranya",
        name: "Saranya",
        avatar_key: "a40e20cd-7dfa-4c56-b4e9-b19f0905ca20",
        role: "Creative Guide",
        prompt: "I am Saranya, here to guide your creative process.",
        voice: "friendly",
        language: "en",
        image: "/avatars/yuruo-office.jpg" // Using placeholder
    },
    {
        id: "tanya",
        name: "Tanya",
        avatar_key: "3e1096bd-f11c-41ea-a0bb-a809a6892004",
        role: "Support Specialist",
        prompt: "I am Tanya, ready to assist with any support needs.",
        voice: "professional",
        language: "en",
        image: "/avatars/jerome-office.jpg" // Using placeholder
    }
];

export function getAgentById(id: string): Agent | undefined {
    return AGENTS.find(agent => agent.id === id);
}
