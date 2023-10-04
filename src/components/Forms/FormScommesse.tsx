import "scss/FormScommesse.scss";
import React, { useState, useEffect } from "react";
import { useMutation } from '@apollo/client';
import { INSERT_SCOMMESA } from "utils/mutations";
import { getConfig, getCurrentRace, getLoggedInUser } from "utils/local-storage-utils";
import SelectPiloti from "./selects/SelectPiloti";
import { Toast, notifyError, notifySuccess } from "../UI/elements/Toast";
// import { MutationFetchPolicy } from "@apollo/client/core/watchQueryOptions";

function FormScommesse() {

  const user = getLoggedInUser();
  const config = getConfig();
  const currentRace = getCurrentRace();

  const [formState, setFormState] = useState({
    idPilota: null,
    posizione: null,
    punti: null
  } as any);

  const [doSchieramento, { loading, error, data }] = useMutation(
    INSERT_SCOMMESA,
    {
      fetchPolicy: "no-cache",
      notifyOnNetworkStatusChange: true,
    }
  );

  const sendSchieramento = () => {
    if(!formState.idPilota || !formState.posizione || !formState.punti)
      notifyError("Completa la form!");
    else 
      doSchieramento({
        variables: {
          idCampionato: config?.idCampionato,
          username: user?.username,
          idPilota: formState.idPilota,
          idGara: currentRace?.id,
          posizione: formState.posizione,
          punteggio: formState.punti,
        },
      });
  }

  useEffect(() => {
    // handle data here
    if (data && !loading) {
      if(data.insertScommessa.success)
        notifySuccess(data.insertScommessa.message);
      else
        notifyError(data.insertScommessa.message);
      //   window.location.href = "/";
          
    } else if (!data && !loading) {
      //alert("Error!");
    }
  }, [data, loading]);

  return (
    <form className="scommesse-form space-content">
      <Toast />
      <div className="form__controls">
        <h2>{currentRace?.nome_gara}</h2>
        {error && <h5>{error.message}</h5>}
        {loading && <h2>Loading...</h2>}
        <label>Nome pilota</label>
        {/* <input
          type="text"
          name="name"
          required
          onChange={(e) =>
            setFormState({
              ...formState,
              nomePilota: e.target.value,
            })
          }
        /> */}
        <SelectPiloti onSelected={(e: any) =>
            setFormState({
              ...formState,
              idPilota: e.target.value,
            })
          } />
      </div>
      <div className="form__controls">
        <label>Posizione</label>
        <input
          type="number"
          name="position"
          min="1" max="30"
          required
          onChange={(e) =>
            setFormState({
              ...formState,
              posizione: e.target.value,
            })
          }
        />
      </div>
      <div className="form__controls">
        <label>Punti</label>
        <input
          type="number"
          name="points"
          min="1" max="99"
          required
          onChange={(e) =>
            setFormState({
              ...formState,
              punti: e.target.value,
            })
          }
        />
      </div>
      <button
        // disabled={!formState.idPilota || !formState.posizione || !formState.punti}
        className="button color-secondary behavior-full"
        onClick={(e) => {
          e.preventDefault();
          sendSchieramento();
        }}
      >
        Schiera!
      </button>
      
    </form>
  );
}

export default FormScommesse;
