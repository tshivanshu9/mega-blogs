import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import appwriteService from '../appwrite/config';
import { Button, Container } from '../components';
import parse from 'html-react-parser';
import { useSelector, useDispatch } from 'react-redux';
import { emptyPosts } from '../store/postsSlice';

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate('/');
      });
    } else navigate('/');
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        dispatch(emptyPosts());
        navigate('/');
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="max-w-2xl mx-auto bg-white rounded-xl border p-6 shadow-md relative">
          {isAuthor && (
            <div className="absolute top-6 right-6 flex gap-4">
              <Link to={`/edit-post/${post.$id}`}>
                <Button
                  bgColor="bg-green-500"
                  className="button cursor-pointer w-20"
                >
                  Edit
                </Button>
              </Link>
              <Button
                bgColor="bg-red-500"
                onClick={deletePost}
                className="button cursor-pointer w-20"
              >
                Delete
              </Button>
            </div>
          )}

          <div className="w-full flex justify-center mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-xl object-cover max-h-64 w-full"
              style={{ maxWidth: '400px' }}
            />
          </div>

          <h1 className="text-3xl font-bold mb-4 text-center">{post.title}</h1>

          <div className="browser-css">{parse(post.content)}</div>
        </div>
      </Container>
    </div>
  ) : null;
}
