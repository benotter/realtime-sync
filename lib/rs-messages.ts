import { RSFile } from './lib'
export enum RSClientMessageType 
{
    Base,
    Leave_Report,

    Join_Request,
    AddFile_Request,
    RemFile_Request,
    UpdateFile_Request,
}

export namespace RSMessages_C 
{
    export interface Base { type: RSClientMessageType }

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
        file?: RSFile;
        files?: RSFile[];
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

export enum RSServerMessageType 
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

export namespace RSMessages_S 
{
    export interface Base { type: RSServerMessageType }

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

