import React from 'react';

/**
 * 改行コードで分割してReactノードの配列を返す
 */
export function formatWithLineBreaks(text: string): React.ReactNode[] {
  if (!text) return [];

  const lines = text.split('\n');
  const result: React.ReactNode[] = [];

  for (let i = 0; i < lines.length; i++) {
    result.push(lines[i]);
    if (i < lines.length - 1) {
      result.push(React.createElement('br', { key: i }));
    }
  }

  return result;
}

// 相対時間を日本語で表示する関数
export const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'たった今';

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}分前`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}時間前`;

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}日前`;
};
