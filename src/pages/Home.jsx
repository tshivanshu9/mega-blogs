import { useEffect, useState } from 'react';
import service from '../appwrite/config';
import { Container, Postcard } from '../components';
import { useNavigate } from 'react-router-dom';

function Home() {
	const [posts, setPosts] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		service.getPosts().then((posts) => {
			if (posts.length) {
				setPosts(posts.documents);
			}
		})
	}, []);

	if (!posts?.length) {
		return (
			<div className='w-full py-8 mt-4 text-center'>
				<Container>
					<div className="flex flex-wrap">
						<div className="p-2 w-full">
							<button className='text-2xl font-bold hover:text-gray-500 cursor-pointer'
								onClick={() => (navigate('/login'))}>
								Login to read posts
							</button>
						</div>
					</div>
				</Container>
			</div>
		);
	}
	return (
		<div className="py-8 w-full">
			<Container>
				{posts?.length && posts.map(post => (
					<div className='p-2 w-1/4' key={post.$id}>
						<Postcard {...post} />
					</div>
				))}
			</Container>
		</div>
	);
}

export default Home
