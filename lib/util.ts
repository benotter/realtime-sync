import
{
    RS_E_ClientMessageType as cT,
    RS_E_ServerMessageType as sT,
    RS_N_Messages_C as cM,
    RS_N_Messages_S as sM,
} from './rs-messages';

export namespace U_SafeJSON
{
    export function parse<T = any>( str: string, def: T | null = null ): T | null
    {
        try { return JSON.parse( str ) as T; }
        catch ( e ) { return def; }
    }

    export function stringify ( obj: any, prettyPrint: boolean = false ): string
    {
        return JSON.stringify( obj, void 0, prettyPrint ? ' ' : void 0 );
    }
}

export namespace U_MessageBuilder_C
{
    export const baseObj = ( type: cT ): cM.Base => ( { type } );

    export const JoinRequest = ( userName: string, userID: string ): cM.JoinRequest => Object.assign(
        baseObj( cT.Join_Request ),
        { userName, userID },
    );

    export const LeaveReport = ( userID: string ): cM.LeaveReport => Object.assign(
        baseObj( cT.Leave_Report ),
        { userID },
    );

    export const AddFileRequest = ( userID: string ): cM.AddFileRequest => Object.assign(
        baseObj( cT.AddFile_Request ),
        { userID },
    );
    export const RemFileRequest = ( userID: string, fileID: string ): cM.RemFileRequest => Object.assign(
        baseObj( cT.RemFile_Request ),
        { userID, fileID },
    );
    export const UpdateFileRequest = ( userID: string, fileID: string ): cM.UpdateFileRequest => Object.assign(
        baseObj( cT.UpdateFile_Request ),
        { userID, fileID, },
    );
}

export namespace U_MessageBuilder_S 
{
    export const baseObj = ( type: sT ): sM.Base => ( { type } );

    export const JoinResponse = (
        success: boolean, 
        serverName?: string,
        userList?: { userID: string, userName: string }[],
        message?: string | void,
    ): sM.JoinResponse => Object.assign(
        { success, serverName, userList, message: (message as string)},
        baseObj( sT.Join_Response )
    )

    export const LeaveReport = 
}