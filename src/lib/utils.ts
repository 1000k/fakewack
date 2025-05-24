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
