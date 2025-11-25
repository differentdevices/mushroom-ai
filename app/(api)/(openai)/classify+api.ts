import OpenAI from 'openai';

export async function POST(request: Request) {
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    console.log('Sending request to OpenAI API');

    const response = await openai.responses.create({
      model: 'gpt-4o-mini',
      input: 'Write a one-sentence bedtime story about a unicorn.'
    });

    console.log(response.output_text);

    return new Response(JSON.stringify(response), {
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