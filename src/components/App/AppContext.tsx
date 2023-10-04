import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_CONFIG } from "components/queries";
import { createContext, useContext, useEffect, useState } from "react";

interface Config  {
    idCampionato: string;
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
    config: null as Config|null,
    // idCurrentRace: null as string|null,
    // idNextRace: null as string|null,

    setConfigValue: (config: any) => {}
});

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }: any) => {
    const [config, setConfig] = useState<Config|null>(null);
    const [idCurrentRace, setIdCurrentRace] = useState<string|null>(null);
    const [idNextRace, setIdNextRace] = useState<string|null>(null);

    
    const setConfigValue = (config: any): void => {
        setConfig(config);
    }

    // if(!loading && !error) {
    //     console.log('Configs: ', data.config)
    //     setConfig(data.config);
    // }


    // useEffect(() => {
    //     if(!loading && !error && !!data)  {
    //         console.log('Configs: ', data?.config);
    //     }
    // }, [data, loading, error]);
    

    return (
        <AppContext.Provider value={{ config, setConfigValue }}>
            {children}
        </AppContext.Provider>
    );
};
