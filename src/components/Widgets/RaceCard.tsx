import { getConfig, getCurrentRace, getNextRace } from "utils/local-storage-utils";
import { useQuery } from '@apollo/client';
import { GET_CURR_NEXT_RACE } from "components/queries";
// import { GET_CURR_NEXT_RACE } from './queries';

function RaceCard() {

    // const user = getLoggedInUser();
    // const config = getConfig();
    // const currentRace = getCurrentRace();
    // const nextRace = getCurrentRace();

    // if(!user || !user.username) return "User not loggedIn"


    const config = getConfig();
    const cachedCurrentRace = getCurrentRace();
    const cachedNextRace = getNextRace();

    const { loading, data } = useQuery(GET_CURR_NEXT_RACE, {
        variables: {
            idCampionato: config?.idCampionato
        },
        fetchPolicy: "no-cache",
        notifyOnNetworkStatusChange: true
    });

    if (loading) return (
        <div className="ph-item">
            <div className="ph-col-12">
                <div className="ph-row">
                    <div className="ph-col-12 big"></div>
                    <div className="ph-col-12 big"></div>
                    <div className="ph-col-12 big"></div>
                </div>
            </div>
        </div>
    );

    const currentRace = data?.currentRace;//{id: '1', data: '30/04/2023', ordine_gp: '10', nome_gara: 'Mocked gara', luogo_gara: 'Luogo gara', ora_limite_scomesse: 12};
    const nextRace = data?.nextRace;

    (!cachedCurrentRace || cachedCurrentRace?.id !== currentRace?.id) && localStorage.setItem('current-race', JSON.stringify(currentRace, null, 4));
    (!cachedNextRace || cachedNextRace?.id !== currentRace?.id) && localStorage.setItem('next-race', JSON.stringify(nextRace, null, 4));


    // const { loading, error, data } = useQuery(GET_CURR_NEXT_RACE, {
    //     variables: {
    //         idCampionato: config.idCampionato
    //     },
    //     fetchPolicy: "no-cache",
    //     notifyOnNetworkStatusChange: true
    // });
    
    // if (error) return `Error! ${error.message}`;

    // const currentRace = {id: '1', data: '30/04/2023', ordine_gp: '10', nome_gara: 'Mocked gara', luogo_gara: 'Luogo gara', ora_limite_scomesse: 12}//data.currentRace;
    // const nextRace = data.nextRace;

    // const cachedRace = localStorage.getItem('current-race');
    // (!cachedRace || cachedRace.id != currentRace.id) && localStorage.setItem('current-race', JSON.stringify(currentRace, null, 4));

    return (<div>
                { !!currentRace && (<div><h5>Gara in corso:</h5><p><em>{currentRace.nome_gara} - {currentRace.luogo_gara}</em></p></div>) }
                { !!nextRace && (<div>
                        <h5>Prossima gara:</h5><p><em>{nextRace.nome_gara} - {nextRace.luogo_gara} - {nextRace.data}</em></p>
                    </div>) }
            </div>)

}

export default RaceCard;