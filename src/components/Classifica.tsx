import '../../assets/scss/Calendar.scss'
import { useQuery } from '@apollo/client';
import { getConfig } from "../utils/local-storage-utils";
import { GET_CALENDAR, GET_CLASSIFICA } from './queries';

export function DisplayClassifica() {

    const config = getConfig();

    interface ClassificaItem {
        id: string, 
        posizione: string,
        nomeCognome: string,
        punteggio: string
    }

    const { loading, error, data } = useQuery(GET_CLASSIFICA, {
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

    return <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="table-auto w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5 text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            {data.classifica.map(({id}: ClassificaItem) => (
                <tr key={id} className="flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                    <th className="p-3 text-left">Posizione</th>
                    <th className="p-3 text-left">Partecipante</th>
                    <th className="p-3 text-left">Punteggio</th>
                </tr>
            ))}
            </thead>
            <tbody className='flex-1 sm:flex-none'>
                {data.classifica.map(({ id, posizione, nomeCognome, punteggio }: ClassificaItem) => (
                    <tr key={id} className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <td className="p-3 text-left">{posizione}</td>
                        <td className="p-3 text-left font-medium text-gray-900 dark:text-white">{nomeCognome}</td>
                        <td className="p-3 text-left">{punteggio}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}