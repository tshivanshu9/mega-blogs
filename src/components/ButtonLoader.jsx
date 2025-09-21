import { ClipLoader } from 'react-spinners';

function ButtonLoader({ text }) {
  return (
    <span className="flex items-center justify-center gap-2 font-semibold text-gray-800">
      <ClipLoader color="#fff" size={20} />
      {text}
    </span>
  );
}

export default ButtonLoader;
