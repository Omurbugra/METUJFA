import React, { useState, useMemo, useEffect } from 'react';
import { Filter, Search, X, Circle, Grid3X3, LayoutGrid, Maximize2 } from 'lucide-react';
import { projects, getAllTags, Project } from '../data/projects';
import ArtworkDetail from '../components/ArtworkDetail';
import Lightbox from '../components/Lightbox';

type ViewMode = 'exhibition' | 'masonry' | 'wall';

const Gallery: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [lightboxProject, setLightboxProject] = useState<Project | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterTag, setFilterTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<ViewMode>('exhibition');
  const [showFilters, setShowFilters] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

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

  // Scroll-based section tracking for exhibition mode
  useEffect(() => {
    if (viewMode !== 'exhibition') return;

    const handleScroll = () => {
      const sections = document.querySelectorAll('.exhibition-section');
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
  }, [viewMode, filteredProjects]);

  const handleProjectClick = (project: Project, useDetail = false) => {
    if (useDetail) {
      setSelectedProject(project);
    } else {
      setLightboxProject(project);
    }
  };

  const handleDetailNavigate = (project: Project) => {
    setSelectedProject(project);
  };

  const handleLightboxNavigate = (project: Project) => {
    setLightboxProject(project);
  };

  const getImageHeight = (project: Project, index: number) => {
    // Varied heights for exhibition mode to create visual rhythm
    const heights = [600, 800, 500, 700, 650, 750, 550, 680];
    return heights[index % heights.length];
  };

  const renderExhibitionMode = () => (
    <div className="space-y-32">
      {filteredProjects.map((project, index) => (
        <section
          key={project.id}
          className="exhibition-section relative"
          style={{ minHeight: '100vh' }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className={`grid lg:grid-cols-12 gap-16 items-center min-h-screen py-20 ${
              index % 2 === 0 ? '' : 'lg:grid-flow-col-dense'
            }`}>
              {/* Image Section */}
              <div className={`lg:col-span-8 ${index % 2 === 0 ? '' : 'lg:col-start-5'}`}>
                <div 
                  className="group cursor-pointer relative overflow-hidden bg-gray-50 dark:bg-gray-900"
                  onClick={() => handleProjectClick(project, true)}
                  style={{ height: `${getImageHeight(project, index)}px` }}
                >
                  <img
                    src={project.mediaUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* View Detail Indicator */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-12 h-12 bg-white/90 dark:bg-gray-900/90 rounded-full flex items-center justify-center">
                      <Maximize2 className="h-5 w-5 text-gray-900 dark:text-gray-100" />
                    </div>
                  </div>

                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-700"></div>

                  {/* Featured indicator */}
                  {project.featured && (
                    <div className="absolute top-6 left-6">
                      <div className="w-3 h-3 bg-white rounded-full shadow-lg"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className={`lg:col-span-4 space-y-8 ${index % 2 === 0 ? '' : 'lg:col-start-1'}`}>
                <div className="space-y-6">
                  {/* Section Number */}
                  <div className="text-sm font-light text-gray-400 dark:text-gray-600 tracking-widest uppercase">
                    {String(index + 1).padStart(2, '0')} / {String(filteredProjects.length).padStart(2, '0')}
                  </div>

                  {/* Title */}
                  <h2 className="text-4xl lg:text-5xl font-extralight text-gray-900 dark:text-gray-100 tracking-tight leading-tight">
                    {project.title}
                  </h2>

                  {/* Description */}
                  <p className="text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                    {project.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-500">
                    <span className="font-light tracking-wide">{project.year}</span>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span className="font-light tracking-wide capitalize">{project.mediaType}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-3">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-gray-500 dark:text-gray-500 font-light tracking-wide border border-gray-200 dark:border-gray-800 px-3 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* View Details Button */}
                  <button
                    onClick={() => handleProjectClick(project, true)}
                    className="group inline-flex items-center space-x-3 text-gray-900 dark:text-gray-100 font-light tracking-wide hover:tracking-widest transition-all duration-500 pt-4"
                  >
                    <span>View Details</span>
                    <div className="w-8 h-px bg-gray-900 dark:bg-gray-100 group-hover:w-12 transition-all duration-500"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section Divider */}
          {index < filteredProjects.length - 1 && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
              <div className="w-px h-16 bg-gray-200 dark:bg-gray-800"></div>
            </div>
          )}
        </section>
      ))}
    </div>
  );

  const renderMasonryMode = () => (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-12 space-y-12">
      {filteredProjects.map((project, index) => (
        <div
          key={project.id}
          className="break-inside-avoid group cursor-pointer fade-in mb-12"
          style={{ animationDelay: `${index * 0.1}s` }}
          onClick={() => handleProjectClick(project)}
        >
          <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-900 mb-8">
            <img
              src={project.mediaUrl}
              alt={project.title}
              className="w-full h-auto object-cover transition-all duration-1000 group-hover:scale-105"
              loading="lazy"
            />
            
            {/* Zoom Indicator */}
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="w-10 h-10 bg-white/90 dark:bg-gray-900/90 rounded-full flex items-center justify-center">
                <Maximize2 className="h-4 w-4 text-gray-900 dark:text-gray-100" />
              </div>
            </div>

            {/* Featured indicator */}
            {project.featured && (
              <div className="absolute top-6 left-6">
                <div className="w-2 h-2 bg-white rounded-full shadow-lg"></div>
              </div>
            )}
          </div>

          {/* Caption */}
          <div className="px-4 space-y-4">
            <h3 className="text-2xl font-light text-gray-900 dark:text-gray-100 tracking-wide leading-tight">
              {project.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">
              {project.description}
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-500">
              <span className="font-light tracking-wide">{project.year}</span>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <span className="font-light tracking-wide capitalize">{project.mediaType}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderGalleryWall = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
      {filteredProjects.map((project, index) => (
        <div
          key={project.id}
          className="group cursor-pointer fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
          onClick={() => handleProjectClick(project)}
        >
          <div className="aspect-[4/5] overflow-hidden bg-gray-50 dark:bg-gray-900 mb-8 relative">
            <img
              src={project.mediaUrl}
              alt={project.title}
              className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
              loading="lazy"
            />
            
            {/* Zoom Indicator */}
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="w-10 h-10 bg-white/90 dark:bg-gray-900/90 rounded-full flex items-center justify-center">
                <Maximize2 className="h-4 w-4 text-gray-900 dark:text-gray-100" />
              </div>
            </div>

            {/* Featured indicator */}
            {project.featured && (
              <div className="absolute top-6 left-6">
                <div className="w-2 h-2 bg-white rounded-full shadow-lg"></div>
              </div>
            )}
          </div>
          
          <div className="text-center space-y-4">
            <h3 className="text-xl font-light text-gray-900 dark:text-gray-100 tracking-wide">
              {project.title}
            </h3>
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
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Fixed Navigation Bar */}
      <div className="fixed top-20 left-0 right-0 z-40 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center justify-between gap-8">
            {/* Gallery Title */}
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-extralight text-gray-900 dark:text-gray-100 tracking-tight">
                Exhibition Gallery
              </h1>
              <div className="hidden md:flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-500">
                <span className="font-light tracking-wide">{filteredProjects.length} works</span>
                {viewMode === 'exhibition' && (
                  <>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span className="font-light tracking-wide">Section {currentSection + 1}</span>
                  </>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-8">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 w-64 bg-transparent border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 font-light tracking-wide focus:border-gray-900 dark:focus:border-gray-100 transition-colors duration-300"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('exhibition')}
                  className={`p-3 transition-colors duration-300 ${
                    viewMode === 'exhibition'
                      ? 'text-gray-900 dark:text-gray-100'
                      : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                  }`}
                  title="Exhibition View"
                >
                  <Circle className="h-5 w-5" />
                </button>
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
                  onClick={() => setViewMode('wall')}
                  className={`p-3 transition-colors duration-300 ${
                    viewMode === 'wall'
                      ? 'text-gray-900 dark:text-gray-100'
                      : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                  }`}
                  title="Gallery Wall"
                >
                  <Grid3X3 className="h-5 w-5" />
                </button>
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 font-light tracking-wide transition-colors duration-300"
              >
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-900 space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-light text-gray-700 dark:text-gray-300 mb-4 tracking-wide">
                    Media Type
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {['all', 'image', 'video', 'interactive'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setFilterType(type)}
                        className={`px-4 py-2 text-sm font-light tracking-wide transition-all duration-300 ${
                          filterType === type
                            ? 'text-gray-900 dark:text-gray-100 border-b border-gray-900 dark:border-gray-100'
                            : 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                      >
                        {type === 'all' ? 'All Works' : type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-light text-gray-700 dark:text-gray-300 mb-4 tracking-wide">
                    Themes
                  </label>
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => setFilterTag('all')}
                      className={`px-4 py-2 text-sm font-light tracking-wide transition-all duration-300 ${
                        filterTag === 'all'
                          ? 'text-gray-900 dark:text-gray-100 border-b border-gray-900 dark:border-gray-100'
                          : 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                    >
                      All Themes
                    </button>
                    {allTags.slice(0, 6).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setFilterTag(tag)}
                        className={`px-4 py-2 text-sm font-light tracking-wide transition-all duration-300 ${
                          filterTag === tag
                            ? 'text-gray-900 dark:text-gray-100 border-b border-gray-900 dark:border-gray-100'
                            : 'text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Gallery Content */}
      <div className="pt-32">
        {filteredProjects.length === 0 ? (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <Circle className="h-12 w-12 text-gray-300 dark:text-gray-700 mx-auto mb-8" />
              <h3 className="text-2xl font-light text-gray-500 dark:text-gray-500 mb-4">
                No works found
              </h3>
              <p className="text-gray-400 dark:text-gray-600 font-light">
                Try adjusting your search or filter criteria
              </p>
            </div>
          </div>
        ) : (
          <div className={viewMode === 'exhibition' ? '' : 'max-w-7xl mx-auto px-6 lg:px-8 pb-32'}>
            {viewMode === 'exhibition' && renderExhibitionMode()}
            {viewMode === 'masonry' && renderMasonryMode()}
            {viewMode === 'wall' && renderGalleryWall()}
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedProject && (
        <ArtworkDetail
          project={selectedProject}
          projects={filteredProjects}
          onClose={() => setSelectedProject(null)}
          onNavigate={handleDetailNavigate}
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