import { RS_C_File } from "./rs-file-base";

export enum RS_E_ClientMessageType 
{
    Base,
    Leave_Report,

    Join_Request,
    AddFile_Request,
    RemFile_Request,
    UpdateFile_Request,
}

export namespace RS_N_Messages_C
{
    export interface Base { type: RS_E_ClientMessageType }

    export interface LeaveReport extends Base
    {
        userID: string;
    }

    export interface JoinRequest extends Base
    {
        userID: string;
        userName: string;
    }

    export interface AddFileRequest extends Base
    {
        userID: string;
        file?: RS_C_File;
        files?: RS_C_File[];
        parentID?: string;
    }

    export interface RemFileRequest extends Base
    {
        userID: string;
        fileID: string;
    }

    export interface UpdateFileRequest extends Base
    {
        userID: string;
        fileID: string;

    }
}

export enum RS_E_ServerMessageType 
{
    Base,

    Join_Response,
    AddFile_Response,
    RemFile_Response,
    UpdateFile_Response,

    Blast_OnJoin,
    Blast_OnLeave,
    Blast_FileAdded,
    Blast_FileRemoved,
    Blast_FileUpdated,
}

export namespace RS_N_Messages_S 
{
    export interface Base { type: RS_E_ServerMessageType }

    export interface JoinResponse extends Base
    {
        success: boolean;
        message?: string;
        serverName?: string;
        userList?: string[];
    }

    export interface AddFileReponse extends Base { }
    export interface RemFileResponse extends Base { }
    export interface UpdateFileResponse extends Base { }

    export interface Blast_OnJoin extends Base { }
    export interface Blast_OnLeave extends Base { }
    export interface Blast_OnFileAdded extends Base { }
    export interface Blast_OnFileRemoved extends Base { }
    export interface Blast_OnFileUpdated extends Base { }
}