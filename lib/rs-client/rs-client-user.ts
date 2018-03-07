import { EventEmitter } from 'events';
import { U_SafeJSON, } from '../util';
import { RS_C_UserBase, RS_T_UserID, } from '../rs-user-base';
import { RS_E_ClientMessageType, RS_E_ServerMessageType, RS_N_Messages_S } from '../rs-messages';
import * as CONST from '../const';

export class RS_C_UserClient extends RS_C_UserBase
{
    public connected: boolean = false;
    constructor ( userName: string )
    {
        super( userName, false );
    }

    public join ( host: string, port: number )
    {
        return new Promise( ( res, rej ) =>
        {
            if ( this.connected )
                return rej( new Error( CONST.STRING.ERROR.USERCLIENT_ALREADY_CONNECTED ) );

            let errFunc = ( err: Error | any ) => rej( err );

            this.socket
                .once( 'error', errFunc )
                .connect( port, host, () =>
                {
                    let endCloseFunc = () => { this.connected = false; };

                    this.socket
                        .removeListener( 'error', errFunc )
                        .on( 'error', ( err ) => this.emit( 'error', err ) )
                        .on( 'connect', () => this.onConnect() )
                        .on( 'close', endCloseFunc )
                        .on( 'end', endCloseFunc )
                        .on( 'data', ( data ) => this.onData( data ) );

                    return res( this );
                } );
        } );
    }

    private onConnect ()
    {
        this.connected = true;
    }

    private onData ( data: Buffer )
    {
        let datStr = data.toString( 'utf-8' );
        let datO = U_SafeJSON.parse<RS_N_Messages_S.Base>( datStr, null );
        if ( datO === null ) { return; } // @TODO - Add Logging

        this.handleMessage( datO );
    }

    public handleMessage ( mess: RS_N_Messages_S.Base )
    {
        switch ( mess.type )
        {
            case RS_E_ServerMessageType.Join_Response:
                return this.emit( 'join-response', mess as RS_N_Messages_S.JoinResponse );
            case RS_E_ServerMessageType.AddFile_Response:
                return this.emit( 'add-file-response', mess as RS_N_Messages_S.AddFileReponse );
            case RS_E_ServerMessageType.RemFile_Response:
                return this.emit( 'rem-file-response', mess as RS_N_Messages_S.RemFileResponse );
            case RS_E_ServerMessageType.UpdateFile_Response:
                return this.emit( 'update-file-response', mess as RS_N_Messages_S.UpdateFileResponse );

            case RS_E_ServerMessageType.Blast_OnJoin:
                return this.emit( 'blast-on-join', mess as RS_N_Messages_S.Blast_OnJoin );
            case RS_E_ServerMessageType.Blast_OnLeave:
                return this.emit( 'blast-on-leave', mess as RS_N_Messages_S.Blast_OnLeave );
            case RS_E_ServerMessageType.Blast_FileAdded:
                return this.emit( 'blast-file-added', mess as RS_N_Messages_S.Blast_OnFileAdded );
            case RS_E_ServerMessageType.Blast_FileRemoved:
                return this.emit( 'blast-file-removed', mess as RS_N_Messages_S.Blast_OnFileRemoved );
            case RS_E_ServerMessageType.Blast_FileUpdated:
                return this.emit( 'blast-file-updated', mess as RS_N_Messages_S.Blast_OnFileUpdated );

            default:
                break;
        }
    }
}

declare class RSUserClient 
    {
        emit ( event: 'error', data: Error ): boolean;
        on ( event: 'error', listener: ( data: Error ) => void ): this;

        on ( event: "join-response", listener: ( mess: RS_N_Messages_S.JoinResponse ) => void ): this;
        emit ( event: "join-response", data: RS_N_Messages_S.JoinResponse ): boolean;

        on ( event: "add-file-response", listener: ( mess: RS_N_Messages_S.AddFileReponse ) => void ): this;
        emit ( event: "add-file-response", data: RS_N_Messages_S.AddFileReponse ): boolean;

        on ( event: "rem-file-response", listener: ( mess: RS_N_Messages_S.RemFileResponse ) => void ): this;
        emit ( event: "rem-file-response", data: RS_N_Messages_S.RemFileResponse ): boolean;

        on ( event: "update-file-response", listener: ( mess: RS_N_Messages_S.UpdateFileResponse ) => void ): this;
        emit ( event: "update-file-response", data: RS_N_Messages_S.UpdateFileResponse ): boolean;

        on ( event: "blast-on-join", listener: ( mess: RS_N_Messages_S.Blast_OnJoin ) => void ): this;
        emit ( event: "blast-on-join", data: RS_N_Messages_S.Blast_OnJoin ): boolean;

        on ( event: "blast-on-leave", listener: ( mess: RS_N_Messages_S.Blast_OnLeave ) => void ): this;
        emit ( event: "blast-on-leave", data: RS_N_Messages_S.Blast_OnLeave ): boolean;

        on ( event: "blast-file-added", listener: ( mess: RS_N_Messages_S.Blast_OnFileAdded ) => void ): this;
        emit ( event: "blast-file-added", data: RS_N_Messages_S.Blast_OnFileAdded ): boolean;

        on ( event: "blast-file-removed", listener: ( mess: RS_N_Messages_S.Blast_OnFileRemoved ) => void ): this;
        emit ( event: "blast-file-removed", data: RS_N_Messages_S.Blast_OnFileRemoved ): boolean;

        on ( event: "blast-file-updated", listener: ( mess: RS_N_Messages_S.Blast_OnFileUpdated ) => void ): this;
        emit ( event: "blast-file-updated", data: RS_N_Messages_S.Blast_OnFileUpdated ): boolean;
    }