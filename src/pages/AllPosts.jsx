import service from '../appwrite/config';
import { Postcard, Container, Loader } from '../components';
import { useState, useEffect } from 'react';

function AllPosts() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		service.getPosts().then((posts) => {
			if (posts.rows?.length) setPosts(posts.rows);
			setLoading(false);
		});
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
