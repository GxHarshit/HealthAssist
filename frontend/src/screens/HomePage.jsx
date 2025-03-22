import React , {useContext} from 'react'
import axios from '../config/axios';
// import NavBar from "../components/Navbar.jsx";

// import { UserContext } from '../context/user.context';
// import Hero from '../components/Hero.jsx';
// import SymptomForm from '../components/SymptomForm.jsx';
// import SymptomChecker from '../components/SymptomChecker.jsx';


// function HomePage() {
//     const {user} = useContext(UserContext)
//   return (
//     <>
//     <NavBar/>
//     <Hero/>
   
//     <SymptomChecker/>
//     </>
//   )
// }

// export default HomePage

import NavBar from "../components/Navbar";
import Hero from "../components/Hero";
import SymptomChecker from "../components/SymptomChecker";
import { ArrowRight, Check, ExternalLink, Heart, ShieldCheck } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 ">
      <NavBar />
      <Hero />
      <SymptomChecker />
      
      {/* About Section */}
      <section id="about" className="py-20 bg-white ">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 ">
              Our AI-powered symptom checker uses advanced algorithms to provide insights about your health concerns.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              step="01"
              title="Describe Your Symptoms" 
              description="Enter detailed information about what you're experiencing, including when it started and how severe it is."
              icon={<ArrowRight className="h-6 w-6 text-blue-600" />}
            />
            <FeatureCard 
              step="02"
              title="AI Analysis" 
              description="Our advanced AI analyzes your symptoms and compares them against a vast database of medical conditions."
              icon={<Heart className="h-6 w-6 text-blue-600" />}
            />
            <FeatureCard 
              step="03"
              title="Get Insights" 
              description="Receive information about possible conditions, recommendations, and guidance on what steps to take next."
              icon={<Check className="h-6 w-6 text-blue-600" />}
            />
          </div>
          
          <div className="mt-20 max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <ShieldCheck className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Your Privacy Is Our Priority</h3>
            <p className="text-gray-600  mb-6">
              We take your privacy seriously. All information you share is encrypted and protected. 
              We never share your personal health information with third parties.
            </p>
            <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
              Learn more about our privacy policy
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50 ">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <FaqItem 
                question="Is this a substitute for seeing a doctor?" 
                answer="No, our symptom checker is designed to provide information and guidance, but it is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for medical concerns."
              />
              <FaqItem 
                question="How accurate is the symptom analysis?" 
                answer="Our AI-powered symptom checker uses advanced algorithms and is trained on extensive medical data, but it has limitations. The analysis provides possibilities based on the information you provide, but only a healthcare professional can make an accurate diagnosis."
              />
              <FaqItem 
                question="Is my health information kept private?" 
                answer="Yes, we take privacy very seriously. Your health information is encrypted and protected. We do not share your personal health information with third parties. Please review our privacy policy for more details."
              />
              <FaqItem 
                question="What should I do after receiving the analysis?" 
                answer="Review the information provided and follow the recommendations. If you're concerned about your symptoms, especially if they're severe or persistent, consult with a healthcare professional. The analysis is meant to be informative, not definitive."
              />
              <FaqItem 
                question="Can I use this for someone else's symptoms?" 
                answer="Yes, you can use the symptom checker to input symptoms for someone else, such as a child or elderly family member. However, remember that the person experiencing the symptoms may have additional information that could affect the analysis."
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Check Your Symptoms?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Get insights about your health concerns with our AI-powered symptom checker. It's quick, easy, and informative.
          </p>
          <a 
            href="#symptom-checker" 
            className="inline-flex items-center justify-center rounded-full bg-white text-blue-700 px-8 py-3 font-medium shadow-lg hover:bg-gray-100 transition-colors"
          >
            Check Symptoms Now
          </a>
        </div>
      </section>
      
      
    </div>
  );
};

const FeatureCard = ({ step, title, description, icon }) => (
  <div className="p-6 bg-white  border border-gray-200  rounded-xl transition-all duration-300 hover:shadow-md">
    <div className="flex items-center justify-between mb-4">
      <div className="bg-blue-50 text-blue-700  rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
        {step}
      </div>
      <div className="bg-blue-50  p-2 rounded-full">
        {icon}
      </div>
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const FaqItem = ({ question, answer }) => (
  <div className="bg-white  border border-gray-200  rounded-xl p-6 transition-all duration-300 hover:shadow-md">
    <h3 className="text-lg font-semibold mb-3">{question}</h3>
    <p className="text-gray-600 ">{answer}</p>
  </div>
);

export default HomePage;