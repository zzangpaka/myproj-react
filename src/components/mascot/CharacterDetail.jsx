import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApiAxios } from 'api/base';
import LoadingIndicator from 'components/LoadingIndicator';
import Rating from 'components/Rating';

function CharacterDetail({ characterId }) {
  const navigate = useNavigate();

  const [{ data: character, loading, error }, refetch] = useApiAxios(
    `/mascot/api/characters/${characterId}/`,
    { manual: true },
  );

  const [{ loading: deleteLoading, error: deleteError }, deleteCharacter] =
    useApiAxios(
      {
        url: `/mascot/api/characters/${characterId}/`,
        method: 'DELETE',
      },
      { manual: true },
    );

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      // REST API 에서는 DELETE 요청에 대한 응답이 없습니다.
      deleteCharacter().then(() => {
        navigate('/mascot/');
      });
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      {loading && <LoadingIndicator />}
      {deleteLoading && <LoadingIndicator>삭제 중 ...</LoadingIndicator>}
      {error &&
        `로딩 중 에러가 발생했습니다. (${error.response.status} ${error.response.statusText})`}
      {deleteError &&
        `삭제 요청 중 에러가 발생했습니다. (${deleteError.response.status} ${deleteError.response.statusText})`}
      {character && (
        <>
          <h3 className="text-2xl my-5">
            {character.region}
            {character.name}
          </h3>
          {character.photo && (
            <img
              src={character.photo}
              alt={character.name}
              className="rounded"
            />
          )}
          <div>
            {character.explain.split(/[\r\n]+/).map((line, index) => (
              <p className="my-3" key={index}>
                {line}
              </p>
            ))}
            <Rating charming={character.charming} />
          </div>
        </>
      )}
      <hr className="my-3" />
      <div className="flex gap-4 mt-3 mb-10">
        <Link to="/mascot/" className="hover:text-red-400">
          목록으로
        </Link>
        <Link
          to={`/mascot/${characterId}/edit/`}
          className="hover:text-red-400"
        >
          수정하기
        </Link>
        <button
          disabled={deleteLoading}
          onClick={handleDelete}
          className="hover:text-red-400"
        >
          삭제하기
        </button>
      </div>
    </div>
  );
}

export default CharacterDetail;
