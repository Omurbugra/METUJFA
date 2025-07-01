import React, { useEffect } from 'react';
import { X, ExternalLink, Calendar, Tag, Circle } from 'lucide-react';
import { Project } from '../data/projects';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const renderMedia = () => {
    switch (project.mediaType) {
      case 'image':
        return (
          <img
            src={project.mediaUrl}
            alt={project.title}
            className="w-full h-full object-contain filter grayscale"
          />
        );
      case 'video':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <iframe
              src={project.mediaUrl}
              title={project.title}
              className="w-full h-full max-w-4xl max-h-[600px] filter grayscale"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        );
      case 'interactive':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center p-12">
              <Circle className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-6" />
              <h3 className="text-xl font-light text-gray-900 dark:text-gray-100 mb-4 tracking-wide">
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
                  className="inline-flex items-center space-x-2 text-gray-900 dark:text-gray-100 font-light tracking-wide hover:tracking-widest transition-all duration-500"
                >
                  <span>Launch Experience</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm p-6">
      <div className="relative bg-white dark:bg-gray-950 minimal-border max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid lg:grid-cols-2 h-full">
          {/* Media Section */}
          <div className="relative bg-gray-50 dark:bg-gray-900 flex items-center justify-center min-h-[400px] lg:min-h-[600px] p-8">
            {renderMedia()}
          </div>

          {/* Content Section */}
          <div className="p-12 overflow-y-auto">
            <div className="space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-xs text-gray-500 dark:text-gray-500 font-light tracking-widest uppercase">
                    {project.mediaType}
                  </span>
                  {project.featured && (
                    <>
                      <div className="minimal-dot"></div>
                      <span className="text-xs text-gray-500 dark:text-gray-500 font-light tracking-widest uppercase">
                        Featured
                      </span>
                    </>
                  )}
                </div>
                <h1 className="text-3xl font-extralight text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
                  {project.title}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Meta Information */}
              <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-500 font-light">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{project.year}</span>
                </div>
              </div>

              {/* Divider */}
              <div className="flex justify-center">
                <div className="minimal-line"></div>
              </div>

              {/* Long Description */}
              <div>
                <h2 className="text-xl font-light text-gray-900 dark:text-gray-100 mb-4 tracking-wide">
                  About This Work
                </h2>
                <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                  {project.longDescription}
                </p>
              </div>

              {/* Tags */}
              <div>
                <h2 className="text-xl font-light text-gray-900 dark:text-gray-100 mb-4 tracking-wide flex items-center">
                  <Tag className="h-4 w-4 mr-2" />
                  Tags
                </h2>
                <div className="flex flex-wrap gap-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm text-gray-600 dark:text-gray-400 font-light tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* External Link */}
              {project.externalLink && (
                <div className="pt-4">
                  <a
                    href={project.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-gray-900 dark:text-gray-100 font-light tracking-wide hover:tracking-widest transition-all duration-500"
                  >
                    <span>View Full Experience</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;