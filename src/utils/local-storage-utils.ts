export interface User {
    username: string;
    firstname: string;
    lastname: string;
    profileImage: string;
}

export function getLoggedInUser() : User|null {
    let user: User|null = null;
    const userJsonStr = localStorage.getItem('user');
    const userJson = JSON.parse(userJsonStr || '{}');

    if(!userJson) return user;
        
    user = {
        username: userJson.iduser,
        firstname: userJson.nome,
        lastname: userJson.cognome,
        profileImage: userJson.profileimage
    } as User

    return user;
}

export interface Config {
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


export function getConfig() : Config|null {
    let config: Config|null = null;
    const configJsonStr = localStorage.getItem('config');
    const configJson = JSON.parse(configJsonStr || '{}');

    if(!configJson) return config;
        
    config = {
        idCampionato: ''+configJson.id_campionato,
        sessionTimeout: configJson.session_timeout,
        betsLimitSprintracePoints: configJson.bets_limit_sprintrace_points,
        betsLimitPoints: configJson.bets_limit_points,
        bets_limit_pilota: configJson.bets_limit_pilota,
        bets_limit_sprint_pilota: configJson.bets_limit_sprint_pilota,
        bets_limit_gara: configJson.bets_limit_gara,
        bets_limit_gara_sprint: configJson.bets_limit_gara_sprint,
        formation_limit_pilota:  configJson.formation_limit_pilota,
    } as Config

    return config;
}

export interface Race {
    id: string;
    ordine_gp: string;
    nome_gara: string;
    luogo_gara: string;
    data: string;
    ora_limite_scommesse: string;
}

export function getCurrentRace() : Race|null {
    let race: Race|null = null;
    const raceJsonStr = localStorage.getItem('current-race');
    const raceJson = JSON.parse(raceJsonStr || '{}');

    if(!raceJson) return race;
        
    race = {
        id: raceJson.id,
        ordine_gp: raceJson.ordine_gp,
        nome_gara: raceJson.nome_gara,
        luogo_gara: raceJson.luogo_gara,
        data: raceJson.data,
        ora_limite_scommesse: raceJson.ora_limite_scommesse
    } as Race;

    return race;
}

export function getNextRace() : Race|null {
    let race: Race|null = null;
    const raceJsonStr = localStorage.getItem('next-race');
    const raceJson = JSON.parse(raceJsonStr || '{}');

    if(!raceJson) return race;
        
    race = {
        id: raceJson.id,
        ordine_gp: raceJson.ordine_gp,
        nome_gara: raceJson.nome_gara,
        luogo_gara: raceJson.luogo_gara,
        data: raceJson.data,
        ora_limite_scommesse: raceJson.ora_limite_scommesse
    } as Race;

    return race;
}