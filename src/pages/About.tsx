import React from 'react';
import { Circle, Archive, Map, BookOpen, Users } from 'lucide-react';

const About: React.FC = () => {
  const highlights = [
    {
      title: 'The Editor\'s Desk',
      description: 'reconstructs the pre-digital workspace of METU JFA\'s early editorial operations.'
    },
    {
      title: 'The Ecosystem',
      description: 'reveals the Journal\'s global presence and enduring resilience.'
    },
    {
      title: 'The Correspondence Network',
      description: 'exposes the human infrastructure that sustained METU JFA\'s development through pre-digital era correspondence.'
    },
    {
      title: 'The Chronogram',
      description: 'inspired by Charles Jencks\'s 1971 "Evolutionary Tree," maps 50 years of non-linear intellectual evolution.'
    },
    {
      title: 'The Tree',
      description: 'is a wooden sculpture listing all METU JFA articles, each plaque a contribution.'
    },
    {
      title: 'The Circle',
      description: 'showcases the expansive periphery of contributors.'
    },
    {
      title: 'The Source Code',
      description: 'is a 3D bibliographic universe of 1200 recurring sources.'
    },
    {
      title: 'The Citation Geographies and Chronologies',
      description: 'reveal the global and temporal dynamics of citations.'
    },
    {
      title: 'The Orbit',
      description: 'visualizes how research interests evolved.'
    },
    {
      title: 'The Dymaxion World',
      description: 'is a Buckminster Fuller–inspired globe of 811 referenced cities.'
    },
    {
      title: 'The Drawings',
      description: 'honors two unique drawing-only articles.'
    },
    {
      title: 'The Visual Corpus',
      description: 'is a raw slideshow of the Journal\'s imagery.'
    },
    {
      title: 'Visual Legacy in Motion',
      description: 'animates those visuals through time.'
    },
    {
      title: 'The Dictionary',
      description: 'compiles key terms drawn from METU JFA\'s archives.'
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-24 bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20 pt-12">
          <div className="flex justify-center mb-6">
            <div className="minimal-line"></div>
          </div>
          <h1 className="text-5xl font-extralight text-gray-900 dark:text-gray-100 mb-6 tracking-tight">
            50 Years of METU Journal of Architecture
          </h1>
        </div>

        {/* Main Content */}
        <div className="space-y-16">
          {/* Introduction */}
          <section className="space-y-6 text-gray-600 dark:text-gray-400 font-light leading-relaxed text-lg">
            <p>
              To celebrate the 50th anniversary of the METU Journal of the Faculty of Architecture, 
              META JFA presents thematic selections, archival materials, and multi-modal archival 
              visualizations that excavate, map, and reimagine the intellectual knowledge production 
              cultivated over half a century.
            </p>
            <p>
              META JFA explores the creative tension between text, design, and education, revealing 
              how the written word has fundamentally shaped the Faculty's foundations since 1975. 
              The journal, we discover, is not merely a repository of knowledge but an active 
              cartographic project that has continually redrawn the boundaries of our fields.
            </p>
            <p>
              Yet in making these maps, we take possession of and literally define an interface: 
              we name features, reveal relationships, indicate boundaries, and mark unknown regions 
              for exploration.
            </p>
            <p>
              What you encounter is simultaneously familiar and disorienting—a terrain inhabited 
              for half a century yet only now apprehensible as a totality.
            </p>
            <p>
              We invite you not to observe but to co-cartograph this landscape, to recognize in 
              these patterns not merely what has been written, but what might yet be imagined into 
              existence. The map, after all, is never the territory—it is the territory's future.
            </p>
          </section>

          {/* Highlights Section */}
          <section>
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="minimal-line"></div>
              </div>
              <h2 className="text-3xl font-extralight text-gray-900 dark:text-gray-100 tracking-tight mb-6">
                META JFA Highlights
              </h2>
            </div>

            <div className="space-y-8">
              {highlights.map((highlight, index) => (
                <div 
                  key={index}
                  className="fade-in border-l-2 border-gray-200 dark:border-gray-800 pl-8 py-4"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="text-xl font-light text-gray-900 dark:text-gray-100 mb-3 tracking-wide">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Visual Elements */}
          <section className="bg-gray-50 dark:bg-gray-900 p-12 text-center">
            <div className="flex justify-center mb-8">
              <Circle className="h-8 w-8 text-gray-900 dark:text-gray-100" />
            </div>
            <blockquote className="text-xl font-light text-gray-900 dark:text-gray-100 italic leading-relaxed">
              "The map, after all, is never the territory—it is the territory's future."
            </blockquote>
          </section>

          {/* Key Features */}
          <section>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <Archive className="h-8 w-8 text-gray-900 dark:text-gray-100" />
                </div>
                <h3 className="text-lg font-light text-gray-900 dark:text-gray-100 mb-4 tracking-wide">
                  Archival Materials
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed text-sm">
                  Original documents and correspondence from five decades of publishing
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <Map className="h-8 w-8 text-gray-900 dark:text-gray-100" />
                </div>
                <h3 className="text-lg font-light text-gray-900 dark:text-gray-100 mb-4 tracking-wide">
                  Cartographic Vision
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed text-sm">
                  Mapping intellectual territories and knowledge networks
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-gray-900 dark:text-gray-100" />
                </div>
                <h3 className="text-lg font-light text-gray-900 dark:text-gray-100 mb-4 tracking-wide">
                  Multi-Modal
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed text-sm">
                  Interactive visualizations and immersive experiences
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <Users className="h-8 w-8 text-gray-900 dark:text-gray-100" />
                </div>
                <h3 className="text-lg font-light text-gray-900 dark:text-gray-100 mb-4 tracking-wide">
                  Collaborative
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed text-sm">
                  Co-cartographing the landscape of architectural knowledge
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;