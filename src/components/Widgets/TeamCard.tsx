// import 'assets/scss/Calendar.scss'
import { useQuery } from '@apollo/client';
import { GET_TEAM } from 'utils/queries';
import { useAuth } from 'components/Auth/AuthContext';
import { useApp } from 'components/App/AppContext';

function TeamCard() {

    const authCtx = useAuth();
    const appContext = useApp();
    
    //const config = getConfig();

    // if(!user || !user.username) return "User not loggedIn"

    const { loading, error, data } = useQuery(GET_TEAM, {
        variables: {
            username: authCtx.user?.id,
            idCampionato: `${appContext?.config?.id}`
        },
        fetchPolicy: "no-cache",
        notifyOnNetworkStatusChange: true
    });

    if (loading) return (<p>Caricamento...</p>
        // <div className="ph-item">
        //     <div className="ph-col-12">
        //         <div className="ph-row">
        //             <div className="ph-col-12 big"></div>
        //             <div className="ph-col-12 big"></div>
        //             <div className="ph-col-12 big"></div>
        //         </div>
        //     </div>
        // </div>
    );
    
    if (error) return (<p>`Error! ${error.message}`</p>);

    let team = data.team;

    return (<div>
                <h3>Nome: {team?.nome}</h3>
                <p><b>1° Pilota: </b><em>{team?.pilota_fascia1 || ''}</em></p>
                <p><b>2° Pilota: </b><em>{team?.pilota_fascia2 || ''}</em></p>
                <p><b>3° Pilota: </b><em>{team?.pilota_fascia3 || ''}</em></p>
            </div>)

}

export default TeamCard;