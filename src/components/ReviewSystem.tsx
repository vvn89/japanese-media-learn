
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Brain, Target, CheckCircle, Clock, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

const ReviewSystem = () => {
  const [todayReview, setTodayReview] = useState([]);
  const [reviewProgress, setReviewProgress] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(10);
  const [completedToday, setCompletedToday] = useState(0);
  
  // 학습 곡선 기반 복습 일정 (에빙하우스 망각곡선)
  const reviewSchedule = [1, 3, 7, 14, 30]; // 일 단위
  
  // 오늘의 복습 콘텐츠 (mock data)
  const mockTodayReview = [
    {
      id: 1,
      type: 'sentence',
      content: '今日の会議を始めさせていただきます。',
      korean: '오늘 회의를 시작하겠습니다.',
      level: 'N3',
      lastStudied: '2일 전',
      reviewCount: 2,
      difficulty: 'medium'
    },
    {
      id: 2,
      type: 'word',
      content: '売上',
      korean: '매출',
      level: 'N2',
      lastStudied: '1주일 전',
      reviewCount: 1,
      difficulty: 'hard'
    },
    {
      id: 3,
      type: 'sentence',
      content: 'こんにちは、皆さん。',
      korean: '안녕하세요, 여러분.',
      level: 'N5',
      lastStudied: '1개월 전',
      reviewCount: 5,
      difficulty: 'easy'
    }
  ];
  
  useEffect(() => {
    setTodayReview(mockTodayReview);
    setReviewProgress((completedToday / dailyGoal) * 100);
  }, [completedToday, dailyGoal]);
  
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
  
  const getDifficultyIcon = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'medium': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'hard': return <RotateCcw className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };
  
  const handleReviewComplete = (itemId: number, isCorrect: boolean) => {
    setCompletedToday(prev => prev + 1);
    if (isCorrect) {
      toast.success("정답입니다! 다음 복습은 더 늦은 시기에 예정됩니다.");
    } else {
      toast.error("다시 한번 복습해보세요!");
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      {/* 오늘의 학습 목표 */}
      <Card className="border-pink-100 bg-gradient-to-r from-pink-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-pink-600" />
            오늘의 복습 목표
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">진행률</span>
              <span className="text-sm font-medium">{completedToday}/{dailyGoal}</span>
            </div>
            <Progress value={reviewProgress} className="h-3" />
            <div className="flex justify-between text-sm text-gray-500">
              <span>매일 꾸준히 복습하여 기억을 강화하세요</span>
              <span>{Math.round(reviewProgress)}% 완료</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* 오늘의 복습 콘텐츠 */}
      <Card className="border-pink-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            오늘의 복습 ({todayReview.length}개)
          </CardTitle>
          <p className="text-sm text-gray-600">
            학습 곡선에 맞춰 최적의 타이밍에 복습하세요
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todayReview.map((item) => (
              <Card key={item.id} className="border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getLevelColor(item.level)}>{item.level}</Badge>
                        <Badge variant="outline">{item.type === 'sentence' ? '문장' : '단어'}</Badge>
                        {getDifficultyIcon(item.difficulty)}
                      </div>
                      <h3 className="text-lg font-medium mb-1">{item.content}</h3>
                      <p className="text-gray-600 mb-2">{item.korean}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>마지막 학습: {item.lastStudied}</span>
                        <span>복습 횟수: {item.reviewCount}회</span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        onClick={() => handleReviewComplete(item.id, false)}
                        variant="outline"
                        size="sm"
                        className="border-red-200 text-red-600 hover:bg-red-50"
                      >
                        어려움
                      </Button>
                      <Button
                        onClick={() => handleReviewComplete(item.id, true)}
                        size="sm"
                        className="bg-green-500 hover:bg-green-600"
                      >
                        기억함
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* 복습 일정 안내 */}
      <Card className="border-pink-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            스마트 복습 시스템
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-2">
            {reviewSchedule.map((day, index) => (
              <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-bold text-purple-600">{day}일</div>
                <div className="text-xs text-gray-500">
                  {index + 1}차 복습
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-4">
            과학적으로 검증된 에빙하우스 망각곡선을 기반으로 최적의 복습 타이밍을 제공합니다.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewSystem;
