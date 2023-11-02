import { atom } from "recoil"
import { tools } from "./lib/tools"
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { dataState, selectedFormateursState, selectedGrnsState, selectedSiglesState } from "./states";

dayjs.locale('fr')

const filtered = selector({
    key: 'filteredTodoListState',
    get: ({get}) => {
      const data = get(dataState);
      const grns = get(selectedGrnsState);
      const sigles = get(selectedSiglesState);
      const formateurs = get(selectedFormateursState);
  
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
  });