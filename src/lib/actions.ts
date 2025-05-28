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

    // AIで画像を生成
    const aiGeneratedImage = await generateImage(content);

    if (!aiGeneratedImage) {
      throw new Error('AIによる画像の生成に失敗しました');
    }

    // 画像をVercel Blobにアップロード
    const filename = `images/${Date.now()}-${Math.random().toString(36).substring(2, 15)}.png`;
    
    // BufferをBlobに変換
    const blobData = new Blob([aiGeneratedImage.buffer], { type: aiGeneratedImage.mimeType });
    
    // Vercel Blobにアップロード
    const blob = await put(filename, blobData, {
      access: 'public',
      addRandomSuffix: true,
      contentType: aiGeneratedImage.mimeType,
    });

    console.log('Image uploaded to Vercel Blob:', blob);

    // データベースに投稿を作成
    console.log("userId: ", userId);

    const post = await prisma.post.create({
      data: {
        content: aiGeneratedContent,
        image: blob.url, // Vercel BlobのURLを保存
        userId: userId,
      },
    });

    console.log('Post created:', post);
    return true;
  } catch (error) {
    console.error('Error creating post:', error);
    throw new Error('投稿の作成中にエラーが発生しました: ' + (error as Error).message);
  }
}
