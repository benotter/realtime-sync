import { RS_C_File } from "./rs-file-base";

export const enum RS_E_ClientMessageType 
{
    BaseRequest
}

export namespace RS_N_Messages_C
{
    export interface BaseRequest { type: RS_E_ClientMessageType }
}

export const enum RS_E_ServerMessageType 
{
    BaseResponse,
}

export namespace RS_N_Messages_S 
{
    export interface BaseResponse { type: RS_E_ServerMessageType }

}