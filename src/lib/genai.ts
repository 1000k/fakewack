'use server';

import {GoogleGenAI} from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not set');
}

const ai = new GoogleGenAI({apiKey});

export async function generateContent(prompt: string): Promise<string> {
  'use server';
  
  if (!prompt?.trim()) {
    throw new Error('プロンプトを入力してください');
  }

  try {
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL_TEXT ?? 'gemini-2.5-flash-preview-05-20',
      contents: prompt,
      config: {
        systemInstruction: 'プロンプトを、次のような性格の人物になったつもりで書き直してください。なお、冒頭の挨拶や前置きは不要です。「典型的なSNSの住人。自己愛に満ち、自然に自慢を吐く。コメントをキラキラに盛りまくる。」',
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