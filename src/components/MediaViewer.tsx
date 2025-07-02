
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, ArrowLeft, Volume2 } from 'lucide-react';
import { toast } from 'sonner';

const MediaViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sentenceId = searchParams.get('sentence');
  const wordId = searchParams.get('word');
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentSentence, setCurrentSentence] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Mock data for content
  const content = {
    id: 1,
    title: "비즈니스 일본어 - 회의 표현",
    category: "회화",
    level: "N2",
    duration: "12:34",
    audioUrl: "/audio/business-japanese.mp3",
    thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=450&fit=crop",
    description: "실제 일본 회사 회의에서 사용되는 표현들을 배워보세요"
  };
  
  const subtitles = [
    {
      id: 0,
      startTime: 0,
      endTime: 3,
      japanese: "こんにちは、皆さん。",
      korean: "안녕하세요, 여러분.",
      pronunciation: "Konnichiwa, minasan."
    },
    {
      id: 1,
      startTime: 3,
      endTime: 7,
      japanese: "今日の会議を始めさせていただきます。",
      korean: "오늘 회의를 시작하겠습니다.",
      pronunciation: "Kyō no kaigi wo hajimesasete itadakimasu."
    },
    {
      id: 2,
      startTime: 7,
      endTime: 12,
      japanese: "まず、売上について話し合いましょう。", 
      korean: "먼저 매출에 대해 이야기해봅시다.",
      pronunciation: "Mazu, uriage ni tsuite hanashiaimashō."
    },
    {
      id: 3,
      startTime: 12,
      endTime: 17,
      japanese: "今月の売上は予想を上回りました。",
      korean: "이번 달 매출은 예상을 넘어섰습니다.",
      pronunciation: "Kongetsu no uriage wa yosō wo uwamwarimashita."
    }
  ];
  
  useEffect(() => {
    // If coming from bookmarked sentence, jump to that sentence
    if (sentenceId) {
      const targetSentence = subtitles.find(sub => sub.id === parseInt(sentenceId));
      if (targetSentence && audioRef.current) {
        audioRef.current.currentTime = targetSentence.startTime;
        setCurrentTime(targetSentence.startTime);
        setCurrentSentence(targetSentence.id);
        toast.success(`북마크한 문장으로 이동: "${targetSentence.japanese}"`);
      }
    }
    
    // If coming from vocabulary word, highlight sentences containing that word
    if (wordId) {
      toast.success(`"${wordId}" 단어가 포함된 문장들을 확인하세요`);
    }
  }, [sentenceId, wordId]);
  
  useEffect(() => {
    const currentSub = subtitles.find(sub => 
      currentTime >= sub.startTime && currentTime < sub.endTime
    );
    if (currentSub) {
      setCurrentSentence(currentSub.id);
    }
  }, [currentTime]);
  
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };
  
  const jumpToSentence = (sentence: any) => {
    if (audioRef.current) {
      audioRef.current.currentTime = sentence.startTime;
      setCurrentTime(sentence.startTime);
    }
  };
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Button 
        onClick={() => navigate(-1)}
        variant="ghost" 
        className="mb-4 hover:bg-pink-50"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        뒤로가기
      </Button>
      
      {/* Show context if coming from bookmark/vocabulary */}
      {(sentenceId || wordId) && (
        <Card className="border-pink-200 bg-pink-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-pink-600" />
              <p className="text-pink-800 font-medium">
                {sentenceId && "북마크한 문장으로 이동했습니다"}
                {wordId && `"${wordId}" 단어가 포함된 콘텐츠입니다`}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Media Player Section */}
      <Card className="border-pink-100">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{content.title}</CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge className="bg-pink-500">{content.level}</Badge>
                <Badge variant="outline" className="border-pink-200 text-pink-700">
                  {content.category}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg overflow-hidden mb-4">
            <img 
              src={content.thumbnail} 
              alt={content.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <audio
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            className="hidden"
          >
            <source src={content.audioUrl} type="audio/mpeg" />
          </audio>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Button 
                onClick={togglePlayPause}
                size="lg"
                className="bg-pink-500 hover:bg-pink-600"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>
            </div>
            
            <div className="space-y-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-pink-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Subtitles Section */}
      <Card className="border-pink-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="w-5 h-5" />
            자막 & 대본
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {subtitles.map((subtitle) => (
              <div
                key={subtitle.id}
                className={`p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
                  currentSentence === subtitle.id 
                    ? 'bg-pink-50 border-pink-300 shadow-sm' 
                    : sentenceId && subtitle.id === parseInt(sentenceId)
                      ? 'bg-yellow-50 border-yellow-300 shadow-sm'
                      : 'border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => jumpToSentence(subtitle)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-lg mb-1">{subtitle.japanese}</p>
                    <p className="text-gray-600 mb-1">{subtitle.korean}</p>
                    <p className="text-sm text-gray-500 italic">{subtitle.pronunciation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaViewer;
