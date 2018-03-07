import { EventEmitter } from 'events';
import
{
    RSUserBase,
    RSMessages_C,
    RSMessages_S,
    RSClientMessageType,
    RSServerMessageType,
    RSUserID,
    SafeJSON,
} from '../lib';

export class RSUserClient extends RSUserBase
{
    constructor ( userName: string )
    {
        super( userName, false );
    }

    public join ( host: string, port: number )
    {
        return new Promise( ( res, rej ) =>
        {
            let errFunc = ( err: Error | any ) => rej( err );

            this.socket.once( 'error', errFunc );
            this.socket.connect( port, host, () =>
            {
                this.socket.removeListener( 'error', errFunc );

                this.socket.on( 'error', () => { } );
                this.socket.on( 'connect', () => { } );
                this.socket.on( 'close', () => { } );
                this.socket.on( 'end', () => { } );
                this.socket.on( 'data', ( data ) =>
                {
                    let datStr = data.toString( 'utf-8' );
                    let datO = SafeJSON.parse<RSMessages_S.Base>( datStr, null );
                    if ( datO === null ) { return; } // @TODO - Add Logging

                    this.handleMessage( datO );
                } );

                return res( this );
            } );
        } );
    }

    public handleMessage ( mess: RSMessages_S.Base )
    {
        switch ( mess.type )
        {
            case RSServerMessageType.Join_Response:
                return this.emit( 'join-response', mess as RSMessages_S.JoinResponse );
            case RSServerMessageType.AddFile_Response:
                return this.emit( 'add-file-response', mess as RSMessages_S.AddFileReponse );
            case RSServerMessageType.RemFile_Response:
                return this.emit( 'rem-file-response', mess as RSMessages_S.RemFileResponse );
            case RSServerMessageType.UpdateFile_Response:
                return this.emit( 'update-file-response', mess as RSMessages_S.UpdateFileResponse );

            case RSServerMessageType.Blast_OnJoin:
                return this.emit( 'blast-on-join', mess as RSMessages_S.Blast_OnJoin );
            case RSServerMessageType.Blast_OnLeave:
                return this.emit( 'blast-on-leave', mess as RSMessages_S.Blast_OnLeave );
            case RSServerMessageType.Blast_FileAdded:
                return this.emit( 'blast-file-added', mess as RSMessages_S.Blast_OnFileAdded );
            case RSServerMessageType.Blast_FileRemoved:
                return this.emit( 'blast-file-removed', mess as RSMessages_S.Blast_OnFileRemoved );
            case RSServerMessageType.Blast_FileUpdated:
                return this.emit( 'blast-file-updated', mess as RSMessages_S.Blast_OnFileUpdated );

            default:
                break;
        }
    }
}

export declare interface RSUserClient 
{
    emit ( event: 'error', data: Error ): boolean;
    on ( event: 'error', listener: ( data: Error ) => void ): this;

    on ( event: "join-response", listener: ( mess: RSMessages_S.JoinResponse ) => void ): this;
    emit ( event: "join-response", data: RSMessages_S.JoinResponse ): boolean;

    on ( event: "add-file-response", listener: ( mess: RSMessages_S.AddFileReponse ) => void ): this;
    emit ( event: "add-file-response", data: RSMessages_S.AddFileReponse ): boolean;

    on ( event: "rem-file-response", listener: ( mess: RSMessages_S.RemFileResponse ) => void ): this;
    emit ( event: "rem-file-response", data: RSMessages_S.RemFileResponse ): boolean;

    on ( event: "update-file-response", listener: ( mess: RSMessages_S.UpdateFileResponse ) => void ): this;
    emit ( event: "update-file-response", data: RSMessages_S.UpdateFileResponse ): boolean;

    on ( event: "blast-on-join", listener: ( mess: RSMessages_S.Blast_OnJoin ) => void ): this;
    emit ( event: "blast-on-join", data: RSMessages_S.Blast_OnJoin ): boolean;

    on ( event: "blast-on-leave", listener: ( mess: RSMessages_S.Blast_OnLeave ) => void ): this;
    emit ( event: "blast-on-leave", data: RSMessages_S.Blast_OnLeave ): boolean;

    on ( event: "blast-file-added", listener: ( mess: RSMessages_S.Blast_OnFileAdded ) => void ): this;
    emit ( event: "blast-file-added", data: RSMessages_S.Blast_OnFileAdded ): boolean;

    on ( event: "blast-file-removed", listener: ( mess: RSMessages_S.Blast_OnFileRemoved ) => void ): this;
    emit ( event: "blast-file-removed", data: RSMessages_S.Blast_OnFileRemoved ): boolean;

    on ( event: "blast-file-updated", listener: ( mess: RSMessages_S.Blast_OnFileUpdated ) => void ): this;
    emit ( event: "blast-file-updated", data: RSMessages_S.Blast_OnFileUpdated ): boolean;
}