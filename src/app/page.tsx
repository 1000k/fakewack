
import {
  GoogleGenAI,
} from '@google/genai';


export default async function Home() {

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const config = {
    responseMimeType: 'text/plain',
  };
  const model = 'gemini-2.5-flash-preview-05-20';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `次の文章を、SNS映えするキラキラ自慢文章に変換してください。「今日は1日中家でプログラミングをしていました。」`,
        },
      ],
    },
  ];

  // const response = await ai.models.generateContentStream({
  //   model,
  //   config,
  //   contents,
  // });
  // let text = '';
  // for await (const chunk of response) {
  //   console.log(chunk.text);
  //   text += chunk.text;
  // }

  return (
    <main>
      <div>Home</div>
    </main>
  );
}
