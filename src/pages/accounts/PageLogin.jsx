// userFieldValues 훅 쓰시고
// PageLogin 컴포넌트 내에서 fieldValues 상탯값 노출
// 주소로 POST 요청을 보내어 (username, password) 응답을 받아서, 일단은 console.log에 출력을 합니다.
import { useApiAxios } from 'api/base';
import Button from 'components/Button';
import DebugStates from 'components/DebugStates';
import useFieldValues from 'hooks/useFieldValues';

const INITIAL_STATE = { username: '', password: '' };

function PageLogin() {
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
      console.log(response.data);
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

      <DebugStates fieldValues={fieldValues} loading={loading} error={error} />
    </div>
  );
}

export default PageLogin;
