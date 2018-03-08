import * as net from 'net';
import { EventEmitter } from 'events';
import { U_SafeJSON, U_MessageBuilder_S as sMB } from '../util';
import
{
    RS_E_ServerMessageType,
    RS_N_Messages_S,
    RS_E_ClientMessageType,
    RS_N_Messages_C
} from '../rs-messages';
import { RS_C_File, } from '../rs-file-base';
import { RS_C_UserServer, } from './rs-server-user';
import * as CONST from '../const'

export class RS_C_Server extends EventEmitter
{
    public server: net.Server = net.createServer();

    public get serverStarted () { return this.server.listening; }

    public userList: RS_C_UserServer[] = [];
    public fileList: RS_C_File[] = [];

    constructor (
        public port: number = CONST.NETWORK.DEFAULT_PORT,
        public host?: string,
    )
    {
        super();

        this.server
            .on( 'error', ( err ) => this.handleError( err ) )
            .on( 'connection', ( s ) => this.handleNewUser( s ) )
            .on( 'close', () => { } );
    }

    public start ()
    {
        return new Promise( ( res, rej ) =>
        {
            if ( this.serverStarted )
                return rej( new Error( "Server Already Started on: " + this.port ) );

            let listenErrFunc = ( err: Error ) =>
            {
                rej( err );
                this.server.removeListener( 'error', listenErrFunc );
            };

            this.server
                .once( 'error', listenErrFunc )
                .on( 'listening', () => res( true ) )
                .listen( this.port, this.host );
        } );
    }

    public stop ()
    {
        return new Promise( ( res, rej ) =>
        {
            if ( this.serverStarted )
                this.server.close( () => res( true ) );
            else
                rej( new Error( "Server Not Started!" ) );
        } );
    }

    public blast ( mess: RS_N_Messages_S.Base )
    {
        for ( let user of this.userList )
            user.send( mess );
    }

    private handleError ( err: Error )
    {
        this.emit( 'error', err );
    }

    private handleNewUser ( soc: net.Socket ) 
    {
        let newUser = new RS_C_UserServer( soc );

        newUser
            .on( 'error', err => this.handleError( err ) )
            .on( 'join-request', ( mess ) => this.onJoinRequest( newUser, mess ) );
    }

    public onJoinRequest ( user: RS_C_UserServer, mess: RS_N_Messages_C.JoinRequest )
    {
        if ( this.userList.find( u => u.id === mess.userID ) )
        {
            return user.send( sMB.JoinResponse(
                false, 
                void 0, 
                void 0,
                CONST.STRING.ERROR.JOIN_USER_ID_EXISTS
            ));
        }

        user
            .on( 'leave-report', ( data ) => 
            {
                this.onLeaveReport( user );
            } )
            .on( 'add-file-request', ( data ) => 
            {
                this.onAddFileReq( user, data );
            } )
            .on( 'rem-file-request', ( data ) => 
            {
                this.onRemFileReq( user, data );
            } )
            .on( 'update-file-request', ( data ) => 
            {
                this.onUpdateFileReq( user, data );
            } );

        this.userList.push( user );

        this.emit( 'user-join', user );

        return user.send( sMB.JoinResponse(
            true,
            '',
            this.userList.map( u => ({ userID: u.id, userName: u.userName }) )
        ) );
    }

    public onLeaveReport ( user: RS_C_UserServer ) 
    {
        this.userList = this.userList.filter( u => u.id !== user.id );

        this.emit( 'user-leave', user );
    }

    public onAddFileReq ( user: RS_C_UserServer, mess: RS_N_Messages_C.AddFileRequest ) 
    {
        let { userID, file = null, files = null, parentID = null, } = mess;

        if ( userID !== user.id )
        {
            return;
        }

        if ( file && !files ) 
        {
            if ( parentID ) { }
            else { }
        }
        else if ( files && !file ) 
        {
            if ( parentID ) { }
            else { }
        }

    }
    public onRemFileReq ( user: RS_C_UserServer, mess: RS_N_Messages_C.RemFileRequest ) 
    {
        let { userID, fileID, } = mess;
    }
    public onUpdateFileReq ( user: RS_C_UserServer, mess: RS_N_Messages_C.UpdateFileRequest ) 
    {
        let { userID, fileID, } = mess;
    }
}

export declare interface RS_C_Server 
{
    emit ( event: "error", error: Error ): boolean;
    on ( event: "error", listener: ( error: Error ) => void ): this;

    emit ( event: "user-join", data: any ): boolean;
    on ( event: "user-join", listener: ( data: any ) => void ): this;

    emit ( event: "user-leave", data: any ): boolean;
    on ( event: "user-leave", listener: ( data: any ) => void ): this;

    emit ( event: "file-added", data: any ): boolean;
    on ( event: "file-added", listener: ( data: any ) => void ): this;

    emit ( event: "file-removed", data: any ): boolean;
    on ( event: "file-removed", listener: ( data: any ) => void ): this;

    emit ( event: "file-updated", data: any ): boolean;
    on ( event: "file-updated", listener: ( data: any ) => void ): this;
}