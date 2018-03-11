import { RS_T_UserID } from '../../../rs-user-base';
import 
{
    RS_E_Settings_ActionTypes_S as sAT,
    RS_I_Settings_Actions_S as sI
} from './settings-actions';


export interface RS_I_SettingsState_S 
{
    standalone: boolean;
    hostUser: RS_T_UserID | null;

    serverName: string;
    serverGreeting: string | null;

    adminUsers: RS_T_UserID[];
}

export default function RS_R_SettingsReducer_S
    (
    state: RS_I_SettingsState_S = RS_GetInitialSettingsState(),
    act: sI.BaseAct
    )
{
    switch ( act.type )
    {
        case sAT.SetStandAlone:
            return Object.assign({}, state, {});
            
        case sAT.SetHostUser:

        case sAT.SetServerName:
        case sAT.SetServerMessage:

        case sAT.AddAdmin:
        case sAT.RemAdmin:
        
        default:
            return state;
    }
}

function RS_GetInitialSettingsState (
    preLoad: RS_I_SettingsState_S & any | void = void 0
): RS_I_SettingsState_S
{
    return Object.assign<RS_I_SettingsState_S, RS_I_SettingsState_S>( {
        standalone: true,
        hostUser: null,

        serverName: "Realtime-Sync Server",
        serverGreeting: null,

        adminUsers: [],
    }, preLoad );
}