import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookmarkCheck, Play, RotateCcw, CheckCircle, XCircle, Volume2, ExternalLink, Filter } from 'lucide-react';
import { toast } from 'sonner';

const Vocabulary = () => {
  const navigate = useNavigate();
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [wrongAnswers, setWrongAnswers] = useState<number[]>([]);
  const [retakeMode, setRetakeMode] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string>('전체');
  
  // Enhanced mock data with levels
  const bookmarkedSentences = [
    {
      id: 0,
      japanese: "こんにちは、皆さん。",
      korean: "안녕하세요, 여러분.",
      pronunciation: "Konnichiwa, minasan.",
      source: "비즈니스 일본어 - 회의 표현",
      level: "N5",
      contentId: 1,
      sentenceId: 0
    },
    {
      id: 1,
      japanese: "今日の会議を始めさせていただきます。",
      korean: "오늘 회의를 시작하겠습니다.",
      pronunciation: "Kyō no kaigi wo hajimesasete itadakimasu.",
      source: "비즈니스 일본어 - 회의 표현",
      level: "N3",
      contentId: 1,
      sentenceId: 1
    },
    {
      id: 2,
      japanese: "まず、売上について話し合いましょう。",
      korean: "먼저 매출에 대해 이야기해봅시다.",
      pronunciation: "Mazu, uriage ni tsuite hanashiaimashō.",
      source: "비즈니스 일본어 - 회의 표현",
      level: "N2",
      contentId: 1,
      sentenceId: 2
    },
    {
      id: 3,
      japanese: "今月の売上は予想を上回りました。",
      korean: "이번 달 매출은 예상을 넘어섰습니다.",
      pronunciation: "Kongetsu no uriage wa yosō wo uwamwarimashita.",
      source: "비즈니스 일본어 - 회의 표현",
      level: "N1",
      contentId: 1,
      sentenceId: 3
    }
  ];
  
  // Enhanced vocabulary words organized by level
  const vocabularyWords = [
    // N5 Level
    {
      id: 1,
      japanese: "こんにちは",
      korean: "안녕하세요",
      pronunciation: "konnichiwa",
      level: "N5",
      relatedContent: [
        { id: 1, title: "비즈니스 일본어 - 회의 표현" },
        { id: 3, title: "애니메이션으로 배우는 일상 회화" }
      ]
    },
    {
      id: 2,
      japanese: "今日",
      korean: "오늘",
      pronunciation: "kyō",
      level: "N5",
      relatedContent: [
        { id: 1, title: "비즈니스 일본어 - 회의 표현" }
      ]
    },
    // N4 Level
    {
      id: 3,
      japanese: "皆さん",
      korean: "여러분",
      pronunciation: "minasan",
      level: "N4",
      relatedContent: [
        { id: 1, title: "비즈니스 일본어 - 회의 표현" }
      ]
    },
    {
      id: 4,
      japanese: "今月",
      korean: "이번 달",
      pronunciation: "kongetsu",
      level: "N4",
      relatedContent: [
        { id: 1, title: "비즈니스 일본어 - 회의 표현" }
      ]
    },
    // N3 Level
    {
      id: 5,
      japanese: "会議",
      korean: "회의",
      pronunciation: "kaigi",
      level: "N3",
      relatedContent: [
        { id: 1, title: "비즈니스 일본어 - 회의 표현" },
        { id: 5, title: "JLPT N2 문법 완전정복" }
      ]
    },
    {
      id: 6,
      japanese: "について",
      korean: "~에 대해",
      pronunciation: "ni tsuite",
      level: "N3",
      relatedContent: [
        { id: 1, title: "비즈니스 일본어 - 회의 표현" }
      ]
    },
    // N2 Level
    {
      id: 7,
      japanese: "売上",
      korean: "매출",
      pronunciation: "uriage",
      level: "N2",
      relatedContent: [
        { id: 1, title: "비즈니스 일본어 - 회의 표현" },
        { id: 2, title: "일본 뉴스로 배우는 시사 일본어" }
      ]
    },
    {
      id: 8,
      japanese: "予想",
      korean: "예상",
      pronunciation: "yosō",
      level: "N2",
      relatedContent: [
        { id: 1, title: "비즈니스 일본어 - 회의 표현" }
      ]
    },
    // N1 Level
    {
      id: 9,
      japanese: "上回る",
      korean: "넘어서다",
      pronunciation: "uwamawaru",
      level: "N1",
      relatedContent: [
        { id: 1, title: "비즈니스 일본어 - 회의 표현" },
        { id: 2, title: "일본 뉴스로 배우는 시사 일본어" }
      ]
    }
  ];
  
  const levels = ['전체', 'N5', 'N4', 'N3', 'N2', 'N1'];
  
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
  
  const getFilteredSentences = () => {
    if (selectedLevel === '전체') return bookmarkedSentences;
    return bookmarkedSentences.filter(sentence => sentence.level === selectedLevel);
  };
  
  const getFilteredWords = () => {
    if (selectedLevel === '전체') return vocabularyWords;
    return vocabularyWords.filter(word => word.level === selectedLevel);
  };
  
  const startQuiz = (retakeOnly = false) => {
    const sentences = getFilteredSentences();
    if (sentences.length === 0) {
      toast.error("선택한 레벨에 문장이 없습니다.");
      return;
    }
    setQuizMode(true);
    setRetakeMode(retakeOnly);
    setCurrentQuizIndex(0);
    setScore(0);
    setAnswered(false);
    setSelectedAnswer(null);
    if (!retakeOnly) {
      setWrongAnswers([]);
    }
  };
  
  const getQuizSentences = () => {
    const filteredSentences = getFilteredSentences();
    return retakeMode 
      ? filteredSentences.filter(s => wrongAnswers.includes(s.id))
      : filteredSentences;
  };
  
  const generateQuizOptions = (correctAnswer: string) => {
    const allSentences = getFilteredSentences();
    const otherAnswers = allSentences
      .filter(s => s.korean !== correctAnswer)
      .map(s => s.korean)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    return [correctAnswer, ...otherAnswers].sort(() => Math.random() - 0.5);
  };
  
  const handleQuizAnswer = (answer: string) => {
    const quizSentences = getQuizSentences();
    const currentSentence = quizSentences[currentQuizIndex];
    const isCorrect = answer === currentSentence.korean;
    
    setSelectedAnswer(answer);
    setAnswered(true);
    
    if (isCorrect) {
      setScore(score + 1);
      toast.success("정답입니다!");
    } else {
      toast.error("틀렸습니다. 다시 한번 들어보세요!");
      if (!retakeMode) {
        setWrongAnswers(prev => [...prev, currentSentence.id]);
      }
    }
    
    setTimeout(() => {
      if (currentQuizIndex < quizSentences.length - 1) {
        setCurrentQuizIndex(currentQuizIndex + 1);
        setAnswered(false);
        setSelectedAnswer(null);
      } else {
        setQuizMode(false);
        const finalScore = score + (isCorrect ? 1 : 0);
        toast.success(`퀴즈 완료! 점수: ${finalScore}/${quizSentences.length}`);
      }
    }, 2000);
  };
  
  const playAudio = (text: string) => {
    toast.success(`"${text}" 음성 재생`);
  };
  
  const goToMedia = (contentId: number, sentenceId?: number) => {
    const params = sentenceId !== undefined ? `?sentence=${sentenceId}` : '';
    navigate(`/media/${contentId}${params}`);
  };
  
  const goToWordMedia = (word: string, contentId: number) => {
    navigate(`/media/${contentId}?word=${word}`);
  };
  
  if (quizMode) {
    const quizSentences = getQuizSentences();
    const currentSentence = quizSentences[currentQuizIndex];
    const options = generateQuizOptions(currentSentence.korean);
    
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="border-pink-100">
          <CardHeader>
            <CardTitle className="text-center">
              {retakeMode ? "오답 재시험" : `${selectedLevel} 레벨 듣기 퀴즈`}
            </CardTitle>
            <div className="flex justify-between items-center">
              <Badge variant="outline" className="border-pink-200 text-pink-700">
                {currentQuizIndex + 1} / {quizSentences.length}
              </Badge>
              <Badge className="bg-green-500">
                점수: {score}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <Badge className={`mb-4 ${getLevelColor(currentSentence.level)}`}>
                {currentSentence.level}
              </Badge>
              <h3 className="text-2xl font-bold mb-4">{currentSentence.japanese}</h3>
              <Button 
                onClick={() => playAudio(currentSentence.japanese)}
                className="bg-pink-500 hover:bg-pink-600 mb-6"
              >
                <Volume2 className="w-4 h-4 mr-2" />
                음성 듣기
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => !answered && handleQuizAnswer(option)}
                  disabled={answered}
                  variant="outline"
                  className={`h-12 text-left justify-start ${
                    answered 
                      ? option === currentSentence.korean 
                        ? 'bg-green-100 border-green-300 text-green-700'
                        : option === selectedAnswer
                          ? 'bg-red-100 border-red-300 text-red-700'
                          : 'border-gray-200'
                      : 'border-pink-200 hover:bg-pink-50'
                  }`}
                >
                  {answered && option === currentSentence.korean && (
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  )}
                  {answered && option === selectedAnswer && option !== currentSentence.korean && (
                    <XCircle className="w-4 h-4 mr-2 text-red-500" />
                  )}
                  {option}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
          나의 단어장
        </h1>
        <p className="text-gray-600">북마크한 문장과 단어를 복습하고 퀴즈로 실력을 확인해보세요</p>
      </div>
      
      {/* Level Filter */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-pink-200">
          <Filter className="w-4 h-4 text-pink-600 ml-2" />
          {levels.map((level) => (
            <Button
              key={level}
              onClick={() => setSelectedLevel(level)}
              variant={selectedLevel === level ? "default" : "ghost"}
              size="sm"
              className={`${
                selectedLevel === level 
                  ? `${getLevelColor(level)} text-white hover:opacity-90` 
                  : "text-gray-600 hover:bg-pink-50"
              }`}
            >
              {level}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center gap-4">
        <Button 
          onClick={() => startQuiz(false)}
          className="bg-pink-500 hover:bg-pink-600 text-lg px-8 py-3"
          disabled={getFilteredSentences().length === 0}
        >
          {selectedLevel === '전체' ? '전체 퀴즈' : `${selectedLevel} 퀴즈`} 시작하기
        </Button>
        {wrongAnswers.length > 0 && (
          <Button 
            onClick={() => startQuiz(true)}
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50 text-lg px-8 py-3"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            오답 재시험 ({wrongAnswers.length}개)
          </Button>
        )}
      </div>
      
      <Tabs defaultValue="sentences" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sentences">북마크한 문장</TabsTrigger>
          <TabsTrigger value="words">단어장</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sentences" className="space-y-4">
          {getFilteredSentences().length === 0 ? (
            <Card className="border-pink-100">
              <CardContent className="text-center py-12">
                <BookmarkCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  {selectedLevel === '전체' 
                    ? "아직 북마크한 문장이 없습니다."
                    : `${selectedLevel} 레벨에 북마크한 문장이 없습니다.`
                  }
                </p>
                <p className="text-gray-500">콘텐츠를 시청하며 문장을 북마크해보세요!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getFilteredSentences().map((sentence) => (
                <Card key={sentence.id} className="border-pink-100 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <Badge className={getLevelColor(sentence.level)}>{sentence.level}</Badge>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => playAudio(sentence.japanese)}
                          variant="ghost"
                          size="sm"
                          className="hover:bg-pink-50"
                        >
                          <Play className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => goToMedia(sentence.contentId, sentence.sentenceId)}
                          variant="ghost"
                          size="sm"
                          className="hover:bg-pink-50"
                          title="원본 미디어로 이동"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium text-lg">{sentence.japanese}</p>
                      <p className="text-gray-600">{sentence.korean}</p>
                      <p className="text-sm text-gray-500 italic">{sentence.pronunciation}</p>
                      <p className="text-xs text-pink-600">{sentence.source}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="words" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {getFilteredWords().map((word) => (
              <Card key={word.id} className="border-pink-100 hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <Badge className={`mb-2 ${getLevelColor(word.level)}`}>{word.level}</Badge>
                  <h3 className="text-2xl font-bold mb-2">{word.japanese}</h3>
                  <p className="text-gray-600 mb-1">{word.korean}</p>
                  <p className="text-sm text-gray-500 italic mb-3">{word.pronunciation}</p>
                  <Button
                    onClick={() => playAudio(word.japanese)}
                    variant="ghost"
                    size="sm"
                    className="mb-3 hover:bg-pink-50"
                  >
                    <Volume2 className="w-4 h-4" />
                  </Button>
                  
                  {word.relatedContent.length > 0 && (
                    <div className="border-t pt-3">
                      <p className="text-xs text-gray-500 mb-2">관련 콘텐츠:</p>
                      <div className="space-y-1">
                        {word.relatedContent.map((content) => (
                          <Button
                            key={content.id}
                            onClick={() => goToWordMedia(word.japanese, content.id)}
                            variant="ghost"
                            size="sm"
                            className="text-xs h-auto p-1 hover:bg-pink-50 text-pink-600"
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            {content.title}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Vocabulary;
