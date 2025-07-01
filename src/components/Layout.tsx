import React from 'react';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-500">
      <Navigation />
      <main className="relative">
        {children}
      </main>
    </div>
  );
};

export default Layout;