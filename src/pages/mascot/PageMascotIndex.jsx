import Button from 'components/Button';
import CharacterList from 'components/mascot/CharacterList';
import { useNavigate } from 'react-router-dom';

function PagemascotIndex() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>국내 마스코트 소개</h2>
      <CharacterList />

      <Button onClick={() => navigate('/mascot/new/')}>새 포스팅 쓰기</Button>
    </div>
  );
}

export default PagemascotIndex;
