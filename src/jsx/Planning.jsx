import { useSelector } from "react-redux";
import Formation from "./Formation";



function Planning(props) {

	const { gantt } = useSelector(store => store)

	

	return (
		<div className="planning">
			{gantt.filtered.map((elt, index) => (
				<Formation 
					key={index} 
					index={index} 
					elt={elt}
				>
				</Formation>
			)
			)}
		</div>
	);
}

export default Planning;
