import { useState, useEffect } from "react";
import '../css/MenuSelect.css'

function MenuSelect(props) {

	const [liste, setListe] = useState([]);
	const [tout, setTout] = useState(true);
	const [visible, setVisible] = useState(false);

	const onMouseEnter = (evt) => {
		setVisible(true);
	}

	const onMouseOut = (evt) => {
		setVisible(false);
	}

	const handleClick = (evt, i) => {
		// console.dir("******************************")
		// console.dir(evt.target.nodeName.toLowerCase())
		if (evt.target.nodeName.toLowerCase()==="div") {
			handleChange(!evt.target.firstChild.checked, i)
		}
		if (evt.target.nodeName.toLowerCase()==="label") {
			// console.dir(evt.target.previousElementSibling)
			handleChange(!evt.target.previousElementSibling.checked, i)
		}
		if (evt.target.nodeName.toLowerCase()==="input") {
			// console.dir(evt.target)
			handleChange(!evt.target.checked, i)
		}
	}


	const handleChange = (chk, i) => {
		// console.log(chk + " " + i)
		let tmp = [...liste]
		if (i===-1) {
			for (let x=0; x<tmp.length; x++) {
				tmp[x] = chk
			}
			setTout(chk)
		}
		else {
			if (!chk) setTout(false)
			tmp[i] = chk
		}
		// console.log(tmp)
		setListe(tmp)

		let tmp2 = props.data.filter((v, i) => tmp[i]===true)
		props.onChange(tmp2)
	}

	useEffect((evt)=>{
		// console.log("useEffect props.data")
		let tmp = []
		for (let i = 0; i < props.data.length; i++) {
			tmp.push(true)
		}
		setListe(tmp)
	}, [props.data])

	return (
		<span className="menuselect" onMouseLeave={onMouseOut}>
			<div className="titre" onMouseEnter={onMouseEnter}> {props.name}</div>
			<div className="content" style={ { visibility: visible?"visible":'hidden' } }  >

				<div  onClick={(evt) => {handleClick(evt,-1)}}>
					<input type="checkbox" checked={tout} id={props.name + "_tout"} onChange={(evt) => { handleChange(evt.target.checked, -1) }}/>
					<label >Tout</label>
				</div>
				{
					props.data.map( (v, i) => (
						<div key={i} onClick={(evt) => {handleClick(evt,i)}}>
							<input type="checkbox" id={v} onChange={(evt) => { handleChange(evt.target.checked, i) } } checked={liste[i]}/>
							<label >{v}</label>
						</div>
					))
				}

			</div>
		</span>
	);
}

export default MenuSelect;
