import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import GlobalStyles from './GlobalStyles';
import Home from './pages/home';
import Make from './pages/make';
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
          <React.Suspense fallback={<></>}>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/view" element={<Result />}></Route>
              <Route path="/make" element={<Make />}></Route>
              <Route path="/view/:roadmapId" element={<Result />}></Route>
              <Route path="/test" element={<TestPage />}></Route>
              <Route path="/test/:roadmapId" element={<TestResult />}></Route>
            </Routes>
          </React.Suspense>
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
}

export default App;
