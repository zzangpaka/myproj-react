import { useApiAxios } from 'api/base';
import Button from 'components/Button';
import DebugStates from 'components/DebugStates';
import useFieldValues from 'hooks/useFieldValues';
import useLocalStorage from 'hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';

const INITIAL_STATE = { username: '', password: '' };
const INITIAL_AUTH = { isLoggedIn: false };

function LoginForm() {
  const Navigate = useNavigate();
  const [auth, setAuth] = useLocalStorage('auth', INITIAL_AUTH);
  const { handleFieldChange, fieldValues } = useFieldValues(INITIAL_STATE);
  const [{ loading, error }, refetch] = useApiAxios(
    {
      url: '/accounts/api/token/',
      method: 'POST',
    },
    { manual: true },
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    refetch({ data: fieldValues }).then((response) => {
      const { access, refresh, username, first_name, last_name } =
        response.data;
      setAuth({
        isLoggedIn: true,
        access,
        refresh,
        username,
        first_name,
        last_name,
      });
      console.log('access :', access);
      console.log('refresh :', refresh);
      console.log('username :', username);
      console.log('first_name :', first_name);
      console.log('last_name :', last_name);

      // 인증 후, 이동할 주소를 지정합니다.
      Navigate('/');
    });
  };

  return (
    <div className="my-3">
      <h2 className="my-3">Login</h2>
      {error?.response?.status === 401 && (
        <div className="text-red-400">로그인에 실패했습니다.</div>
      )}
      <form>
        <input
          type="text"
          name="username"
          value={fieldValues.username}
          onChange={handleFieldChange}
          placeholder="ID를 입력해주세요."
          className="p-1 bg-gray-100 border border-gray-400 my-3 w-full outline-none focus:border focus:border-gray-400 focus:border-dashed"
        />
        password
        <input
          type="password"
          name="password"
          value={fieldValues.password}
          onChange={handleFieldChange}
          placeholder="비밀번호를 입력해주세요."
          className="p-1 bg-gray-100 border border-gray-400 my-3 w-full outline-none focus:border focus:border-gray-400 focus:border-dashed"
        />
        <Button onClick={handleSubmit}>로그인</Button>
      </form>

      <DebugStates
        auth={auth}
        fieldValues={fieldValues}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default LoginForm;
