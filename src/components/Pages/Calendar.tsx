import '../scss/Calendar.scss'
import { useQuery } from '@apollo/client';
import { getConfig } from "utils/local-storage-utils";
import { GET_CALENDAR } from 'utils/queries';

export function DisplayCalendar() {

    const config = getConfig();

    interface CalendarItem {
        id: string,
        ordine_gp: string,
        nome_gara: string,
        luogo_gara: string,
        data: string,
        ora_limite_scommesse: string
        // any props that come into the component
    }

    const { loading, error, data } = useQuery(GET_CALENDAR, {
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
            {data.calendario.map(({id}: CalendarItem) => (
                <tr key={id} className="flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                    <th className="p-3 text-left">Ordine GP</th>
                    <th className="p-3 text-left">Circuito</th>
                    <th className="p-3 text-left">Luogo</th>
                    <th className="p-3 text-left">Data</th>
                    <th className="p-3 text-left">limite scommesse</th>
                </tr>
            ))}
            </thead>
            <tbody className='flex-1 sm:flex-none'>
                {data.calendario.map(({ id, ordine_gp, nome_gara, luogo_gara, data, ora_limite_scommesse }: CalendarItem) => (
                    <tr key={id} className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <td className="p-3 text-left">{ordine_gp}</td>
                        <td className="p-3 text-left font-medium text-gray-900 dark:text-white">{nome_gara}</td>
                        <td className="p-3 text-left font-medium text-gray-900 dark:text-white">{luogo_gara}</td>
                        <td className="p-3 text-left">{data}</td>
                        <td className="p-3 text-left">{ora_limite_scommesse}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}