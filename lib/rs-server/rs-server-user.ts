import * as net from 'net';
import { RSMessages_C, RSClientMessageType, RSUserBase, SafeJSON } from '../lib';

export class RSUserServer extends RSUserBase
{
    constructor ( socket: net.Socket )
    {
        super();
        this.socket = socket;

        socket
            .on( 'error', ( err ) => this.emit( 'error', err ) )
            .on( 'close', () => { } )
            .on( 'end', () => { } )
            .on( 'data', ( data ) =>
            {
                let datStr = data.toString( 'utf-8' );
                let datO = SafeJSON.parse<RSMessages_C.Base>( datStr, null );
                if ( datO === null ) { return; } // @TODO - Add Logging

                this.handleMessage( datO );
            } );
    }

    public handleMessage ( mess: RSMessages_C.Base ): boolean
    {
        switch ( mess.type )
        {
            case RSClientMessageType.Join_Request:
                return this.emit( 'join-request', mess as RSMessages_C.JoinRequest );
            case RSClientMessageType.Leave_Report:
                return this.emit( 'leave-report', mess as RSMessages_C.LeaveReport );

            case RSClientMessageType.AddFile_Request:
                return this.emit( 'add-file-request', mess as RSMessages_C.AddFileRequest );
            case RSClientMessageType.RemFile_Request:
                return this.emit( 'rem-file-request', mess as RSMessages_C.RemFileRequest );
            case RSClientMessageType.UpdateFile_Request:
                return this.emit( 'update-file-request', mess as RSMessages_C.UpdateFileRequest );

            default:
                return false;
        }
    }
}

export declare interface RSUserServer
{
    emit ( event: 'error', data: Error ): boolean;
    on ( event: 'error', listener: ( data: Error ) => void ): this;

    emit ( event: 'join-request', data: RSMessages_C.JoinRequest ): boolean;
    on ( event: 'join-request', listener: ( data: RSMessages_C.JoinRequest ) => void ): this;

    emit ( event: 'leave-report', data: RSMessages_C.LeaveReport ): boolean;
    on ( event: 'leave-report', listener: ( data: RSMessages_C.LeaveReport ) => void ): this;

    emit ( event: 'add-file-request', data: RSMessages_C.AddFileRequest ): boolean;
    on ( event: 'add-file-request', listener: ( data: RSMessages_C.AddFileRequest ) => void ): this;

    emit ( event: 'rem-file-request', data: RSMessages_C.RemFileRequest ): boolean;
    on ( event: 'rem-file-request', listener: ( data: RSMessages_C.RemFileRequest ) => void ): this;

    emit ( event: 'update-file-request', data: RSMessages_C.UpdateFileRequest ): boolean;
    on ( event: 'update-file-request', listener: ( data: RSMessages_C.UpdateFileRequest ) => void ): this;
}