import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Circle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/about', label: 'About' },
    { path: '/team', label: 'Team' },
  ];

  const isHomePage = location.pathname === '/';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled || !isHomePage
        ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-900'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <Circle className="h-6 w-6 text-gray-900 dark:text-gray-100 group-hover:rotate-180 transition-transform duration-500" />
            <span className="text-lg font-light tracking-wide text-gray-900 dark:text-gray-100">
              META JFA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-light tracking-wide transition-colors duration-300 relative group ${
                  location.pathname === item.path
                    ? 'text-gray-900 dark:text-gray-100'
                    : isScrolled || !isHomePage
                    ? 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <div className="absolute -bottom-1 left-0 w-full h-px bg-gray-900 dark:bg-gray-100"></div>
                )}
              </Link>
            ))}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 transition-colors duration-300 ${
                isScrolled || !isHomePage
                  ? 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 transition-colors duration-300 ${
                isScrolled || !isHomePage
                  ? 'text-gray-600 dark:text-gray-400'
                  : 'text-white/80'
              }`}
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 transition-colors duration-300 ${
                isScrolled || !isHomePage
                  ? 'text-gray-600 dark:text-gray-400'
                  : 'text-white/80'
              }`}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900">
          <div className="px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block py-2 text-sm font-light tracking-wide transition-colors duration-300 ${
                  location.pathname === item.path
                    ? 'text-gray-900 dark:text-gray-100'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;