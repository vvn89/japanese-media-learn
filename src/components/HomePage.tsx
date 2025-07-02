
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Clock, Users, Star, Music, BookOpen, Tv, Radio, Newspaper, GraduationCap } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  
  const categories = [
    { name: '전체', icon: Star },
    { name: 'JLPT', icon: GraduationCap },
    { name: '회화', icon: Users },
    { name: '애니메이션', icon: Tv },
    { name: '드라마', icon: Tv },
    { name: '뉴스', icon: Newspaper },
    { name: '노래', icon: Music },
    { name: '라디오', icon: Radio }
  ];
  
  // Mock content data with enhanced JLPT content
  const mockContent = [
    {
      id: 1,
      title: "비즈니스 일본어 - 회의 표현",
      category: "회화",
      level: "N2",
      duration: "12:34",
      views: "1.2k",
      thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=450&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      isJLPTExclusive: false
    },
    {
      id: 2,
      title: "일본 뉴스로 배우는 시사 일본어",
      category: "뉴스",
      level: "N1",
      duration: "15:20",
      views: "850",
      thumbnail: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=450&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      isJLPTExclusive: false
    },
    {
      id: 3,
      title: "애니메이션으로 배우는 일상 회화",
      category: "애니메이션",
      level: "N3",
      duration: "8:45",
      views: "2.1k",
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=450&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      isJLPTExclusive: false
    },
    {
      id: 4,
      title: "J-POP으로 배우는 자연스러운 일본어",
      category: "노래",
      level: "N4",
      duration: "10:15",
      views: "3.5k",
      thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=450&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      isJLPTExclusive: false
    },
    // JLPT Exclusive Content
    {
      id: 5,
      title: "JLPT N2 문법 완전정복 - 으로/로 표현",
      category: "JLPT",
      level: "N2",
      duration: "25:30",
      views: "4.2k",
      thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=450&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      isJLPTExclusive: true,
      relatedMedia: [
        { id: 1, title: "비즈니스 일본어 - 회의 표현", category: "회화" },
        { id: 2, title: "일본 뉴스로 배우는 시사 일본어", category: "뉴스" }
      ]
    },
    {
      id: 6,
      title: "JLPT N3 필수 동사 활용",
      category: "JLPT",
      level: "N3",
      duration: "18:45",
      views: "3.1k",
      thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=450&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      isJLPTExclusive: true,
      relatedMedia: [
        { id: 3, title: "애니메이션으로 배우는 일상 회화", category: "애니메이션" }
      ]
    },
    {
      id: 7,
      title: "JLPT N1 고급 표현 마스터",
      category: "JLPT",
      level: "N1",
      duration: "32:15",
      views: "2.8k",
      thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=450&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      isJLPTExclusive: true,
      relatedMedia: [
        { id: 2, title: "일본 뉴스로 배우는 시사 일본어", category: "뉴스" }
      ]
    }
  ];
  
  const filteredContent = selectedCategory === '전체' 
    ? mockContent 
    : mockContent.filter(item => item.category === selectedCategory);
  
  const getLevelColor = (level: string) => {
    const colors = {
      "N5": "bg-green-500",
      "N4": "bg-blue-500", 
      "N3": "bg-yellow-500",
      "N2": "bg-orange-500",
      "N1": "bg-red-500"
    };
    return colors[level as keyof typeof colors] || "bg-gray-500";
  };
  
  const handleContentClick = (content: any) => {
    if (content.isJLPTExclusive) {
      navigate(`/media/${content.id}`);
    } else {
      navigate(`/content/${content.id}`);
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-12 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          MediaCademy
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          실제 일본 미디어로 배우는 살아있는 일본어
        </p>
        <p className="text-gray-500">
          애니메이션, 드라마, 뉴스, 노래까지! 다양한 콘텐츠로 자연스럽게 일본어를 익혀보세요
        </p>
      </div>
      
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              variant={selectedCategory === category.name ? "default" : "outline"}
              className={`${
                selectedCategory === category.name 
                  ? "bg-pink-500 hover:bg-pink-600 text-white" 
                  : "border-pink-200 text-pink-700 hover:bg-pink-50"
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {category.name}
            </Button>
          );
        })}
      </div>
      
      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredContent.map((content) => (
          <Card 
            key={content.id} 
            className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-pink-100 hover:border-pink-200"
            onClick={() => handleContentClick(content)}
            onMouseEnter={() => setHoveredVideo(content.id)}
            onMouseLeave={() => setHoveredVideo(null)}
          >
            <CardHeader className="p-0">
              <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden relative">
                {hoveredVideo === content.id ? (
                  <video
                    src={content.videoUrl}
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img 
                    src={content.thumbnail} 
                    alt={content.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                <div className="absolute top-2 left-2 flex gap-1">
                  <Badge className={getLevelColor(content.level)}>
                    {content.level}
                  </Badge>
                  {content.isJLPTExclusive && (
                    <Badge className="bg-purple-600">
                      <GraduationCap className="w-3 h-3 mr-1" />
                      독점강의
                    </Badge>
                  )}
                </div>
                <div className="absolute bottom-2 right-2">
                  <Badge variant="secondary" className="bg-black/70 text-white">
                    <Clock className="w-3 h-3 mr-1" />
                    {content.duration}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-lg mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
                {content.title}
              </CardTitle>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="flex items-center">
                  <Play className="w-3 h-3 mr-1" />
                  {content.views} 시청
                </span>
                <Badge variant="outline" className="border-pink-200 text-pink-700">
                  {content.category}
                </Badge>
              </div>
              
              {/* Show related media for JLPT content */}
              {content.isJLPTExclusive && content.relatedMedia && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-2">관련 미디어:</p>
                  <div className="space-y-1">
                    {content.relatedMedia.map((media) => (
                      <div key={media.id} className="text-xs text-pink-600 hover:text-pink-800 cursor-pointer">
                        • {media.title}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Empty State */}
      {filteredContent.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">선택한 카테고리에 콘텐츠가 없습니다</p>
          <Button 
            onClick={() => setSelectedCategory('전체')}
            className="bg-pink-500 hover:bg-pink-600"
          >
            전체 콘텐츠 보기
          </Button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
