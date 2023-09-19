import '../scss/ButtonCard.scss';
import { useQuery } from '@apollo/client';
import { getConfig, getCurrentRace, getLoggedInUser, getNextRace } from "../utils/local-storage-utils";
import { GET_CURR_NEXT_RACE } from './queries';
import {getMomentDate, getMomentToday } from '../utils/dates-utils';
import type { Moment } from 'moment';

function openFormScommesse() {
    window.location.href = '/form-scommesse';
}

function openFormSchiermanto() {
    window.location.href = '/form-scbieramento';
}

function ButtonCard() {

    const user = getLoggedInUser();
    const config = getConfig();

    if(!user || !user.username) return "User not loggedIn"

    const { loading, error, data } = useQuery(GET_CURR_NEXT_RACE, {
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
    
    if (error) return `Error! ${error.message}`;

    const dateFormat = 'DD/MM/YYYY'

    const today = getMomentToday(dateFormat) as Moment; //getMomentDate('29/04/2023', dateFormat);
    const currentRace = getCurrentRace();
    //const nextRace = getNextRace();

    if(!currentRace) return (
                        <div className="schiera-button">+
                            <h5 className='size-30'><em>Scommesse Disabilitate</em></h5>
                        </div>);

    const currRaceDate = getMomentDate(currentRace.data, dateFormat) as Moment;
    const currRaceQ1Q2Date = (getMomentDate(currentRace.data,  dateFormat) as Moment).add(-1, 'days');
    const currRaceTestDate = (getMomentDate(currentRace.data, dateFormat) as Moment).add(-2, 'days');

    if(currRaceTestDate.isSame(today)) return (<div className="schiera-button" onClick={openFormScommesse}>
                                                    <h5 className='size-30'><em>Schiera!</em></h5>
                                                </div>)

    if(currRaceQ1Q2Date.isSame(today)) return (<div className="schiera-button" onClick={openFormScommesse}>
                                                    <h5 className='size-30'><em>Scommetti!</em></h5>
                                                </div>)

    if(currRaceDate.isSame(today)) return  (<div className="schiera-button">
                                                <h5 className='size-30'><em>Giorno Gara!</em></h5>
                                            </div>)

    return ('Error dates');

}

export default ButtonCard;
