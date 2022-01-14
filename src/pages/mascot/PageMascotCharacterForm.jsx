import { useNavigate, useParams } from 'react-router-dom';
import CharacterForm from 'components/mascot/CharacterForm';

function PageMascotCharacterForm() {
  const navigate = useNavigate();

  const { characterId } = useParams();

  return (
    <CharacterForm
      characterId={characterId}
      handleDidSave={(savedCharacter) =>
        navigate(`/mascot/${savedCharacter.id}/`)
      }
    />
  );
}

export default PageMascotCharacterForm;
