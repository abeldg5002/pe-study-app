import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import TopicView from './pages/TopicView';
import SyllabusPage from './pages/SyllabusPage';
import FlashcardsPage from './pages/FlashcardsPage';
import QuizPage from './pages/QuizPage';
import PracticalPage from './pages/PracticalPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="topic/:topicId" element={<TopicView />} />
          <Route path="syllabus" element={<SyllabusPage />} />
          <Route path="flashcards" element={<FlashcardsPage />} />
          <Route path="quiz" element={<QuizPage />} />
          <Route path="practical" element={<PracticalPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
