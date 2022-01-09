import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ReviewForm() {
  const [fieldValues, setFieldValues] = useState({
    content: '',
    score: 0,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFieldValues((prevFieldValues) => {
      return {
        ...prevFieldValues,
        [name]: value,
      };
    });
  };

  const handleSubmit = () => {
    const url = 'http://localhost:8000/shop/api/reviews/';
    Axios.post(url, fieldValues)
      .then(() => {
        navigate('/reviews/');
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setFieldValues({}));
  };

  return (
    <div>
      <div className="rounded border-2 border-pink-500 p-3 my-3">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            별점
          </label>
          <select
            onChange={handleChange}
            name="score"
            className="block appearance-none w-full bg-white border border-gray-300 
        text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none 
        focus:bg-white focus:border-gray-500"
          >
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            리뷰
          </label>
          <textarea
            className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            name="content"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-4">
          <button
            className="shadow border bg-pink-100 hover:bg-pink-300 border-pink-500 
          rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight"
            onClick={handleSubmit}
          >
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewForm;
