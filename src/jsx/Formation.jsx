import { useSelector } from "react-redux";
import { tools } from "../lib/tools";




function Formation({index, elt}) {

	const { gantt, config } = useSelector(store => store)

	

	return (
		<div 
			
			className="formation" 
			style={{
				top: index*(config.hauteurFormation+config.margeFormation) + 100, 
				left: tools.diffTsToDays(elt.debut.unix(), gantt.debut.unix())*config.largeurJour, 
				width: (tools.diffTsToDays(elt.fin.unix(), elt.debut.unix())+1)*config.largeurJour, 
				height: config.hauteurFormation 
			}}
			title={elt.description}
		>
			<b>{elt.sigle}</b>
			
			<span> - {elt.osia1 || elt.osia2 || ""} </span> 
			&nbsp;-&nbsp;
			{elt.formateur || <span className="enrouge">?</span>}
			&nbsp;-&nbsp;
			{elt.af || <span className="enrouge">?</span>}
			&nbsp;-&nbsp;
			<b>{"[" + elt.stagiaires_reel + "/" + elt.stagiaires_prevu + "]"}</b>

			{
				elt.pe1Debut && <div
									className="entreprise" 
									style={{
										top: 0, 
										left: tools.diffTsToDays(elt.pe1Debut.unix(), elt.debut.unix())*config.largeurJour, 
										width: (tools.diffTsToDays(elt.pe1Debut.unix(), elt.pe1Fin.unix())+1)*config.largeurJour, 
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
										left: tools.diffTsToDays(elt.pe2Debut.unix(), elt.debut.unix())*config.largeurJour, 
										width: (tools.diffTsToDays(elt.pe2Debut.unix(), elt.pe2Fin.unix())+1)*config.largeurJour, 
										height: config.hauteurFormation 
									}}
								>
									</div>
			}

			{
				elt.interruption1Debut && <div
									className="conges" 
									style={{
										top: 0, 
										left: tools.diffTsToDays(elt.interruption1Debut.unix(), elt.debut.unix())*config.largeurJour, 
										width: (tools.diffTsToDays(elt.interruption1Debut.unix(), elt.interruption1Fin.unix())+1)*config.largeurJour, 
										height: config.hauteurFormation 
									}}
								>
									</div>
			}

{
				elt.interruption2Debut && <div
									className="conges" 
									style={{
										top: 0, 
										left: tools.diffTsToDays(elt.interruption2Debut.unix(), elt.debut.unix())*config.largeurJour, 
										width: (tools.diffTsToDays(elt.interruption2Debut.unix(), elt.interruption2Fin.unix())+1)*config.largeurJour, 
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
										left: tools.diffTsToDays(elt.certifDebut.unix(), elt.debut.unix())*config.largeurJour, 
										width: (tools.diffTsToDays(elt.certifDebut.unix(), elt.certifFin.unix())+1)*config.largeurJour, 
										height: config.hauteurFormation 
									}}
								>
									</div>
			}
			
		</div>
	);
}

export default Formation;
