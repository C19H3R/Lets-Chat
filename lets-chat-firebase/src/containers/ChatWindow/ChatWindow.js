import React from "react";

import "./chat-window.scss";

import ChatWindowHeader, {
   MOBILE,
} from "../../components/ChatWindowHeader/ChatWindowHeader";
import ChatingArea from "../../components/ChatingArea/ChatingArea";
import MessageInputBar from "../../components/MessageInputBar/MessageInputBar";
import { useNavigate } from "react-router";
import { CHATS_PATH } from "../../router/Routes.consts";

const ChatWindow = ({
   isVisible,
   deviceMode = MOBILE,
   OnBackClick,
   chatUser = "",
   messages = [],
   OnMessageSend,
   toggleCrypt,
   encryptedState = false,
}) => {
   const hiddenClass = isVisible ? "" : "hidden";
   const navigate = useNavigate();
   return (
      <div className={`chat-window ${hiddenClass}`}>
         <ChatWindowHeader
            name={chatUser}
            mode={deviceMode}
            // TODO
            OnBackClick={() => {
               navigate(CHATS_PATH);
               OnBackClick();
            }}
            // TODO
            encrypted={encryptedState}
            toggleCrypt={toggleCrypt}
         />
         <ChatingArea messages={messages} />
         <MessageInputBar onSend={OnMessageSend} />
      </div>
   );
};

export default ChatWindow;
