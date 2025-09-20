import service from '../appwrite/config';
import { Postcard, Container, Loader } from '../components';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMyPosts } from '../store/postsSlice';
import { Query } from 'appwrite';

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const postStatus = useSelector((state) => state.posts.myPostsStatus);
  const storePosts = useSelector((state) => state.posts.myPosts);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (postStatus) {
      setPosts(storePosts);
      setLoading(false);
    } else {
      service
        .getPosts([
          Query.equal('status', 'active'),
          Query.equal('userId', userData.$id),
        ])
        .then((posts) => {
          if (posts.rows?.length) {
            setPosts(posts.rows);
            dispatch(addMyPosts(posts.rows || []));
          }
        });
      setLoading(false);
    }
  }, []);

  if (loading) return <Loader />;
  if (!posts?.length) {
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
    </div>
  );
}

export default MyPosts;
