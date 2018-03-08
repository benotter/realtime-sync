import * as net from 'net';
import { U_SafeJSON } from '../util';
import { RS_E_ClientMessageType, RS_N_Messages_C } from '../rs-messages';
import { RS_C_UserBase, } from '../rs-user-base';

export class RS_C_UserServer
    extends RS_C_UserBase
    implements RS_C_UserServer
{
    public joined: boolean = false;
    public disconnected: boolean = false;


    constructor ( socket: net.Socket )
    {
        super();
        this.socket = socket;

        let closeEndFunc = () =>
        {
            if ( !this.disconnected )
            {
                this.disconnected = true;
                this.emit( 'leave-report', {
                    type: RS_E_ClientMessageType.Leave_Report,
                    userID: this.id,
                } as RS_N_Messages_C.LeaveReport );
            }
        };

        socket
            .on( 'error', ( err ) => this.emit( 'error', err ) )
            .on( 'close', closeEndFunc )
            .on( 'end', closeEndFunc )
            .on( 'data', ( data ) =>
            {
                let datStr = data.toString( 'utf-8' );
                let datO = U_SafeJSON.parse<RS_N_Messages_C.Base>( datStr, null );
                if ( datO === null ) { return; } // @TODO - Add Logging

                this.handleMessage( datO );
            } );
    }

    public handleMessage ( mess: RS_N_Messages_C.Base ): boolean
    {
        switch ( mess.type )
        {
            case RS_E_ClientMessageType.Join_Request:
                return this.emit( 'join-request', mess as RS_N_Messages_C.JoinRequest );
            case RS_E_ClientMessageType.Leave_Report:
                return this.emit( 'leave-report', mess as RS_N_Messages_C.LeaveReport );

            case RS_E_ClientMessageType.AddFile_Request:
                return this.emit( 'add-file-request', mess as RS_N_Messages_C.AddFileRequest );
            case RS_E_ClientMessageType.RemFile_Request:
                return this.emit( 'rem-file-request', mess as RS_N_Messages_C.RemFileRequest );
            case RS_E_ClientMessageType.UpdateFile_Request:
                return this.emit( 'update-file-request', mess as RS_N_Messages_C.UpdateFileRequest );

            default:
                return false;
        }
    }
}

export declare interface RS_C_UserServer
{
    emit ( event: 'error', data: Error ): boolean;
    on ( event: 'error', listener: ( data: Error ) => void ): this;

    emit ( event: 'join-request', data: RS_N_Messages_C.JoinRequest ): boolean;
    on ( event: 'join-request', listener: ( data: RS_N_Messages_C.JoinRequest ) => void ): this;

    emit ( event: 'leave-report', data: RS_N_Messages_C.LeaveReport ): boolean;
    on ( event: 'leave-report', listener: ( data: RS_N_Messages_C.LeaveReport ) => void ): this;

    emit ( event: 'add-file-request', data: RS_N_Messages_C.AddFileRequest ): boolean;
    on ( event: 'add-file-request', listener: ( data: RS_N_Messages_C.AddFileRequest ) => void ): this;

    emit ( event: 'rem-file-request', data: RS_N_Messages_C.RemFileRequest ): boolean;
    on ( event: 'rem-file-request', listener: ( data: RS_N_Messages_C.RemFileRequest ) => void ): this;

    emit ( event: 'update-file-request', data: RS_N_Messages_C.UpdateFileRequest ): boolean;
    on ( event: 'update-file-request', listener: ( data: RS_N_Messages_C.UpdateFileRequest ) => void ): this;
}
