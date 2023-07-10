import Fond1 from "./Fond1";

// import config from "../config";
import { useDispatch, useSelector } from "react-redux";
import { changeSelectedGrns, changeSelectedSigles, setLargeurJour } from '../redux'
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

	return (
		<div className="header">
			<fieldset>
				<legend>Fichier</legend>
				<span >{props.fichier}</span>
				<button onClick={ props.onOpen } >&nbsp;&nbsp;&nbsp;Charger&nbsp;&nbsp;&nbsp;</button>
				<button >&nbsp;&nbsp;&nbsp;Actualiser&nbsp;&nbsp;&nbsp;</button>
			</fieldset>
			<fieldset>
				<legend>Taille</legend>
				<button onClick={ () => { handleChangeLargeur('-') }}>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;</button>
				<button onClick={ () => { handleChangeLargeur('+') }}>&nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;</button>
			</fieldset>
			<fieldset>
				<legend>Filtres</legend>
				<MenuSelect name="GRN" data={gantt.grns} onChange={handleChangeGRN} />
				<MenuSelect name="Formations" data={gantt.sigles} onChange={handleChangeSigles}/>
			</fieldset>
			<Fond1 scrollX={props.scrollX}/>

		</div>
	);
}

export default Header;
