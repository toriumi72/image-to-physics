import fs from "fs";
import path from "path";

export function getBase64Image(imagePath: string): string {
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = imageBuffer.toString("base64");
  return base64Image;
}
