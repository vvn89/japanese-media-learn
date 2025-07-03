
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, BarChart3, Clock, Play, Pause, CheckCircle, BookOpen, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StudyProgress = () => {
  const navigate = useNavigate();
  
  // Mock study data
  const studyStats = {
    totalWatchTime: 1250, // minutes
    completedVideos: 15,
    totalVideos: 32,
    currentStreak: 7,
    longestStreak: 12,
    totalSentences: 245,
    totalWords: 180
  };
  
  const recentlyWatched = [
    {
      id: 1,
      title: "비즈니스 일본어 - 회의 표현",
      thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=450&fit=crop",
      watchedTime: 45,
      totalTime: 60,
      progress: 75,
      lastWatched: "2시간 전",
      completed: false
    },
    {
      id: 2,
      title: "일본 뉴스로 배우는 시사 일본어",
      thumbnail: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=450&fit=crop",
      watchedTime: 15,
      totalTime: 15,
      progress: 100,
      lastWatched: "1일 전",
      completed: true
    },
    {
      id: 3,
      title: "애니메이션으로 배우는 일상 회화",
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=450&fit=crop",
      watchedTime: 20,
      totalTime: 25,
      progress: 80,
      lastWatched: "2일 전",
      completed: false
    }
  ];
  
  const weeklyProgress = [
    { day: '월', minutes: 45 },
    { day: '화', minutes: 60 },
    { day: '수', minutes: 30 },
    { day: '목', minutes: 75 },
    { day: '금', minutes: 40 },
    { day: '토', minutes: 90 },
    { day: '일', minutes: 55 }
  ];
  
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}시간 ${mins}분`;
    }
    return `${mins}분`;
  };
  
  const continueWatching = (contentId: number) => {
    navigate(`/media/${contentId}`);
  };
  
  return (
    <div className="max-w-6xl mx-auto space-y-6 p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
          학습 현황
        </h1>
        <p className="text-gray-600">나의 학습 기록과 진행상황을 확인하세요</p>
      </div>
      
      {/* 학습 통계 요약 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-pink-100 bg-gradient-to-br from-pink-50 to-purple-50">
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-pink-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-pink-700">
              {formatTime(studyStats.totalWatchTime)}
            </div>
            <p className="text-sm text-gray-600">총 학습시간</p>
          </CardContent>
        </Card>
        
        <Card className="border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-700">
              {studyStats.completedVideos}/{studyStats.totalVideos}
            </div>
            <p className="text-sm text-gray-600">완료한 영상</p>
          </CardContent>
        </Card>
        
        <Card className="border-green-100 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-700">
              {studyStats.currentStreak}일
            </div>
            <p className="text-sm text-gray-600">연속 학습</p>
          </CardContent>
        </Card>
        
        <Card className="border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50">
          <CardContent className="p-4 text-center">
            <BookOpen className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-700">
              {studyStats.totalWords}
            </div>
            <p className="text-sm text-gray-600">학습한 단어</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recent">최근 시청</TabsTrigger>
          <TabsTrigger value="weekly">주간 통계</TabsTrigger>
          <TabsTrigger value="achievements">성취 현황</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recent" className="space-y-4">
          <Card className="border-pink-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="w-5 h-5 text-pink-600" />
                최근 시청한 콘텐츠
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentlyWatched.map((content) => (
                <Card key={content.id} className="border-gray-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="w-32 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={content.thumbnail} 
                          alt={content.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h3 className="font-medium">{content.title}</h3>
                        <div className="flex items-center gap-2">
                          {content.completed ? (
                            <Badge className="bg-green-500">완료</Badge>
                          ) : (
                            <Badge variant="outline" className="border-orange-200 text-orange-600">
                              진행중
                            </Badge>
                          )}
                          <span className="text-sm text-gray-500">
                            {content.lastWatched}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>{formatTime(content.watchedTime)} / {formatTime(content.totalTime)}</span>
                            <span>{content.progress}%</span>
                          </div>
                          <Progress value={content.progress} className="h-2" />
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Button
                          onClick={() => continueWatching(content.id)}
                          size="sm"
                          className="bg-pink-500 hover:bg-pink-600"
                        >
                          {content.completed ? (
                            <>
                              <Play className="w-4 h-4 mr-1" />
                              다시보기
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 mr-1" />
                              계속보기
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="weekly" className="space-y-4">
          <Card className="border-pink-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-600" />
                주간 학습 통계
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyProgress.map((day, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-8 text-sm font-medium text-gray-600">
                      {day.day}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                          <div 
                            className="bg-gradient-to-r from-pink-500 to-purple-500 h-6 rounded-full transition-all duration-300"
                            style={{ width: `${(day.minutes / 90) * 100}%` }}
                          />
                          <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                            {formatTime(day.minutes)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">이번 주 총 학습시간</span>
                  <span className="text-lg font-bold text-pink-600">
                    {formatTime(weeklyProgress.reduce((sum, day) => sum + day.minutes, 0))}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="achievements" className="space-y-4">
          <Card className="border-pink-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-yellow-600" />
                성취도 및 목표 달성
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 학습 목표 진행률 */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">월간 학습 목표</span>
                    <span className="text-sm text-gray-500">15/20시간</span>
                  </div>
                  <Progress value={75} className="h-3" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">단어장 목표</span>
                    <span className="text-sm text-gray-500">180/200개</span>
                  </div>
                  <Progress value={90} className="h-3" />
                </div>
              </div>
              
              {/* 성취 배지 */}
              <div>
                <h3 className="font-medium mb-3">획득한 배지</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl mb-1">🏆</div>
                    <div className="text-xs font-medium">첫 영상 완주</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl mb-1">📚</div>
                    <div className="text-xs font-medium">100단어 달성</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl mb-1">🔥</div>
                    <div className="text-xs font-medium">7일 연속</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudyProgress;
