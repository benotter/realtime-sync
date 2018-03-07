import { EventEmitter } from 'events';
import * as net from 'net';
import * as uuid from 'uuid';
import { U_SafeJSON } from './util';
import { RS_T_FileID } from './rs-file-base';

export type RS_T_UserID = string;

export class RS_C_UserBase extends EventEmitter
{
    public host: boolean = false;

    public ownedFiles: RS_T_FileID[] = [];
    public openFiles: RS_T_FileID[] = [];

    constructor (
        public userName: string = "",
        public isServer: boolean = false,
        public socket: net.Socket = new net.Socket(),
        public id: RS_T_UserID = uuid.v4(),
    )
    { super() }

    public connect( port: number, host?: string ) 
    {
        this.socket.connect( port, host );
    }

    public send ( sendObj: any )
    {
        this.socket.write( U_SafeJSON.stringify( sendObj ) );
    }

    public handleMessage(mess: any) {}
}