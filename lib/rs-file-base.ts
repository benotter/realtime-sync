import * as uuid from 'uuid';
import { RSUserID } from './lib';

export type RSFileID = string;

export enum RSFileType 
{
    File,
    Dir,
}

export class RSFile
{
    public isRoot: boolean = false;
    public contents?: string | Buffer;
    public owner?: RSUserID;
    public children?: RSFileID[];

    constructor(
        public type: RSFileType = RSFileType.File,
        public fileName: string = "",
        public parent: RSFileID | null = null,
        public id: RSFileID = uuid.v4(),
    ){}
}