import React, { useEffect, useReducer } from "react";
import { Navigate } from "react-router";
import {
   MESSAGES_UPDATED_USER,
   MESSAGES_UPDATED_OTHER,
   SIGN_IN_THE_USER,
   UPDATE_DETAILS,
   SIGN_OUT_THE_USER,
} from "../context/MainContext/Main.actions.types";
import { MainContext } from "../context/MainContext/MainContext";
import { initialState, MainReducer } from "../context/MainContext/MainReducer";
import CryptoTest from "../cryptographyfunctions/helper/crypto.test";
import { auth } from "../third-party/firebase/FirebaseApp";
import OnMessgeUpdate from "../third-party/firebase/functions/OnMessageUpdate";
import OnUserDocUpdate from "../third-party/firebase/functions/OnUserDocUpdate";
import LayoutProvider from "./LayoutProvider";

function MainProvider() {
   const [mainState, mainDispatch] = useReducer(MainReducer, initialState);
   const other_id = mainState.current_chat_id;
   const isEncrypted = mainState.isEncrypted;
   const isAuthed = mainState.isAuthed;
   useEffect(() => {
      CryptoTest();
      auth.onAuthStateChanged((user) => {
         if (user) {
            mainDispatch({ type: SIGN_IN_THE_USER, payload: user });
            const userUpdateCb = (updatedData) =>
               mainDispatch({ type: UPDATE_DETAILS, payload: updatedData });
            OnUserDocUpdate(user.uid, userUpdateCb);
            const dispatchUpdateMessagesUser = (messages) => {
               mainDispatch({ type: MESSAGES_UPDATED_USER, payload: messages });
            };
            const dispatchUpdateMessagesOther = (messages) => {
               mainDispatch({
                  type: MESSAGES_UPDATED_OTHER,
                  payload: messages,
               });
            };
            OnMessgeUpdate(
               user.uid,
               other_id,
               dispatchUpdateMessagesUser,
               dispatchUpdateMessagesOther
            );
         } else {
            mainDispatch({ type: SIGN_OUT_THE_USER });
         }
      });
   }, [other_id, isEncrypted, isAuthed]);
   return (
      <MainContext.Provider value={{ mainState, mainDispatch }}>
         <LayoutProvider />
      </MainContext.Provider>
   );
}

export default MainProvider;
