import { useState, useEffect } from 'react';
import '../css/index.css';
import Header from './Header';
import Planning from './Planning';
import Fond2 from './Fond2';
import { tools } from '../lib/tools';
import Dialog from './Dialog';
import Spinner from './Spinner';

import { loadExcel } from '../redux';

// import { BrowserWindow } from 'electron';

import { useDispatch, useSelector } from 'react-redux';

// const mainWindow = BrowserWindow.getFocusedWindow();


function App() {

	const [files, setFiles] = useState([]);
	const [dialog, setDialog] = useState(true);
	const [loading, setLoading] = useState(true);
	const [fichier, setFichier] = useState("");

	const { gantt, config } = useSelector(state => state)

	const [scrollX, setScrollX] = useState(0);

	const dispatch = useDispatch();

	const callGetFiles = async () => {
		console.log("111")
		window.scrollTo(0,0)
		setDialog(true)
		setFiles([])
		setLoading(true)
		let tab = await window.electronAPI.getFiles();
		setLoading(false)
		console.log("222")
		setFiles(tab);
		console.log("-RAW----------------------------")
		console.log(tab)
	  	console.log("-----------------------------")
	}

	const handleSelectFile = (elt) => {
		// console.log(elt)
		setLoading(false)
		callOuvrir(elt.fullName)
		setFichier(elt.name)
	}
	

	const callOuvrir = async (file) => {
		// window.webContents.send('nom-du-message', 'données à envoyer')
		setLoading(true)
		console.log(file)
		let res666 = window.electronAPI.choice(file);
		const raw = await window.electronAPI.openFile()
		
		// console.log("-RAW----------------------------")
		// console.log(raw)
		// console.log("-----------------------------")
		let data = tools.rawToData(raw)
		// console.log("-DATA----------------------------")
		// console.log(data)
		// console.log("-----------------------------")
		
		
		// setData(data)
		
		// dispatch(loadExcel(raw));
		dispatch(loadExcel(data));
		setLoading(false)
		setDialog(false)
	}

	const handleOnScroll = async (evt) => {
		console.log(evt)
		
	}

	useEffect(() => {

		callGetFiles()
		
		const handleScroll = (event) => {
			setScrollX(window.scrollX)
		};
			
		window.addEventListener('scroll', handleScroll);
			
		return () => {
		  	window.removeEventListener('scroll', handleScroll);
		};
	
	}, []);


	return (
			<div className="App" onScroll={handleOnScroll}>
				<Spinner show={loading} />
				<Dialog show={dialog} files={files} onSelect={handleSelectFile}/>
				<Header 
					fichier={fichier}
					scrollX={scrollX}
					onOpen={callGetFiles} 
				/>
				<div 
					className="gantt" 
					style={ { 
						height: gantt.filtered.length * (config.hauteurFormation+config.margeFormation) + 130 ,
						width: ((gantt.tsFin-gantt.tsDebut)/86400) * config.largeurJour 
					} }
					onMouseMove={(evt)=>{/*console.log(evt)*/}}
				>
					<Fond2 />
					<Planning />
				</div>
			</div>
	);
}

export default App;
