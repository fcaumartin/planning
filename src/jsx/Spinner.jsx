
function Spinner(props) {

	
	return (
		<div className="spinner-container" style={{visibility: props.show?'visible':'hidden'}}>
			
				<span className="loader"></span>
		</div>
	);
}

export default Spinner;
