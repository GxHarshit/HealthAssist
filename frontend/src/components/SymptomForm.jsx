import { useState } from "react";
import { Send, Loader2 } from "lucide-react";

const SymptomForm = ({ onSubmit, isLoading }) => {
  const [symptoms, setSymptoms] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (symptoms.trim()) {
      onSubmit(symptoms);
    }
  };
  
  const exampleSymptoms = [
    "Persistent headache with sensitivity to light for the past 3 days",
    "Chest pain that worsens when I take deep breaths",
    "Joint pain in my knees with swelling after physical activity",
    "Recurring stomach pain after meals with occasional nausea"
  ];
  
  const handleExampleClick = (example) => {
    setSymptoms(example);
  };
  
  return (
    <div className="w-full bg-white/80 backdrop-blur-lg border border-gray-200  p-5 rounded-xl shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label 
            htmlFor="symptoms" 
            className="text-sm font-medium text-gray-700 "
          >
            Describe your symptoms in detail
          </label>
          <textarea 
            id="symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Example: I've been experiencing a persistent headache on the right side of my head for the past 3 days, along with mild nausea in the morning..."
            className="min-h-[120px] resize-none focus:ring-2 focus:ring-blue-500/50 bg-white border border-gray-200 rounded-md p-2 w-full"
            required
          />
        </div>
        
        {/* Example symptoms */}
        <div className="space-y-2">
          <p className="text-xs text-gray-500">
            Examples you can try:
          </p>
          <div className="flex flex-wrap gap-2">
            {exampleSymptoms.map((example, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleExampleClick(example)}
                className="text-xs bg-gray-100  text-gray-700  px-3 py-1.5 rounded-full hover:bg-gray-200  transition-colors"
              >
                {example.length > 40 ? `${example.substring(0, 40)}...` : example}
              </button>
            ))}
          </div>
        </div>
        
        <div className="pt-2 flex justify-end">
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-5 h-auto transition-all flex items-center"
            disabled={isLoading || !symptoms.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                Analyzing...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" /> 
                Analyze Symptoms
              </>
            )}
          </button>
        </div>
        
        <p className="text-xs text-gray-500  text-center pt-2">
          Note: This is not a medical diagnosis. Always consult with a healthcare professional.
        </p>
      </form>
    </div>
  );
};

export default SymptomForm;