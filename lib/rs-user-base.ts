import { EventEmitter } from 'events';
import * as net from 'net';
import * as uuid from 'uuid';
import { U_SafeJSON } from './util';
import { RS_T_FileID } from './rs-file-base';

export type RS_T_UserID = string;

export class RS_C_User_B extends EventEmitter
{
    public filesOwned: RS_T_FileID[] =[];
    
    constructor(
        public name: string,
        public id: RS_T_UserID,
    )
    {
        super()
    }
}