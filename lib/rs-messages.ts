import { RS_C_File } from "./rs-file-base";

export type RS_T_MessageID = string;

export const enum RS_E_MessageTypes_C 
{
    BaseRequest
}

export namespace RS_N_Messages_C
{
    export interface BaseRequest 
    {
        id: RS_T_MessageID;
        type: RS_E_MessageTypes_C
    };

}

export const enum RS_E_MessageTypes_S 
{
    BaseResponse,
}

export namespace RS_N_Messages_S 
{
    export interface BaseResponse 
    {
        id: RS_T_MessageID;
        type: RS_E_MessageTypes_S
    };

    export type ServerHandshake = {} & BaseResponse;

}