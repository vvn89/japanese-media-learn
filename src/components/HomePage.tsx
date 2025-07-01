
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Star, Filter } from 'lucide-react';

const HomePage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  const filters = [
    { id: 'all', name: '전체', color: 'bg-gray-100 text-gray-800' },
    { id: 'jlpt', name: 'JLPT', color: 'bg-blue-100 text-blue-800' },
    { id: 'conversation', name: '회화', color: 'bg-green-100 text-green-800' },
    { id: 'anime', name: '애니메이션', color: 'bg-purple-100 text-purple-800' },
    { id: 'drama', name: '드라마', color: 'bg-pink-100 text-pink-800' },
    { id: 'news', name: '뉴스', color: 'bg-orange-100 text-orange-800' },
  ];
  
  const contents = [
    {
      id: 1,
      title: "비즈니스 일본어 - 회의 표현",
      category: "회화",
      level: "N2",
      duration: "12:34",
      thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=225&fit=crop",
      rating: 4.8,
      description: "실제 일본 회사 회의에서 사용되는 표현들을 배워보세요"
    },
    {
      id: 2,
      title: "일본 뉴스로 배우는 시사 일본어",
      category: "뉴스",
      level: "N1",
      duration: "8:45",
      thumbnail: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=225&fit=crop",
      rating: 4.9,
      description: "최신 일본 뉴스를 통해 고급 일본어 표현을 익혀보세요"
    },
    {
      id: 3,
      title: "애니메이션으로 배우는 일상 회화",
      category: "애니메이션",
      level: "N3",
      duration: "15:20",
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=225&fit=crop",
      rating: 4.7,
      description: "인기 애니메이션 장면으로 자연스러운 일본어 대화 익히기"
    },
    {
      id: 4,
      title: "J-드라마 명장면 분석",
      category: "드라마",
      level: "N2",
      duration: "10:12",
      thumbnail: "https://images.unsplash.com/photo-1489599043532-1a4d8aad3a3c?w=400&h=225&fit=crop",
      rating: 4.6,
      description: "일본 드라마 속 감정 표현과 실생활 일본어"
    },
    {
      id: 5,
      title: "JLPT N2 문법 완전정복",
      category: "JLPT",
      level: "N2",
      duration: "18:30",
      thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=225&fit=crop",
      rating: 4.9,
      description: "JLPT N2 필수 문법을 실제 사용 예시와 함께"
    },
    {
      id: 6,
      title: "일본 여행 필수 표현",
      category: "회화",
      level: "N4",
      duration: "14:15",
      thumbnail: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&h=225&fit=crop",
      rating: 4.5,
      description: "일본 여행에서 꼭 필요한 실전 회화 표현들"
    }
  ];
  
  const filteredContents = selectedFilter === 'all' 
    ? contents 
    : contents.filter(content => 
        content.category.toLowerCase() === selectedFilter || 
        (selectedFilter === 'jlpt' && content.category === 'JLPT')
      );
  
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
          실제 일본 미디어로 배우는
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
          살아있는 일본어 학습
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          애니메이션, 드라마, 뉴스 등 실제 일본 미디어 콘텐츠로 JLPT부터 실전 회화까지 한 번에!
        </p>
      </div>
      
      {/* Filters */}
      <div className="flex flex-wrap gap-3 justify-center">
        <div className="flex items-center gap-2 text-gray-600 font-medium">
          <Filter className="w-4 h-4" />
          필터:
        </div>
        {filters.map(filter => (
          <Button
            key={filter.id}
            variant={selectedFilter === filter.id ? 'default' : 'outline'}
            onClick={() => setSelectedFilter(filter.id)}
            className={selectedFilter === filter.id 
              ? 'bg-pink-500 hover:bg-pink-600 border-pink-500' 
              : 'hover:bg-pink-50 border-pink-200'
            }
          >
            {filter.name}
          </Button>
        ))}
      </div>
      
      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContents.map(content => (
          <Card key={content.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-pink-100">
            <CardHeader className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={content.thumbnail} 
                  alt={content.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <Play className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="absolute top-2 right-2 flex gap-2">
                  <Badge className={`${content.level === 'N1' ? 'bg-red-500' : content.level === 'N2' ? 'bg-orange-500' : content.level === 'N3' ? 'bg-yellow-500' : 'bg-green-500'} text-white`}>
                    {content.level}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs border-pink-200 text-pink-700">
                  {content.category}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="w-3 h-3" />
                  {content.duration}
                </div>
              </div>
              <CardTitle className="text-lg mb-2 group-hover:text-pink-600 transition-colors">
                {content.title}
              </CardTitle>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {content.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                  <span className="text-sm font-medium">{content.rating}</span>
                </div>
                <Link to={`/content/${content.id}`}>
                  <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                    학습 시작
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
