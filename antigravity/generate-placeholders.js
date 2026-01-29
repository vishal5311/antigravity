const fs = require('fs');
const path = require('path');

const agents = [
    { name: 'laura', color: '#ec4899', initial: 'L' },
    { name: 'michael', color: '#8b5cf6', initial: 'M' },
    { name: 'fjolla', color: '#06b6d4', initial: 'F' },
    { name: 'nelly', color: '#f59e0b', initial: 'N' },
    { name: 'zaid', color: '#10b981', initial: 'Z' },
    { name: 'ege', color: '#3b82f6', initial: 'E' },
    { name: 'awais', color: '#6366f1', initial: 'A' }
];

const avatarsDir = path.join(__dirname, 'public', 'avatars');

// Create avatars directory if it doesn't exist
if (!fs.existsSync(avatarsDir)) {
    fs.mkdirSync(avatarsDir, { recursive: true });
}

agents.forEach(agent => {
    const svg = `<svg width="600" height="800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad-${agent.name}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${agent.color};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${agent.color}dd;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="600" height="800" fill="url(#grad-${agent.name})"/>
  <circle cx="300" cy="350" r="120" fill="rgba(255,255,255,0.2)"/>
  <text x="300" y="400" font-family="Arial, sans-serif" font-size="120" font-weight="bold" fill="white" text-anchor="middle">${agent.initial}</text>
  <text x="300" y="650" font-family="Arial, sans-serif" font-size="32" fill="rgba(255,255,255,0.9)" text-anchor="middle">${agent.name.charAt(0).toUpperCase() + agent.name.slice(1)}</text>
</svg>`;

    const filePath = path.join(avatarsDir, `${agent.name}.jpg`);
    fs.writeFileSync(filePath, svg);
    console.log(`Created placeholder for ${agent.name}`);
});

console.log('All placeholder avatars created!');
