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
    serverMessage: string | null;

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
            {
                let { standalone } = act as sI.SetStandAloneAct;

                return Object.assign( {}, state, { standalone } as RS_I_SettingsState_S );
            }
        case sAT.SetHostUser:
            {
                let { userID } = act as sI.SetHostUserAct;
                return Object.assign( {}, state, {
                    hostUser: userID,
                } as RS_I_SettingsState_S );
            }
        case sAT.SetServerName:
            {
                let { serverName } = act as sI.SetServerNameAct;
                return Object.assign( {}, state, {
                    serverName,
                } as RS_I_SettingsState_S );
            }
        case sAT.SetServerMessage:
            {
                let { serverMessage } = act as sI.SetServerMessageAct;
                return Object.assign( {}, state, {
                    serverMessage,
                } as RS_I_SettingsState_S );
            }
        case sAT.AddAdmin:
            {
                let { userID } = act as sI.AddAdminAct;
                return Object.assign( {}, state, {
                    adminUsers: [ ...state.adminUsers, userID ]
                } as RS_I_SettingsState_S );
            }
        case sAT.RemAdmin:
            {
                let { userID } = act as sI.RemAdminAct;
                return Object.assign( {}, state, {
                    adminUsers: state.adminUsers.filter( uID => uID !== userID ),
                } as RS_I_SettingsState_S );
            }
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
        serverMessage: null,

        adminUsers: [],
    }, preLoad );
}