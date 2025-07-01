import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Info, Calendar, Tag, ExternalLink } from 'lucide-react';
import { Project } from '../data/projects';

interface ArtworkDetailProps {
  project: Project;
  projects: Project[];
  onClose: () => void;
  onNavigate: (project: Project) => void;
}

const ArtworkDetail: React.FC<ArtworkDetailProps> = ({ project, projects, onClose, onNavigate }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const currentIndex = projects.findIndex(p => p.id === project.id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (prevProject) onNavigate(prevProject);
          break;
        case 'ArrowRight':
          if (nextProject) onNavigate(nextProject);
          break;
        case 'i':
        case 'I':
          setShowInfo(!showInfo);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, prevProject, nextProject, onNavigate, showInfo]);

  // Reset state when project changes
  useEffect(() => {
    setImageLoaded(false);
    setShowInfo(false);
  }, [project.id]);

  const renderMedia = () => {
    switch (project.mediaType) {
      case 'image':
        return (
          <div className="relative w-full">
            <img
              src={project.mediaUrl}
              alt={project.title}
              className={`w-full h-auto max-h-[70vh] object-contain transition-opacity duration-700 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center min-h-[400px]">
                <div className="w-12 h-12 border-2 border-gray-300 border-t-gray-900 dark:border-gray-700 dark:border-t-gray-100 rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        );
      case 'video':
        return (
          <div className="w-full">
            <iframe
              src={project.mediaUrl}
              title={project.title}
              className="w-full h-[70vh] max-w-5xl mx-auto"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        );
      case 'interactive':
        return (
          <div className="text-center p-20 max-w-3xl mx-auto">
            <div className="w-32 h-32 mx-auto mb-12 border border-gray-300 dark:border-gray-700 rounded-full flex items-center justify-center">
              <div className="w-16 h-16 border border-gray-400 dark:border-gray-600 rounded-full"></div>
            </div>
            <h3 className="text-3xl font-light text-gray-900 dark:text-gray-100 mb-8 tracking-wide">
              Interactive Experience
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-light mb-12 leading-relaxed text-lg">
              This piece requires direct interaction to be fully experienced.
            </p>
            {project.externalLink && (
              <a
                href={project.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-12 py-4 border border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 font-light tracking-wide hover:bg-gray-900 hover:text-white dark:hover:bg-gray-100 dark:hover:text-gray-900 transition-all duration-500"
              >
                Launch Experience
              </a>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-gray-950 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              {/* Navigation Info */}
              <div className="text-sm font-light text-gray-500 dark:text-gray-500 tracking-wide">
                {currentIndex + 1} of {projects.length}
              </div>

              {/* Info Toggle Button */}
              <button
                onClick={() => setShowInfo(!showInfo)}
                className={`flex items-center space-x-2 px-4 py-2 border transition-all duration-300 ${
                  showInfo
                    ? 'border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-900'
                    : 'border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-900 dark:hover:border-gray-100 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                <Info className="h-4 w-4" />
                <span className="font-light tracking-wide">
                  {showInfo ? 'Hide Info' : 'Show Info'}
                </span>
              </button>
            </div>
            
            <button
              onClick={onClose}
              className="w-12 h-12 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Artwork Display */}
        <div className="mb-16">
          <div className="flex justify-center mb-12">
            {renderMedia()}
          </div>
        </div>

        {/* Artwork Description - Always Visible */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-extralight text-gray-900 dark:text-gray-100 mb-6 tracking-tight">
              {project.title}
            </h1>
            <div className="flex justify-center items-center space-x-6 text-sm text-gray-500 dark:text-gray-500 mb-8">
              <span className="font-light tracking-wide">{project.year}</span>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <span className="font-light tracking-wide capitalize">{project.mediaType}</span>
            </div>
          </div>
          
          <div className="prose prose-lg max-w-none text-center">
            <p className="text-xl text-gray-600 dark:text-gray-400 font-light leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>

        {/* Detailed Information Panel - Toggleable */}
        <div className={`transition-all duration-700 overflow-hidden ${
          showInfo ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="max-w-4xl mx-auto border-t border-gray-200 dark:border-gray-800 pt-16">
            <div className="grid md:grid-cols-3 gap-12">
              {/* Extended Description */}
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-6 tracking-wide">
                    About This Work
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed text-lg">
                    {project.longDescription}
                  </p>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="text-lg font-light text-gray-900 dark:text-gray-100 mb-4 tracking-wide flex items-center">
                    <Tag className="h-4 w-4 mr-2" />
                    Themes
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 border border-gray-200 dark:border-gray-800 text-sm text-gray-600 dark:text-gray-400 font-light tracking-wide hover:border-gray-900 dark:hover:border-gray-100 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Metadata */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-light text-gray-900 dark:text-gray-100 mb-6 tracking-wide">
                    Details
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-500" />
                        <span className="text-sm font-light text-gray-500 dark:text-gray-500 tracking-widest uppercase">
                          Year
                        </span>
                      </div>
                      <p className="text-gray-900 dark:text-gray-100 font-light tracking-wide">
                        {project.year}
                      </p>
                    </div>
                    
                    <div>
                      <span className="text-sm font-light text-gray-500 dark:text-gray-500 tracking-widest uppercase mb-2 block">
                        Medium
                      </span>
                      <p className="text-gray-900 dark:text-gray-100 font-light tracking-wide capitalize">
                        {project.mediaType}
                      </p>
                    </div>

                    {project.featured && (
                      <div>
                        <span className="text-sm font-light text-gray-500 dark:text-gray-500 tracking-widest uppercase mb-2 block">
                          Status
                        </span>
                        <p className="text-gray-900 dark:text-gray-100 font-light tracking-wide">
                          Featured Work
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* External Link */}
                {project.externalLink && (
                  <div>
                    <a
                      href={project.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center space-x-2 text-gray-900 dark:text-gray-100 font-light tracking-wide hover:tracking-widest transition-all duration-500"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>View External Link</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-20 pt-16 border-t border-gray-200 dark:border-gray-800">
          {prevProject ? (
            <button
              onClick={() => onNavigate(prevProject)}
              className="group flex items-center space-x-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300"
            >
              <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <div className="text-left">
                <div className="text-sm font-light tracking-wide mb-1">Previous</div>
                <div className="font-light tracking-wide">{prevProject.title}</div>
              </div>
            </button>
          ) : (
            <div></div>
          )}

          {nextProject ? (
            <button
              onClick={() => onNavigate(nextProject)}
              className="group flex items-center space-x-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300"
            >
              <div className="text-right">
                <div className="text-sm font-light tracking-wide mb-1">Next</div>
                <div className="font-light tracking-wide">{nextProject.title}</div>
              </div>
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>

      {/* Keyboard Shortcuts Hint */}
      <div className="fixed bottom-8 left-8 text-xs text-gray-400 dark:text-gray-600 font-light space-y-1">
        <div>ESC to close</div>
        <div>← → to navigate</div>
        <div>I to toggle info</div>
      </div>
    </div>
  );
};

export default ArtworkDetail;