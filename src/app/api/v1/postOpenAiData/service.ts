import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function analyzeImage(prompt: string, base64Image: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "system",
        content: "画像から簡単な物理現象を想像し、高校レベルの物理の問題を作成してください。その画像に関連性のあるユーモアなタイトル、問題にしてください。",
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: prompt,
          },
          {
            type: "image_url",
            image_url: {
              url: `data:image/jpeg;base64,${base64Image}`,
            },
          },
        ],
      },
    ],
    max_tokens: 1200,
  });

  if (response && response.choices && response.choices[0] && response.choices[0].message) {
    return response.choices[0].message.content;
  } else {
    throw new Error("Unexpected API response structure");
  }
}

// return response.choices[0].message.content;