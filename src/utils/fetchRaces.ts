import { getConfig, getCurrentRace, getNextRace } from "./local-storage-utils";
import { useQuery } from '@apollo/client';
import { GET_CURR_NEXT_RACE } from "./queries";


export function fetchCurrentAndNextRaces(): void {
    const config = getConfig();
    const cachedCurrentRace = getCurrentRace();
    const cachedNextRace = getNextRace();

    const { loading, error, data } = useQuery(GET_CURR_NEXT_RACE, {
        variables: {
            idCampionato: config?.idCampionato
        },
        fetchPolicy: "no-cache",
        notifyOnNetworkStatusChange: true
    });

    const currentRace = data?.currentRace;//{id: '1', data: '30/04/2023', ordine_gp: '10', nome_gara: 'Mocked gara', luogo_gara: 'Luogo gara', ora_limite_scomesse: 12};
    const nextRace = data?.nextRace;

    (!cachedCurrentRace || cachedCurrentRace?.id != currentRace?.id) && localStorage.setItem('current-race', JSON.stringify(currentRace, null, 4));
    (!cachedNextRace || cachedNextRace?.id != currentRace?.id) && localStorage.setItem('current-race', JSON.stringify(nextRace, null, 4));

}