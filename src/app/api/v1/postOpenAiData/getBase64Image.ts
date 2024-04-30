import fs from "fs";

export function getBase64Image(imagePath: string): string {
  if (!fs.existsSync(imagePath)) {
    throw new Error('File not found');
  }
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = imageBuffer.toString("base64");
  return base64Image
}
