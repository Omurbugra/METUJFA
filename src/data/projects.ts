export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  mediaType: 'image' | 'video' | 'interactive';
  mediaUrl: string;
  thumbnailUrl: string;
  aspectRatio: 'square' | 'portrait' | 'landscape';
  tags: string[];
  year: number;
  featured: boolean;
  externalLink?: string;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'The Editor\'s Desk',
    description: 'Reconstructs the pre-digital workspace of METU JFA\'s early editorial operations',
    longDescription: 'This installation recreates the physical environment where the journal\'s early editorial work took place. Through careful reconstruction of desks, typewriters, and archival materials, visitors can experience the tactile reality of pre-digital publishing and understand the human labor that sustained academic discourse.',
    mediaType: 'interactive',
    mediaUrl: 'https://example.com/editors-desk',
    thumbnailUrl: 'https://images.unsplash.com/photo-1580757468214-c73f7062a5cb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8MTYlM0E5fGVufDB8fDB8fHww',
    aspectRatio: 'landscape',
    tags: ['archival', 'workspace', 'editorial'],
    year: 2024,
    featured: true
  },
  {
    id: '2',
    title: 'The Ecosystem',
    description: 'Reveals the Journal\'s global presence and enduring resilience',
    longDescription: 'A comprehensive visualization mapping the journal\'s international reach and impact over five decades. This piece demonstrates how METU JFA has created and sustained a global network of architectural discourse, showing patterns of influence and exchange across continents.',
    mediaType: 'interactive',
    mediaUrl: 'https://example.com/ecosystem',
    thumbnailUrl: 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&dpr=2',
    aspectRatio: 'portrait',
    tags: ['network', 'global', 'visualization'],
    year: 2024,
    featured: true
  },
  {
    id: '3',
    title: 'The Correspondence Network',
    description: 'Exposes the human infrastructure that sustained METU JFA\'s development',
    longDescription: 'Through letters, telegrams, and early email exchanges, this piece reveals the personal relationships and professional networks that enabled the journal\'s growth. The correspondence network shows how academic publishing relied on human connections across geographical and institutional boundaries.',
    mediaType: 'image',
    mediaUrl: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    thumbnailUrl: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    aspectRatio: 'square',
    tags: ['correspondence', 'network', 'communication'],
    year: 2024,
    featured: false
  },
  {
    id: '4',
    title: 'The Chronogram',
    description: 'Maps 50 years of non-linear intellectual evolution',
    longDescription: 'Inspired by Charles Jencks\'s 1971 "Evolutionary Tree," this visualization traces the non-linear development of architectural thought through METU JFA. Rather than a simple timeline, it reveals the complex branching and cross-pollination of ideas across decades.',
    mediaType: 'image',
    mediaUrl: 'https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    thumbnailUrl: 'https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    aspectRatio: 'landscape',
    tags: ['chronology', 'evolution', 'mapping'],
    year: 2024,
    featured: true
  },
  {
    id: '5',
    title: 'The Tree',
    description: 'A wooden sculpture listing all METU JFA articles',
    longDescription: 'This physical sculpture transforms the journal\'s complete bibliography into a three-dimensional form. Each article is represented by a wooden plaque, creating a forest of knowledge that visitors can walk through and explore tactilely.',
    mediaType: 'image',
    mediaUrl: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    thumbnailUrl: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&dpr=2',
    aspectRatio: 'portrait',
    tags: ['sculpture', 'bibliography', 'physical'],
    year: 2024,
    featured: false
  },
  {
    id: '6',
    title: 'The Circle',
    description: 'Showcases the expansive periphery of contributors',
    longDescription: 'A circular installation that maps the vast network of contributors to METU JFA over five decades. The piece reveals how the journal has served as a platform for emerging and established voices in architecture, creating a democratic space for discourse.',
    mediaType: 'interactive',
    mediaUrl: 'https://example.com/circle',
    thumbnailUrl: 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    aspectRatio: 'square',
    tags: ['contributors', 'network', 'circular'],
    year: 2024,
    featured: false
  },
  {
    id: '7',
    title: 'The Source Code',
    description: 'A 3D bibliographic universe of 1200 recurring sources',
    longDescription: 'This immersive 3D environment transforms the journal\'s most frequently cited sources into a navigable universe. Visitors can explore the intellectual DNA of architectural discourse, discovering unexpected connections between texts, authors, and ideas.',
    mediaType: 'interactive',
    mediaUrl: 'https://example.com/source-code',
    thumbnailUrl: 'https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    aspectRatio: 'landscape',
    tags: ['bibliography', '3D', 'sources'],
    year: 2024,
    featured: true
  },
  {
    id: '8',
    title: 'Citation Geographies and Chronologies',
    description: 'Reveals the global and temporal dynamics of citations',
    longDescription: 'This dual visualization maps both the geographical spread and temporal evolution of citations within METU JFA. It reveals how architectural knowledge travels across space and time, showing patterns of influence and the globalization of architectural discourse.',
    mediaType: 'image',
    mediaUrl: 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    thumbnailUrl: 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&dpr=2',
    aspectRatio: 'portrait',
    tags: ['citations', 'geography', 'temporal'],
    year: 2024,
    featured: false
  },
  {
    id: '9',
    title: 'The Orbit',
    description: 'Visualizes how research interests evolved',
    longDescription: 'A dynamic visualization showing the orbital patterns of research interests around core architectural themes. This piece reveals how certain topics have remained central while others have emerged, disappeared, or transformed over the journal\'s history.',
    mediaType: 'interactive',
    mediaUrl: 'https://example.com/orbit',
    thumbnailUrl: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    aspectRatio: 'square',
    tags: ['research', 'evolution', 'orbital'],
    year: 2024,
    featured: false
  },
  {
    id: '10',
    title: 'The Dymaxion World',
    description: 'A Buckminster Fuller–inspired globe of 811 referenced cities',
    longDescription: 'Using Fuller\'s Dymaxion projection, this piece maps all 811 cities referenced in METU JFA articles onto a geodesic globe. The installation reveals the global scope of architectural discourse and the journal\'s role in connecting local practices with international conversations.',
    mediaType: 'image',
    mediaUrl: 'https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    thumbnailUrl: 'https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    aspectRatio: 'landscape',
    tags: ['dymaxion', 'global', 'cities'],
    year: 2024,
    featured: true
  },
  {
    id: '11',
    title: 'The Drawings',
    description: 'Honors two unique drawing-only articles',
    longDescription: 'A special tribute to the two articles in METU JFA\'s history that consisted entirely of drawings without text. This installation explores how architectural ideas can be communicated purely through visual language, challenging the primacy of written discourse.',
    mediaType: 'image',
    mediaUrl: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    thumbnailUrl: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&dpr=2',
    aspectRatio: 'portrait',
    tags: ['drawings', 'visual', 'non-textual'],
    year: 2024,
    featured: false
  },
  {
    id: '12',
    title: 'The Visual Corpus',
    description: 'A raw slideshow of the Journal\'s imagery',
    longDescription: 'This piece presents the complete visual archive of METU JFA as a continuous slideshow. Without editorial intervention or categorization, it reveals the evolution of architectural representation and the changing visual language of the discipline.',
    mediaType: 'video',
    mediaUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    aspectRatio: 'square',
    tags: ['visual', 'archive', 'slideshow'],
    year: 2024,
    featured: false
  },
  {
    id: '13',
    title: 'Visual Legacy in Motion',
    description: 'Animates the journal\'s visuals through time',
    longDescription: 'This animated sequence shows how the visual language of METU JFA has evolved over five decades. Through morphing and transitional effects, it reveals the gradual transformation of architectural representation and graphic design.',
    mediaType: 'video',
    mediaUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    aspectRatio: 'landscape',
    tags: ['animation', 'visual', 'evolution'],
    year: 2024,
    featured: false
  },
  {
    id: '14',
    title: 'The Dictionary',
    description: 'Compiles key terms drawn from METU JFA\'s archives',
    longDescription: 'A comprehensive glossary of architectural terminology as it appears in METU JFA, showing how language has evolved and how certain concepts have gained or lost prominence. This piece reveals the journal\'s role in shaping architectural vocabulary.',
    mediaType: 'interactive',
    mediaUrl: 'https://example.com/dictionary',
    thumbnailUrl: 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&dpr=2',
    aspectRatio: 'portrait',
    tags: ['dictionary', 'terminology', 'language'],
    year: 2024,
    featured: true
  }
];

export const getProjectsByType = (type: string) => {
  if (type === 'all') return projects;
  return projects.filter(project => project.mediaType === type);
};

export const getProjectsByTag = (tag: string) => {
  return projects.filter(project => project.tags.includes(tag));
};

export const getFeaturedProjects = () => {
  return projects.filter(project => project.featured);
};

export const getAllTags = () => {
  const tags = new Set<string>();
  projects.forEach(project => {
    project.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
};