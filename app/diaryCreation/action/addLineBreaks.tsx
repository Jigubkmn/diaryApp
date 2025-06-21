// 18文字ごとに改行を挿入する関数
// const addLineBreaks = (text: string, maxLength: number = 18) => {
//   const words = text.split('');
//   const lines = [];
//   let currentLine = '';
  
//   for (let i = 0; i < words.length; i++) {
//     currentLine += words[i];
//     if (currentLine.length >= maxLength && i < words.length - 1) {
//       lines.push(currentLine);
//       currentLine = '';
//     }
//   }
//   if (currentLine.length > 0) {
//     lines.push(currentLine);
//   }
//   return lines.join('\n');
// // };
// const diaryText = "今日は上司の佐藤さんに褒められて嬉しい1日だった。何を褒められ．．．";
// const formattedText = addLineBreaks(diaryText, 18);