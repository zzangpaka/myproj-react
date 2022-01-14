import Button from 'components/Button';
import DebugStates from 'components/DebugStates';
import produce from 'immer';
import H2 from 'components/H2';
import LoadingIndicator from 'components/LoadingIndicator';
import useFieldValues from 'hooks/useFieldValues';
import { useApiAxios } from 'api/base';
import { useEffect } from 'react';

const INIT_FIELD_VALUES = {
  region: '',
  city: '',
  charming: '0',
  name: '',
  explain: '',
  photo: '',
};

// !characterId : 생성
// characterId  : 수정

function CharacterForm({ characterId, handleDidSave }) {
  // characterId 값이 있을 때에만 조회
  // characterId => manual=false
  // !characterId => manual=true
  const [{ data: character, loading: getLoading, error: getError }] =
    useApiAxios(`/mascot/api/characters/${characterId}/`, {
      manual: !characterId,
    });

  const [
    {
      loading: saveLoading,
      error: saveError,
      errorMessages: saveErrorMessages,
    },
    saveRequest,
  ] = useApiAxios(
    {
      url: !characterId
        ? '/mascot/api/characters/'
        : `/mascot/api/characters/${characterId}/`,
      method: !characterId ? 'POST' : 'PUT',
    },
    { manual: true },
  );

  const { fieldValues, handleFieldChange, setFieldValues, formData } =
    useFieldValues(character || INIT_FIELD_VALUES);

  useEffect(() => {
    // 서버로 photo=null이 전달이 되면, 아래 오류가 발생
    //   - The submitted data was not a file. Check the encoding type on the form.
    //   - 대응 : fieldValues에서 photo만 제거해주거나, photo=null이라면 빈 문자열로 변경
    setFieldValues(
      produce((draft) => {
        draft.photo = '';
      }),
    );
  }, [character]);

  const handleSubmit = (e) => {
    e.preventDefault();

    saveRequest({
      data: formData,
    }).then((response) => {
      const savedCharacter = response.data;
      if (handleDidSave) handleDidSave(savedCharacter);
    });
  };

  return (
    <div>
      <H2>Character Form</H2>

      {saveLoading && <LoadingIndicator>저장 중 ...</LoadingIndicator>}
      {saveError &&
        `저장 중 에러가 발생했습니다. (${saveError.response.status} ${saveError.response.statusText})`}

      <form onSubmit={handleSubmit}>
        <div>
          <select
            name="region"
            value={fieldValues.region}
            onChange={handleFieldChange}
            className="bg-gray-100 border border-gray-400"
          >
            <option>-------</option>
            <option>서울</option>
            <option>부산</option>
            <option>대구</option>
            <option>인천</option>
            <option>광주</option>
            <option>대전</option>
            <option>울산</option>
            <option>세종</option>
            <option>경기도</option>
            <option>강원도</option>
            <option>충청북도</option>
            <option>충청남도</option>
            <option>전라북도</option>
            <option>전라남도</option>
            <option>경상북도</option>
            <option>경상남도</option>
            <option>제주도</option>
          </select>
          {saveErrorMessages.region?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>

        <div className="my-3">
          <input
            name="city"
            value={fieldValues.city}
            onChange={handleFieldChange}
            type="text"
            className="p-1 bg-gray-100 w-full outline-none focus:border focus:border-gray-400 focus:border-dashed"
          />
          {saveErrorMessages.city?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>

        <div>
          <select
            name="charming"
            value={fieldValues.charming}
            onChange={handleFieldChange}
            className="bg-gray-100 border border-gray-400"
          >
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
          {saveErrorMessages.charming?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>

        <div className="my-3">
          <input
            name="name"
            value={fieldValues.name}
            onChange={handleFieldChange}
            type="text"
            className="p-1 bg-gray-100 w-full outline-none focus:border focus:border-gray-400 focus:border-dashed"
          />
          {saveErrorMessages.name?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>

        <div className="my-3">
          <textarea
            name="explain"
            value={fieldValues.explain}
            onChange={handleFieldChange}
            className="p-1 bg-gray-100 w-full h-80 outline-none focus:border focus:border-gray-400 focus:border-dashed"
          />
          {saveErrorMessages.explain?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>

        <div className="my-3">
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            name="photo"
            // value=""
            onChange={handleFieldChange}
          />
          {saveErrorMessages.photo?.map((message, index) => (
            <p key={index} className="text-xs text-red-400">
              {message}
            </p>
          ))}
        </div>

        <div className="my-3">
          <Button>저장하기</Button>
        </div>
      </form>
      <DebugStates
        character={character}
        getLoading={getLoading}
        getError={getError}
        saveErrorMessages={saveErrorMessages}
        fieldValues={fieldValues}
      />
    </div>
  );
}

export default CharacterForm;
