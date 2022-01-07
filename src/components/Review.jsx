import Rating from './Rating';

function Review({ review, handleEdit, handleDelete }) {
  const { content, score } = review;

  // TODO: handleEdit/handleDelete 호출에 대한 방어적 코드를 작성해주세요

  return (
    <div className="bg-yellow-100 border border-yellow-400 my-1 p-1">
      <div>
        <span
          onClick={() => handleEdit()}
          className="hover:text-blue-400 cursor-pointer mr-1"
        >
          수정
        </span>
        <span
          onClick={() => handleDelete()}
          className="hover:text-red-400 cursor-pointer"
        >
          삭제
        </span>
      </div>
      {content}
      <Rating score={score} />
    </div>
  );
}

export default Review;
