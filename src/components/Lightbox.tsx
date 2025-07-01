import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { Project } from '../data/projects';

interface LightboxProps {
  project: Project;
  projects: Project[];
  onClose: () => void;
  onNavigate: (project: Project) => void;
}

const Lightbox: React.FC<LightboxProps> = ({ project, projects, onClose, onNavigate }) => {
  const [isZoomed, setIsZoomed] = useState(false);
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
        case ' ':
          e.preventDefault();
          setIsZoomed(!isZoomed);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, prevProject, nextProject, onNavigate, isZoomed]);

  const renderMedia = () => {
    switch (project.mediaType) {
      case 'image':
        return (
          <div className={`relative transition-all duration-500 ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}>
            <img
              src={project.mediaUrl}
              alt={project.title}
              className={`max-w-full max-h-full object-contain transition-all duration-500 ${
                isZoomed ? 'scale-150' : 'scale-100'
              } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onClick={() => setIsZoomed(!isZoomed)}
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        );
      case 'video':
        return (
          <iframe
            src={project.mediaUrl}
            title={project.title}
            className="w-full h-full max-w-5xl max-h-[70vh]"
            frameBorder="0"
            allowFullScreen
          />
        );
      case 'interactive':
        return (
          <div className="text-center p-16 max-w-2xl">
            <div className="w-24 h-24 mx-auto mb-8 border border-gray-300 dark:border-gray-700 rounded-full flex items-center justify-center">
              <div className="w-12 h-12 border border-gray-400 dark:border-gray-600 rounded-full"></div>
            </div>
            <h3 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-6 tracking-wide">
              Interactive Experience
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-light mb-8 leading-relaxed">
              This piece requires direct interaction to be fully experienced.
            </p>
            {project.externalLink && (
              <a
                href={project.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 border border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 font-light tracking-wide hover:bg-gray-900 hover:text-white dark:hover:bg-gray-100 dark:hover:text-gray-900 transition-all duration-300"
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
    <div className="fixed inset-0 z-50 bg-white dark:bg-gray-950">
      {/* Header Controls */}
      <div className="absolute top-0 left-0 right-0 z-10 p-8 bg-gradient-to-b from-white/90 to-transparent dark:from-gray-950/90">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {project.mediaType === 'image' && (
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300"
              >
                {isZoomed ? <ZoomOut className="h-5 w-5" /> : <ZoomIn className="h-5 w-5" />}
                <span className="font-light tracking-wide">{isZoomed ? 'Zoom Out' : 'Zoom In'}</span>
              </button>
            )}
          </div>
          
          <button
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="h-full flex items-center justify-center p-8 pt-24 pb-32">
        <div className="relative max-w-7xl w-full h-full flex items-center justify-center">
          {renderMedia()}
        </div>
      </div>

      {/* Navigation */}
      {prevProject && (
        <button
          onClick={() => onNavigate(prevProject)}
          className="absolute left-8 top-1/2 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
      )}

      {nextProject && (
        <button
          onClick={() => onNavigate(nextProject)}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      )}

      {/* Bottom Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-white/90 to-transparent dark:from-gray-950/90">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-3 tracking-wide">
            {project.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 font-light mb-4 leading-relaxed">
            {project.description}
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-500">
            <span className="font-light tracking-wide">{project.year}</span>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <span className="font-light tracking-wide capitalize">{project.mediaType}</span>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <span className="font-light tracking-wide">{currentIndex + 1} of {projects.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;