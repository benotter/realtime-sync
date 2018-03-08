import { EventEmitter } from 'events';
import { RS_C_UserClient } from './rs-client-user';
import { RS_N_Messages_S, RS_N_Messages_C } from '../rs-messages';
import * as CONST from '../const';


export class RS_C_Client extends EventEmitter
{
    public user: RS_C_UserClient = new RS_C_UserClient( this.userName, this.id );

    public joined: boolean = false;

    constructor (
        public userName: string = CONST.USER.DEFAULT_USERNAME,
        public id: string | void = void 0,
    ) 
    {
        super();

        this.user
            .on( 'error', ( err ) => this.handleError( err ) )
            .on( 'join-response', ( mess ) => this.handleJoinReponse( mess ) )
            .on( 'add-file-response', ( mess ) => this.handleAddFileResponse( mess ) )
            .on( 'rem-file-response', ( mess ) => this.handleRemFileResponse( mess ) )
            .on( 'update-file-response', ( mess ) => this.handleUpdateFileReponse( mess ) )
            .on( 'blast-on-join', ( mess ) => this.handleBlast_OnJoin( mess ) )
            .on( 'blast-on-leave', ( mess ) => this.handleBlast_OnLeave( mess ) )
            .on( 'blast-file-added', ( mess ) => this.handleBlast_OnFileAdded( mess ) )
            .on( 'blast-file-removed', ( mess ) => this.handleBlast_OnFileRemoved( mess ) )
            .on( 'blast-file-updated', ( mess ) => this.handleBlast_FileUpdated( mess ) );
    }

    public join ( host: string, port: number )
    {
        return this.user.join( host, port );
    }

    private handleError ( err: Error )
    {

    }

    private handleJoinReponse ( mess: RS_N_Messages_S.JoinResponse )
    {

    }
    private handleAddFileResponse ( mess: RS_N_Messages_S.AddFileReponse )
    {

    }
    private handleRemFileResponse ( mess: RS_N_Messages_S.RemFileResponse )
    {

    }
    private handleUpdateFileReponse ( mess: RS_N_Messages_S.UpdateFileResponse )
    {

    }

    private handleBlast_OnJoin ( mess: RS_N_Messages_S.Blast_OnJoin )
    {

    }
    private handleBlast_OnLeave ( mess: RS_N_Messages_S.Blast_OnLeave )
    {

    }
    private handleBlast_OnFileAdded ( mess: RS_N_Messages_S.Blast_OnFileAdded )
    {

    }
    private handleBlast_OnFileRemoved ( mess: RS_N_Messages_S.Blast_OnFileRemoved )
    {

    }
    private handleBlast_FileUpdated ( mess: RS_N_Messages_S.Blast_OnFileUpdated )
    {

    }
}