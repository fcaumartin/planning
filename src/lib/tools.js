import dayjs from "dayjs";
import "dayjs/locale/fr";
// import 'dayjs/plugin/isSameOrBefore'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import isBetween from 'dayjs/plugin/isBetween'
import weekday from 'dayjs/plugin/weekday'

dayjs.extend(isSameOrBefore)
dayjs.extend(weekOfYear)
dayjs.extend(isBetween)
dayjs.extend(weekday)
dayjs.locale('fr')

const feries = [
	["2023-01-01", "2023-01-01"],
	["2023-05-01", "2023-05-01"],
	["2023-05-08", "2023-05-08"],
	["2023-04-09", "2023-04-10"],
	["2023-05-18", "2023-05-18"],
	["2023-05-29", "2023-05-29"],
	["2023-07-14", "2023-07-14"],
	["2023-07-31", "2023-08-04"],
	["2023-08-07", "2023-08-11"],
	["2023-08-15", "2023-08-15"],
	["2023-11-01", "2023-11-01"],
	["2023-11-11", "2023-11-11"],
	["2023-12-25", "2023-12-29"],
	["2024-01-01", "2024-01-01"],
	["2024-04-01", "2024-04-01"],
	["2024-05-01", "2024-05-01"],
	["2024-05-08", "2024-05-08"]
];

