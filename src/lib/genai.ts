'use server';

import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not set');
}

const ai = new GoogleGenAI({ apiKey });
const defaultInstruction =
  'プロンプトを、次のような性格の人物になったつもりで書き直してください。なお、本文だけを生成してください。「あなたは典型的なSNSの住人。30代の男性。自己愛に満ち、自然に自慢を吐く。コメントをキラキラに盛りまくる。」';

export async function generateContent(prompt: string): Promise<string> {
  if (!prompt?.trim()) {
    throw new Error('プロンプトを入力してください');
  }

  try {
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL_TEXT ?? 'gemini-2.5-flash-preview-05-20',
      contents: prompt,
      config: {
        systemInstruction: defaultInstruction,
      },
    });

    if (!response?.text) {
      throw new Error('AIからの応答が無効です');
    }

    return response.text;
  } catch (error) {
    console.error('Error generating content:', error);
    throw new Error('コンテンツの生成中にエラーが発生しました');
  }
}

export async function generateImage(prompt: string): Promise<string> {
  if (!prompt?.trim()) {
    throw new Error('プロンプトを入力してください');
  }

  const detailPrompt = `no text, no character in image: ${prompt}`;

  console.log(detailPrompt);

  try {
    const response = await ai.models.generateContent({
      model:
        process.env.GEMINI_MODEL_IMAGE ??
        'gemini-2.0-flash-preview-image-generation',
      contents: detailPrompt,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });
    console.log(response);

    const parts = response?.candidates?.[0]?.content?.parts;

    if (!parts || parts.length === 0) {
      throw new Error('Image generation failed');
    }

    for (const part of parts) {
      if (part.text) {
        console.log(part.text);
      } else if (part.inlineData) {
        const imageData = part.inlineData.data;

        if (!imageData) {
          throw new Error('Image data is empty');
        }

        const buffer = Buffer.from(imageData, 'base64');
        const filename = `gen-${uuidv4()}.png`;
        const targetDirectory = path.join(process.cwd(), 'public', 'gen');
        const fullPath = path.join(targetDirectory, filename);

        if (!fs.existsSync(targetDirectory)) {
          fs.mkdirSync(targetDirectory, { recursive: true });
        }

        fs.writeFileSync(fullPath, buffer);
        console.log(`Image saved as "${fullPath}"`);

        return filename;
      }
    }
    throw new Error('画像が生成されませんでした');
  } catch (error) {
    throw new Error('Error generating image:' + error);
  }
}
