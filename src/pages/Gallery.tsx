import React, { useState, useMemo } from 'react';
import { Filter, Search, X, Circle, Grid3X3, LayoutGrid } from 'lucide-react';
import { projects, getAllTags, Project } from '../data/projects';
import ProjectModal from '../components/ProjectModal';
import MasonryGrid from '../components/MasonryGrid';
import Lightbox from '../components/Lightbox';

type ViewMode = 'masonry' | 'grid' | 'wall';

const Gallery: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [lightboxProject, setLightboxProject] = useState<Project | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterTag, setFilterTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<ViewMode>('masonry');
  const [showFilters, setShowFilters] = useState(false);

  const allTags = getAllTags();

  const filteredProjects = useMemo(() => {
    let filtered = projects;

    if (filterType !== 'all') {
      filtered = filtered.filter(project => project.mediaType === filterType);
    }

    if (filterTag !== 'all') {
      filtered = filtered.filter(project => project.tags.includes(filterTag));
    }

    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return filtered;
  }, [filterType, filterTag, searchQuery]);

  const handleProjectClick = (project: Project) => {
    if (viewMode === 'wall') {
      setLightboxProject(project);
    } else {
      setSelectedProject(project);
    }
  };

  const handleLightboxNavigate = (project: Project) => {
    setLightboxProject(project);
  };

  const renderGalleryWall = () => (
    <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
      {filteredProjects.map((project, index) => (
        <div
          key={project.id}
          className="break-inside-avoid group cursor-pointer fade-in mb-8"
          style={{ animationDelay: `${index * 0.05}s` }}
          onClick={() => handleProjectClick(project)}
        >
          <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-900">
            <img
              src={project.thumbnailUrl}
              alt={project.title}
              className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-105"
              loading="lazy"
            />
            
            {/* Minimal Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>
            
            {/* Hover Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-white font-light tracking-wide mb-1">
                {project.title}
              </h3>
              <p className="text-white/80 text-sm font-light">
                {project.year}
              </p>
            </div>

            {/* Featured Indicator */}
            {project.featured && (
              <div className="absolute top-4 left-4">
                <div className="w-2 h-2 bg-white rounded-full shadow-lg"></div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderStandardGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
      {filteredProjects.map((project, index) => (
        <div
          key={project.id}
          className="group cursor-pointer fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
          onClick={() => handleProjectClick(project)}
        >
          <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-900 mb-8">
            <img
              src={project.thumbnailUrl}
              alt={project.title}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          
          <div className="text-center space-y-4">
            <h3 className="text-xl font-light text-gray-900 dark:text-gray-100 tracking-wide">
              {project.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">
              {project.description}
            </p>
            <div className="flex justify-center items-center space-x-4 text-sm text-gray-500 dark:text-gray-500">
              <span className="font-light tracking-wide">{project.year}</span>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <span className="font-light tracking-wide capitalize">{project.mediaType}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen pt-20 pb-32 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-24 pt-16">
          <div className="flex justify-center mb-8">
            <div className="minimal-line"></div>
          </div>
          <h1 className="text-6xl font-extralight text-gray-900 dark:text-gray-100 mb-8 tracking-tight">
            Exhibition Gallery
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
            A curated collection of {projects.length} works exploring the cartographic vision of architectural knowledge
          </p>
        </div>

        {/* Controls */}
        <div className="mb-20 space-y-12">
          {/* Search Bar */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search the collection..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-16 pr-16 py-6 bg-transparent border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 font-light tracking-wide focus:border-gray-900 dark:focus:border-gray-100 transition-colors duration-300 text-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* View Mode and Filter Controls */}
          <div className="flex flex-wrap items-center justify-center gap-12">
            {/* View Mode Toggle */}
            <div className="flex items-center space-x-6">
              <span className="text-sm font-light text-gray-600 dark:text-gray-400 tracking-wide">View:</span>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setViewMode('masonry')}
                  className={`p-3 transition-colors duration-300 ${
                    viewMode === 'masonry'
                      ? 'text-gray-900 dark:text-gray-100'
                      : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                  }`}
                  title="Masonry Layout"
                >
                  <LayoutGrid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 transition-colors duration-300 ${
                    viewMode === 'grid'
                      ? 'text-gray-900 dark:text-gray-100'
                      : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                  }`}
                  title="Grid Layout"
                >
                  <Grid3X3 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('wall')}
                  className={`p-3 transition-colors duration-300 ${
                    viewMode === 'wall'
                      ? 'text-gray-900 dark:text-gray-100'
                      : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                  }`}
                  title="Gallery Wall"
                >
                  <Circle className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 font-light tracking-wide transition-colors duration-300"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="border border-gray-200 dark:border-gray-800 p-12 space-y-12 max-w-4xl mx-auto">
              <div>
                <label className="block text-lg font-light text-gray-700 dark:text-gray-300 mb-6 tracking-wide">
                  Media Type
                </label>
                <div className="flex flex-wrap gap-6">
                  {['all', 'image', 'video', 'interactive'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilterType(type)}
                      className={`px-6 py-3 text-sm font-light tracking-wide transition-all duration-300 ${
                        filterType === type
                          ? 'text-gray-900 dark:text-gray-100 border-b-2 border-gray-900 dark:border-gray-100'
                          : 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                    >
                      {type === 'all' ? 'All Works' : type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-light text-gray-700 dark:text-gray-300 mb-6 tracking-wide">
                  Themes
                </label>
                <div className="flex flex-wrap gap-6">
                  <button
                    onClick={() => setFilterTag('all')}
                    className={`px-6 py-3 text-sm font-light tracking-wide transition-all duration-300 ${
                      filterTag === 'all'
                        ? 'text-gray-900 dark:text-gray-100 border-b-2 border-gray-900 dark:border-gray-100'
                        : 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    All Themes
                  </button>
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setFilterTag(tag)}
                      className={`px-6 py-3 text-sm font-light tracking-wide transition-all duration-300 ${
                        filterTag === tag
                          ? 'text-gray-900 dark:text-gray-100 border-b-2 border-gray-900 dark:border-gray-100'
                          : 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center space-x-6">
            <div className="minimal-dot"></div>
            <p className="text-gray-600 dark:text-gray-400 font-light tracking-wide text-lg">
              {filteredProjects.length} of {projects.length} works
            </p>
            <div className="minimal-dot"></div>
          </div>
        </div>

        {/* Gallery Content */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-32">
            <Circle className="h-12 w-12 text-gray-300 dark:text-gray-700 mx-auto mb-8" />
            <h3 className="text-2xl font-light text-gray-500 dark:text-gray-500 mb-4">
              No works found
            </h3>
            <p className="text-gray-400 dark:text-gray-600 font-light">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="mb-32">
            {viewMode === 'masonry' && (
              <MasonryGrid projects={filteredProjects} onProjectClick={handleProjectClick} />
            )}
            {viewMode === 'grid' && renderStandardGrid()}
            {viewMode === 'wall' && renderGalleryWall()}
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {lightboxProject && (
        <Lightbox
          project={lightboxProject}
          projects={filteredProjects}
          onClose={() => setLightboxProject(null)}
          onNavigate={handleLightboxNavigate}
        />
      )}
    </div>
  );
};

export default Gallery;