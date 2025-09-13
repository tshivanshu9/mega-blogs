import React from 'react';
import service from '../appwrite/config';
import { Link } from 'react-router-dom';

function Postcard({ $id, title, featuredImage }) {
	return (
		<Link to={`/post/${$id}`}>
			<div className="w-full p-4 rounded-xl bg-gray-100">
				<div className="w-full justify-center mb-4">
					<img src={service.getFilePreview(featuredImage)} alt={title} className='rounded-xl'/>
				</div>
				<h2 className='font-bold text-xl'>{title}</h2>
			</div>
		</Link>
	)
}

export default Postcard
