import { useApiAxios } from 'api/base';
import DebugStates from 'components/DebugStates';
import { useEffect } from 'react';
import ArticleSummary from './ArticleSummary';
import useAuth from 'hooks/useAuth';

function ArticleList() {
  const [auth] = useAuth();

  const [{ data: articleList, loading, error }, refetch] = useApiAxios(
    // 방법 2)
    {
      url: '/news/api/articles/',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  useEffect(() => {
    // 방법 1)
    // refetch({
    //   headers: {
    //     Authorization: `Bearer ${auth.access}`,
    //   },
    // });
    refetch();
  }, [auth]);

  return (
    <div>
      <h3>뉴스 기사 목록을 보여줄 것입니다.</h3>
      {loading && '로딩 중 ...'}
      {error && '로딩 중 에러가 발생했습니다.'}
      {articleList &&
        articleList.map((article) => <ArticleSummary article={article} />)}
      <DebugStates articleList={articleList} loading={loading} error={error} />
    </div>
  );
}

export default ArticleList;
