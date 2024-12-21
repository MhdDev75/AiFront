import Footer from '../../components/layout/footer';
import React from 'react';

const PanelLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen main-div pt-20">
      <main className="container  mx-auto relative flex-1 overflow-y-auto px-4 py-2">{children}</main>
      <Footer />
    </div>
  );
};

export default PanelLayout;
