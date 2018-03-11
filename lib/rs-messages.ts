import { RS_C_File } from "./rs-file-base";

export type RS_T_MessageID<T = {}> = T & string;

export const enum RS_E_MessageTypes 
{
    Server_Handshake_Init,
    Client_Handshake_Response,
    Server_Handshake_Confirm,
}

export type RS_T_Message = {
    id: RS_T_MessageID;
    type: RS_E_MessageTypes;
    payload: any;
};

export namespace RS_N_Messages 
{
    export type Server_Handshake_Init = RS_T_Message & {
        type: RS_E_MessageTypes.Server_Handshake_Init;
        payload: {
            serverName: string;
            serverID: string;
            userCount: number;
            hostID?: string;
        };
    };

    export type Client_Handshake_Response = RS_T_Message & {
        type: RS_E_MessageTypes.Client_Handshake_Response;
        payload: {
            userName: string;
            userID: string;
            rejoin?: true;
        };
    };

    export type Server_Handshake_Confirm = RS_T_Message & {
        type: RS_E_MessageTypes.Server_Handshake_Confirm;
        payload: {
            success: boolean;
            reason?: string;

            userList?: any[];
            fileList?: any[];
        }
    };
}
