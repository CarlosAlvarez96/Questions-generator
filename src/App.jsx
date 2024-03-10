import { useState } from "react";
import { Groq } from "groq-sdk";
import ReactMarkdown from "react-markdown";
import "./App.css";

function App() {
  const groq = new Groq({
    apiKey: "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",
    dangerouslyAllowBrowser: true,
  });

  const [textPrompt, setTextPrompt] = useState("");
  const [response, setResponse] = useState("");

  async function main() {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Realiza 5 preguntas con sus respuestas. Formatealas con markdown para que se vean claramente. Hazlas sobre el siguiente texto: ${textPrompt}. `,
        },
      ],
      model: "mixtral-8x7b-32768",
    });
    setResponse(completion.choices[0]?.message?.content || "");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await main();
  };

  const handleChange = (event) => {
    setTextPrompt(event.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
      <h1 className="text-4xl m-10 font-bold text-gray-100 tracking-tight">
        Generate questions and answers 💬{" "}
      </h1>
      <form
        className="flex flex-col text-2xl mx-auto max-w-md w-full text-gray-300"
        onSubmit={handleSubmit}
      >
        <label className="mx-auto mb-2" htmlFor="field">
          Introduce your text{" "}
        </label>
        <input
          onChange={handleChange}
          className="border border-gray-700 bg-gray-800 rounded-md mb-4 resize-none w-full p-4"
          id="field"
        />
        <button className="border border-gray-700 bg-gray-800 hover:bg-gray-700 rounded p-2 w-full">
          Generate
        </button>
      </form>
      {response !== null && response.length > 0 && (
        <div className="m-4 p-4 w-3/4 bg-gray-800 rounded-md">
          <ReactMarkdown className="text-justify m-4 text-xl">
            {response}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default App;
