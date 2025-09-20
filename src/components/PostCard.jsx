import service from '../appwrite/config';
import { Link } from 'react-router-dom';

function Postcard({ $id, title, featuredImage, isAuthor }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full p-4 pt-8 rounded-xl bg-gray-100 relative">
        {isAuthor && (
          <span className="absolute top-2 right-2 bg-[#b54117] text-white text-sm px-3 py-1 rounded-full shadow-md flex items-center gap-1 z-10">
            <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.657 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            You
          </span>
        )}
        <div className="w-full justify-center mb-4">
          <img
            src={service.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <h2 className="font-bold text-xl">{title}</h2>
      </div>
    </Link>
  );
}

export default Postcard;
