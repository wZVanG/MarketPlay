import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';

// Inicializar OpenAI en el servidor
const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
    try {
        const { imageUrl } = await req.json();

        if (!imageUrl) {
            return Response.json(
                { error: 'Image URL is required' },
                { status: 400 }
            );
        }

        const result = await generateText({
            model: openai('gpt-4o'),
            messages: [
                {
                    role: 'user',
                    content: [
                        {
                            type: 'text',
                            text: `
                Genere un título de producto de dos palabras y una descripción de cinco palabras para esta imagen. 
                Responda en formato JSON con los campos "title" y "description".
              `.trim()
                        },
                        {
                            type: 'image',
                            image: imageUrl,
                            experimental_providerMetadata: {
                                openai: { imageDetail: 'low' },
                            },
                        },
                    ],
                },
            ],
        });

        if (!result || !result.text) {
            return Response.json(
                { error: 'Failed to analyze image' },
                { status: 500 }
            );
        }

        try {
            const jsonString = result.text.replace(/```json\n|\n```/g, '');
            const jsonObject = JSON.parse(jsonString);

            return Response.json(jsonObject);
        } catch (e) {
            console.error("Error parsing JSON:", e);
            return Response.json(
                { error: 'Failed to parse analysis result' },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error("Server error:", error);
        return Response.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}