import { useApiAxios } from 'api/base';
import DebugStates from 'components/DebugStates';
import Hover from 'components/Hover';
import { useEffect } from 'react';
import CharacterSummary from './CharacterSummary';

function CharacterList() {
  const [{ data: characterList, loading, error }, refetch] = useApiAxios(
    '/mascot/api/characters/',
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      {loading && '로딩 중 ...'}
      {error && '로딩 중 에러가 발생했습니다.'}
      {characterList &&
        characterList.map((character) => (
          <CharacterSummary character={character} key={character.id} />
        ))}
      <Hover />
      <DebugStates
        characterList={characterList}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default CharacterList;
