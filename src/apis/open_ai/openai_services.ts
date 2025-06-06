import { OpenAI } from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { logger } from '../../utils/logger.ts';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error('OpenAI API key is missing');
}

const openai = new OpenAI({
    apiKey: apiKey,
});


// Sends prompt to OpenAI API. Receives a zod object.
export const messageOpenAI = async(prompt, zodFormat) => {
    try {
        const completion = await openai.beta.chat.completions.parse({
            model: "gpt-4o-mini-2024-07-18",
            messages: [
                { role: "user", content: prompt }
            ],
            response_format: zodResponseFormat(zodFormat, "response")
        });

        const response = completion.choices[0].message;

        if (response.parsed) {
            return response.parsed;
        } else if (response.refusal) {
            throw new Error('OpenAI said it no no wanna :/');
        }
        logger.info(`Response: ${response.parsed}`);
    } catch (error) {
        console.error(`OpenAI API call error: ${error.message}`);
          // Handle edge cases
        if (error.constructor.name === "LengthFinishReasonError") {
            console.error("Too many tokens: ", error.message);
        } else {
            // Handle other exceptions
            console.error("OpenAI API call error: ", error.message);
        }
    }
}