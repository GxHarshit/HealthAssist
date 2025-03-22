import { ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 px-4">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-100 rounded-full filter blur-3xl opacity-60"></div>
        <div className="absolute top-40 -right-20 w-80 h-80 bg-blue-50 rounded-full filter blur-3xl opacity-60"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-blue-50 text-blue-700 mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            AI-Powered blue Assistant
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance animate-slide-down">
            Understand Your Symptoms <br />
            <span className="text-blue-600">with AI Precision</span>
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-gray-600  max-w-2xl text-balance animate-slide-up">
            Describe your symptoms in detail and our advanced AI will analyze them to provide insights about possible conditions.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in">
            <a 
              href="#symptom-checker" 
              className="rounded-full bg-blue-600 px-8 py-3.5 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            >
              Check Your Symptoms
            </a>
            <a 
              href="#about" 
              className="rounded-full bg-white  px-8 py-3.5 text-base font-medium text-gray-800  shadow-sm border border-gray-200  hover:bg-gray-50  focus:outline-none focus:ring-2 focus:ring-gray-200  transition-all"
            >
              Learn More
            </a>
          </div>
          
          <div className="mt-16 md:mt-24 animate-bounce">
            <a 
              href="#symptom-checker" 
              className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-200  text-gray-500 hover:text-blue-600 hover:border-blue-200 transition-colors"
            >
              <ArrowDown size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;