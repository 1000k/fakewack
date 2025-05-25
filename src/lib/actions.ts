'use server';

import { generateContent, generateImage } from '@/lib/genai';
import prisma from '@/lib/prisma';

export async function createPost(content: string, userId: string) {
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

    // データベースに投稿を作成
    const post = await prisma.post.create({
      data: {
        content: aiGeneratedContent.toString(),
        image: aiGeneratedImage,
        userId: userId,
      },
    });

    console.log(post);

    return { success: true, post };
  } catch (error) {
    console.error('Error creating post:', error);
    return { success: false, error: '投稿の作成中にエラーが発生しました' };
  }
}
