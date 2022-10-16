import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import GlobalStyles from './globalStyles';
import Home from './pages/home';
import Result from './pages/result';
import RoadMapContainerContextProvider from './pages/result/ResultContext';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/result"
              element={
                <RoadMapContainerContextProvider>
                  <Result />
                </RoadMapContainerContextProvider>
              }
            ></Route>
          </Routes>
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
}

export default App;
