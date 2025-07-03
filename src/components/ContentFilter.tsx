
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, SortAsc, Clock, Bookmark, Eye, Calendar } from 'lucide-react';

interface ContentFilterProps {
  onSortChange: (sort: string) => void;
  onDurationFilterChange: (duration: number[]) => void;
  onLevelFilterChange: (levels: string[]) => void;
  selectedSort: string;
  selectedDuration: number[];
  selectedLevels: string[];
}

const ContentFilter: React.FC<ContentFilterProps> = ({
  onSortChange,
  onDurationFilterChange,
  onLevelFilterChange,
  selectedSort,
  selectedDuration,
  selectedLevels
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const sortOptions = [
    { value: 'views', label: '조회수 순', icon: Eye },
    { value: 'bookmarks', label: '북마크 순', icon: Bookmark },
    { value: 'recent', label: '최근 추가순', icon: Calendar },
    { value: 'level', label: 'JLPT 레벨순', icon: SortAsc }
  ];
  
  const levels = ['N1', 'N2', 'N3', 'N4', 'N5'];
  
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
  
  const toggleLevel = (level: string) => {
    const newLevels = selectedLevels.includes(level)
      ? selectedLevels.filter(l => l !== level)
      : [...selectedLevels, level];
    onLevelFilterChange(newLevels);
  };
  
  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}분`;
    return `${Math.floor(minutes / 60)}시간 ${minutes % 60}분`;
  };
  
  return (
    <div className="space-y-4">
      {/* 정렬 옵션 */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <SortAsc className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium">정렬:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {sortOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Button
                key={option.value}
                onClick={() => onSortChange(option.value)}
                variant={selectedSort === option.value ? "default" : "outline"}
                size="sm"
                className={`${
                  selectedSort === option.value 
                    ? "bg-pink-500 hover:bg-pink-600" 
                    : "border-pink-200 text-pink-700 hover:bg-pink-50"
                }`}
              >
                <Icon className="w-3 h-3 mr-1" />
                {option.label}
              </Button>
            );
          })}
        </div>
        <Button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          variant="outline"
          size="sm"
          className="border-pink-200 text-pink-700 hover:bg-pink-50"
        >
          <Filter className="w-4 h-4 mr-2" />
          필터
        </Button>
      </div>
      
      {/* 필터 옵션 */}
      {isFilterOpen && (
        <Card className="border-pink-100">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="w-5 h-5 text-pink-600" />
              상세 필터
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* JLPT 레벨 필터 */}
            <div>
              <h4 className="text-sm font-medium mb-3">JLPT 레벨</h4>
              <div className="flex flex-wrap gap-2">
                {levels.map((level) => (
                  <Button
                    key={level}
                    onClick={() => toggleLevel(level)}
                    variant={selectedLevels.includes(level) ? "default" : "outline"}
                    size="sm"
                    className={`${
                      selectedLevels.includes(level)
                        ? `${getLevelColor(level)} text-white hover:opacity-90`
                        : "border-gray-300 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* 영상 길이 필터 */}
            <div>
              <h4 className="text-sm font-medium mb-3">
                영상 길이: {formatDuration(selectedDuration[0])} - {formatDuration(selectedDuration[1])}
              </h4>
              <div className="px-3">
                <Slider
                  value={selectedDuration}
                  onValueChange={onDurationFilterChange}
                  min={0}
                  max={60}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>0분</span>
                  <span>30분</span>
                  <span>60분+</span>
                </div>
              </div>
            </div>
            
            {/* 필터 초기화 */}
            <div className="flex justify-end">
              <Button
                onClick={() => {
                  onLevelFilterChange([]);
                  onDurationFilterChange([0, 60]);
                  onSortChange('views');
                }}
                variant="outline"
                size="sm"
                className="border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                필터 초기화
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContentFilter;