const tools = {

    parseTS: (dd) => {


        return dayjs.unix(dd).format("DD/MM/YYYY");
    },

    parseFR: (dd) => {

        return dayjs(dd, "DD/MM/YYYY").unix();
    },
    
    diffTsToDays: (d1, d2) => {

        return Math.abs( ((d2-d1)/(24*3600))) ;
    },

    getMonths: (d1, d2) => {

		console.log("getMonths : starting at " + d1.format("DD/MM/YYYY"))
        // let m_inc = d1
		let old_value=-1
		let arr_month = [];
		let arr_month_length = [];
		let wn = dayjs(d1)
		while (wn.isSameOrBefore(d2)) {
			
			if (old_value !== wn.month()) {

				arr_month_length.push(wn.daysInMonth())
				arr_month.push(wn.format("MMM YYYY"))
				old_value = wn.month()
			}
			wn = wn.add(1, 'days')
			// m_inc += 86400;
		}

		console.log(arr_month)
		console.log(arr_month_length)
        return [arr_month, arr_month_length];
    },

    getWeeks: (d1, d2) => {

		console.log("getWeeks : starting at " + d1.format("DD/MM/YYYY"))
        // let s_inc = d1
		let arr_week = [];
		let arr_week_length = [];
        let old_value = -1;
		let wn = dayjs(d1)
		while (wn.isSameOrBefore(d2)) {
			
			
			if (old_value !== wn.week()) {

				if (wn.weekday()===0) arr_week_length.push(7)
				if (wn.weekday()===1) arr_week_length.push(6)
				if (wn.weekday()===2) arr_week_length.push(5)
				if (wn.weekday()===3) arr_week_length.push(4)
				if (wn.weekday()===4) arr_week_length.push(3)
				if (wn.weekday()===5) arr_week_length.push(2)
				if (wn.weekday()===6) arr_week_length.push(1)
				arr_week.push(wn.week())
                old_value = wn.week()
			}
			wn = wn.add(1, "days")
			// s_inc += 86400;
		}

		console.log(arr_week)
		console.log(arr_week_length)
        return [arr_week, arr_week_length]
    },

    getDays: (d1, d2) => {
        
		console.log("getDays : starting at " + d1.format("DD/MM/YYYY"))
		// let j_inc = d1
		let arr = [];
		let arr_end_of_month = [];
		let now = dayjs().format("DD/MM/YYYY")
		let jj = dayjs(d1)
		while (jj.isSameOrBefore(d2))  {
			let info_jour = "";
			// console.log(jj.format("DD/MM/YYYY HH:mm:ss"))
			let m1 = jj.add(1, 'days')
			if (now === jj.format("DD/MM/YYYY"))
				info_jour += " aujourdhui ";
			if(m1.month() !== jj.month()) 
				info_jour += " jour_fin_de_mois ";
			if (jj.weekday()===5 || jj.weekday()===6)
				info_jour += " jour_we ";
			let ferie = "";
			for (const fe of feries) {
				if (jj.format("YYYY-MM-DD")>=fe[0] && jj.format("YYYY-MM-DD")<=fe[1]) ferie = " ferie ";
			}
			info_jour += ferie;
			arr_end_of_month.push(info_jour);
			arr.push (jj.format("DD/MM/YYYY"));
			// console.log(jj.format("DD/MM/YYYY") + " --> " + jj.weekday())
			// j_inc += 86400
			jj = jj.add(1, 'days')
		}
		console.log(arr)
		console.log(arr_end_of_month)

        return [arr, arr_end_of_month]
    },

	isNow: (dd) => {
		return dayjs.format("DD/MM/YYYY") === dd;
	},

	rawToData: (raw) => {
		let tmp = []

		for (let o of raw ) {
			// console.log(o)
			let debut = dayjs(o[10]).hour(0)
			let fin = dayjs(o[11]).hour(0)
			// let debut = d1
			// let fin = d2
			let pe1d1 = o[12] && dayjs(o[12]).hour(0)
			let pe1d2 = o[13] && dayjs(o[13]).hour(0)
			let pe2d1 = o[14] && dayjs(o[14]).hour(0)
			let pe2d2 = o[15] && dayjs(o[15]).hour(0)
			let certifd1 = o[16] && dayjs(o[16]).hour(0)
			let certifd2 = o[17] && dayjs(o[17]).hour(0)
			let grn = o[1] || ""
			let sigle = o[2] || ""
			let libelle = o[3] || ""
			let convention = o[4] || ""
			let bdc = o[5] || ""
			let rht = o[6] || ""
			let formateur = o[7] || ""
			let optex = o[8] || ""
			let af = o[9] || ""
			let osia1 = o[20] || ""
			let osia2 = o[21] || ""
			let osiacertif = o[22] || ""
			let duree = o[23] || ""
			let stagiaires_reel = o[40] ? o[40].result : 0
			stagiaires_reel = stagiaires_reel?stagiaires_reel:0
			let stagiaires_prevu = o[41] ? o[41].result : "Nom"
			let interruption1d1 = o[42] && dayjs(o[42]).hour(0)
			let interruption1d2 = o[43] && dayjs(o[43]).hour(0)
			let interruption2d1 = o[44] && dayjs(o[44]).hour(0)
			let interruption2d2 = o[45] && dayjs(o[45]).hour(0)
			
			//let tsDebut = debut.unix() + 0
			//let tsFin = fin.unix() + 0
			let pe1Debut = pe1d1 ? pe1d1 : undefined
			let pe1Fin = pe1d2 ? pe1d2 : undefined
			let pe2Debut = pe2d1 ? pe2d1: undefined
			let pe2Fin = pe2d2 ? pe2d2: undefined
			let interruption1Debut = interruption1d1 ? interruption1d1 : undefined
			let interruption1Fin = interruption1d2 ? interruption1d2 : undefined
			let interruption2Debut = interruption2d1 ? interruption2d1 : undefined
			let interruption2Fin = interruption2d2 ? interruption2d2 : undefined
			let certifDebut = certifd1 ? certifd1: undefined
			let certifFin = certifd2 ? certifd2: undefined
			let dateDebut = debut.format("DD/MM/YYYY")
			let dateFin = fin.format("DD/MM/YYYY")
			let titre = sigle + " - " + ((osia1 || osia2) || "") + " - " + formateur + " - " + af
			if (stagiaires_reel>0) titre += " [" + stagiaires_reel + "]"

			let description = `${sigle} : ${libelle}\n`
			if (dateDebut) description += `${dateDebut} au ${dateFin}\n` 
			if (grn) description += `GRN: ${grn}\n`
			if (formateur) description += `Formateur: ${formateur}\n`
			if (af) description += `Assistante: ${af}\n`
			if (bdc) description += `Bon de commande: ${bdc}\n`
			if (osia1) description += `OSIA CRHDF: ${osia1}\n`
			if (osia2) description += `OSIA (autre): ${osia2}\n`
			if (osiacertif) description += `OSIA Certif: ${osiacertif}\n`
			if (duree) description += `Durée (hors PE): ${osiacertif}\n`
			if (stagiaires_prevu && stagiaires_reel) description += `Stagiaires (réels/prévus) : ${stagiaires_reel}/${stagiaires_reel}\n`
			if (interruption1d1 && interruption1d2) description += `Interruption du ${interruption1d1.format("DD/MM/YYYY")} au ${interruption1d2.format("DD/MM/YYYY")}\n`
			if (interruption2d1 && interruption2d2) description += `Interruption du ${interruption2d1.format("DD/MM/YYYY")} au ${interruption2d2.format("DD/MM/YYYY")}\n`


			// console.log("--------------------------------------------")
			// console.log(sigle + ":" + grn + " " + o[9] + " " + o[10])
			tmp.push({
				titre, 
				grn, 
				sigle, 
				libelle, 
				convention, 
				bdc, 
				rht, 
				formateur, 
				optex, 
				af, 
				debut, fin,
				// tsDebut, tsFin, 
				dateDebut, dateFin, 
				description, 
				pe1Debut, pe1Fin, pe2Debut, pe2Fin, 
				certifDebut, certifFin, 
				osia1, osia2, 
				osiacertif,
				duree,
				stagiaires_reel, stagiaires_prevu,
				interruption1Debut, interruption1Fin, interruption2Debut, interruption2Fin

			})
		}

		return tmp
	},

	getFormateurs: (data) => {
		let result = [];

		data.forEach( (e, i) => {

			if (!result.includes(e.formateur)) {
				result.push(e.formateur)
			}
		})

		return result
	},

	getGRN: (data) => {

		let tmp = []

		for (let o of data ) {
			if (!tmp.includes(o.grn)) {
				tmp.push(o.grn)
			}
		}

		return tmp.sort()
	},

	getSigles: (data, grn = null) => {

		let tmp = []

		for (let o of data ) {
			if (grn) {
				if (grn.includes(o.grn) && !tmp.includes(o.sigle)) {
					tmp.push(o.sigle)
				}
			}
			else {
				if (!tmp.includes(o.sigle)) {
					tmp.push(o.sigle)
				}

			}
		}
		return tmp.sort()
	},

	getStagiairesByWeek: (filtered, d1, d2) => {

		//console.log("starting ...")
        //let s_inc = d1.startOf('week')
		let stagiaires = [];
        let old_value = -1;
		// d1.isoWeekday()
		let wn = dayjs(d1.startOf('week'))
		// console.log("starting at " + wn.format("DD/MM/YYYY"))
		while (wn.isSameOrBefore(d2)) {
			
			
			if (old_value !== wn.week()) {

				let total = 0;
				filtered.forEach((v) => {
					// if (wn.year()==2024 && wn.week()==3) {

					// 	console.log("--------------------------------------------------------")
					// 	console.log(wn.year() + " " + wn.week())
					// 	console.log(v.sigle, v.osia1)
					// 	console.log("debut " + v.debut.format("DD/MM/YYYY HH:mm:ss"))
					// 	console.log("fin " + v.fin.format("DD/MM/YYYY HH:mm:ss"))
					// 	console.log("pe1 debut " + (v.pe1Debut?v.pe1Debut.format("DD/MM/YYYY HH:mm:ss"):""))
					// 	console.log("pe1 fin" + (v.pe1Fin?v.pe1Fin.format("DD/MM/YYYY HH:mm:ss"):""))
					// 	console.log(wn.format("DD/MM/YYYY HH:mm:ss"))
					// 	console.log(v.stagiaires_reel)
					// }
					// if (wn.unix()>=(v.tsDebut-0) && wn.unix()<=v.tsFin) {
					if (
							wn.isBetween(v.debut, v.fin, undefined, 'day') 
							&& !wn.isBetween(v.pe1Debut, v.pe1Fin, undefined, 'day')
							&& !wn.isBetween(v.pe2Debut, v.pe2Fin, undefined, 'day')
							&& !wn.isBetween(v.interruption1Debut, v.interruption1Fin, undefined, 'day')
							&& !wn.isBetween(v.interruption2Debut, v.interruption2Fin, undefined, 'day')
						) {
						total += v.stagiaires_reel
						// console.log("ok")
					}
				})
				
				stagiaires.push(total)
                old_value = wn.week()
			}
			wn = wn.add(1, 'days')
			// s_inc += wn.unix()
		}

		// console.log(stagiaires);
        return stagiaires
    },

	bigFilter: (data, grns, sigles, formateurs) => {
        return data
			.filter ( v => grns.includes(v.grn) && sigles.includes(v.sigle) && formateurs.includes(v.formateur)) 
			.sort((a,b) => {
				if (a.debut.unix()>b.debut.unix()) return 1
				else if (a.debut.unix()<b.debut.unix()) return -1
				else 
					if (a.sigle>b.sigle) return 1
					else if (a.sigle<b.sigle) return -1
					else return 0
			})
    },
}




export { tools }