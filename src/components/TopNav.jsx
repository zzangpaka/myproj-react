import useAuth from 'hooks/useAuth';
import { Link } from 'react-router-dom';

function TopNav() {
  const [auth, , , logout] = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="my-3">
      <ul className="flex gap-4">
        {!auth.isLoggedIn && (
          <>
            <li>
              <MyLink to="/accounts/login/">로그인</MyLink>
            </li>
            <li>
              <MyLink to="/accounts/signup/">회원가입</MyLink>
            </li>
          </>
        )}
        {auth.isLoggedIn && (
          <>
            <li>
              <MyLink to="/accounts/profile/">프로필</MyLink>
            </li>
            <button
              onClick={handleLogout}
              className="pb-1 text-gray-500 hover:text-red-500 hover:border-red-500 border-b-4"
            >
              로그아웃
            </button>
          </>
        )}
        <li>
          <MyLink to="/blog/">블로그</MyLink>
        </li>
        <li>
          <MyLink to="/news/">뉴스</MyLink>
        </li>
        <li>
          <MyLink to="/mascot/">마스코트</MyLink>
        </li>
      </ul>
    </div>
  );
}

function MyLink({ to, children }) {
  return (
    <Link
      to={to}
      className="pb-1 text-gray-500 hover:text-red-500 hover:border-red-500 border-b-4"
    >
      {children}
    </Link>
  );
}

export default TopNav;
