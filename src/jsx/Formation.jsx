import { useSelector } from "react-redux";
import { tools } from "../lib/tools";




function Formation({index, elt}) {

	const { gantt, config } = useSelector(store => store)

	

	return (
		<div 
			
			className="formation" 
			style={{
				top: index*(config.hauteurFormation+config.margeFormation) + 100, 
				left: tools.diffTsToDays(elt.tsDebut, gantt.tsDebut)*config.largeurJour, 
				width: (tools.diffTsToDays(elt.tsFin, elt.tsDebut)+1)*config.largeurJour, 
				height: config.hauteurFormation 
			}}
			title={elt.description}
		>
			<b>{elt.sigle}</b>
			
			<span> - {elt.osia1 || elt.osia2 || ""} </span> 
			-
			{elt.formateur || <span className="enrouge">Pas de formateur</span>}
			- 
			{elt.af || <span className="enrouge">Pas d'assistante</span>}

			{
				elt.pe1Debut && <div
									className="entreprise" 
									style={{
										top: 0, 
										left: tools.diffTsToDays(elt.pe1Debut, elt.tsDebut)*config.largeurJour, 
										width: (tools.diffTsToDays(elt.pe1Debut, elt.pe1Fin)+1)*config.largeurJour, 
										height: config.hauteurFormation 
									}}
								>
									</div>
			}

			{
				elt.pe2Debut && <div
									className="entreprise" 
									style={{
										top: 0, 
										left: tools.diffTsToDays(elt.pe2Debut, elt.tsDebut)*config.largeurJour, 
										width: (tools.diffTsToDays(elt.pe2Debut, elt.pe2Fin)+1)*config.largeurJour, 
										height: config.hauteurFormation 
									}}
								>
									</div>
			}

			{
				elt.certifDebut && <div
									className="certification" 
									style={{
										top: 0, 
										left: tools.diffTsToDays(elt.certifDebut, elt.tsDebut)*config.largeurJour, 
										width: (tools.diffTsToDays(elt.certifDebut, elt.certifFin)+1)*config.largeurJour, 
										height: config.hauteurFormation 
									}}
								>
									</div>
			}
			
		</div>
	);
}

export default Formation;
