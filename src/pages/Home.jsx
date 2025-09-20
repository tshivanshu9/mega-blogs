import { useEffect, useState } from 'react';
import service from '../appwrite/config';
import { Container, Loader, Postcard } from '../components';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addPosts } from '../store/postsSlice';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.status);
  const postStatus = useSelector(state => state.posts.status);
  const storePosts = useSelector(state => state.posts.posts);

  useEffect(() => {
    if (postStatus && storePosts?.length) {
      setPosts(storePosts);
      setLoading(false);
    } else {
      service.getPosts().then((posts) => {
        if (posts.rows?.length) setPosts(posts.rows || []);
        dispatch(addPosts(posts.rows || []));
        setLoading(false);
      });
    }
  }, [postStatus, storePosts, dispatch]);

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
        {posts?.length &&
          posts.map((post) => (
            <div className="p-2 w-1/4" key={post.$id}>
              <Postcard {...post} />
            </div>
          ))}
      </Container>
    </div>
  );
}

export default Home;
