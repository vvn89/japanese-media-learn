
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Target, CheckCircle, Clock, Play, BookOpen, Award } from 'lucide-react';
import { toast } from 'sonner';

const Curriculum = () => {
  const [selectedPlan, setSelectedPlan] = useState('7days');
  const [currentProgress, setCurrentProgress] = useState(20);
  
  // 커리큘럼 데이터
  const curriculumPlans = {
    '7days': {
      title: '7일 집중 코스',
      description: 'JLPT 시험 직전 마무리 학습',
      totalLessons: 14,
      dailyLessons: 2,
      schedule: [
        { day: 1, topic: 'N2 핵심 문법 1', lessons: ['조건표현', '시간표현'], completed: true },
        { day: 2, topic: 'N2 핵심 문법 2', lessons: ['사역표현', '수동표현'], completed: true },
        { day: 3, topic: 'N2 어휘 집중', lessons: ['비즈니스 어휘', '일상 어휘'], completed: false },
        { day: 4, topic: '독해 연습', lessons: ['문단 독해', '긴 문장 분석'], completed: false },
        { day: 5, topic: '청해 연습', lessons: ['대화 듣기', '뉴스 듣기'], completed: false },
        { day: 6, topic: '종합 문제', lessons: ['모의고사 1', '모의고사 2'], completed: false },
        { day: 7, topic: '최종 점검', lessons: ['약점 보완', '시험 팁'], completed: false }
      ]
    },
    '30days': {
      title: '30일 정규 코스',
      description: '체계적인 JLPT 완전 정복',
      totalLessons: 60,
      dailyLessons: 2,
      schedule: [
        { day: 1, topic: '기초 문법 정리', lessons: ['동사 활용', '형용사 활용'], completed: true },
        { day: 2, topic: '핵심 문법 1주차', lessons: ['て형 표현', 'た형 표현'], completed: true },
        // ... 더 많은 일정
      ]
    },
    '60days': {
      title: '60일 완성 코스',
      description: '초급부터 중급까지 단계별 학습',
      totalLessons: 120,
      dailyLessons: 2,
      schedule: [
        { day: 1, topic: 'JLPT 입문', lessons: ['히라가나 완성', '기본 인사'], completed: true },
        { day: 2, topic: '기초 어휘', lessons: ['숫자', '요일'], completed: true },
        // ... 더 많은 일정
      ]
    }
  };
  
  const currentPlan = curriculumPlans[selectedPlan as keyof typeof curriculumPlans];
  const completedLessons = currentPlan.schedule.filter(day => day.completed).length;
  const progressPercentage = (completedLessons / currentPlan.schedule.length) * 100;
  
  const startCurriculum = () => {
    toast.success(`${currentPlan.title} 학습을 시작합니다!`);
  };
  
  const markAsComplete = (dayIndex: number) => {
    // 실제로는 상태 업데이트 로직이 들어갈 예정
    toast.success('학습 완료로 표시되었습니다!');
  };
  
  return (
    <div className="max-w-6xl mx-auto space-y-6 p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
          JLPT 커리큘럼
        </h1>
        <p className="text-gray-600">체계적인 학습 계획으로 목표 달성하기</p>
      </div>
      
      {/* 코스 선택 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(curriculumPlans).map(([key, plan]) => (
          <Card 
            key={key}
            className={`cursor-pointer transition-all ${
              selectedPlan === key 
                ? 'border-pink-300 bg-pink-50' 
                : 'border-gray-200 hover:border-pink-200'
            }`}
            onClick={() => setSelectedPlan(key)}
          >
            <CardHeader className="text-center">
              <CardTitle className="text-lg">{plan.title}</CardTitle>
              <p className="text-sm text-gray-600">{plan.description}</p>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-2">
                <Badge variant="outline" className="border-pink-200 text-pink-700">
                  총 {plan.totalLessons}강의
                </Badge>
                <p className="text-sm text-gray-500">
                  하루 {plan.dailyLessons}강의씩
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* 선택된 커리큘럼 상세 */}
      <Card className="border-pink-100">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-pink-600" />
              {currentPlan.title} 상세 계획
            </CardTitle>
            <Button onClick={startCurriculum} className="bg-pink-500 hover:bg-pink-600">
              <Play className="w-4 h-4 mr-2" />
              학습 시작
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 진행률 */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">학습 진행률</span>
              <span className="text-sm text-gray-500">
                {completedLessons}/{currentPlan.schedule.length}일 완료
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <p className="text-xs text-gray-500">
              {Math.round(progressPercentage)}% 완료
            </p>
          </div>
          
          {/* 학습 일정 */}
          <div className="space-y-3">
            <h3 className="font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-600" />
              학습 일정
            </h3>
            <div className="grid gap-3">
              {currentPlan.schedule.slice(0, 7).map((day, index) => (
                <Card 
                  key={index}
                  className={`${
                    day.completed 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-gray-200 hover:border-pink-200'
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          day.completed 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {day.completed ? <CheckCircle className="w-4 h-4" /> : day.day}
                        </div>
                        <div>
                          <h4 className="font-medium">{day.topic}</h4>
                          <div className="flex gap-2 mt-1">
                            {day.lessons.map((lesson, lessonIndex) => (
                              <Badge key={lessonIndex} variant="outline" className="text-xs">
                                {lesson}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      {!day.completed && (
                        <Button
                          onClick={() => markAsComplete(index)}
                          variant="outline"
                          size="sm"
                          className="border-green-200 text-green-600 hover:bg-green-50"
                        >
                          완료 표시
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* 성취 배지 */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg">
            <h3 className="font-medium flex items-center gap-2 mb-3">
              <Award className="w-4 h-4 text-yellow-600" />
              성취 배지
            </h3>
            <div className="flex gap-2">
              <Badge className="bg-yellow-500">7일 연속 학습</Badge>
              <Badge className="bg-blue-500">첫 번째 모의고사</Badge>
              <Badge variant="outline" className="border-gray-300 text-gray-500">
                완주 배지 (진행중)
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Curriculum;
