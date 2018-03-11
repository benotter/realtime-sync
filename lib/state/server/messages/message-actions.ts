import { RS_T_Message, RS_T_MessageID } from "../../../..";
import { RS_I_Settings_Actions_S } from "../server-actions";

export enum RS_E_Mess_ActionTypes_S
{
    MESS_ADD_NEW = "MESS_ADD_NEW",

    MESS_SET_IN_PROG = "MESS_SET_IN_PROG",
    MESS_SET_COMPLETE = "MESS_SET_COMPLETE",
    MESS_CLEAR_COMPLETED = "MESS_CLEAR_COMPLETED",

    MESS_ADD_OUTGOING = "MESS_ADD_OUTGOING",
    MESS_CLEAR_OUTGOING = "MESS_CLEAR_OUTGOING",
}

export namespace RS_N_Mess_Actions_S 
{
    export const addNew = ( messages: RS_T_Message | RS_T_Message[] ): RS_I_Mess_Actions_S.AddNew =>
        ( {
            type: RS_E_Mess_ActionTypes_S.MESS_ADD_NEW,
            messages: Array.isArray( messages ) ? messages : [ messages ],
        } );

    export const setInProg = ( messIDs: RS_T_MessageID | RS_T_MessageID[] ): RS_I_Mess_Actions_S.SetInProg =>
        ( {
            type: RS_E_Mess_ActionTypes_S.MESS_SET_IN_PROG,
            messIDs: Array.isArray( messIDs ) ? messIDs : [ messIDs ],
        } );

    export const setComplete = ( messIDs: RS_T_MessageID | RS_T_MessageID[] ): RS_I_Mess_Actions_S.SetInProg =>
        ( {
            type: RS_E_Mess_ActionTypes_S.MESS_SET_COMPLETE,
            messIDs: Array.isArray( messIDs ) ? messIDs : [ messIDs ],
        } );

    export const clearCompleted = (): RS_I_Mess_Actions_S.ClearCompleted =>
        ( { type: RS_E_Mess_ActionTypes_S.MESS_CLEAR_COMPLETED } );

    export const addOutGoing = ( messages: RS_T_Message | RS_T_Message[] ): RS_I_Mess_Actions_S.AddOutGoing =>
        ( {
            type: RS_E_Mess_ActionTypes_S.MESS_ADD_OUTGOING,
            messages: Array.isArray( messages ) ? messages : [ messages ],
        } );
        
    export const clearOutGoing = (): RS_I_Mess_Actions_S.ClearOutGong =>
        ( { type: RS_E_Mess_ActionTypes_S.MESS_CLEAR_OUTGOING, } );
}

export namespace RS_I_Mess_Actions_S 
{
    export type Base = { type: RS_E_Mess_ActionTypes_S };

    export type AddNew = Base & { messages: RS_T_Message[] };

    export type SetInProg = Base & { messIDs: RS_T_MessageID[] };
    export type SetComplete = Base & { messIDs: RS_T_MessageID[] };
    export type ClearCompleted = Base;

    export type AddOutGoing = Base & { messages: RS_T_Message[] };
    export type ClearOutGong = Base;
}