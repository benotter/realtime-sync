import * as net from 'net';
import { EventEmitter } from 'events';
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

export class RSServer extends EventEmitter
{
    public server: net.Server = net.createServer();

    public get serverStarted () { return this.server.listening; }

    public userList: RS_C_UserServer[] = [];
    public fileList: RS_C_File[] = [];

    constructor (
        public log: {
            info: ( str: string ) => any,
            warn: ( str: string ) => any,
            error: ( str: any ) => any
        } = { info: () => { }, warn: () => { }, error: () => { }, },

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
            this.server.once( 'error', listenErrFunc );

            this.server.on( 'listening', () =>
            {
                this.log.info( CONST.LOG.SERVER_START );
                res( true );
            } );

            this.server.listen( this.port, this.host );
        } );
    }

    public stop ()
    {
        return new Promise( ( res, rej ) =>
        {
            if ( this.serverStarted )
                this.server.close( () => 
                {
                    this.log.info( CONST.LOG.SERVER_STOP );
                    res( true );
                } );
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
        this.log.error( err );
    }

    private handleNewUser ( soc: net.Socket ) 
    {
        let newUser = new RS_C_UserServer( soc );
        newUser
            .on( 'error', err => this.log.error( err ) )
            .on( 'join-request', ( mess ) => this.onJoinRequest( newUser, mess ) );
    }

    public onJoinRequest ( user: RS_C_UserServer, mess: RS_N_Messages_C.JoinRequest )
    {
        if ( this.userList.find( u => u.id === mess.userID ) )
        {
            return user.send( {
                type: RS_E_ServerMessageType.Join_Response,
                success: false,
                message: CONST.STRING.ERROR.JOIN_USER_ID_EXISTS
            } as RS_N_Messages_S.JoinResponse );
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

        return user.send( {
            type: RS_E_ServerMessageType.Join_Response,
            success: true,
            serverName: "rs-server",
            userList: this.userList.map( u => u.userName ),
        } as RS_N_Messages_S.JoinResponse );
    }

    public onLeaveReport ( user: RS_C_UserServer ) 
    {
        this.userList = this.userList.filter( u => u.id !== user.id );
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