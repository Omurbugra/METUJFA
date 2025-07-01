import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Circle } from 'lucide-react';
import { getFeaturedProjects } from '../data/projects';

const Home: React.FC = () => {
  const featuredProjects = getFeaturedProjects();

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative bg-white dark:bg-gray-950 overflow-hidden">
        {/* Minimal geometric elements */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute top-1/4 left-1/4 w-px h-32 bg-gray-900 dark:bg-gray-100 rotate-45"></div>
          <div className="absolute top-1/3 right-1/3 w-px h-24 bg-gray-900 dark:bg-gray-100 -rotate-45"></div>
          <div className="absolute bottom-1/3 left-1/2 w-px h-16 bg-gray-900 dark:bg-gray-100"></div>
        </div>

        <div className="relative z-10 text-center px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="fade-in">
            {/* Minimal decorative element */}
            <div className="flex justify-center mb-8">
              <div className="minimal-line"></div>
            </div>
            
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extralight text-gray-900 dark:text-gray-100 mb-8 tracking-tight">
              META
              <span className="block font-light">JFA</span>
            </h1>
            
            <div className="flex justify-center mb-8">
              <div className="minimal-dot"></div>
            </div>
            
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              50 Years of METU Journal of Architecture — A cartographic exploration of intellectual knowledge production
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <Link
                to="/gallery"
                className="group inline-flex items-center space-x-3 text-gray-900 dark:text-gray-100 font-light tracking-wide hover:tracking-widest transition-all duration-500"
              >
                <span>Enter Exhibition</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>

        {/* Minimal scroll indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="w-px h-16 bg-gray-300 dark:bg-gray-700 minimal-float"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-24">
            <div className="flex justify-center mb-6">
              <div className="minimal-line"></div>
            </div>
            <h2 className="text-4xl font-extralight text-gray-900 dark:text-gray-100 mb-6 tracking-tight">
              Cartographic Vision
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light">
              Mapping the intellectual territories of architectural knowledge through archival visualization
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-16">
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-8 flex items-center justify-center">
                <Circle className="h-8 w-8 text-gray-900 dark:text-gray-100 group-hover:rotate-180 transition-transform duration-700" />
              </div>
              <h3 className="text-xl font-light text-gray-900 dark:text-gray-100 mb-4 tracking-wide">
                Archival Materials
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                Thematic selections and multi-modal visualizations from five decades of publishing
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-8 flex items-center justify-center">
                <div className="w-8 h-8 border border-gray-900 dark:border-gray-100 group-hover:rotate-45 transition-transform duration-700"></div>
              </div>
              <h3 className="text-xl font-light text-gray-900 dark:text-gray-100 mb-4 tracking-wide">
                Interactive Maps
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                Navigate the intellectual landscape through immersive digital experiences
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-8 flex items-center justify-center">
                <div className="w-8 h-px bg-gray-900 dark:bg-gray-100 group-hover:w-12 transition-all duration-700"></div>
              </div>
              <h3 className="text-xl font-light text-gray-900 dark:text-gray-100 mb-4 tracking-wide">
                Knowledge Networks
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                Discover connections between ideas, authors, and architectural discourse
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-32 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-24">
            <div className="flex justify-center mb-6">
              <div className="minimal-line"></div>
            </div>
            <h2 className="text-4xl font-extralight text-gray-900 dark:text-gray-100 mb-6 tracking-tight">
              Exhibition Highlights
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-light">
              Featured installations from the META JFA collection
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {featuredProjects.slice(0, 6).map((project, index) => (
              <div
                key={project.id}
                className="group fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="aspect-square overflow-hidden minimal-border mb-6 minimal-card">
                  <img
                    src={project.thumbnailUrl}
                    alt={project.title}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-light text-gray-900 dark:text-gray-100 mb-2 tracking-wide">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-light mb-4">
                    {project.description}
                  </p>
                  <div className="flex justify-center space-x-2">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-gray-500 dark:text-gray-500 font-light tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="flex justify-center mb-6">
              <div className="minimal-dot"></div>
            </div>
            <Link
              to="/gallery"
              className="inline-flex items-center space-x-3 text-gray-900 dark:text-gray-100 font-light tracking-wide hover:tracking-widest transition-all duration-500"
            >
              <span>View All Installations</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;