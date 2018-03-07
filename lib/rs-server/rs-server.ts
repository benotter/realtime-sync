import * as net from 'net';
import 
{
    CONST,
    RSFile,
    RSFileID,
    RSUserID,
    RSUserServer,
    RSMessages_S,
    RSMessages_C,
    RSServerMessageType,
    RSClientMessageType,
} from '../lib';

export class RSServer
{
    public server: net.Server = net.createServer();

    public get serverStarted () { return this.server.listening; }

    public userList: RSUserServer[] = [];
    public fileList: RSFile[] = [];

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
        this.server
            .on( 'error', ( err ) => this.handleError( err ) )
            .on( 'connection', ( s ) => this.handleNewUser( s ) )
            .on( 'close', () => { } );
    }

    public start ( cb: () => void = () => { } )
    {
        this.server.on( 'listening', () =>
        {
            this.log.info( CONST.LOG.SERVER_START );
            cb();
        } );

        this.server.listen( this.port, this.host );
    }

    public stop ( cb: () => void = () => { } )
    {
        if ( this.serverStarted )
            this.server.close();
    }

    public blast ( mess: RSMessages_S.Base )
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
        let newUser = new RSUserServer( soc );

        newUser
            .on('error', err => {} )    
            .on( 'join-request', ( mess ) =>
            {
                newUser
                    .on( 'leave-report', ( data ) => 
                    {
                        this.onLeaveReport( newUser );
                    } )
                    .on( 'add-file-request', ( data ) => 
                    {
                        this.onAddFileReq( newUser, data );
                    } )
                    .on( 'rem-file-request', ( data ) => 
                    {
                        this.onRemFileReq( newUser, data );
                    } )
                    .on( 'update-file-request', ( data ) => 
                    {
                        this.onUpdateFileReq( newUser, data );
                    } );

                this.userList.push( newUser );
            } );
    }

    public onLeaveReport ( user: RSUserServer ) 
    {
        this.userList = this.userList.filter( u => u.id !== user.id );
    }
    public onAddFileReq ( user: RSUserServer, mess: RSMessages_C.AddFileRequest ) 
    {
        let {  } = mess;
    }
    public onRemFileReq ( user: RSUserServer, mess: RSMessages_C.RemFileRequest ) 
    {

    }
    public onUpdateFileReq ( user: RSUserServer, mess: RSMessages_C.UpdateFileRequest ) 
    {

    }
}