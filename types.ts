
export interface SoilAnalysisResult {
  soilType: string;
  estimatedPh: number;
  description: string;
  suggestedCrops: {
    name: string;
    reason: string;
  }[];
}

export interface PestAnalysisResult {
  pestName: string;
  damageDescription: string;
  isHarmful: boolean;
  controlMethods: {
    method: string;
    description: string;
  }[];
}
