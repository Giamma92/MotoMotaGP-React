
import 'scss/Calendar.scss'
import { useQuery } from '@apollo/client';
import { getCurrentRace } from "utils/local-storage-utils";
import { GET_SCOMMESSE_GARA } from 'utils/queries';
import  Table from 'components/UI/tables/Table';
import { useApp } from 'components/App/AppContext';

function TableBetsRace() {

    const appContext = useApp();
    const currentRace = getCurrentRace();

    const { loading, error, data } = useQuery(GET_SCOMMESSE_GARA, {
        variables: {
            idCampionato: `${appContext?.config?.id}`,
            idGara: currentRace?.id
        },
        fetchPolicy: "no-cache",
        notifyOnNetworkStatusChange: true
    });

    let bets = data?.scommesse;

    if (loading) return (
        <div className="ph-item">
            <div className="ph-col-12">
                <div className="ph-row">
                    <div className="ph-col-12 big"></div>
                    <div className="ph-col-12 big"></div>
                    <div className="ph-col-12 big"></div>
                    <div className="ph-col-12 big"></div>
                    <div className="ph-col-12 big"></div>
                    <div className="ph-col-12 big"></div>
                    <div className="ph-col-12 big"></div>
                    <div className="ph-col-12 big"></div>
                    <div className="ph-col-12 big"></div>
                    <div className="ph-col-12 big"></div>
                </div>
            </div>
        </div>
    );
    if (error) return <p>Error: {error.message}</p>;

    return (
        <Table
        headers={{
            id: "Id",
            username: "Username",
            idPilota: "Pilota",
            posizione: "Posizione",
            punteggio: "Punteggio",
            dataOraIns: "Timestamp",
            esito: "Esito",
            tipo: "Tipo"
        } as any}
        items={bets}
        />
    )
}

export default TableBetsRace;


