import TopNav from 'components/TopNav';
import PageLogin from 'pages/accounts/PageLogin';
import PageProfile from 'pages/accounts/PageProfile';
import PageSignup from 'pages/accounts/PageSignup';
import PageBlog from 'pages/blog/PageBlog';
import PageMascotCharacterDetail from 'pages/mascot/PageMascotCharacterDetail';
import PageMascotCharacterForm from 'pages/mascot/PageMascotCharacterForm';
// import Clock from 'pages/examples/Clock';
// import Components from 'pages/examples/Components';
// import ContextApiSample from 'pages/examples/ContextApiSample';
// import ContextApiSample2 from 'pages/examples/ContextApiSample2';
// import CssInJs from 'pages/examples/CssInJs';
// import CssModule from 'pages/examples/CssModule';
// import useWindowWidth from 'pages/examples/useWindowWidth';
import PagemascotIndex from 'pages/mascot/PageMascotIndex';
import PageNewsArticleDetail from 'pages/news/PageNewsArticleDetail';
import PageNewsArticleForm from 'pages/news/PageNewsArticleForm';
import PageNewsIndex from 'pages/news/PageNewsIndex';
// import ReviewForm from 'pages/reviews/ReviewForm';
// import ReviewList from 'pages/reviews/ReviewList';
import { Navigate, Route, Routes } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <>
      <div className="app">
        <TopNav />
        <Routes>
          <Route path="/" element={<Navigate to="/blog/" />} />
          <Route path="/accounts/login/" element={<PageLogin />} />
          <Route path="/accounts/signup/" element={<PageSignup />} />
          <Route path="/accounts/profile/" element={<PageProfile />} />
          <Route path="/blog/" element={<PageBlog />} />
          <Route path="/news/" element={<PageNewsIndex />} />
          <Route path="/news/new/" element={<PageNewsArticleForm />} />
          <Route path="/news/:articleId/" element={<PageNewsArticleDetail />} />
          <Route
          path="/news/:articleId/edit/"
          element={<PageNewsArticleForm />}
        />
          <Route path="/mascot/" element={<PagemascotIndex />} />
          <Route path="/mascot/:characterId/" element={<PageMascotCharacterDetail />} />
          <Route path="/mascot/new/" element={<PageMascotCharacterForm />} />
          <Route path="/mascot/:characterId/edit/" element={<PageMascotCharacterForm />} />
        </Routes>
      </div>
    </>
  );
}

export default App;