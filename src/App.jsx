import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import GlobalStyles from './globalStyles';
import Home from './pages/home';
import Make from './pages/make';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/make" element={<Make />}></Route>
          </Routes>
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
}

export default App;
