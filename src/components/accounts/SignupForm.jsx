import { useApiAxios } from 'api/base';
import Button from 'components/Button';
import DebugStates from 'components/DebugStates';
import useFieldValues from 'hooks/useFieldValues';
import { useNavigate } from 'react-router-dom';

const INITIAL_STATE = { username: '', password: '', password2: '' };

function SignupForm() {
  const Navigate = useNavigate();
  const { handleFieldChange, fieldValues } = useFieldValues(INITIAL_STATE);
  const [{ loading, error, errorMessages }, refetch] = useApiAxios(
    {
      url: '/accounts/api/signup/',
      method: 'POST',
    },
    { manual: true },
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    refetch({ data: fieldValues }).then((saveRequest) => {
      const { username, password, password2 } = saveRequest.data;
      console.log('username :', username);
      console.log('password :', password);
      console.log('password2 :', password2);

      Navigate('/accounts/login/');
    });
  };
  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={fieldValues.username}
          onChange={handleFieldChange}
          placeholder="ID를 입력해주세요."
          className="p-1 bg-gray-100 border border-gray-400 my-3 w-full outline-none focus:border focus:border-gray-400 focus:border-dashed"
        />
        {errorMessages.username?.map((message, index) => (
          <p key={index} className="text-xs text-red-400">
            {message}
          </p>
        ))}

        <input
          type="password"
          name="password"
          value={fieldValues.password}
          onChange={handleFieldChange}
          placeholder="영소문자/숫자/특수기호를 조합해서 입력해주세요."
          className="p-1 bg-gray-100 border border-gray-400 my-3 w-full outline-none focus:border focus:border-gray-400 focus:border-dashed"
        />
        {errorMessages.password?.map((message, index) => (
          <p key={index} className="text-xs text-red-400">
            {message}
          </p>
        ))}

        <input
          type="password"
          name="password2"
          value={fieldValues.password2}
          onChange={handleFieldChange}
          placeholder="비밀번호를 동일하게 입력해주세요."
          className="p-1 bg-gray-100 border border-gray-400 my-3 w-full outline-none focus:border focus:border-gray-400 focus:border-dashed"
        />
        {errorMessages.non_field_errors?.map((message, index) => (
          <p key={index} className="text-xs text-red-400">
            {message}
          </p>
        ))}

        <Button>가입하기</Button>
      </form>
      <DebugStates fieldValues={fieldValues} />
    </div>
  );
}

export default SignupForm;
