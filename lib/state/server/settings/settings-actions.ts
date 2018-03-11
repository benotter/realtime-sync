import { RS_T_UserID } from "../../../rs-user-base";

export enum RS_E_Settings_ActionTypes_S
{
    SetStandAlone = "SETTINGS_SET_STANDALONE",
    SetHostUser = "SETTINGS_SET_HOST_USER",

    SetServerName = "SETTINGS_SET_SERVER_NAME",
    SetServerMessage = "SETTINGS_SET_SERVER_MESSAGE",

    AddAdmin = "SETTINGS_ADD_ADMIN",
    RemAdmin = "SETTINGS_REM_ADMIN",
}

export namespace RS_N_Settings_Actions_S 
{
    // Action Types
    let aI = RS_N_Settings_Actions_S,
        aT = RS_E_Settings_ActionTypes_S;

    export let setStandAlone =
        ( standAlone: boolean ): RS_I_Settings_Actions_S.SetStandAloneAct =>
            ( { type: aT.SetStandAlone, standAlone } );

    export let setHostUser =
        ( userID: RS_T_UserID ): RS_I_Settings_Actions_S.SetHostUserAct =>
            ( { type: aT.SetHostUser, userID } );

    export let setServerName =
        ( serverName: string ): RS_I_Settings_Actions_S.SetServerNameAct =>
            ( { type: aT.SetHostUser, serverName } );

    export let setServerMessage =
        ( serverMessage: string ): RS_I_Settings_Actions_S.SetServerMessageAct =>
            ( { type: aT.SetServerMessage, serverMessage } );

    export let addAdmin =
        ( userID: RS_T_UserID ): RS_I_Settings_Actions_S.AddAdminAct =>
            ( { type: aT.AddAdmin, userID } );

    export let remAdmin =
        ( userID: RS_T_UserID ): RS_I_Settings_Actions_S.RemAdminAct =>
            ( { type: aT.RemAdmin, userID } );
}

export namespace RS_I_Settings_Actions_S
{
    export type BaseAct = { type: RS_E_Settings_ActionTypes_S };

    export type SetStandAloneAct = BaseAct & { standAlone: boolean; };
    export type SetHostUserAct = BaseAct & { userID: RS_T_UserID; };

    export type SetServerNameAct = BaseAct & { serverName: string | null; };
    export type SetServerMessageAct = BaseAct & { serverMessage: string | null; };

    export type AddAdminAct = BaseAct & { userID: RS_T_UserID; };
    export type RemAdminAct = AddAdminAct;
}