
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { SoilAnalysisResult, PestAnalysisResult } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = 'gemini-2.5-flash';

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export const analyzeSoilImage = async (imageFile: File): Promise<SoilAnalysisResult> => {
  const imagePart = await fileToGenerativePart(imageFile);
  
  const prompt = "You are an expert agronomist specializing in Namibian agriculture. Analyze the provided soil image. Identify the soil type (e.g., sandy, clay, loamy), estimate its pH level, and provide a short description. Then, list at least three crops suitable for this soil type in Namibia's climate. Provide a brief justification for each crop suggestion. Respond in JSON format.";

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: { parts: [imagePart, { text: prompt }] },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            soilType: { type: Type.STRING, description: "The identified type of soil (e.g., Sandy, Loam, Clay)." },
            estimatedPh: { type: Type.NUMBER, description: "The estimated pH level of the soil." },
            description: { type: Type.STRING, description: "A brief description of the soil characteristics."},
            suggestedCrops: {
              type: Type.ARRAY,
              description: "A list of crops suitable for this soil and climate.",
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "The name of the crop." },
                  reason: { type: Type.STRING, description: "Why this crop is suitable." }
                },
                required: ["name", "reason"]
              }
            }
          },
          required: ["soilType", "estimatedPh", "description", "suggestedCrops"]
        }
      }
    });

    const resultText = response.text.trim();
    return JSON.parse(resultText) as SoilAnalysisResult;
  } catch (error) {
    console.error("Error analyzing soil image:", error);
    throw new Error("Failed to get analysis from AI. The model may be unable to process this image.");
  }
};

export const identifyPest = async (imageFile: File): Promise<PestAnalysisResult> => {
  const imagePart = await fileToGenerativePart(imageFile);
  
  const prompt = "You are an expert entomologist and pest control specialist with knowledge of Namibian agriculture. Analyze the provided image. Identify the pest, state if it is harmful to common crops, describe its potential damage, and suggest at least two effective, preferably organic or sustainable, methods to control or eliminate it. If it's not a pest, identify what it is and state it's not a pest. Respond in JSON format.";

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: { parts: [imagePart, { text: prompt }] },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            pestName: { type: Type.STRING, description: "The common name of the identified insect or pest." },
            damageDescription: { type: Type.STRING, description: "A description of the damage it causes or a note that it is harmless." },
            isHarmful: { type: Type.BOOLEAN, description: "Whether the identified subject is harmful to crops."},
            controlMethods: {
              type: Type.ARRAY,
              description: "A list of methods to control the pest. Can be empty if not a pest.",
              items: {
                type: Type.OBJECT,
                properties: {
                  method: { type: Type.STRING, description: "The name of the control method." },
                  description: { type: Type.STRING, description: "A detailed explanation of the method." }
                },
                required: ["method", "description"]
              }
            }
          },
          required: ["pestName", "damageDescription", "isHarmful", "controlMethods"]
        }
      }
    });

    const resultText = response.text.trim();
    return JSON.parse(resultText) as PestAnalysisResult;
  } catch (error) {
    console.error("Error identifying pest:", error);
    throw new Error("Failed to get analysis from AI. The model may be unable to process this image.");
  }
};
