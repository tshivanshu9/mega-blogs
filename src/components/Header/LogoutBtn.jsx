import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { emptyPosts } from '../../store/postsSlice';
import { emptyPosts as emptyMyPosts } from '../../store/myPostsSlice';

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await authService.logout();
    dispatch(logout());
    dispatch(emptyPosts());
    dispatch(emptyMyPosts());
    navigate('/login');
  };

  return (
    <button
      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full cursor-pointer"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
