import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Circle, ChevronDown } from 'lucide-react';
import { getFeaturedProjects } from '../data/projects';

const Home: React.FC = () => {
  const featuredProjects = getFeaturedProjects();
  const [scrollY, setScrollY] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Track current section for navigation
      const sections = document.querySelectorAll('.scroll-section');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = sectionTop + rect.height;

        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
          setCurrentSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {/* Section Navigation Indicator */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 space-y-4">
        {['hero', 'about', 'team'].map((section, index) => (
          <button
            key={section}
            onClick={() => scrollToSection(section)}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              currentSection === index
                ? 'bg-gray-900 dark:bg-gray-100 scale-125'
                : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-500 dark:hover:bg-gray-500'
            }`}
            title={section.charAt(0).toUpperCase() + section.slice(1)}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section 
        id="hero" 
        className="scroll-section h-screen flex items-center justify-center relative bg-white dark:bg-gray-950 overflow-hidden"
      >
        {/* Parallax Background Elements */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div 
            className="absolute top-1/4 left-1/4 w-px h-32 bg-gray-900 dark:bg-gray-100 rotate-45"
            style={{ transform: `translateY(${scrollY * 0.3}px) rotate(45deg)` }}
          ></div>
          <div 
            className="absolute top-1/3 right-1/3 w-px h-24 bg-gray-900 dark:bg-gray-100 -rotate-45"
            style={{ transform: `translateY(${scrollY * -0.2}px) rotate(-45deg)` }}
          ></div>
          <div 
            className="absolute bottom-1/3 left-1/2 w-px h-16 bg-gray-900 dark:bg-gray-100"
            style={{ transform: `translateY(${scrollY * 0.4}px)` }}
          ></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="fade-in">
            {/* Animated decorative element */}
            <div className="flex justify-center mb-12">
              <div className="minimal-line animate-pulse"></div>
            </div>
            
            <h1 className="text-7xl sm:text-8xl lg:text-9xl font-extralight text-gray-900 dark:text-gray-100 mb-12 tracking-tight leading-none">
              META
              <span className="block font-light mt-4">JFA</span>
            </h1>
            
            <div className="flex justify-center mb-12">
              <div className="minimal-dot animate-pulse"></div>
            </div>
            
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-16 max-w-3xl mx-auto font-light leading-relaxed">
              50 Years of METU Journal of Architecture
            </p>
            
            <p className="text-lg text-gray-500 dark:text-gray-500 mb-16 max-w-2xl mx-auto font-light leading-relaxed">
              A cartographic exploration of intellectual knowledge production — mapping the territories of architectural discourse
            </p>
            
            {/* Enter Exhibition Button */}
            <div className="mb-20">
              <Link
                to="/gallery"
                className="group inline-flex items-center space-x-4 px-12 py-6 border-2 border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 font-light tracking-wide hover:bg-gray-900 hover:text-white dark:hover:bg-gray-100 dark:hover:text-gray-900 transition-all duration-700 text-lg"
              >
                <span>Enter Exhibition</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-500" />
              </Link>
            </div>

            {/* Featured Preview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto opacity-60 hover:opacity-100 transition-opacity duration-700">
              {featuredProjects.slice(0, 4).map((project, index) => (
                <div
                  key={project.id}
                  className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-900 group cursor-pointer"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <img
                    src={project.thumbnailUrl}
                    alt={project.title}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={() => scrollToSection('about')}
            className="flex flex-col items-center space-y-2 text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-300"
          >
            <span className="text-sm font-light tracking-wide">Explore</span>
            <ChevronDown className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about" 
        className="scroll-section min-h-screen py-32 bg-gray-50 dark:bg-gray-900 flex items-center"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Content */}
            <div className="space-y-12">
              <div>
                <div className="flex mb-8">
                  <div className="minimal-line"></div>
                </div>
                <h2 className="text-5xl font-extralight text-gray-900 dark:text-gray-100 mb-8 tracking-tight leading-tight">
                  Cartographic Vision
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 font-light leading-relaxed mb-8">
                  META JFA explores the creative tension between text, design, and education, revealing 
                  how the written word has fundamentally shaped architectural discourse since 1975.
                </p>
              </div>

              <div className="space-y-8 text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                <p>
                  To celebrate the 50th anniversary of the METU Journal of the Faculty of Architecture, 
                  we present thematic selections, archival materials, and multi-modal visualizations 
                  that excavate, map, and reimagine intellectual knowledge production.
                </p>
                <p>
                  The journal is not merely a repository of knowledge but an active cartographic project 
                  that has continually redrawn the boundaries of our fields. In making these maps, we 
                  take possession of and literally define an interface.
                </p>
                <p>
                  What you encounter is simultaneously familiar and disorienting—a terrain inhabited 
                  for half a century yet only now apprehensible as a totality.
                </p>
              </div>

              <div className="pt-8">
                <Link
                  to="/about"
                  className="group inline-flex items-center space-x-3 text-gray-900 dark:text-gray-100 font-light tracking-wide hover:tracking-widest transition-all duration-500"
                >
                  <span>Learn More</span>
                  <div className="w-8 h-px bg-gray-900 dark:bg-gray-100 group-hover:w-12 transition-all duration-500"></div>
                </Link>
              </div>
            </div>

            {/* Visual Element */}
            <div className="relative">
              <div className="aspect-[4/5] bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&dpr=2"
                  alt="Archive visualization"
                  className="w-full h-full object-cover filter grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-8 -right-8 w-16 h-16 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 flex items-center justify-center">
                <Circle className="h-6 w-6 text-gray-900 dark:text-gray-100" />
              </div>
              <div className="absolute -bottom-8 -left-8 w-24 h-px bg-gray-900 dark:bg-gray-100"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section 
        id="team" 
        className="scroll-section min-h-screen py-32 bg-white dark:bg-gray-950 flex items-center"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="flex justify-center mb-8">
              <div className="minimal-line"></div>
            </div>
            <h2 className="text-5xl font-extralight text-gray-900 dark:text-gray-100 mb-8 tracking-tight">
              Exhibition Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
              The collaborative minds behind META JFA's curatorial vision and archival exploration
            </p>
          </div>

          {/* Featured Team Members */}
          <div className="grid md:grid-cols-3 gap-16 mb-20">
            {[
              {
                name: 'Elif Kaymaz',
                role: 'Curator',
                photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2'
              },
              {
                name: 'Pelin Yoncacı Arslan',
                role: 'Curator',
                photo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2'
              },
              {
                name: 'Özlem Ölçer',
                role: 'Curator',
                photo: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2'
              }
            ].map((member, index) => (
              <div 
                key={member.name}
                className="text-center group fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-32 h-32 mx-auto mb-8 overflow-hidden bg-gray-100 dark:bg-gray-900 relative">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <h3 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-3 tracking-wide">
                  {member.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-light tracking-wide">
                  {member.role}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/team"
              className="group inline-flex items-center space-x-3 text-gray-900 dark:text-gray-100 font-light tracking-wide hover:tracking-widest transition-all duration-500"
            >
              <span>Meet the Full Team</span>
              <div className="w-8 h-px bg-gray-900 dark:bg-gray-100 group-hover:w-12 transition-all duration-500"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <div className="flex justify-center mb-12">
            <Circle className="h-12 w-12 text-gray-900 dark:text-gray-100 animate-pulse" />
          </div>
          <h2 className="text-4xl font-extralight text-gray-900 dark:text-gray-100 mb-8 tracking-tight">
            Begin Your Journey
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 font-light leading-relaxed">
            Step into the exhibition and discover five decades of architectural discourse
          </p>
          <Link
            to="/gallery"
            className="group inline-flex items-center space-x-4 px-16 py-6 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-light tracking-wide hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-700 text-lg"
          >
            <span>Enter Exhibition</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-500" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;