import { gql } from "@apollo/client";

export const GET_CONFIG = gql`
  query Config($configId: String!) {
    config(id: $configId) {
      id
      id_campionato
      session_timeout
      bets_limit_points
      bets_limit_sprintrace_points
      bets_limit_pilota
      bets_limit_sprint_pilota
      bets_limit_gara
      bets_limit_gara_sprint
      formation_limit_pilota
    }
  }
`;

export const LOGIN_QUERY = gql`
  query Login($username: String!, $password: String!, $configId: String!) {
    user(username: $username, password: $password) {
      iduser
      nome
      cognome
      last_access
      change_first
      profileimage
    }
    config(id: $configId) {
      id
      id_campionato
      session_timeout
      bets_limit_points
      bets_limit_sprintrace_points
      bets_limit_pilota
      bets_limit_sprint_pilota
      bets_limit_gara
      bets_limit_gara_sprint
      formation_limit_pilota
    }
  }
`;

export const GET_CALENDAR = gql`
  query GetCalendario($idCampionato: String!) {
    calendario(idCampionato: $idCampionato) {
      id
      ordine_gp
      nome_gara,
      luogo_gara,
      data
      ora_limite_scommesse
    }
  }
`;
export const GET_TEAM = gql`
  query Team($username: String!, $idCampionato: String!) {
    team(username: $username, idCampionato: $idCampionato) {
      id
      username
      nome
      teamimage
      id_campionato
      pilota_fascia1
      pilota_fascia2
      pilota_fascia3
    }
  }
`;
export const GET_CLASSIFICA = gql`
  query Classifica($idCampionato: String!, $username: String) {
    classifica(idCampionato: $idCampionato, username: $username) {
      id,
      posizione
      nomeCognome
      punteggio
    }
  }
`;

export const GET_CURR_NEXT_RACE = gql`
  query GetCurrentAndNextRace($idCampionato: String!) {
    currentRace(idCampionato: $idCampionato) {
      id
      ordine_gp
      nome_gara
      luogo_gara
      data
      ora_limite_scommesse
    }
    nextRace(idCampionato: $idCampionato) {
      id
      ordine_gp
      nome_gara
      luogo_gara
      data
      ora_limite_scommesse
    }
  }
`;

export const GET_PILOTI_CAMPIONATO = gql`
  query GetPilotiCampionato($idCampionato: String!) {
      piloti(idCampionato: $idCampionato) {
        id
        nome
        cognome
        scuderia
      }
    }
`;

export const GET_SCOMMESSE_GARA = gql`
  query GetScommesseGara($idCampionato: String!, $idGara: String) {
  scommesse(idCampionato: $idCampionato, idGara: $idGara) {
    id,
    username
    idPilota
    posizione
    punteggio
    dataOraIns
    esito
  }
}
`;