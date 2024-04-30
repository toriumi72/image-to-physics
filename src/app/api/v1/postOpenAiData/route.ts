// import type { NextApiRequest, NextApiResponse } from "next";
// import { analyzeImage } from "./service";
// import { getBase64Image } from "./getBase64Image";
// import path from "path";

// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     console.log("POST受け取りました");
//     const imagePath = path.join(process.cwd(), "public", "image.jpg");
//     const base64Image = getBase64Image(imagePath);

//     // 固定のpromptを使用
//     const prompt = "title,PhysicsIssue,step1,step2,step3,Answer,Explanationをそれぞれキーとし、キーとバリューはそれぞれダブルクォートで囲んで返してください。{}バリューは日本語でそれ以外の余計な返答は返さないでください。また、PhysicsIssueは問題なので、初期条件なども記載して、問題として成り立つようにしてください。";

//     const result = await analyzeImage(prompt, base64Image);
//     console.log("result", result);
//     return new Response(JSON.stringify(result), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     })
//   } catch (error) {
//     console.error("Error analyzing image:", error);
//     return new Response(JSON.stringify({ message: "Error analyzing image" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     })
//   }
// }


import { NextRequest, NextResponse } from 'next/server';
import { analyzeImage } from './service';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  console.log("POST受け取りました");

  const formData = await request.formData();
  const file = formData.get('image') as File;

  if (!file) {
    return NextResponse.json({ error: 'No image file found' }, { status: 400 });
  }

  const imageBuffer = await file.arrayBuffer();
  const base64Image = Buffer.from(imageBuffer).toString('base64');

  const prompt = "title,PhysicsIssue,step1,step2,step3,Answer,Explanationをそれぞれキーとし、キーとバリューはそれぞれダブルクォートで囲んで返してください。{}は入りません。バリューは日本語でそれ以外の余計な返答は返さないでください。";

  try {
    const result:any = await analyzeImage(prompt, base64Image);
    console.log("result", result);

    // OpenAIから受け取ったテキストをJSON形式に変換
    const jsonResult = result.split('\n').reduce((acc:any, curr:any, index:any, array:any) => {
      const [key, value] = curr.split(':').map(item => item.trim());
      acc[key.replace(/"/g, '')] = value.replace(/^"(.*)"$/, '$1').replace(/\\\\/g, '\\');
      if (index < array.length - 1) {
        acc[key.replace(/"/g, '')] += ',';
      }
      return acc;
    }, {});

    console.log("jsonResult", jsonResult);
    return NextResponse.json(jsonResult);
  } catch (error) {
    console.error('Error analyzing image:', error);
    return NextResponse.json({ error: 'Error analyzing image' }, { status: 500 });
  }
}