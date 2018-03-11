import * as uuid from 'uuid';
import { RS_T_UserID } from './rs-user-base';

export type RS_T_FileID<T={}> = T & string;

export enum RS_E_FileType 
{
    Unknown,
    File,
    Folder,
}

export class RS_C_File
{
    public isRoot: boolean = false;

    public parentID: RS_T_FileID | null = null;

    constructor (
        public type: RS_E_FileType = RS_E_FileType.Unknown,
        public id: RS_T_FileID = uuid.v4(),
        public contents?: string | Buffer,
    )
    { }

    public markRoot ()
    {
        this.isRoot = true;
    }
}