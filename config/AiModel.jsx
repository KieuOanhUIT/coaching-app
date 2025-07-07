const { GoogleGenerativeAI } = require('@google/generative-ai');
const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-exp'
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
};

async function generateContentFromPrompt(prompt) {
    const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig
    });
    return result;
}

export { generateContentFromPrompt };

export const generateCourseAIModel = model.startChat({
    generationConfig,
    history:[

    ]
});
