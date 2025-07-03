
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Book, Home, BookOpen, Upload, Brain, MessageSquare, Calendar, BarChart3, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  const navigationItems = [
    { path: '/', label: '홈', icon: Home },
    { path: '/vocabulary', label: '단어장', icon: BookOpen },
    { path: '/review', label: '복습', icon: Brain },
    { path: '/qna', label: 'Q&A', icon: MessageSquare },
    { path: '/curriculum', label: '커리큘럼', icon: Calendar },
    { path: '/progress', label: '학습현황', icon: BarChart3 },
    { path: '/creator', label: '강사용', icon: Upload }
  ];
  
  const NavButton = ({ item, isMobile = false }: { item: any, isMobile?: boolean }) => {
    const Icon = item.icon;
    return (
      <Link to={item.path} onClick={() => isMobile && setIsMenuOpen(false)}>
        <Button 
          variant={isActive(item.path) ? 'default' : 'ghost'}
          size={isMobile ? 'default' : 'sm'}
          className={`${
            isActive(item.path) 
              ? 'bg-pink-500 hover:bg-pink-600 text-white' 
              : 'hover:bg-pink-50 text-gray-700'
          } ${isMobile ? 'w-full justify-start' : ''}`}
        >
          <Icon className="w-4 h-4 mr-2" />
          {item.label}
        </Button>
      </Link>
    );
  };
  
  return (
    <>
      {/* Desktop/Tablet Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-pink-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-lg flex items-center justify-center">
                <Book className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                MediaCademy
              </h1>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {navigationItems.map((item) => (
                <NavButton key={item.path} item={item} />
              ))}
            </nav>
            
            {/* Mobile Menu Button */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="flex items-center space-x-2 pb-4 border-b border-pink-200">
                    <div className="w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-400 rounded-lg flex items-center justify-center">
                      <Book className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="text-lg font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                      MediaCademy
                    </h2>
                  </div>
                  {navigationItems.map((item) => (
                    <NavButton key={item.path} item={item} isMobile />
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-pink-200 z-50">
        <div className="grid grid-cols-4 gap-1 p-2">
          {navigationItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            return (
              <Link 
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-pink-500 text-white'
                    : 'text-gray-600 hover:bg-pink-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Header;
