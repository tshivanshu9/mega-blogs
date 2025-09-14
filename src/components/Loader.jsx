import { ClipLoader } from "react-spinners";
import { Container } from "./index.js";

function Loader() {
	return (
		<div className='w-full py-8 mt-4 text-center'>
			<Container>
				<div className="flex flex-wrap justify-center items-center">
					<div className="p-2 w-full flex flex-col items-center">
						<ClipLoader color="#2563eb" size={35} />
						<span className="text-xl font-semibold mt-4">Loading posts...</span>
					</div>
				</div>
			</Container>
		</div>
	)
}

export default Loader
