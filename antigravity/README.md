# 🚀 Antigravity - Real-Time AI Video Agents

A modern SaaS web application that lets users launch real-time video AI agents using Beyond Presence avatars.

![Antigravity](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript)

## ✨ Features

- 🎥 **Real-Time Video Calls** - Face-to-face conversations with AI agents
- 🎨 **Beautiful UI** - LemonSlice.ai inspired dark theme with glassmorphism
- 🔧 **Fully Customizable** - Edit agent prompts, voices, and languages
- 📱 **Responsive Design** - Works perfectly on all devices
- ⚡ **Zero Setup** - No authentication required, instant deployment
- 🌐 **13 Pre-configured Agents** - Ready to use for various use cases

## 🎯 Use Cases

- Customer Support
- Medical Assistance
- Business Consulting
- Education & Tutoring
- Sales & Marketing
- HR & Recruitment
- Technical Support

## 🏗️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS
- **Language**: TypeScript
- **API Integration**: Beyond Presence
- **State Management**: React Hooks + LocalStorage
- **Deployment Ready**: Vercel, Netlify, or any Node.js host

## 📁 Project Structure

```
antigravity/
├── app/
│   ├── agents/
│   │   ├── [id]/
│   │   │   ├── page.tsx          # Agent detail page
│   │   │   └── edit/
│   │   │       └── page.tsx      # Agent customization
│   │   └── page.tsx              # Agents dashboard
│   ├── api/
│   │   └── session/
│   │       └── route.ts          # Session creation API
│   ├── call/
│   │   └── page.tsx              # Live call page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles
├── components/
│   ├── AgentCard.tsx             # Agent card component
│   ├── Navbar.tsx                # Navigation bar
│   └── VideoFrame.tsx            # Video iframe wrapper
├── lib/
│   ├── agents.ts                 # Agent data & config
│   └── beyondpresence.ts         # API integration
└── public/
    └── avatars/                  # Agent avatar images
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Beyond Presence API key (get one at [Beyond Presence](https://beyondpresence.com))

### Installation

1. **Clone or navigate to the project**:
   ```bash
   cd antigravity
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your Beyond Presence API key:
   ```env
   BEYOND_PRESENCE_API_URL=https://api.beyondpresence.com/v1
   BEYOND_PRESENCE_API_KEY=your_actual_api_key_here
   ```

4. **Add agent avatar images**:
   - Place avatar images in `public/avatars/` folder
   - Images should be named according to agent IDs (e.g., `laura.jpg`, `michael.jpg`)
   - Recommended size: 600x800px (3:4 aspect ratio)

5. **Run the development server**:
   ```bash
   npm run dev
   ```

6. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Design Philosophy

The app follows the **LemonSlice.ai** design aesthetic:

- ✅ Dark theme (`bg-black`)
- ✅ Glass cards with backdrop blur
- ✅ Rounded 2xl corners
- ✅ Soft shadows and gradients
- ✅ Modern typography (Inter font)
- ✅ Minimal, clean UI
- ✅ Smooth transitions and hover effects

## 🤖 Pre-configured Agents

The app comes with 13 ready-to-use agents:

1. **Yuruo Office** - Office Assistant
2. **Yuruo Medical** - Medical Assistant
3. **Jerome Medical** - Medical Consultant
4. **Jerome Business** - Business Consultant
5. **Jerome Office** - Office Manager
6. **Nelly Office** - Office Coordinator
7. **Laura** - Customer Support
8. **Michael** - Sales Representative
9. **Fjolla** - Tutor
10. **Nelly** - HR Specialist
11. **Zaid** - Technical Support
12. **Ege** - Product Specialist
13. **Awais** - Business Analyst

## 🔧 Customization

### Adding New Agents

Edit `lib/agents.ts` and add a new agent object:

```typescript
{
  id: "agent-id",
  name: "Agent Name",
  avatar_key: "beyond_presence_avatar_key",
  role: "Agent Role",
  prompt: "System prompt for the agent...",
  voice: "professional",
  language: "en",
  image: "/avatars/agent-id.jpg"
}
```

### Modifying Agent Behavior

Users can customize agents directly from the UI:
1. Navigate to an agent's detail page
2. Click "Customize"
3. Edit system prompt, voice, and language
4. Click "Save Changes"

Settings are stored in browser's localStorage.

## 🌐 API Integration

### Beyond Presence Session Creation

The app uses the Beyond Presence API to create video sessions:

**Endpoint**: `POST /api/session`

**Request**:
```json
{
  "avatar_key": "string",
  "prompt": "string",
  "voice": "string",
  "language": "string"
}
```

**Response**:
```json
{
  "session_url": "string",
  "session_id": "string"
}
```

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Netlify

1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy the `.next` folder

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🎯 Roadmap (Phase 2)

- [ ] User authentication
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Public agent sharing
- [ ] Embed code generation
- [ ] Usage analytics
- [ ] Multi-agent workflows
- [ ] Telegram integration
- [ ] Knowledge base upload
- [ ] Voice cloning
- [ ] White label solution

## 📝 License

MIT License - feel free to use this project for your own purposes!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

**Built with ❤️ using Next.js 14 and Beyond Presence**
