import type { NextApiRequest, NextApiResponse } from "next";
import { analyzeImage } from "./service";
import { getBase64Image } from "./getBase64Image";
import path from "path";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
<<<<<<< HEAD
    console.log("POST受け取りました");
=======
>>>>>>> 4cfb1ed70fd676eb305a8db429d7f2a4b96e8ca0
    const imagePath = path.join(process.cwd(), "public", "image.jpg");
    const base64Image = getBase64Image(imagePath);

    // 固定のpromptを使用
    const prompt = "この画像から物理学の問題を考えてください";

    const result = await analyzeImage(prompt, base64Image);
<<<<<<< HEAD
    console.log("result", result);
=======
>>>>>>> 4cfb1ed70fd676eb305a8db429d7f2a4b96e8ca0
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error analyzing image:", error);
    return new Response(JSON.stringify({ message: "Error analyzing image" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
