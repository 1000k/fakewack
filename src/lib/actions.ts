'use server';

import { generateContent, generateImage } from '@/lib/genai';
import prisma from '@/lib/prisma';
import { put } from '@vercel/blob';

export async function createPost(
  content: string,
  userId: string
): Promise<boolean> {
  try {
    // AIでコンテンツを生成
    const aiGeneratedContent = await generateContent(content);

    if (!aiGeneratedContent) {
      throw new Error('AIによるコンテンツの生成に失敗しました');
    }

    const aiGeneratedImage = await generateImage(content);

    if (!aiGeneratedImage) {
      throw new Error('AIによる画像の生成に失敗しました');
    }

    // Vercel Blob にアップロードし、URLを取得
    const blob = await put(aiGeneratedImage, aiGeneratedImage, {
      access: 'public',
      addRandomSuffix: true,
    });

    console.log(blob);

    // データベースに投稿を作成
    const post = await prisma.post.create({
      data: {
        content: aiGeneratedContent.toString(),
        image: blob.url,
        userId: userId,
      },
    });

    console.log(post);

    return true;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}
