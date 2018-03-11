// Built-ins
import * as net from 'net';
import { EventEmitter } from 'events';
// 3P's
import * as redux from 'redux';
// Const and utilities
import * as CONST from '../const'
import { U_SafeJSON, U_MessageBuilder as sMB } from '../util';
// Other local imports
import
{
    RS_T_Message,
    RS_T_MessageID,
    RS_N_Messages,
    RS_E_MessageTypes,
} from '../rs-messages';
import { RS_C_File, } from '../rs-file-base';
import { RS_C_User_S, } from './rs-server-user';
import serverReducer, { RS_I_ServerState } from '../state/server/server-reducer';


export declare interface RS_C_Server 
{
    emit ( e: 'error', err: Error ): boolean;
    on ( e: 'error', l: ( err: Error ) => void ): this;
}

export class RS_C_Server extends EventEmitter
{
    private _workTickRate = 20;
    private _workTickTimer: NodeJS.Timer | null = null;

    // State Store
    private _store: redux.Store<RS_I_ServerState> = redux.createStore<RS_I_ServerState>( serverReducer );
    private _thinkTickUnsubFunc: redux.Unsubscribe | null = null;


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

        this.hookThinkTick();
        this.hookWorkTick();

        this._server.listen( port, host ? host : void 0 );
    }

    public async stop ()
    {
        if ( !this.serverStarted )
            throw new Error(); // @TODO - Error Logging

        this.unhookThinkTick();
        this.unhookWorkTick();

        this._server.close();
    }


    private hookThinkTick ()
    {
        if ( this._thinkTickUnsubFunc )
            throw new Error(); // @TODO - add error message;

        this._thinkTickUnsubFunc = this._store.subscribe( () => this.onThinkTick( this._store.getState() ) );
    }

    private unhookThinkTick ()
    {
        if ( this._thinkTickUnsubFunc )
        {
            this._thinkTickUnsubFunc();
            this._thinkTickUnsubFunc = null;
        }
    }

    private hookWorkTick ()
    {
        if ( this._workTickTimer )
            throw new Error(); // @TODO - Add Error Message;

        this._workTickTimer = setTimeout(
            () => this.onWorkTick( this._store.getState() ),
            this._workTickRate
        );
    }

    private unhookWorkTick ()
    {
        if ( this._workTickTimer )
        {
            clearTimeout( this._workTickTimer );
            this._workTickTimer = null;
        }
    }

    private onError ( err: Error ) { }
    private onConnection ( socket: net.Socket ) { }
    private onClose () { }
    private onListening () { }


    private onThinkTick ( state: RS_I_ServerState )
    {

    }

    private async onWorkTick ( state: RS_I_ServerState | false )
    {
        if ( !state )
            throw new Error(); // @TODO - Add Error Logging

        let {
            settings,
            messages,
        } = state;

        if ( messages.newMessages.length > 0 )
        {
            let newMs = await Helpers.getMessages( messages.messageList, messages.newMessages );
        }

    }
}

namespace Helpers 
{
    export async function getMessages ( messL: RS_T_Message[], messIDs: RS_T_MessageID[] )
    {
        return messIDs.reduce(
            ( ret, mID ) => 
            {
                let m = messL.find( m => m.id === mID );
                if ( m )
                    ret.push( m );
                return ret;
            }, [] as RS_T_Message[] );
    }
}

