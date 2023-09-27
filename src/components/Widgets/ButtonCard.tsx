import 'scss/ButtonCard.scss';
import { useQuery } from '@apollo/client';
import { getConfig, getCurrentRace } from "utils/local-storage-utils";
import { GET_CURR_NEXT_RACE } from 'components/queries';
import { getMomentDate, getMomentToday } from 'utils/dates-utils';
import type { Moment } from 'moment';
import { useNavigate } from 'react-router-dom';

function ButtonCard() {

    //const user = getLoggedInUser();
    const config = getConfig();

    const navigate = useNavigate();

    function openFormScommesse() {
        navigate('/form-scommesse');
    }
    
    // function openFormSchiermanto() {
    //     navigate('/form-scbieramento');
    // }

    // if(!user || !user.username) return "User not loggedIn"

    const { loading, error } = useQuery(GET_CURR_NEXT_RACE, {
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
    
    if (error) return <p>`Error! ${error.message}`</p>;

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

    return (<p>[Button card] Error dates</p>);

}

export default ButtonCard;
