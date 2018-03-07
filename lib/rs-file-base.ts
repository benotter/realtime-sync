import * as uuid from 'uuid';
import { RS_T_UserID } from './rs-user-base';

export type RS_T_FileID = string;

export enum RS_E_FileType 
{
    File,
    Dir,
}

export class RS_C_File
{
    public isRoot: boolean = false;
    public contents?: string | Buffer;
    public owner?: RS_T_UserID;
    public children?: RS_T_FileID[];

    constructor (
        public type: RS_E_FileType = RS_E_FileType.File,
        public fileName: string = "",
        public parent: RS_T_FileID | null = null,
        public id: RS_T_FileID = uuid.v4(),
    ) { }
}