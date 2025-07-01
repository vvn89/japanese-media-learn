
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileAudio, FileVideo, Link as LinkIcon, Play, Edit3, Share, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const CreatorDashboard = () => {
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    level: '',
    file: null as File | null,
    url: ''
  });
  
  // Mock uploaded contents
  const [uploadedContents, setUploadedContents] = useState([
    {
      id: 1,
      title: "비즈니스 일본어 - 회의 표현",
      category: "회화",
      level: "N2",
      duration: "12:34",
      status: "published",
      views: 1250,
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      title: "일본 문화 이해하기",
      category: "문화",
      level: "N3",
      duration: "8:45",
      status: "draft",
      views: 0,
      createdAt: "2024-01-20"
    }
  ]);
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, file }));
      toast.success(`${file.name} 파일이 선택되었습니다.`);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.category || !formData.level) {
      toast.error("필수 정보를 모두 입력해주세요.");
      return;
    }
    
    if (uploadMode === 'file' && !formData.file) {
      toast.error("파일을 선택해주세요.");
      return;
    }
    
    if (uploadMode === 'url' && !formData.url) {
      toast.error("URL을 입력해주세요.");
      return;
    }
    
    // Mock upload process
    const newContent = {
      id: uploadedContents.length + 1,
      title: formData.title,
      category: formData.category,
      level: formData.level,
      duration: "00:00",
      status: "processing",
      views: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setUploadedContents(prev => [newContent, ...prev]);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      category: '',
      level: '',
      file: null,
      url: ''
    });
    
    toast.success("콘텐츠 업로드가 시작되었습니다. 자막 생성 중...", {
      description: "자막 생성이 완료되면 알림을 보내드리겠습니다."
    });
  };
  
  const deleteContent = (id: number) => {
    setUploadedContents(prev => prev.filter(content => content.id !== id));
    toast.success("콘텐츠가 삭제되었습니다.");
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500';
      case 'draft': return 'bg-yellow-500';
      case 'processing': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'published': return '게시됨';
      case 'draft': return '임시저장';
      case 'processing': return '처리중';
      default: return '알 수 없음';
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
          강사용 콘텐츠 관리
        </h1>
        <p className="text-gray-600">교육 콘텐츠를 업로드하고 관리해보세요</p>
      </div>
      
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">콘텐츠 업로드</TabsTrigger>
          <TabsTrigger value="manage">콘텐츠 관리</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="space-y-6">
          <Card className="border-pink-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                새 콘텐츠 업로드
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Upload Method Selection */}
                <div className="flex gap-4 p-4 bg-pink-50 rounded-lg">
                  <Button
                    type="button"
                    variant={uploadMode === 'file' ? 'default' : 'outline'}
                    onClick={() => setUploadMode('file')}
                    className={uploadMode === 'file' ? 'bg-pink-500 hover:bg-pink-600' : 'border-pink-200 hover:bg-pink-100'}
                  >
                    <FileVideo className="w-4 h-4 mr-2" />
                    파일 업로드
                  </Button>
                  <Button
                    type="button"
                    variant={uploadMode === 'url' ? 'default' : 'outline'}
                    onClick={() => setUploadMode('url')}
                    className={uploadMode === 'url' ? 'bg-pink-500 hover:bg-pink-600' : 'border-pink-200 hover:bg-pink-100'}
                  >
                    <LinkIcon className="w-4 h-4 mr-2" />
                    URL 임포트
                  </Button>
                </div>
                
                {/* Content Upload */}
                {uploadMode === 'file' ? (
                  <div className="space-y-2">
                    <Label htmlFor="file">오디오/비디오 파일 *</Label>
                    <div className="flex items-center gap-4">
                      <Input
                        id="file"
                        type="file"
                        accept="audio/*,video/*"
                        onChange={handleFileUpload}
                        className="flex-1"
                      />
                      {formData.file && (
                        <div className="flex items-center gap-2 text-sm text-green-600">
                          <FileAudio className="w-4 h-4" />
                          {formData.file.name}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="url">YouTube/기타 URL *</Label>
                    <Input
                      id="url"
                      type="url"
                      placeholder="https://www.youtube.com/watch?v=..."
                      value={formData.url}
                      onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                    />
                    <p className="text-sm text-gray-500">
                      YouTube, Vimeo 등의 영상 URL을 입력하면 자동으로 임포트됩니다.
                    </p>
                  </div>
                )}
                
                {/* Content Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">제목 *</Label>
                    <Input
                      id="title"
                      placeholder="콘텐츠 제목을 입력하세요"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">카테고리 *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="카테고리 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jlpt">JLPT</SelectItem>
                        <SelectItem value="conversation">회화</SelectItem>
                        <SelectItem value="anime">애니메이션</SelectItem>
                        <SelectItem value="drama">드라마</SelectItem>
                        <SelectItem value="news">뉴스</SelectItem>
                        <SelectItem value="culture">문화</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="level">난이도 *</Label>
                    <Select value={formData.level} onValueChange={(value) => setFormData(prev => ({ ...prev, level: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="난이도 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="N5">N5 (초급)</SelectItem>
                        <SelectItem value="N4">N4 (초중급)</SelectItem>
                        <SelectItem value="N3">N3 (중급)</SelectItem>
                        <SelectItem value="N2">N2 (중상급)</SelectItem>
                        <SelectItem value="N1">N1 (고급)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">설명</Label>
                  <Textarea
                    id="description"
                    placeholder="콘텐츠에 대한 설명을 입력하세요"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                  />
                </div>
                
                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline" className="border-pink-200 hover:bg-pink-50">
                    임시저장
                  </Button>
                  <Button type="submit" className="bg-pink-500 hover:bg-pink-600">
                    업로드 시작
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="manage" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">업로드된 콘텐츠</h2>
            <Badge variant="outline" className="border-pink-200 text-pink-700">
              총 {uploadedContents.length}개
            </Badge>
          </div>
          
          <div className="space-y-4">
            {uploadedContents.map((content) => (
              <Card key={content.id} className="border-pink-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{content.title}</h3>
                        <Badge className={getStatusColor(content.status)}>
                          {getStatusText(content.status)}
                        </Badge>
                        <Badge variant="outline" className="border-pink-200 text-pink-700">
                          {content.category}
                        </Badge>
                        <Badge className="bg-pink-500">{content.level}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>길이: {content.duration}</span>
                        <span>조회수: {content.views.toLocaleString()}</span>
                        <span>생성일: {content.createdAt}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="hover:bg-pink-50">
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="hover:bg-pink-50">
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="hover:bg-pink-50">
                        <Share className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="hover:bg-red-50 text-red-600"
                        onClick={() => deleteContent(content.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {uploadedContents.length === 0 && (
              <Card className="border-pink-100">
                <CardContent className="text-center py-12">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">아직 업로드된 콘텐츠가 없습니다.</p>
                  <p className="text-gray-500">첫 번째 콘텐츠를 업로드해보세요!</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreatorDashboard;
