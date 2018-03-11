import { combineReducers } from 'redux';

import settings, { RS_I_SettingsState_S } from './settings/settings-reducer';
import messages, { RS_I_MessagesState_S } from './messages/message-reducer';
import files, { RS_I_FilesState } from './files/file-reduces';

export default combineReducers<RS_I_ServerState>( {
    settings,
    messages,
    files,
} );

export interface RS_I_ServerState 
{
    settings: RS_I_SettingsState_S;
    messages: RS_I_MessagesState_S;
    files: RS_I_FilesState;
}