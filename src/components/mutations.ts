import { gql } from "@apollo/client";


export const INSERT_SCOMMESA = gql`
    mutation InsertScommessa(
        $idCampionato: String, 
        $username: String, 
        $idPilota: String, 
        $idGara: String, 
        $posizione: String,
        $punteggio: String) {
        insertScommessa(
            idCampionato: $idCampionato, 
            username: $username,
            idPilota: $idPilota, 
            idGara: $idGara, 
            posizione: $posizione, 
            punteggio: $punteggio
        ) {
            success,
            message
        }
    }
`;