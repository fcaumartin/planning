
function Dialog(props) {

	// const [liste, setListe] = useState([]);
	// const [tout, setTout] = useState(true);

	const handleClick = (elt) => {
		// console.log(elt)
		props.onSelect(elt);
	}
	
	return (
		<div className="dialog" style={{visibility: props.show?'visible':'hidden'}}>
			<div></div>
			<div>
				{
					props.files.map( (elt, i) => (
						<div key={i} onClick={() => { handleClick(elt) } }>
							{elt.name}
						</div>

					))
				}
			</div>
		</div>
	);
}

export default Dialog;
