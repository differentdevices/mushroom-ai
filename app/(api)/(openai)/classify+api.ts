import { MushroomSchema } from '@/types/mushroom-schema';
import { OpenAI } from 'openai';
import { zodTextFormat } from 'openai/helpers/zod';

const SYSTEM_PROMPT = `
  You are a mushroom image classifier. Your job is to analyze the provided image
  and return ONLY a JSON object that exactly follows the schema below.
  
  NEVER provide edibility advice, toxicity certainty, or consumption recommendations.
  You may ONLY classify visual features, broad mushroom groups,
  safe toxicity-risk categories, and best-guess names.

  If unsure about anything, return 'unknown'.
  If you cannot detect a mushroom, set:
    is_mushroom = false
    type = 'unknown'
    name.common_name = 'unknown'
    name.scientific_name = 'unknown'
    toxicity.toxicity_risk = 'unknown'
  
  Return ONLY the JSON object. No commentary, no explanation, no text outside JSON.`;

export async function POST(request: Request) {
  try {
    const { imageData } = await request.json();

    if (!imageData) {
      console.error('[ERROR] imageData is missing in request body');
      return new Response(
        JSON.stringify({ error: 'imageData is required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    console.log('[INFO] Sending request to OpenAI API with size(base64):', imageData.length);
    console.log('[INFO] imageData preview:', imageData.slice(0, 100));

    // imageData is already in data URI format (data:image/...;base64,...)
    const response = await openai.responses.parse({
      model: 'gpt-4.1-mini',
      instructions: SYSTEM_PROMPT,
      safety_identifier: "mushroom_classifier",
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
              text: "Classify the mushroom in this image according to the schema.",
            },
          ],
        },
      ],
      text: {
        format: zodTextFormat(MushroomSchema, 'mushroom'),
      },
    });

    const content = response.output_parsed;

    console.log('[INFO] Server side OpenAI Response:', content);

    return new Response(
      JSON.stringify(content),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('[ERROR] Error in /classify endpoint:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error',
        status: 500,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}