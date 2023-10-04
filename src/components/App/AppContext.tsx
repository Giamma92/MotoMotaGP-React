import { useQuery } from "@apollo/client";
import { GET_CONFIG } from "utils/queries";
import { createContext, useContext, useState } from "react";

interface Config  {
    id: string;
    sessionTimeout: number,
    betsLimitSprintracePoints: number;
    betsLimitPoints: number;
    bets_limit_pilota: number;
    bets_limit_sprint_pilota: number;
    bets_limit_gara: number;
    bets_limit_gara_sprint: number;
    formation_limit_pilota: number;
}

const AppContext = createContext({
    loading: false as boolean,
    config: null as Config|null,
    // idCurrentRace: null as string|null,
    // idNextRace: null as string|null,

    //setConfigValue: (config: any) => {}
});


export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }: any) => {
    const [config, setConfig] = useState<Config|null>(null);
    // const [idCurrentRace, setIdCurrentRace] = useState<string|null>(null);
    // const [idNextRace, setIdNextRace] = useState<string|null>(null);

    const {loading, error, data } = useQuery(GET_CONFIG, {
        variables: {
            configId: '1'
        },
        fetchPolicy: "no-cache",
        notifyOnNetworkStatusChange: true
    });

    if(!loading && !error && !!data.config && !config) {
        console.log('Configs: ', data?.config);
        setConfig(data?.config)
    }

    return (
        <AppContext.Provider value={{ config, loading }}>
            {children}
        </AppContext.Provider>
    );
};
