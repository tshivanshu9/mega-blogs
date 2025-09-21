import service from '../appwrite/config';
import { Postcard, Container, Loader } from '../components';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPosts } from '../store/myPostsSlice';
import { Query } from 'appwrite';

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  // const dispatch = useDispatch();
  // const postStatus = useSelector((state) => state.myPosts.status);
  // const storePosts = useSelector((state) => state.myPosts.posts);
  const userData = useSelector((state) => state.auth.userData);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setLoading(true);
      service
        .getPosts([
          Query.equal('status', 'active'),
          Query.equal('userId', userData.$id),
          Query.orderDesc('$createdAt'),
          Query.limit(4),
          Query.offset((page - 1) * 4)
        ])
        .then((posts) => {
            setPosts(posts.rows);
            setHasMore(posts.rows.length === 4);
            // dispatch(addPosts(posts.rows || []));
            setLoading(false);
        });
  }, [page]);

  if (loading) return <Loader />;
  else if (!posts?.length) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h2 className="text-2xl font-bold">
                You have not added any posts yet!
              </h2>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="py-8 w-full">
      <Container>
        <div className="flex flex-wrap">
          {posts?.length &&
            posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <Postcard {...post} />
              </div>
            ))}
        </div>
      </Container>
      <div className="flex justify-between items-center mt-8 px-8">
        {page > 1 ? (
          <button
            onClick={() => setPage(page - 1)}
            className="bg-[#b54117] text-white px-6 py-3 rounded-2xl shadow-lg font-semibold transition hover:bg-[#a13a13]"
          >
            Previous
          </button>
        ) : <span />}
        {hasMore ? (
          <button
            onClick={() => setPage(page + 1)}
            className="bg-[#b54117] text-white px-6 py-3 rounded-2xl shadow-lg font-semibold transition hover:bg-[#a13a13]"
          >
            Next
          </button>
        ) : <span />}
      </div>
    </div>
  );
}

export default MyPosts;
