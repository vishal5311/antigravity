
const fetch = require('node-fetch');

async function testApi() {
    try {
        const response = await fetch('http://localhost:3000/api/session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar_id: '9f1a6aed-99fc-4fb5-a3f4-8206c2d8d194',
                prompt: 'Hello',
                voice: 'professional',
                language: 'en'
            })
        });

        const data = await response.json();
        console.log('Response Status:', response.status);
        console.log('Response Data:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error testing API:', error);
    }
}

testApi();
