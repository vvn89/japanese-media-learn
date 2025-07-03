
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Send, ThumbsUp, Clock, User, GraduationCap } from 'lucide-react';
import { toast } from 'sonner';

const QnASystem = () => {
  const [newQuestion, setNewQuestion] = useState('');
  const [questionTitle, setQuestionTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('문법');
  
  // Mock QnA data
  const mockQnAs = [
    {
      id: 1,
      title: 'させていただきます의 정확한 사용법',
      question: '비즈니스 일본어에서 させていただきます를 언제 사용하는지 궁금합니다.',
      answer: 'させていただきます는 겸양어로, 상대방의 허락을 받아 어떤 행동을 할 때 사용합니다. 비즈니스 상황에서 정중함을 표현할 때 자주 쓰입니다.',
      category: '문법',
      level: 'N2',
      author: '학습자A',
      instructor: '김선생님',
      timestamp: '2시간 전',
      likes: 5,
      isAnswered: true
    },
    {
      id: 2,
      title: '애니메이션에서 나오는 일상 표현 질문',
      question: '애니메이션에서 자주 나오는 そうですね와 そうですか의 차이가 뭔가요?',
      answer: 'そうですね는 동의나 긍정의 의미이고, そうですか는 놀람이나 새로운 정보에 대한 반응입니다.',
      category: '회화',
      level: 'N4',
      author: '학습자B',
      instructor: '이선생님',
      timestamp: '1일 전',
      likes: 3,
      isAnswered: true
    },
    {
      id: 3,
      title: 'JLPT N1 문법 関して vs について',
      question: '関して와 について의 차이점을 알고 싶습니다.',
      answer: '',
      category: '문법',
      level: 'N1',
      author: '학습자C',
      instructor: '',
      timestamp: '3시간 전',
      likes: 0,
      isAnswered: false
    }
  ];
  
  const categories = ['전체', '문법', '어휘', '회화', '듣기', '읽기', '문화'];
  
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
  
  const handleSubmitQuestion = () => {
    if (!questionTitle.trim() || !newQuestion.trim()) {
      toast.error('제목과 질문 내용을 모두 입력해주세요.');
      return;
    }
    toast.success('질문이 등록되었습니다. 곧 선생님이 답변해드릴 예정입니다.');
    setQuestionTitle('');
    setNewQuestion('');
  };
  
  const filteredQnAs = selectedCategory === '전체' 
    ? mockQnAs 
    : mockQnAs.filter(qa => qa.category === selectedCategory);
  
  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
          학습 Q&A
        </h1>
        <p className="text-gray-600">선생님과 함께하는 학습 질의응답</p>
      </div>
      
      <Tabs defaultValue="questions" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="questions">Q&A 보기</TabsTrigger>
          <TabsTrigger value="ask">질문하기</TabsTrigger>
        </TabsList>
        
        <TabsContent value="questions" className="space-y-4">
          {/* 카테고리 필터 */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                className={`${
                  selectedCategory === category 
                    ? "bg-pink-500 hover:bg-pink-600" 
                    : "border-pink-200 text-pink-700 hover:bg-pink-50"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
          
          {/* Q&A 목록 */}
          <div className="space-y-4">
            {filteredQnAs.map((qa) => (
              <Card key={qa.id} className="border-pink-100 hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getLevelColor(qa.level)}>{qa.level}</Badge>
                        <Badge variant="outline">{qa.category}</Badge>
                        {qa.isAnswered ? (
                          <Badge className="bg-green-500">답변완료</Badge>
                        ) : (
                          <Badge variant="outline" className="border-orange-200 text-orange-600">
                            답변대기
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg">{qa.title}</CardTitle>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      {qa.timestamp}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium">{qa.author}</span>
                    </div>
                    <p className="text-gray-700">{qa.question}</p>
                  </div>
                  
                  {qa.isAnswered && qa.answer && (
                    <div className="bg-pink-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <GraduationCap className="w-4 h-4 text-pink-600" />
                        <span className="text-sm font-medium text-pink-700">{qa.instructor}</span>
                      </div>
                      <p className="text-gray-700">{qa.answer}</p>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-2 border-t">
                    <Button variant="ghost" size="sm" className="hover:bg-pink-50">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      도움돼요 ({qa.likes})
                    </Button>
                    <Button variant="ghost" size="sm" className="hover:bg-pink-50">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      댓글
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="ask" className="space-y-4">
          <Card className="border-pink-100">
            <CardHeader>
              <CardTitle>새 질문 작성</CardTitle>
              <p className="text-sm text-gray-600">
                선생님이 자세히 답변해드릴게요!
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">카테고리</label>
                <div className="flex flex-wrap gap-2">
                  {categories.slice(1).map((category) => (
                    <Button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      className={`${
                        selectedCategory === category 
                          ? "bg-pink-500 hover:bg-pink-600" 
                          : "border-pink-200 text-pink-700 hover:bg-pink-50"
                      }`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">제목</label>
                <Input
                  value={questionTitle}
                  onChange={(e) => setQuestionTitle(e.target.value)}
                  placeholder="질문 제목을 입력하세요"
                  className="border-pink-200 focus:border-pink-400"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">질문 내용</label>
                <Textarea
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="궁금한 내용을 자세히 적어주세요"
                  rows={6}
                  className="border-pink-200 focus:border-pink-400"
                />
              </div>
              
              <Button 
                onClick={handleSubmitQuestion}
                className="w-full bg-pink-500 hover:bg-pink-600"
              >
                <Send className="w-4 h-4 mr-2" />
                질문 등록하기
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QnASystem;
