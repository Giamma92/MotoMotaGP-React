
import '../../assets/scss/Calendar.scss'
import { useQuery } from '@apollo/client';
import { getConfig, getCurrentRace } from "../utils/local-storage-utils";
import { GET_SCOMMESSE_GARA } from './queries';
import  Table from './Table';

export function DisplayScommesse() {

    const config = getConfig();
    const currentRace = getCurrentRace();

    const { loading, error, data } = useQuery(GET_SCOMMESSE_GARA, {
        variables: {
            idCampionato: config?.idCampionato,
            idGara: currentRace?.id
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
    if (error) return `Error! ${error.message}`;

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
        items={data.scommesse}
        />
    )
}



