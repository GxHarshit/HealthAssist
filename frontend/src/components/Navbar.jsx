import { useState, useEffect } from 'react';
import { Activity } from "lucide-react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Replace cn utility with className string concatenation
  const headerClasses = scrolled 
    ? "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 bg-white/80  backdrop-blur-md shadow-sm" 
    : "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-5 bg-transparent";

  return (
    <header className={headerClasses}>
      <div className="container mx-auto gap-8  flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 transition-transform duration-300 hover:scale-105"
        >
          <Activity className="h-6 w-6 text-health-600" strokeWidth={2.5} />
          <span className="font-semibold text-xl">HealthAssist</span>
        </Link>
        
           {/* Updated nav section with direct styling */}
           <nav className="hidden md:flex items-center gap-6">
          <a 
            href="#symptom-checker" 
            className="text-gray-700  font-medium hover:text-blue-500 transition-colors"
          >
            Symptom Checker
          </a>
          <a 
            href="#about" 
            className="text-gray-700  font-medium hover:text-blue-500 transition-colors"
          >
            About
          </a>
          <a 
            href="#faq" 
            className="text-gray-700  font-medium hover:text-blue-500 transition-colors"
          >
            FAQ
          </a>
        </nav>
        
        <div className="flex items-center gap-3">
          <Link to="/login" className="hidden md:flex items-center justify-center rounded-full px-6 py-2 text-sm font-medium border border-health-200 hover:border-health-300 transition-colors">
            Sign In
          </Link>
          <Link to="/register" className="flex items-center justify-center rounded-full bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-health-700 transition-colors">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
};

// Convert NavLink to JavaScript by removing TypeScript types
const NavLink = ({ href, children }) => (
  <a 
    href={href}
    className="text-gray-700  font-medium hover:text-health-600  transition-colors"
  >
    {children}
  </a>
);

export default NavBar;