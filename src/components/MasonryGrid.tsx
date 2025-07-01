import React, { useState, useEffect, useRef } from 'react';
import { Project } from '../data/projects';

interface MasonryGridProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ projects, onProjectClick }) => {
  const [columns, setColumns] = useState(3);
  const [columnHeights, setColumnHeights] = useState<number[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setColumns(1);
      } else if (width < 1024) {
        setColumns(2);
      } else {
        setColumns(3);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  useEffect(() => {
    setColumnHeights(new Array(columns).fill(0));
  }, [columns]);

  const getImageHeight = (project: Project) => {
    switch (project.aspectRatio) {
      case 'square':
        return 400;
      case 'portrait':
        return 500;
      case 'landscape':
        return 300;
      default:
        return 400;
    }
  };

  const getShortestColumn = () => {
    return columnHeights.indexOf(Math.min(...columnHeights));
  };

  return (
    <div ref={gridRef} className="relative">
      <div 
        className="grid gap-8"
        style={{ 
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        }}
      >
        {Array.from({ length: columns }).map((_, columnIndex) => (
          <div key={columnIndex} className="space-y-8">
            {projects
              .filter((_, index) => index % columns === columnIndex)
              .map((project, index) => (
                <div
                  key={project.id}
                  className="group cursor-pointer fade-in"
                  style={{ 
                    animationDelay: `${(Math.floor(index / columns) * columns + columnIndex) * 0.1}s` 
                  }}
                  onClick={() => onProjectClick(project)}
                >
                  {/* Image Container */}
                  <div 
                    className="relative overflow-hidden bg-gray-100 dark:bg-gray-900 mb-6"
                    style={{ height: `${getImageHeight(project)}px` }}
                  >
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
                    
                    {/* Media Type Indicator */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 text-xs font-light tracking-widest uppercase text-gray-900 dark:text-gray-100">
                        {project.mediaType}
                      </span>
                    </div>

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-4 left-4">
                        <div className="w-2 h-2 bg-gray-900 dark:bg-gray-100 rounded-full"></div>
                      </div>
                    )}
                  </div>

                  {/* Caption */}
                  <div className="px-2">
                    <h3 className="text-xl font-light text-gray-900 dark:text-gray-100 mb-3 tracking-wide leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed mb-4">
                      {project.description}
                    </p>
                    
                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
                      <span className="font-light tracking-wide">{project.year}</span>
                      <div className="flex space-x-3">
                        {project.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="font-light tracking-wide">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MasonryGrid;