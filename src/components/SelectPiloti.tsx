import React, { useState, useEffect } from 'react';
import { GET_PILOTI_CAMPIONATO } from "./queries";
import { useQuery } from '@apollo/client';
import DropDown from './UI/DropDown';
import { getConfig, getLoggedInUser } from "../utils/local-storage-utils";



export function SelectPiloti({onSelected}: any) {

    const config = getConfig();

    const { loading, error, data } = useQuery(GET_PILOTI_CAMPIONATO, {
        variables: {
            idCampionato: config?.idCampionato
        },
          fetchPolicy: "no-cache",
          notifyOnNetworkStatusChange: true
      });
    
      let piloti:any[] = [];
      !error && !loading && !!data && !!data.piloti && data.piloti.forEach((p: any) => {
        piloti.push({id: p.id, value: p.id + ' - ' + p.nome + ' ' + p.cognome + ' [' + p.scuderia + ']' })
      });
    
    
    return (<DropDown options={piloti} onOptionSelected={onSelected} />)
}

export default SelectPiloti;
