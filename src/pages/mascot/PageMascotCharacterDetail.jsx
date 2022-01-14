import CharacterDetail from 'components/mascot/CharacterDetail';
import { useParams } from 'react-router-dom';

function PageMascotCharacterDetail() {
  const { characterId } = useParams();

  return (
    <div>
      <h2>마스코트#</h2>
      <CharacterDetail characterId={characterId} />
    </div>
  );
}

export default PageMascotCharacterDetail;
