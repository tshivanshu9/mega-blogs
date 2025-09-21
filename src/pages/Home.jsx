import { useEffect, useState } from 'react';
import service from '../appwrite/config';
import { Container, Loader, Postcard } from '../components';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addPosts } from '../store/postsSlice';
import { Query } from 'appwrite';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.status);
  // const postStatus = useSelector((state) => state.posts.status);
  // const storePosts = useSelector((state) => state.posts.posts);
  const userData = useSelector((state) => state.auth.userData);

  // useEffect(() => {
  //   if (postStatus && storePosts?.length) {
  //     setPosts(storePosts);
  //     setLoading(false);
  //   } else {
  //     service.getPosts([Query.equal('status', 'active'), Query.orderDesc('$createdAt')
  //       , Query.limit(8)
  //     ]).then((posts) => {
  //       if (posts.rows?.length) setPosts(posts.rows || []);
  //       dispatch(addPosts(posts.rows || []));
  //       setLoading(false);
  //     });
  //   }
  // }, [postStatus, storePosts, dispatch]);

  useEffect(() => {
    setLoading(true);
    service.getPosts([Query.equal('status', 'active'), Query.orderDesc('$createdAt')
      , Query.limit(8), Query.offset((page - 1) * 8)
    ]).then((result) => {
      setPosts(result.rows || []);
      setHasMore(result.rows.length === 8);
      setLoading(false);
      // dispatch(addPosts(result.rows || []));
    });
  }, [page]);

  if (loading) {
    return <Loader />;
  }

  if (!posts?.length) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              {!isLoggedIn ? (
                <button
                  className="text-2xl font-bold px-8 py-4 hover:text-gray-500 cursor-pointer rounded-2xl shadow-lg transition"
                  onClick={() => navigate('/login')}
                >
                  Login to read posts
                </button>
              ) : (
                <button
                  className="text-2xl font-bold px-8 py-4 hover:text-gray-500 cursor-pointer rounded-2xl shadow-lg transition"
                  onClick={() => navigate('/add-post')}
                >
                  No posts yet, click here and add your first post!
                </button>
              )}
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
            posts.map((post) => {
              const isAuthor = post && userData ? post.userId === userData.$id : false;
              return (<div className="p-2 w-1/4" key={post.$id}>
                <Postcard {...post} isAuthor={isAuthor} />
              </div>
              );
            })}
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

export default Home;
