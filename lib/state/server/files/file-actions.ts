import { RS_C_File, RS_E_FileType, RS_T_FileID } from "../../../rs-file-base";
import { RS_T_UserID } from '../../../rs-user-base';

export type RS_T_FileDetails = { fileID: RS_T_FileID, type?: RS_E_FileType, parentID?: RS_T_FileID, ownerID?: RS_T_UserID, };
export type RS_T_FileOpen = { fileID: RS_T_FileID, open: boolean };

export const enum RS_E_File_ActionTypes_S 
{
    FILE_ADD_FILES = "FILE_ADD_FILES",
    FILE_SET_FILES = "FILE_SET_FILES",
    FILE_REM_FILES = "FILE_REM_FILES",

    FILE_SET_OPEN = "FILE_SET_OPEN",
}

export namespace RS_I_File_Actions_S 
{
    export type Base = { type: RS_E_File_ActionTypes_S };

    export type AddFiles = Base & {
        files: RS_C_File[],
    };
    export type SetFiles = Base & {
        fileDetails: { type?: RS_E_FileType, parentID?: RS_T_FileID, ownerID?: RS_T_UserID }[]
    };
    export type RemFiles = Base & {
        fileIDs: RS_T_FileID[]
    };

    export type SetOpen = Base & {
        setOpen: RS_T_FileOpen[]
    };
}

export namespace RS_N_File_Actions_S 
{
    export const addFiles = ( files: RS_C_File | RS_C_File[] ): RS_I_File_Actions_S.AddFiles =>
        ( {
            type: RS_E_File_ActionTypes_S.FILE_ADD_FILES,
            files: Array.isArray( files ) ? files : [ files ]
        } );
    export const setFiles = ( fileDetails: RS_T_FileDetails | RS_T_FileDetails[] ): RS_I_File_Actions_S.SetFiles =>
        ( {
            type: RS_E_File_ActionTypes_S.FILE_SET_FILES,
            fileDetails: Array.isArray( fileDetails ) ? fileDetails : [ fileDetails ],
        } );
    export const remFiles = ( fileIDs: RS_T_FileID | RS_T_FileID[] ): RS_I_File_Actions_S.RemFiles =>
        ( {
            type: RS_E_File_ActionTypes_S.FILE_REM_FILES,
            fileIDs: Array.isArray( fileIDs ) ? fileIDs : [ fileIDs ],
        } );

    export const setOpen = ( setOpen: RS_T_FileOpen | RS_T_FileOpen[] ): RS_I_File_Actions_S.SetOpen =>
        ( {
            type: RS_E_File_ActionTypes_S.FILE_SET_OPEN,
            setOpen: Array.isArray( setOpen ) ? setOpen : [ setOpen ],
        } );
}

