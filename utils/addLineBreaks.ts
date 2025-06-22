// 指定した文字数ごとに改行を挿入する関数
export const addLineBreaks = (text: string, maxLength: number = 18) => {
  const words = text.split('');
  const lines = [];
  let currentLine = '';

  for (let i = 0; i < words.length; i++) {
    currentLine += words[i];
    if (currentLine.length >= maxLength && i < words.length - 1) {
      lines.push(currentLine);
      currentLine = '';
    }
  }

  if (currentLine.length > 0) {
    lines.push(currentLine);
  }

  return lines.join('\n');
};