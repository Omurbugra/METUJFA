import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Info } from 'lucide-react';
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
  const [showInfo, setShowInfo] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
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
          handleZoomToggle();
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

  // Reset zoom and pan when project changes
  useEffect(() => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    setIsZoomed(false);
    setImageLoaded(false);
    setShowInfo(false);
  }, [project.id]);

  const handleZoomToggle = () => {
    if (project.mediaType !== 'image') return;
    
    if (zoomLevel === 1) {
      setZoomLevel(2);
      setIsZoomed(true);
    } else {
      setZoomLevel(1);
      setPanPosition({ x: 0, y: 0 });
      setIsZoomed(false);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setPanPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const renderMedia = () => {
    switch (project.mediaType) {
      case 'image':
        return (
          <div 
            className={`relative transition-all duration-700 ${
              zoomLevel > 1 ? 'cursor-grab' : 'cursor-zoom-in'
            } ${isDragging ? 'cursor-grabbing' : ''}`}
            onClick={zoomLevel === 1 ? handleZoomToggle : undefined}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              src={project.mediaUrl}
              alt={project.title}
              className={`max-w-none transition-all duration-700 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                transform: `scale(${zoomLevel}) translate(${panPosition.x / zoomLevel}px, ${panPosition.y / zoomLevel}px)`,
                maxHeight: zoomLevel === 1 ? '85vh' : 'none',
                maxWidth: zoomLevel === 1 ? '90vw' : 'none',
              }}
              onLoad={() => setImageLoaded(true)}
              draggable={false}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-gray-300 border-t-gray-900 dark:border-gray-700 dark:border-t-gray-100 rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        );
      case 'video':
        return (
          <iframe
            src={project.mediaUrl}
            title={project.title}
            className="w-full h-full max-w-6xl max-h-[80vh]"
            frameBorder="0"
            allowFullScreen
          />
        );
      case 'interactive':
        return (
          <div className="text-center p-20 max-w-3xl">
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
    <div className="fixed inset-0 z-50 bg-white dark:bg-gray-950">
      {/* Header Controls */}
      <div className="absolute top-0 left-0 right-0 z-10 p-8 bg-gradient-to-b from-white/95 to-transparent dark:from-gray-950/95">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            {/* Navigation Info */}
            <div className="text-sm font-light text-gray-500 dark:text-gray-500 tracking-wide">
              {currentIndex + 1} of {projects.length}
            </div>

            {/* Zoom Controls for Images */}
            {project.mediaType === 'image' && (
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleZoomToggle}
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300"
                >
                  {zoomLevel > 1 ? <ZoomOut className="h-5 w-5" /> : <ZoomIn className="h-5 w-5" />}
                  <span className="font-light tracking-wide">
                    {zoomLevel > 1 ? 'Zoom Out' : 'Zoom In'}
                  </span>
                </button>
                {zoomLevel > 1 && (
                  <span className="text-sm text-gray-500 dark:text-gray-500 font-light">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                )}
              </div>
            )}

            {/* Info Toggle */}
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300"
            >
              <Info className="h-5 w-5" />
              <span className="font-light tracking-wide">Info</span>
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

      {/* Main Content */}
      <div className="h-full flex items-center justify-center p-8 pt-24 pb-32">
        <div className="relative max-w-full max-h-full flex items-center justify-center">
          {renderMedia()}
        </div>
      </div>

      {/* Navigation */}
      {prevProject && (
        <button
          onClick={() => onNavigate(prevProject)}
          className="absolute left-8 top-1/2 transform -translate-y-1/2 w-16 h-16 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm rounded-full"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
      )}

      {nextProject && (
        <button
          onClick={() => onNavigate(nextProject)}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 w-16 h-16 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm rounded-full"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      )}

      {/* Bottom Info Panel */}
      <div className={`absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-white/95 to-transparent dark:from-gray-950/95 transition-all duration-500 ${
        showInfo ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-light text-gray-900 dark:text-gray-100 mb-4 tracking-wide">
                {project.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed text-lg mb-6">
                {project.longDescription}
              </p>
              <div className="flex flex-wrap gap-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm text-gray-500 dark:text-gray-500 font-light tracking-wide border border-gray-200 dark:border-gray-800 px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-light text-gray-500 dark:text-gray-500 tracking-widest uppercase mb-2">
                  Year
                </h3>
                <p className="text-gray-900 dark:text-gray-100 font-light tracking-wide">
                  {project.year}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-light text-gray-500 dark:text-gray-500 tracking-widest uppercase mb-2">
                  Medium
                </h3>
                <p className="text-gray-900 dark:text-gray-100 font-light tracking-wide capitalize">
                  {project.mediaType}
                </p>
              </div>
              {project.externalLink && (
                <div>
                  <a
                    href={project.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-gray-900 dark:text-gray-100 font-light tracking-wide hover:tracking-widest transition-all duration-500"
                  >
                    <span>View External Link</span>
                    <div className="w-6 h-px bg-gray-900 dark:bg-gray-100"></div>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Hint */}
      <div className="absolute bottom-8 left-8 text-xs text-gray-400 dark:text-gray-600 font-light space-y-1">
        <div>ESC to close</div>
        <div>← → to navigate</div>
        <div>SPACE to zoom</div>
        <div>I for info</div>
      </div>
    </div>
  );
};

export default Lightbox;