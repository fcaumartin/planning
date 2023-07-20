import { useState, useEffect } from "react";

import { tools } from "../lib/tools";

import { useSelector } from "react-redux";


function Fond1 (props) {

	const { gantt, config } = useSelector(store => store)

	const [weeks, setWeeks] = useState([]);
	const [weeksLength, setWeeksLength] = useState([]);
	const [months, setMonths] = useState([]);
	const [monthsLength, setMonthsLength] = useState([]);

	useEffect( () => {
		
		// console.log("tsDebut=" + tools.parseTS(props.tsDebut))
		// console.log("tsFin=" + tools.parseTS(props.tsFin))

		let t_m = tools.getMonths(gantt.tsDebut, gantt.tsFin)
		setMonths(t_m[0])
		setMonthsLength(t_m[1])

		let t_w = tools.getWeeks(gantt.tsDebut, gantt.tsFin)
		setWeeks(t_w[0])
		setWeeksLength(t_w[1])
		
	}, [gantt.tsDebut, gantt.tsFin]);

	return (
		<div className="fond1" style={{left: -props.scrollX}}>
			<div></div>
			<div className="months">
				{
					months.map( (v, i) => 
						<div key={i} className="month" style={ { width: ((config.largeurJour)*monthsLength[i])-2 } }>
							{v}
						</div>
					)
				}
			</div>
			<div className="weeks">
				{
					weeks.map( (v, i) => 
						<div 
							key={i} 
							className="week" 
							style={ { width: ((config.largeurJour)*weeksLength[i])-2 } }
						>
							{v}
						</div>
					)
				}
			</div>
			<div className="stagiaires">
				{
					gantt.stagiaires.map( (v, i) => 
						<div 
							key={i} 
							className="stagiaire" 
							style={ { width: ((config.largeurJour)*weeksLength[i])-2 } }
						>
							{v}
						</div>
					)
				}
			</div>
			
		</div>
	);
}

export default Fond1;
