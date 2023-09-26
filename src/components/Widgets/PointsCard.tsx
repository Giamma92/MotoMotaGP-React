// import 'assets/scss/Calendar.scss'
import { useQuery } from '@apollo/client';
import { getConfig, getLoggedInUser } from "utils/local-storage-utils";
import { GET_CLASSIFICA } from 'components/queries';

function Pointsard() {

    const user = getLoggedInUser();
    const config = getConfig();

    // if(!user || !user.username) return "User not loggedIn"

    const { loading, error, data } = useQuery(GET_CLASSIFICA, {
        variables: {
            username: user?.username,
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
    if (!data || !data.classifica || !data.classifica[0]) return <p>`No results`</p>;

    let team = data.team;

    return (<div>
                <h5 className="size-48"><em>+{data.classifica[0].punteggio}</em></h5>
            </div>)

}

export default Pointsard;