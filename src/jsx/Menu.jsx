import { useState, useEffect } from "react";

function Menu(props) {

	const [liste, setListe] = useState([]);
	const [tout, setTout] = useState(true);


	const handleChange = (evt, i) => {
		// console.log(evt.target.id + " " + evt.target.checked)
		let tmp = [...liste]
		if (i===-1) {
			for (let x=0; x<tmp.length; x++) {
				tmp[x] = evt.target.checked
			}
			setTout(evt.target.checked)
		}
		else {
			if (!evt.target.checked) setTout(false)
			tmp[i] = evt.target.checked
		}
		// console.log(tmp)
		setListe(tmp)

		let tmp2 = props.data.filter((v, i) => { if (tmp[i]) return v })
		props.onChange(tmp2)
	}

	useEffect((evt)=>{
		// console.log("useEffect props.data")
		let tmp = []
		for (let v of props.data) {
			tmp.push(true)
		}
		setListe(tmp)
	}, [props.data])

	return (
		<div className="menu">
			<fieldset>
				
				<legend>{props.name}</legend>
				<input type="checkbox" checked={tout} id={props.name + "_tout"} onChange={(evt) => { handleChange(evt, -1) }}/><label htmlFor={props.name + "_tout"}>Tout</label>
				{
					props.data.map( (v, i) => (
						<span key={i}>
							<input type="checkbox" id={v} onChange={(evt) => { handleChange(evt, i) } } checked={liste[i]}/>
							<label htmlFor={v}>{v}</label>
						</span>
					))
				}
			</fieldset>

		</div>
	);
}

export default Menu;
