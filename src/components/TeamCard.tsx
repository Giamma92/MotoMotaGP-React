import '../../assets/scss/Calendar.scss'
import { useQuery } from '@apollo/client';
import { getConfig, getLoggedInUser } from "../utils/local-storage-utils";
import { GET_TEAM } from './queries';

function TeamCard() {

    const user = getLoggedInUser();
    const config = getConfig();

    if(!user || !user.username) return "User not loggedIn"

    const { loading, error, data } = useQuery(GET_TEAM, {
        variables: {
            username: user.username,
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

    let team = data.team;

    return (<div>
                <p><b>1° Pilota: </b><em>{team.pilota_fascia1}</em></p>
                <p><b>2° Pilota: </b><em>{team.pilota_fascia2}</em></p>
                <p><b>3° Pilota: </b><em>{team.pilota_fascia3}</em></p>
            </div>)

}

export default TeamCard;