
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Play, Pause, RotateCcw, Bookmark, BookmarkCheck, Volume2, ArrowLeft, SkipBack, SkipForward } from 'lucide-react';
import { toast } from 'sonner';

const ContentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [bookmarkedSentences, setBookmarkedSentences] = useState<number[]>([]);
  const [currentSentence, setCurrentSentence] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Mock data for content
  const content = {
    id: 1,
    title: "비즈니스 일본어 - 회의 표현",
    category: "회화",
    level: "N2",
    duration: "12:34",
    audioUrl: "/audio/business-japanese.mp3", // Mock audio URL
    thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=450&fit=crop",
    description: "실제 일본 회사 회의에서 사용되는 표현들을 배워보세요"
  };
  
  // Mock subtitle data with timestamps
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
    },
    {
      id: 4,
      startTime: 17,
      endTime: 22,
      japanese: "素晴らしい結果ですね。おめでとうございます。",
      korean: "훌륭한 결과네요. 축하합니다.",
      pronunciation: "Subarashii kekka desu ne. Omedetō gozaimasu."
    }
  ];
  
  useEffect(() => {
    // Update current sentence based on current time
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
  
  const repeatCurrentSentence = () => {
    const currentSub = subtitles[currentSentence];
    if (currentSub && audioRef.current) {
      audioRef.current.currentTime = currentSub.startTime;
      if (!isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };
  
  const changePlaybackRate = (rate: number) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };
  
  const toggleBookmark = (sentenceId: number) => {
    setBookmarkedSentences(prev => {
      const newBookmarks = prev.includes(sentenceId) 
        ? prev.filter(id => id !== sentenceId)
        : [...prev, sentenceId];
      
      const sentence = subtitles.find(s => s.id === sentenceId);
      if (sentence) {
        toast.success(
          prev.includes(sentenceId) 
            ? "북마크에서 제거되었습니다" 
            : "북마크에 추가되었습니다",
          {
            description: sentence.japanese
          }
        );
      }
      
      return newBookmarks;
    });
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
      
      {/* Video/Audio Player Section */}
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
          
          {/* Audio element (hidden) */}
          <audio
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            className="hidden"
          >
            <source src={content.audioUrl} type="audio/mpeg" />
          </audio>
          
          {/* Controls */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button 
                  onClick={togglePlayPause}
                  size="lg"
                  className="bg-pink-500 hover:bg-pink-600"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </Button>
                <Button 
                  onClick={repeatCurrentSentence}
                  variant="outline"
                  className="border-pink-200 hover:bg-pink-50"
                >
                  <RotateCcw className="w-4 h-4" />
                  반복
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">재생 속도:</span>
                {[0.5, 0.75, 1, 1.25, 1.5].map(rate => (
                  <Button
                    key={rate}
                    onClick={() => changePlaybackRate(rate)}
                    variant={playbackRate === rate ? "default" : "outline"}
                    size="sm"
                    className={playbackRate === rate 
                      ? "bg-pink-500 hover:bg-pink-600" 
                      : "border-pink-200 hover:bg-pink-50"
                    }
                  >
                    {rate}x
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Progress Bar */}
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-pink-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="w-5 h-5" />
              자막 & 대본
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {subtitles.map((subtitle, index) => (
                <div
                  key={subtitle.id}
                  className={`p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
                    currentSentence === subtitle.id 
                      ? 'bg-pink-50 border-pink-300 shadow-sm' 
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
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(subtitle.id);
                      }}
                      variant="ghost"
                      size="sm"
                      className="ml-2 hover:bg-pink-50"
                    >
                      {bookmarkedSentences.includes(subtitle.id) ? (
                        <BookmarkCheck className="w-4 h-4 text-pink-500" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Study Options */}
        <Card className="border-pink-100">
          <CardHeader>
            <CardTitle>학습 도구</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={() => navigate('/vocabulary')}
                className="bg-pink-500 hover:bg-pink-600 h-12"
              >
                <BookmarkCheck className="w-4 h-4 mr-2" />
                북마크 확인
              </Button>
              <Button 
                variant="outline"
                className="border-pink-200 hover:bg-pink-50 h-12"
                onClick={() => toast.success("퀴즈 기능이 곧 추가될 예정입니다!")}
              >
                <Volume2 className="w-4 h-4 mr-2" />
                따라 말하기
              </Button>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h4 className="font-medium">북마크된 문장</h4>
              <div className="text-sm text-gray-600">
                {bookmarkedSentences.length}개의 문장이 저장되었습니다
              </div>
              {bookmarkedSentences.length > 0 && (
                <Button 
                  onClick={() => navigate('/vocabulary')}
                  variant="outline"
                  className="w-full border-pink-200 hover:bg-pink-50"
                >
                  복습하러 가기
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContentDetail;
