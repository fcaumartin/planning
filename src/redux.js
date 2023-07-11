import { configureStore, createSlice } from "@reduxjs/toolkit"
import { tools } from "./lib/tools"
import config from "./config"
import moment from "moment"

const ganttSlice = createSlice({
    name: "gantt2",
    initialState: {
        data: [],
        filtered: [],
        grns: [],
        selectedGrns: [],
        formateurs: [],
        selectedFormateurs: [],
        sigles: [],
        selectedSigles: [],
        tsDebut: 0,
        tsFin: 0
    },
    reducers: {
        loadExcel: (state, action) => {

            state.data = action.payload
            state.grns = tools.getGRN(state.data)
            state.selectedGrns = [...state.grns]
			state.sigles = tools.getSigles(state.data)
			state.selectedSigles = [...state.sigles]
            state.formateurs = tools.getFormateurs(state.data)
			state.selectedFormateurs = [...state.formateurs]

			state.filtered = state.data.filter ( v => state.selectedGrns.includes(v.grn) && state.selectedSigles.includes(v.sigle) && state.selectedFormateurs.includes(v.formateur)) 

            let min=4000000000, max=0;
			for (const o of state.filtered) {
				if (o.tsDebut<min) min=o.tsDebut;
				if (o.tsFin>max) max=o.tsFin;
			}
			let mom_min = moment.unix(min);
			state.tsDebut = mom_min.startOf("month").unix()+36000;
			let mom_max = moment.unix(max + 86400).endOf("month");
			state.tsFin = mom_max.unix()+36000;


            // console.log("--loading-Excel----------------------")
            // console.log(state)
            // console.log("-------------------------------------")
            
            return state;
        },
        changeSelectedGrns: (state, action) => {
            state.selectedGrns = action.payload
            state.sigles = tools.getSigles(state.data, state.selectedGrns)
            state.selectedSigles = [...state.sigles]

            state.filtered = state.data.filter ( v => state.selectedGrns.includes(v.grn) && state.selectedSigles.includes(v.sigle) && state.selectedFormateurs.includes(v.formateur)) 

            let min=4000000000, max=0;
			for (const o of state.filtered) {
				if (o.tsDebut<min) min=o.tsDebut;
				if (o.tsFin>max) max=o.tsFin;
			}
			let mom_min = moment.unix(min);
			state.tsDebut = mom_min.startOf("month").unix()+36000;
			let mom_max = moment.unix(max + 86400).endOf("month");
			state.tsFin = mom_max.unix()+36000;


            // console.log("--loading-Excel----------------------")
            // console.log(state)
            // console.log("-------------------------------------")
            
            return state;
        },
        changeSelectedSigles: (state, action) => {
            state.selectedSigles = action.payload

            state.filtered = state.data.filter ( v => state.selectedGrns.includes(v.grn) && state.selectedSigles.includes(v.sigle) && state.selectedFormateurs.includes(v.formateur)) 

            let min=4000000000, max=0;
			for (const o of state.filtered) {
				if (o.tsDebut<min) min=o.tsDebut;
				if (o.tsFin>max) max=o.tsFin;
			}
			let mom_min = moment.unix(min);
			state.tsDebut = mom_min.startOf("month").unix()+36000;
			let mom_max = moment.unix(max + 86400).endOf("month");
			state.tsFin = mom_max.unix()+36000;

            return state;
        },
        changeSelectedFormateurs: (state, action) => {
            state.selectedFormateurs = action.payload

            state.filtered = state.data.filter ( v => state.selectedGrns.includes(v.grn) && state.selectedSigles.includes(v.sigle) && state.selectedFormateurs.includes(v.formateur)) 

            let min=4000000000, max=0;
			for (const o of state.filtered) {
				if (o.tsDebut<min) min=o.tsDebut;
				if (o.tsFin>max) max=o.tsFin;
			}
			let mom_min = moment.unix(min);
			state.tsDebut = mom_min.startOf("month").unix()+36000;
			let mom_max = moment.unix(max + 86400).endOf("month");
			state.tsFin = mom_max.unix()+36000;

            return state;
        }
    }
})

const configSlice = createSlice({
    name: "config2",
    initialState: {
        largeurJour: config.largeurJour,
        hauteurFormation: config.hauteurFormation,
        margeFormation: config.margeFormation
    },
    reducers: {
        setLargeurJour: (state, action) => {

            // console.log("--setLargeurJour----------------------")
            state.largeurJour = action.payload
            return state;
        }
    }
})

export const { loadExcel, changeSelectedGrns, changeSelectedSigles, changeSelectedFormateurs } = ganttSlice.actions; 
export const { setLargeurJour } = configSlice.actions; 

export const store = configureStore({
    reducer: {
        gantt: ganttSlice.reducer,
        config: configSlice.reducer
    }
});