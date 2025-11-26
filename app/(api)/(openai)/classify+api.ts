import { OpenAI } from 'openai';
import { zodTextFormat } from 'openai/helpers/zod';
import { z } from 'zod';

const MushroomSchema = z.object({
  name: z.string(),
  type: z.enum([
    'Edible',
    'Poisonous',
  ]),
});

export async function POST(request: Request) {
  try {
    const { imageData } = await request.json();

    if (!imageData) {
      return new Response(
        JSON.stringify({ error: 'imageData is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    console.log('Sending request to OpenAI API with image', imageData.length);
    console.log('imageData preview:', imageData.slice(0, 100));

    // imageData is already in data URI format (data:image/...;base64,...)
    const response = await openai.responses.parse({
      model: 'gpt-4.1-mini',
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_image",
              image_url: imageData,
              detail: "auto",
            },
            {
              type: "input_text",
              text: "You will be provided with an image of a mushroom. Identify the mushroom and classify it as either Edible or Poisonous. Respond with just the mushroom name and type.",
            },
          ],
        },
      ],
      text: {
        format: zodTextFormat(MushroomSchema, 'mushroom'),
      },
    });

    const content = response.output_parsed;
    console.log('Server side OpenAI Response:', content);

    return new Response(JSON.stringify(content), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error in classify endpoint:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error',
        status: 500,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}