
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Book, Home, BookOpen, Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-pink-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-lg flex items-center justify-center">
              <Book className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              MediaCademy
            </h1>
          </Link>
          
          <nav className="flex items-center space-x-4">
            <Link to="/">
              <Button 
                variant={isActive('/') ? 'default' : 'ghost'}
                className={isActive('/') ? 'bg-pink-500 hover:bg-pink-600' : 'hover:bg-pink-50'}
              >
                <Home className="w-4 h-4 mr-2" />
                홈
              </Button>
            </Link>
            
            <Link to="/vocabulary">
              <Button 
                variant={isActive('/vocabulary') ? 'default' : 'ghost'}
                className={isActive('/vocabulary') ? 'bg-pink-500 hover:bg-pink-600' : 'hover:bg-pink-50'}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                단어장
              </Button>
            </Link>
            
            <Link to="/creator">
              <Button 
                variant={isActive('/creator') ? 'default' : 'ghost'}
                className={isActive('/creator') ? 'bg-pink-500 hover:bg-pink-600' : 'hover:bg-pink-50'}
              >
                <Upload className="w-4 h-4 mr-2" />
                강사용
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
