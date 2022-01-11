import TopNav from 'components/TopNav';
import Login from 'pages/accounts/Login';
import Profile from 'pages/accounts/Profile';
import PageBlog from 'pages/blog/PageBlog';
import Clock from 'pages/examples/Clock';
import Components from 'pages/examples/Components';
import ContextApiSample from 'pages/examples/ContextApiSample';
import ContextApiSample2 from 'pages/examples/ContextApiSample2';
import CssInJs from 'pages/examples/CssInJs';
import CssModule from 'pages/examples/CssModule';
import useWindowWidth from 'pages/examples/useWindowWidth';
import ReviewForm from 'pages/reviews/ReviewForm';
import ReviewList from 'pages/reviews/ReviewList';
import { Navigate, Route, Routes } from 'react-router-dom';

import './App.css';

function App() {
  const windowWidth = useWindowWidth();
  return (
    <>
      <div className="app">
        <TopNav />
        <Routes>
          <Route path="/" element={<Navigate to="/blog/" />} />
          <Route path="/accounts/login/" element={<Login />} />
          <Route path="/accounts/profile/" element={<Profile />} />
          <Route path="/blog/" element={<PageBlog />} />
          <Route path="/reviews/" element={<ReviewList />} />
          <Route path="/reviews/new/" element={<ReviewForm />} />
          <Route path="/reviews/:reviewId/edit/" element={<ReviewForm />} />
          <Route path="/examples/components/" element={<Components />} />
          <Route path="/examples/css-module/" element={<CssModule />} />
          <Route path="/examples/css-in-js/" element={<CssInJs />} />
          <Route path="/examples/context-api/" element={<ContextApiSample />} />
          <Route
            path="/examples/context-api-2/"
            element={<ContextApiSample2 />}
          />
        </Routes>
        <hr />
        윈도우 가로크기 : {windowWidth}px
      </div>
      <Routes>
        <Route path="/examples/clock/" element={<Clock />} />
      </Routes>
    </>
  );
}

export default App;