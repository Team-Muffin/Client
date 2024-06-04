import React from "react";
// import Header from './components/Header';
// import Footer from './components/Footer';
// import MainPage from './pages/MainPage';
// import LoginPage from './pages/LoginPage';
import { BrowserRouter, Routes } from "react-router-dom";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        {/* <Header></Header> */}
        <Routes>
          {/* <Route path='/' element={<MainPage />}></Route>
          <Route path='/login' element={<LoginPage />}></Route> */}
        </Routes>
      </BrowserRouter>
      {/* <Footer></Footer> */}
    </>
  );
};

export default App;
