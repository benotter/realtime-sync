import { combineReducers } from 'redux';

import settings, { RS_I_SettingsState_S } from './settings/settings-reducer';
import messages, { RS_I_MessagesState_S } from './messages/message-reducer';

export default combineReducers<RS_I_ServerState>( {
    settings,
    messages,
} );

export interface RS_I_ServerState 
{
    settings: RS_I_SettingsState_S;
    messages: RS_I_MessagesState_S;
}