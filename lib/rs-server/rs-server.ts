// Built-ins
import * as net from 'net';
import { EventEmitter } from 'events';
// 3P's
import * as redux from 'redux';
// Const and utilities
import * as CONST from '../const'
import { U_SafeJSON, U_MessageBuilder_S as sMB } from '../util';
// Other 'up-one' imports
import
{
    RS_E_MessageTypes_S,
    RS_N_Messages_S,
    RS_E_MessageTypes_C,
    RS_N_Messages_C
} from '../rs-messages';
import { RS_C_File, } from '../rs-file-base';
// Local dir imports
import { RS_C_User_S, } from './rs-server-user';
import serverReducer, { RS_I_ServerState } from '../state/server/server-reducer';


export class RS_C_Server extends EventEmitter
{
    // State Store
    private _store: redux.Store<RS_I_ServerState> = redux.createStore<RS_I_ServerState>( serverReducer );
    private _storeUnSubFunc: redux.Unsubscribe | null = null;

    // built-in 'net' module server.
    private _server: net.Server = net.createServer();

    private _port: number = 8771;
    private _host: string = "";

    public get serverStarted (): boolean
    {
        return (
            this._server.listening
        );
    }

    constructor () 
    {
        super();

        this._server
            .on( 'error', ( err ) => this.onError( err ) )
            .on( 'connection', ( socket ) => this.onConnection( socket ) )
            .on( 'close', () => this.onClose() )
            .on( 'listening', () => this.onListening() );
    }

    public async start ( { port = this._port, host = this._host, } )
    {
        if ( this.serverStarted )
            throw new Error(); // @TODO - Add Error Message

        // Subscribe to store changes for tick func, (This should be fun)
        this._storeUnSubFunc =
            this._store.subscribe(
                () => this.onTick( this._store.getState() )
            );

        this._server.listen( port, host ? host : void 0 );
    }

    public async stop ()
    {
        if ( !this.serverStarted )
            throw new Error(); // @TODO - Error Logging

        if ( this._storeUnSubFunc )
        {
            this._storeUnSubFunc();
            this._storeUnSubFunc = null;
        }
    }

    public onError ( err: Error )
    {

    }

    public onConnection ( socket: net.Socket )
    {

    }

    public onClose ()
    {

    }

    public onListening ()
    {

    }

    public onTick ( state: RS_I_ServerState | false )
    {
        if ( !state )
            throw new Error(); // @TODO - Add Error Logging

        let {
            settings,
        } = state;

    }
}

export declare interface RS_C_Server 
{
    on ( e: 'error', l: ( err: Error ) => void ): this;
}