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
    </div>
  );
}

export default PageReviewForm;
