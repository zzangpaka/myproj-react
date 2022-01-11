<<<<<<< HEAD
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
=======
import { useNavigate, useParams } from 'react-router-dom';
import DebugStates from 'components/DebugStates';
import ReviewForm from 'components/ReviewForm';
import useFieldValues from 'hooks/useFieldValues';
import { useEffect, useState } from 'react/cjs/react.development';
import { axiosInstance } from 'api/base';

function PageReviewForm() {
  // 상탯값 정의. 훅 호출
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { reviewId } = useParams();
  const { fieldValues, handleFieldChange, clearFieldValues, setFieldValues } =
    useFieldValues({
      score: 0,
      content: '',
    });
  const [errorMessages, setErrorMessages] = useState({});

  useEffect(() => {
    const fetchReview = async () => {
      setLoading(true);
      setError(null);

      const url = `/shop/api/reviews/${reviewId}/`;
      try {
        const response = await axiosInstance.get(url);
        setFieldValues(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    if (reviewId) fetchReview();
    else clearFieldValues();
  }, [reviewId]);

  // 다양한 함수를 정의
  const saveReview = async () => {
    setLoading(true);
    setError(null);
    setErrorMessages({});

    const url = !reviewId
      ? `/shop/api/reviews/`
      : `/shop/api/reviews/${reviewId}/`;

    try {
      if (!reviewId) {
        await axiosInstance.post(url, fieldValues);
      } else {
        await axiosInstance.put(url, fieldValues);
      }
      navigate('/reviews/');
    } catch (e) {
      setError(e);
      console.error(e);

      setErrorMessages(e.response.data);
    }

    setLoading(false);
  };

  // 표현
  return (
    <div>
      <h2>
        ReviewForm
        {reviewId ? '수정' : '작성'}
      </h2>
      <ReviewForm
        fieldValues={fieldValues}
        errorMessages={errorMessages}
        handleFieldChange={handleFieldChange}
        handleSubmit={saveReview}
        loading={loading}
      />
      <DebugStates
        reviewId={reviewId}
        fieldValues={fieldValues}
        errorMessages={errorMessages}
      />
>>>>>>> 52bda5efa9943f05f65f8b9c29a8e286bec03a5f
    </div>
  );
}

export default PageReviewForm;
