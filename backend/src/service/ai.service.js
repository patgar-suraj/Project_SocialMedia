const  { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: "Explain how AI works in a few words",
//   });
//   console.log(response.text);
// }

// await main();

async function generateCaption(base64ImageFile){
  const contents = [
  {
    inlineData: {
      mimeType: "image/jpeg",
      data: base64ImageFile,
    },
  },
  { text: "Caption this image." },
];

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: contents,
  config: {
    systemInstruction:`
    You are an expert in generating captions for images.
    You generate single caption for the image.
    Your caption should be short and concise.
    You use hashtags and emojis in the caption.
    `
  }
});
return response.text;
}

module.exports = generateCaption