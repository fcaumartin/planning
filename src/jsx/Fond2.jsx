import { useState, useEffect } from "react";

import { tools } from "../lib/tools";

import { useSelector } from "react-redux";


function Fond2 (props) {

	const { gantt, config } = useSelector(store => store)

	const [jours, setJours] = useState([]);
	const [joursEOM, setJoursEOM] = useState([]);

	useEffect( () => {
		
		// console.log("tsDebut=" + tools.parseTS(props.tsDebut))
		// console.log("tsFin=" + tools.parseTS(props.tsFin))

		
		let t_d = tools.getDays(gantt.debut, gantt.fin) 
		setJours(t_d[0]);
		setJoursEOM(t_d[1]);

	}, [gantt.tsDebut, gantt.tsFin]);

	return (
		<div className="fond2">
			
			<div className="jours">
				{
					jours.map( (v, i) => 
						<div 
							key={v} 
							className={"jour " + joursEOM[i]} 
							style={ { 
								width: config.largeurJour-1 ,
								height: gantt.filtered.length * (config.hauteurFormation+config.margeFormation) + 130
							} }
							title={v}
						></div>
					)
				}
			</div>
		</div>
	);
}

export default Fond2;
