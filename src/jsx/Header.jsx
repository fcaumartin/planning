import Fond1 from "./Fond1";

// import config from "../config";
import { useDispatch, useSelector } from "react-redux";
import { changeSelectedGrns, changeSelectedSigles, changeSelectedFormateurs, setLargeurJour } from '../redux'
import MenuSelect from "./MenuSelect";

function Header(props) {

	const { gantt, config } = useSelector(store => store)
	const dispatch = useDispatch()

	const handleChangeLargeur = (sign) => {
		let lj = config.largeurJour
		if (sign==='+') lj++
		if (sign==='-') lj--
		
		dispatch(setLargeurJour(lj))
		
	}

	const handleChangeGRN = (list) => {
		dispatch(changeSelectedGrns(list))
	}

	const handleChangeSigles = (list) => {
		dispatch(changeSelectedSigles(list))
	}

	const handleChangeFormateurs = (list) => {
		dispatch(changeSelectedFormateurs(list))
	}

	return (
		<div className="header">
			<div class="btn-group">
				<legend>{props.fichier || 'Fichier' }</legend>
				<button onClick={ props.onOpen } >&nbsp;&nbsp;&nbsp;Charger&nbsp;&nbsp;&nbsp;</button>
				{/* <button >&nbsp;&nbsp;&nbsp;Actualiser&nbsp;&nbsp;&nbsp;</button> */}
			</div>
			<div class="btn-group">
				<legend>Taille</legend>
				<button onClick={ () => { handleChangeLargeur('-') }}>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;</button>
				<button onClick={ () => { handleChangeLargeur('+') }}>&nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;</button>
			</div>
			<div class="btn-group">
				<legend>Filtres</legend>
				<MenuSelect name="GRN" data={gantt.grns} onChange={handleChangeGRN} />
				<MenuSelect name="Formations" data={gantt.sigles} onChange={handleChangeSigles}/>
				<MenuSelect name="Formateurs" data={gantt.formateurs} onChange={handleChangeFormateurs}/>
			</div>
			
			<Fond1 scrollX={props.scrollX}/>

		</div>
	);
}

export default Header;
