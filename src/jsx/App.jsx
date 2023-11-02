import { useState, useEffect } from 'react';
import '../css/index.css';
import Header from './Header';
import Planning from './Planning';
import Fond2 from './Fond2';
import { tools } from '../lib/tools';
import Dialog from './Dialog';
import Spinner from './Spinner';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { 
	dataState, 
	grnsState, 
	siglesState, 
	formateursState, 
	selectedFormateursState, 
	selectedGrnsState, 
	selectedSiglesState, 
	largeurJourState, 
	hauteurFormationState, 
	margeFormationState, 
	debutState, 
	finState 
} from '../recoil/states';

import { filteredState } from '../recoil/selectors';

function App() {

	const [files, setFiles] = useState([]);
	const [dialog, setDialog] = useState(true);
	const [loading, setLoading] = useState(true);
	const [fichier, setFichier] = useState("");

	const setData = useSetRecoilState(dataState);
	const setGrns = useSetRecoilState(grnsState);
	const setSigles = useSetRecoilState(siglesState);
	const setFormateurs = useSetRecoilState(formateursState);
	const setSelectedGrns = useSetRecoilState(selectedGrnsState);
	const setSelectedSigles = useSetRecoilState(selectedSiglesState);
	const setSelectedFormateurs = useSetRecoilState(selectedFormateursState);

	const filtered = useRecoilValue(filteredState);
	const largeurJour = useRecoilValue(largeurJourState);
	const margeFormation = useRecoilValue(margeFormationState);
	const hauteurFormation = useRecoilValue(hauteurFormationState);
	const debut = useRecoilValue(debutState);
	const fin = useRecoilValue(finState);

	const [scrollX, setScrollX] = useState(0);

	// const dispatch = useDispatch();

	const callGetFiles = async () => {
		window.scrollTo(0,0)
		setDialog(true)
		setFiles([])
		setLoading(true)
		let files = await window.electronAPI.getFiles();
		setLoading(false)
		setFiles(files);
	}

	const handleSelectFile = (elt) => {
		// console.log(elt)
		setLoading(false)
		callOpenFile(elt.fullName)
		setFichier(elt.name)
	}
	

	const callOpenFile = async (file) => {

		setLoading(true)

		window.electronAPI.choice(file);
		let raw = await window.electronAPI.openFile()
		let data = tools.rawToData(raw)
		
		let grns = tools.getGRN(data)
		let sigles = tools.getSigles(data)
		let formateurs = tools.getFormateurs(data)
		
		let selectedGrns = [...grns]
		let selectedSigles = [...sigles]
		let selectedFormateurs = [...formateurs]
		
		let debut = dayjs().hour(0)
		let fin = dayjs().hour(0)
		for (const o of state.filtered) {
			if (o.debut.isBefore(debut)) debut = dayjs(o.debut)
			if (o.fin.isAfter(fin)) fin = dayjs(o.fin)
		}
		debut = debut.startOf("month"); //.startOf("week")
		fin = fin.endOf('month'); //.endOf('week')
	
		// let filtered = tools.bigFilter(data, selectedGrns, selectedSigles, selectedFormateurs)

		// let stagiaires = tools.getStagiairesByWeek(filtered, debut, fin)

		setData(data)
		setGrns(grns)
		setSigles(sigles)
		setFormateurs(formateurs)
		setSelectedGrns(grns)
		setSelectedSigles(sigles)
		setSelectedFormateurs(formateurs)
	
		setLoading(false)
		setDialog(false)
	}

	const handleOnScroll = async (evt) => {
		// console.log(evt)
		
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
						height: filtered.length * (hauteurFormation+margeFormation) + 130 ,
						width: ((fin.unix()-debut.unix())/86400) * largeurJour 
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
