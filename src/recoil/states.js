import { atom } from "recoil"
import { tools } from "./lib/tools"
import dayjs from "dayjs";
import "dayjs/locale/fr";

dayjs.locale('fr')

export const dataState = atom({
    key: 'dataState', 
    default: [], 
});

export const grnsState = atom({
    key: 'grnsState', 
    default: [], 
});

export const selectedGrnsState = atom({
    key: 'selectedGrnsState', 
    default: [], 
});

export const formateursState = atom({
    key: 'formateursState', 
    default: [], 
});

export const selectedFormateursState = atom({
    key: 'selectedFormateursState', 
    default: [], 
});

export const siglesState = atom({
    key: 'siglesState', 
    default: [], 
});

export const selectedSiglesState = atom({
    key: 'selectedSiglesState', 
    default: [], 
});

export const stagiairesState = atom({
    key: 'stagiairesState', 
    default: [], 
});

export const debutState = atom({
    key: 'debutState', 
    default: dayjs(), 
});

export const finState = atom({
    key: 'finState', 
    default: dayjs(), 
});

export const largeurJourState = atom({
    key: 'largeurJourState', 
    default: 5, 
});

export const hauteurFormationState = atom({
    key: 'hauteurFormationState', 
    default: 10, 
});

export const margeFormationState = atom({
    key: 'margeFormationState', 
    default: 20, 
});


//     reducers: {
//         loadExcel: (state, action) => {
//             // console.log("load Excel")

//             state.data = action.payload
//             state.grns = tools.getGRN(state.data)
//             state.selectedGrns = [...state.grns]
// 			state.sigles = tools.getSigles(state.data)
// 			state.selectedSigles = [...state.sigles]
//             state.formateurs = tools.getFormateurs(state.data)
// 			state.selectedFormateurs = [...state.formateurs]

// 			state.filtered = tools.bigFilter(state.data, state.selectedGrns, state.selectedSigles, state.selectedFormateurs)

//             state.debut = dayjs().hour(0)
//             state.fin = dayjs().hour(0)
//             for (const o of state.filtered) {
//                 if (o.debut.isBefore(state.debut)) state.debut = dayjs(o.debut)
// 				if (o.fin.isAfter(state.fin)) state.fin = dayjs(o.fin)
// 			}
//             state.debut = state.debut.startOf("month"); //.startOf("week")
//             state.fin = state.fin.endOf('month'); //.endOf('week')
//             // console.log("state debut " + state.debut.format("DD/MM/YYYY"))
//             // console.log("state fin " + state.fin.format("DD/MM/YYYY"))
// 			//state.tsDebut = state.debut.unix();
// 			//state.tsFin = state.fin.unix();
            
//             state.stagiaires = tools.getStagiairesByWeek(state.filtered, state.debut, state.fin)
            
//             // console.log("--loading-Excel----------------------")
//             // console.log(state.stagiaires)
//             // console.log("-------------------------------------")
            
//             return state;
//         },
//         changeSelectedGrns: (state, action) => {
//             // console.log("selected GRN")
//             state.selectedGrns = action.payload
//             state.sigles = tools.getSigles(state.data, state.selectedGrns)
//             state.selectedSigles = [...state.sigles]

//             state.filtered = tools.bigFilter(state.data, state.selectedGrns, state.selectedSigles, state.selectedFormateurs)

//             state.debut = dayjs().hour(0)
//             state.fin = dayjs().hour(0)
//             for (const o of state.filtered) {
//                 if (o.debut.isBefore(state.debut)) state.debut = dayjs(o.debut)
// 				if (o.fin.isAfter(state.fin)) state.fin = dayjs(o.fin)
// 			}
//             state.debut = state.debut.startOf("month"); //.startOf("week")
//             state.fin = state.fin.endOf('month'); //.endOf('week')
// 			// state.tsDebut = state.debut.unix();
// 			// state.tsFin = state.fin.unix();
            
//             state.stagiaires = tools.getStagiairesByWeek(state.filtered, state.debut, state.fin)

//             // console.log("--loading-Excel----------------------")
//             // console.log(state)
//             // console.log("-------------------------------------")
            
//             return state;
//         },
//         changeSelectedSigles: (state, action) => {
//             // console.log("selected Sigle")

//             state.selectedSigles = action.payload

//             state.filtered = tools.bigFilter(state.data, state.selectedGrns, state.selectedSigles, state.selectedFormateurs)

//             state.debut = dayjs().hour(0)
//             state.fin = dayjs().hour(0)
//             for (const o of state.filtered) {
//                 if (o.debut.isBefore(state.debut)) state.debut = dayjs(o.debut)
// 				if (o.fin.isAfter(state.fin)) state.fin = dayjs(o.fin)
// 			}
//             state.debut = state.debut.startOf("month"); //.startOf("week")
//             state.fin = state.fin.endOf('month'); //.endOf('week')
// 			// state.tsDebut = state.debut.unix();
// 			// state.tsFin = state.fin.unix();
            
//             state.stagiaires = tools.getStagiairesByWeek(state.filtered, state.debut, state.fin)

//             return state;
//         },
//         changeSelectedFormateurs: (state, action) => {
//             // console.log("selected Formateur")

//             state.selectedFormateurs = action.payload

//             state.filtered = tools.bigFilter(state.data, state.selectedGrns, state.selectedSigles, state.selectedFormateurs)

//             state.debut = dayjs().hour(0)
//             state.fin = dayjs().hour(0)
//             for (const o of state.filtered) {
//                 if (o.debut.isBefore(state.debut)) state.debut = dayjs(o.debut)
// 				if (o.fin.isAfter(state.fin)) state.fin = dayjs(o.fin)
// 			}
//             state.debut = state.debut.startOf("month"); //.startOf("week")
//             state.fin = state.fin.endOf('month'); //.endOf('week')
// 			// state.tsDebut = state.debut.unix();
// 			// state.tsFin = state.fin.unix();
            
//             state.stagiaires = tools.getStagiairesByWeek(state.filtered, state.debut, state.fin)

//             return state;
//         }
//     }
// })

// const configSlice = createSlice({
//     name: "config2",
//     initialState: {
//         largeurJour: config.largeurJour,
//         hauteurFormation: config.hauteurFormation,
//         margeFormation: config.margeFormation
//     },
//     reducers: {
//         setLargeurJour: (state, action) => {

//             // console.log("--setLargeurJour----------------------")
//             state.largeurJour = action.payload
//             return state;
//         }
//     }
// })

// export const { loadExcel, changeSelectedGrns, changeSelectedSigles, changeSelectedFormateurs } = ganttSlice.actions; 
// export const { setLargeurJour } = configSlice.actions; 

// export const store = configureStore({
//     reducer: {
//         gantt: ganttSlice.reducer,
//         config: configSlice.reducer
//     }
// });