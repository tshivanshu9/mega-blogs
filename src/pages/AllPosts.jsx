import service from '../appwrite/config';
import { Postcard, Container, Loader } from '../components';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPosts } from '../store/postsSlice';

function AllPosts() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	const { postStatus, storePosts } = useSelector(state => ({
		postStatus: state.posts.status,
		storePosts: state.posts.posts,
	}));

	useEffect(() => {
		if (postStatus) {
			setPosts(storePosts);
			setLoading(false);
		}
		else {
			service.getPosts().then((posts) => {
				if (posts.rows?.length) setPosts(posts.rows);
				dispatch(addPosts(posts.rows));
			});
			setLoading(false);
		}
	}, []);

	if (loading) return <Loader />;
	return (
		<div className='py-8 w-full'>
			<Container>
				<div className="flex flex-wrap">
					{posts?.length && (posts.map(post => (
						<div key={post.$id} className='p-2 w-1/4'>
							<Postcard {...post} />
						</div>
					)))}
				</div>
			</Container>
		</div>
	)
}

export default AllPosts
