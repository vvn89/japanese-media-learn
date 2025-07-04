
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from '../components/HomePage';
import ContentDetail from '../components/ContentDetail';
import MediaViewer from '../components/MediaViewer';
import Vocabulary from '../components/Vocabulary';
import CreatorDashboard from '../components/CreatorDashboard';
import ReviewSystem from '../components/ReviewSystem';
import QnASystem from '../components/QnASystem';
import Curriculum from '../components/Curriculum';
import StudyProgress from '../components/StudyProgress';
import Header from '../components/Header';

const queryClient = new QueryClient();

const Index = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
          <Header />
          <main className="container mx-auto px-0 md:px-4 py-4 md:py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/content/:id" element={<ContentDetail />} />
              <Route path="/media/:id" element={<MediaViewer />} />
              <Route path="/vocabulary" element={<Vocabulary />} />
              <Route path="/review" element={<ReviewSystem />} />
              <Route path="/qna" element={<QnASystem />} />
              <Route path="/curriculum" element={<Curriculum />} />
              <Route path="/progress" element={<StudyProgress />} />
              <Route path="/creator" element={<CreatorDashboard />} />
            </Routes>
          </main>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default Index;
