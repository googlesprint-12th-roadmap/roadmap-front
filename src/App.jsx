import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import GlobalStyles from './globalStyles';
import Home from './pages/home';
import Result from './pages/result';
import { TestPage } from './pages/test';
import { TestResult } from './pages/testResult';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/view" element={<Result />}></Route>
            <Route path="/test" element={<TestPage />}></Route>
            <Route path="/test/:roadmapId" element={<TestResult />}></Route>
          </Routes>
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
}

export default App;
