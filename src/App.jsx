import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Navbar from './components/Navbar';
import GlobalStyles from './globalStyles';
import Home from './pages/home';
import Login from './pages/login';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Navbar/>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/login" element={<Login />}></Route>
            </Routes>
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
}

export default App;
