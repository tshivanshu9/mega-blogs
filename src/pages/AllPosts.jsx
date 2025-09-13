import service from '../appwrite/config';
import { Postcard, Container } from '../components';
import { useState, useEffect } from 'react';

function AllPosts() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		service.getPosts().then((posts) => {
			if (posts) setPosts(posts.documents);
		});
	}, []);

	return (
		<div className='py-8 w-full'>
			<Container>
				<div className="flex flex-wrap">
					{posts?.length && (posts.map(post => (
						<div key={post.$id} className='p-2 w-1/4'>
							<Postcard post={post} />
						</div>
					)))}
				</div>
			</Container>
		</div>
	)
}

export default AllPosts
