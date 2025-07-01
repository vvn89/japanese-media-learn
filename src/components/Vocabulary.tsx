
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookmarkCheck, Play, RotateCcw, CheckCircle, XCircle, Volume2 } from 'lucide-react';
import { toast } from 'sonner';

const Vocabulary = () => {
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  
  // Mock bookmarked sentences
  const bookmarkedSentences = [
    {
      id: 0,
      japanese: "こんにちは、皆さん。",
      korean: "안녕하세요, 여러분.",
      pronunciation: "Konnichiwa, minasan.",
      source: "비즈니스 일본어 - 회의 표현",
      level: "N2"
    },
    {
      id: 1,
      japanese: "今日の会議を始めさせていただきます。",
      korean: "오늘 회의를 시작하겠습니다.",
      pronunciation: "Kyō no kaigi wo hajimesasete itadakimasu.",
      source: "비즈니스 일본어 - 회의 표현",
      level: "N2"
    },
    {
      id: 2,
      japanese: "まず、売上について話し合いましょう。",
      korean: "먼저 매출에 대해 이야기해봅시다.",
      pronunciation: "Mazu, uriage ni tsuite hanashiaimashō.",
      source: "비즈니스 일본어 - 회의 표현",
      level: "N2"
    },
    {
      id: 3,
      japanese: "今月の売上は予想を上回りました。",
      korean: "이번 달 매출은 예상을 넘어섰습니다.",
      pronunciation: "Kongetsu no uriage wa yosō wo uwamwarimashita.",
      source: "비즈니스 일본어 - 회의 표현",
      level: "N2"
    }
  ];
  
  // Mock vocabulary words
  const vocabularyWords = [
    {
      id: 1,
      japanese: "会議",
      korean: "회의",
      pronunciation: "kaigi",
      level: "N3"
    },
    {
      id: 2,
      japanese: "売上",
      korean: "매출",
      pronunciation: "uriage",
      level: "N2"
    },
    {
      id: 3,
      japanese: "予想",
      korean: "예상",
      pronunciation: "yosō",
      level: "N2"
    },
    {
      id: 4,
      japanese: "結果",
      korean: "결과",
      pronunciation: "kekka",
      level: "N3"
    }
  ];
  
  const startQuiz = () => {
    setQuizMode(true);
    setCurrentQuizIndex(0);
    setScore(0);
    setAnswered(false);
    setSelectedAnswer(null);
  };
  
  const generateQuizOptions = (correctAnswer: string) => {
    const otherAnswers = bookmarkedSentences
      .filter(s => s.korean !== correctAnswer)
      .map(s => s.korean)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    return [correctAnswer, ...otherAnswers].sort(() => Math.random() - 0.5);
  };
  
  const handleQuizAnswer = (answer: string) => {
    const currentSentence = bookmarkedSentences[currentQuizIndex];
    const isCorrect = answer === currentSentence.korean;
    
    setSelectedAnswer(answer);
    setAnswered(true);
    
    if (isCorrect) {
      setScore(score + 1);
      toast.success("정답입니다!");
    } else {
      toast.error("틀렸습니다. 다시 한번 들어보세요!");
    }
    
    setTimeout(() => {
      if (currentQuizIndex < bookmarkedSentences.length - 1) {
        setCurrentQuizIndex(currentQuizIndex + 1);
        setAnswered(false);
        setSelectedAnswer(null);
      } else {
        setQuizMode(false);
        toast.success(`퀴즈 완료! 점수: ${score + (isCorrect ? 1 : 0)}/${bookmarkedSentences.length}`);
      }
    }, 2000);
  };
  
  const playAudio = (text: string) => {
    // Mock audio play - in real app, this would use speech synthesis or audio files
    toast.success(`"${text}" 음성 재생`);
  };
  
  if (quizMode) {
    const currentSentence = bookmarkedSentences[currentQuizIndex];
    const options = generateQuizOptions(currentSentence.korean);
    
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="border-pink-100">
          <CardHeader>
            <CardTitle className="text-center">듣기 퀴즈</CardTitle>
            <div className="flex justify-between items-center">
              <Badge variant="outline" className="border-pink-200 text-pink-700">
                {currentQuizIndex + 1} / {bookmarkedSentences.length}
              </Badge>
              <Badge className="bg-green-500">
                점수: {score}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
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
      
      <div className="flex justify-center">
        <Button 
          onClick={startQuiz}
          className="bg-pink-500 hover:bg-pink-600 text-lg px-8 py-3"
          disabled={bookmarkedSentences.length === 0}
        >
          퀴즈 시작하기
        </Button>
      </div>
      
      <Tabs defaultValue="sentences" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sentences">북마크한 문장</TabsTrigger>
          <TabsTrigger value="words">단어장</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sentences" className="space-y-4">
          {bookmarkedSentences.length === 0 ? (
            <Card className="border-pink-100">
              <CardContent className="text-center py-12">
                <BookmarkCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">아직 북마크한 문장이 없습니다.</p>
                <p className="text-gray-500">콘텐츠를 시청하며 문장을 북마크해보세요!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookmarkedSentences.map((sentence) => (
                <Card key={sentence.id} className="border-pink-100 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <Badge className="bg-pink-500">{sentence.level}</Badge>
                      <Button
                        onClick={() => playAudio(sentence.japanese)}
                        variant="ghost"
                        size="sm"
                        className="hover:bg-pink-50"
                      >
                        <Play className="w-4 h-4" />
                      </Button>
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
            {vocabularyWords.map((word) => (
              <Card key={word.id} className="border-pink-100 hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <Badge className="mb-2 bg-pink-500">{word.level}</Badge>
                  <h3 className="text-2xl font-bold mb-2">{word.japanese}</h3>
                  <p className="text-gray-600 mb-1">{word.korean}</p>
                  <p className="text-sm text-gray-500 italic">{word.pronunciation}</p>
                  <Button
                    onClick={() => playAudio(word.japanese)}
                    variant="ghost"
                    size="sm"
                    className="mt-2 hover:bg-pink-50"
                  >
                    <Volume2 className="w-4 h-4" />
                  </Button>
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
