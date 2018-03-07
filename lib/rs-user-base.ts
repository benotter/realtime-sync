import * as net from 'net';
import { EventEmitter } from 'events';
import * as uuid from 'uuid';
import { RSFileID, SafeJSON } from './lib';

export type RSUserID = string;

export class RSUserBase extends EventEmitter
{
    public host: boolean = false;

    public ownedFiles: RSFileID[] = [];
    public openFiles: RSFileID[] = [];

    constructor (
        public userName: string = "",
        public isServer: boolean = false,
        public socket: net.Socket = new net.Socket(),
        public id: RSUserID = uuid.v4(),
    )
    { super() }

    public connect( port: number, host?: string ) 
    {
        this.socket.connect( port, host );
    }

    public send ( sendObj: any )
    {
        this.socket.write( SafeJSON.stringify( sendObj ) );
    }

    public handleMessage(mess: any) {}
}