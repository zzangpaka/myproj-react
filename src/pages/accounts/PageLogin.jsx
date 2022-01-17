// userFieldValues 훅 쓰시고
// PageLogin 컴포넌트 내에서 fieldValues 상탯값 노출
// 주소로 POST 요청을 보내어 (username, password) 응답을 받아서, 일단은 console.log에 출력을 합니다.
import { useApiAxios } from 'api/base';
import Button from 'components/Button';
import DebugStates from 'components/DebugStates';
import useFieldValues from 'hooks/useFieldValues';

const Initial_State = { username: '', password: '' };

function PageLogin() {
  const { handleFieldChange, fieldValues } = useFieldValues(Initial_State);
  const [{ data: PageLogin, loading, error }, refetch] = useApiAxios(
    {
      url: '/accounts/api/token/',
      method: 'POST',
    },
    { manual: true },
  );

  const handleSubmit = () => {
    refetch({ data: fieldValues }).then((request) => {
      console.log(request.data);
    });
  };

  return (
    <div className="my-3">
      <h2 className="my-3">Login</h2>
      id
      <input
        name="username"
        onChange={handleFieldChange}
        type="text"
        className="p-1 bg-gray-100 border border-gray-400 my-3 w-full outline-none focus:border focus:border-gray-400 focus:border-dashed"
      />
      password
      <input
        name="password"
        type="password"
        onChange={handleFieldChange}
        className="p-1 bg-gray-100 border border-gray-400 my-3 w-full outline-none focus:border focus:border-gray-400 focus:border-dashed"
      />
      {/* <Link to="/accounts/api/token/" className="hover:text-red-400 my-3">
        로그인
      </Link> */}
      <Button onClick={handleSubmit}>로그인</Button>
      <DebugStates PageLogin={PageLogin} loading={loading} error={error} />
    </div>
  );
}

export default PageLogin;
