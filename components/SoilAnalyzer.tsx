
import React, { useState } from 'react';
import ImageUploader from './ImageUploader';
import Loader from './Loader';
import { analyzeSoilImage } from '../services/geminiService';
import type { SoilAnalysisResult } from '../types';
import { LeafIcon } from './icons/LeafIcon';

const SoilAnalyzer: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SoilAnalysisResult | null>(null);

  const handleImageSelect = (file: File) => {
    setResult(null);
    setError(null);
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!imageFile) {
      setError("Please select an image first.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const analysisResult = await analyzeSoilImage(imageFile);
      setResult(analysisResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-brand-dark-green mb-2">Soil Analysis</h2>
      <p className="text-lg text-stone-600 mb-6">Upload an image of your soil to get an AI-powered analysis and crop recommendations.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col items-center">
          <ImageUploader onImageSelect={handleImageSelect} imagePreviewUrl={imagePreview} />
          <button
            onClick={handleAnalyze}
            disabled={!imageFile || isLoading}
            className="mt-6 w-full bg-brand-green text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-brand-dark-green transition-colors duration-300 disabled:bg-stone-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? <Loader /> : <LeafIcon className="w-5 h-5" />}
            {isLoading ? "Analyzing..." : "Analyze Soil"}
          </button>
          {error && <p className="mt-4 text-red-600 bg-red-100 p-3 rounded-md w-full text-center">{error}</p>}
        </div>

        <div>
          {isLoading && !result && (
             <div className="flex flex-col items-center justify-center text-center p-8 bg-brand-light rounded-lg h-full">
              <Loader />
              <p className="mt-4 text-lg text-brand-dark-green font-semibold">Analyzing soil sample...</p>
              <p className="text-stone-500">This may take a moment.</p>
            </div>
          )}

          {result && (
            <div className="bg-brand-light p-6 rounded-lg shadow-inner animate-fade-in">
              <h3 className="text-2xl font-bold text-brand-dark-green border-b-2 border-brand-green pb-2 mb-4">Analysis Results</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-stone-500 uppercase tracking-wider">Soil Type</h4>
                  <p className="text-xl text-brand-brown font-bold">{result.soilType}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-stone-500 uppercase tracking-wider">Estimated PH Level</h4>
                  <p className="text-xl text-brand-brown font-bold">{result.estimatedPh.toFixed(1)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-stone-500 uppercase tracking-wider">Description</h4>
                  <p className="text-stone-700">{result.description}</p>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-brand-dark-green mt-6 mb-2">Suggested Crops</h4>
                  <ul className="space-y-3">
                    {result.suggestedCrops.map((crop, index) => (
                      <li key={index} className="bg-white p-4 rounded-md shadow">
                        <p className="font-bold text-brand-green">{crop.name}</p>
                        <p className="text-sm text-stone-600">{crop.reason}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SoilAnalyzer;
