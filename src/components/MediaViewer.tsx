import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Pause, RotateCcw, ArrowLeft, Volume2, X, Plus, Bookmark, BookmarkPlus } from 'lucide-react';
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
  const [selectedWord, setSelectedWord] = useState<any>(null);
  const [showWordPopup, setShowWordPopup] = useState(false);
  const [subtitleMode, setSubtitleMode] = useState('both'); // 'korean', 'both', 'japanese'
  const [japaneseMode, setJapaneseMode] = useState('kanji'); // 'kanji', 'furigana'
  const [bookmarkedSentences, setBookmarkedSentences] = useState<Set<number>>(new Set());
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Mock word database with levels
  const wordDatabase = {
    "こんにちは": { korean: "안녕하세요", pronunciation: "こんにちは", level: "N5" },
    "皆さん": { korean: "여러분", pronunciation: "みなさん", level: "N4" },
    "今日": { korean: "오늘", pronunciation: "きょう", level: "N5" },
    "会議": { korean: "회의", pronunciation: "かいぎ", level: "N3" },
    "始める": { korean: "시작하다", pronunciation: "はじめる", level: "N4" },
    "いただく": { korean: "받다(겸양어)", pronunciation: "いただく", level: "N3" },
    "まず": { korean: "먼저", pronunciation: "まず", level: "N3" },
    "売上": { korean: "매출", pronunciation: "うりあげ", level: "N2" },
    "について": { korean: "~에 대해", pronunciation: "について", level: "N3" },
    "話し合う": { korean: "이야기하다", pronunciation: "はなしあう", level: "N3" },
    "今月": { korean: "이번 달", pronunciation: "こんげつ", level: "N4" },
    "予想": { korean: "예상", pronunciation: "よそう", level: "N2" },
    "上回る": { korean: "넘어서다", pronunciation: "うわまわる", level: "N1" }
  };
  
  const getLevelColor = (level: string) => {
    const colors = {
      "N5": "text-green-600 bg-green-100 hover:bg-green-200 cursor-pointer",
      "N4": "text-blue-600 bg-blue-100 hover:bg-blue-200 cursor-pointer",
      "N3": "text-yellow-600 bg-yellow-100 hover:bg-yellow-200 cursor-pointer",
      "N2": "text-orange-600 bg-orange-100 hover:bg-orange-200 cursor-pointer",
      "N1": "text-red-600 bg-red-100 hover:bg-red-200 cursor-pointer"
    };
    return colors[level as keyof typeof colors] || "text-gray-600";
  };
  
  const parseJapaneseText = (text: string) => {
    const words = Object.keys(wordDatabase);
    let parsedText = text;
    const segments: Array<{text: string, isWord: boolean, wordData?: any}> = [];
    
    // Simple word matching - in real app, would use proper Japanese tokenizer
    words.sort((a, b) => b.length - a.length); // Sort by length to match longer words first
    
    let remainingText = text;
    let currentIndex = 0;
    
    while (remainingText.length > 0) {
      let foundWord = false;
      
      for (const word of words) {
        if (remainingText.startsWith(word)) {
          // Add previous non-word text if any
          if (currentIndex > 0) {
            const prevText = text.substring(text.length - remainingText.length - currentIndex, text.length - remainingText.length);
            if (prevText) {
              segments.push({ text: prevText, isWord: false });
            }
          }
          
          // Add the word
          segments.push({ 
            text: word, 
            isWord: true, 
            wordData: { ...wordDatabase[word as keyof typeof wordDatabase], japanese: word }
          });
          
          remainingText = remainingText.substring(word.length);
          currentIndex = 0;
          foundWord = true;
          break;
        }
      }
      
      if (!foundWord) {
        currentIndex++;
        if (currentIndex >= remainingText.length) {
          segments.push({ text: remainingText, isWord: false });
          break;
        }
      }
    }
    
    return segments;
  };
  
  const handleWordClick = (wordData: any) => {
    setSelectedWord(wordData);
    setShowWordPopup(true);
  };
  
  const addWordToVocabulary = (wordData: any) => {
    toast.success(`"${wordData.japanese}" 단어를 단어장에 추가했습니다!`);
    setShowWordPopup(false);
  };

  const toggleSentenceBookmark = (sentenceId: number) => {
    const newBookmarked = new Set(bookmarkedSentences);
    if (newBookmarked.has(sentenceId)) {
      newBookmarked.delete(sentenceId);
      toast.success("북마크를 해제했습니다");
    } else {
      newBookmarked.add(sentenceId);
      toast.success("문장을 북마크했습니다");
    }
    setBookmarkedSentences(newBookmarked);
  };
  
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
      japaneseFurigana: "こんにちは、みなさん。",
      korean: "안녕하세요, 여러분.",
      pronunciation: "こんにちは、みなさん。"
    },
    {
      id: 1,
      startTime: 3,
      endTime: 7,
      japanese: "今日の会議を始めさせていただきます。",
      japaneseFurigana: "きょうのかいぎをはじめさせていただきます。",
      korean: "오늘 회의를 시작하겠습니다.",
      pronunciation: "きょうのかいぎをはじめさせていただきます。"
    },
    {
      id: 2,
      startTime: 7,
      endTime: 12,
      japanese: "まず、売上について話し合いましょう。", 
      japaneseFurigana: "まず、うりあげについてはなしあいましょう。",
      korean: "먼저 매출에 대해 이야기해봅시다.",
      pronunciation: "まず、うりあげについてはなしあいましょう。"
    },
    {
      id: 3,
      startTime: 12,
      endTime: 17,
      japanese: "今月の売上は予想を上回りました。",
      japaneseFurigana: "こんげつのうりあげはよそうをうわまわりました。",
      korean: "이번 달 매출은 예상을 넘어섰습니다.",
      pronunciation: "こんげつのうりあげはよそうをうわまわりました。"
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
    <div className="max-w-6xl mx-auto space-y-6 relative">
      <Button 
        onClick={() => navigate(-1)}
        variant="ghost" 
        className="mb-4 hover:bg-pink-50"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        뒤로가기
      </Button>
      
      {/* Word Popup */}
      {showWordPopup && selectedWord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-96 mx-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">단어 정보</CardTitle>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowWordPopup(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-2">{selectedWord.japanese}</h3>
                <Badge className={`mb-2 ${selectedWord.level === 'N1' ? 'bg-red-500' : 
                  selectedWord.level === 'N2' ? 'bg-orange-500' :
                  selectedWord.level === 'N3' ? 'bg-yellow-500' :
                  selectedWord.level === 'N4' ? 'bg-blue-500' : 'bg-green-500'}`}>
                  {selectedWord.level}
                </Badge>
                <p className="text-lg text-gray-700 mb-1">{selectedWord.korean}</p>
                <p className="text-sm text-gray-500 italic mb-4">{selectedWord.pronunciation}</p>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => addWordToVocabulary(selectedWord)}
                  className="flex-1 bg-pink-500 hover:bg-pink-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  단어장에 추가
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => toast.success(`"${selectedWord.japanese}" 음성 재생`)}
                >
                  <Volume2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
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
      
      {/* Subtitle Options */}
      <Card className="border-pink-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="w-5 h-5" />
            자막 설정
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">자막 표시</label>
              <Select value={subtitleMode} onValueChange={setSubtitleMode}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="korean">한국어만</SelectItem>
                  <SelectItem value="both">한국어 + 일본어</SelectItem>
                  <SelectItem value="japanese">일본어만</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {(subtitleMode === 'japanese' || subtitleMode === 'both') && (
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">일본어 표시</label>
                <Select value={japaneseMode} onValueChange={setJapaneseMode}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kanji">한자 포함</SelectItem>
                    <SelectItem value="furigana">히라가나만</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Enhanced Subtitles Section with Clickable Words */}
      <Card className="border-pink-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="w-5 h-5" />
            자막 & 대본
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {subtitles.map((subtitle) => {
              const parsedJapanese = parseJapaneseText(
                japaneseMode === 'furigana' ? subtitle.japaneseFurigana : subtitle.japanese
              );
              
              return (
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
                      {(subtitleMode === 'japanese' || subtitleMode === 'both') && (
                        <div className="font-medium text-lg mb-1 leading-relaxed">
                          {parsedJapanese.map((segment, index) => (
                            segment.isWord ? (
                              <span
                                key={index}
                                className={`inline-block px-1 py-0.5 rounded text-sm font-semibold ${getLevelColor(segment.wordData.level)}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleWordClick(segment.wordData);
                                }}
                              >
                                {segment.text}
                              </span>
                            ) : (
                              <span key={index}>{segment.text}</span>
                            )
                          ))}
                        </div>
                      )}
                      
                      {(subtitleMode === 'korean' || subtitleMode === 'both') && (
                        <p className="text-gray-600 mb-1">{subtitle.korean}</p>
                      )}
                      
                      <p className="text-sm text-gray-500 italic">{subtitle.pronunciation}</p>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSentenceBookmark(subtitle.id);
                      }}
                      className={`ml-2 ${bookmarkedSentences.has(subtitle.id) ? 'text-pink-600' : 'text-gray-400'}`}
                    >
                      {bookmarkedSentences.has(subtitle.id) ? (
                        <Bookmark className="w-4 h-4 fill-current" />
                      ) : (
                        <BookmarkPlus className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaViewer;
