// import { useState } from "react";
// import SymptomForm from "./SymptomForm";
// import ResultsDisplay from "./ResultsDisplay";
// import { InfoIcon } from "lucide-react";

// const SymptomChecker = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [result, setResult] = useState(null);
  
//   // Mock analysis function - in a real app, this would call a backend API
//   const analyzeSymptoms = async (symptoms) => {
//     // Simulate API call
//     setIsLoading(true);
    
//     try {
//       // Simulate network request
//       await new Promise(resolve => setTimeout(resolve, 2000));
      
//       // Generate mock result based on symptoms
//       const mockResult = {
//         possibleConditions: [
//           {
//             name: "Common Cold",
//             probability: "high",
//             description: "A viral infection of the upper respiratory tract that causes inflammation of the mucous membranes in the nose and throat."
//           },
//           {
//             name: "Seasonal Allergies",
//             probability: "medium",
//             description: "An allergic response to seasonal allergens like pollen, resulting in inflammation of the nasal passages."
//           },
//           {
//             name: "Sinusitis",
//             probability: "low",
//             description: "Inflammation of the sinus cavities, often due to a viral, bacterial, or fungal infection."
//           }
//         ],
//         recommendations: [
//           "Get plenty of rest and stay hydrated",
//           "Consider over-the-counter pain relievers or decongestants if appropriate",
//           "Use a humidifier to add moisture to the air",
//           "Consult with a bluecare provider if symptoms worsen or persist beyond 10 days"
//         ],
//         urgency: "non-urgent"
//       };
      
//       setResult(mockResult);
//     } catch (error) {
//       console.error("Error analyzing symptoms:", error);
//       // In a real app, you would handle errors appropriately
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   const handleSubmit = (symptoms) => {
//     analyzeSymptoms(symptoms);
//   };

//   return (
//     <section id="symptom-checker" className="pt-24 pb-16">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-bold mb-4">Symptom Checker</h2>
//           <p className="text-gray-600  max-w-2xl mx-auto">
//             Describe your symptoms in detail to receive AI-powered insights on potential conditions.
//           </p>
//         </div>
        
//         <div className="max-w-3xl mx-auto">
//           <div className="bg-blue-50/50  border border-blue-100  rounded-lg p-4 mb-6 flex items-start gap-3">
//             <InfoIcon className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
//             <p className="text-sm text-gray-700 ">
//               The more details you provide about your symptoms, their duration, severity, and any factors that worsen or improve them, the more accurate our analysis can be.
//             </p>
//           </div>
          
//           <SymptomForm onSubmit={handleSubmit} isLoading={isLoading} />
          
//           {result && <ResultsDisplay result={result} />}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SymptomChecker;

import { useState } from "react";
import axios from '../config/axios';
import SymptomForm from "./SymptomForm";
import ResultsDisplay from "./ResultsDisplay";
import { InfoIcon, AlertCircle } from "lucide-react";

const SymptomChecker = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Function to analyze symptoms using API
  const analyzeSymptoms = async (symptoms) => {
    setIsLoading(true);
    setError(null);
    
    try {
       // Make GET request with symptoms as prompt parameter
       const response = await axios.get("/ai/get-result", { 
        params: { 
          prompt: symptoms 
        }
      });
      // Set the result from the API response
      setResult(response.data);
    } catch (error) {
      console.error("Error analyzing symptoms:", error);
      setError("Unable to analyze symptoms. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (symptoms) => {
    analyzeSymptoms(symptoms);
  };

  return (
    <section id="symptom-checker" className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Symptom Checker</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Describe your symptoms in detail to receive AI-powered insights on potential conditions.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 mb-6 flex items-start gap-3">
            <InfoIcon className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
            <p className="text-sm text-gray-700">
              The more details you provide about your symptoms, their duration, severity, and any factors that worsen or improve them, the more accurate our analysis can be.
            </p>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 shrink-0" />
              <p className="text-sm text-gray-700">{error}</p>
            </div>
          )}
          
          <SymptomForm onSubmit={handleSubmit} isLoading={isLoading} />
          
          
          {result && <ResultsDisplay result={result} />}
        </div>
      </div>
    </section>
  );
};

export default SymptomChecker;