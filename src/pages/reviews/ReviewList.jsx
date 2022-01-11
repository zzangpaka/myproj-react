import DebugStates from 'components/DebugStates';
import { useEffect, useState } from 'react';
import Review from 'components/Review';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from 'api/base';

function PageReviewList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reviewList, setReviewList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, []);

  const refetch = () => {
    setLoading(true);
    setError(null);

    const url = `/shop/api/reviews/`;
    // Promise 객체
    axiosInstance
      .get(url)
      .then(({ data }) => {
        setReviewList(data);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteReview = (deletingReview) => {
    const { id: deletingReviewId } = deletingReview;
    const url = `/shop/api/reviews/${deletingReviewId}/`;

    setLoading(true);
    setError(null);

    axiosInstance
      .delete(url)
      .then(() => {
        console.log('삭제 성공');
        // 삭제된 항목만 상탯값에서 제거
        setReviewList((prevReviewList) => {
          return prevReviewList.filter((review) => {
            return review.id !== deletingReviewId;
          });
        });
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <h2>Review List</h2>

      {loading && <div>Loading ...</div>}
      {error && <div>통신 중에 오류가 발생했습니다.</div>}

      <button
        onClick={() => refetch()}
        className="text-pink-500 hover:text-pink-300 mr-1"
      >
        새로고침
      </button>

      <button
        onClick={() => navigate('/reviews/new/')}
        className="text-pink-500 hover:text-pink-300"
      >
        새 리뷰
      </button>

      <div className="">
        {reviewList.map((review) => (
          <Review
            review={review}
            key={review.id}
            handleEdit={() => navigate(`/reviews/${review.id}/edit`)}
            handleDelete={() => deleteReview(review)}
          />
        ))}
      </div>

      <hr />
      <DebugStates loading={loading} error={error} reviewList={reviewList} />
    </div>
  );
}

export default PageReviewList;
