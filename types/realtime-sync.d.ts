declare module '@otter-co/realtime-sync/lib/util' {
	export namespace U_SafeJSON {
	    function parse<T = any>(str: string, def?: T | null): T | null;
	    function stringify(obj: any, prettyPrint?: boolean): string;
	}

}
declare module '@otter-co/realtime-sync/lib/rs-file-base' {
	/// <reference types="node" />
	import { RS_T_UserID } from '@otter-co/realtime-sync/lib/rs-user-base';
	export type RS_T_FileID = string;
	export enum RS_E_FileType {
	    File = 0,
	    Dir = 1,
	}
	export class RS_C_File {
	    type: RS_E_FileType;
	    fileName: string;
	    parent: RS_T_FileID | null;
	    id: RS_T_FileID;
	    isRoot: boolean;
	    contents?: string | Buffer;
	    owner?: RS_T_UserID;
	    children?: RS_T_FileID[];
	    constructor(type?: RS_E_FileType, fileName?: string, parent?: RS_T_FileID | null, id?: RS_T_FileID);
	}

}
declare module '@otter-co/realtime-sync/lib/rs-user-base' {
	/// <reference types="node" />
	import { EventEmitter } from 'events';
	import * as net from 'net';
	import { RS_T_FileID } from '@otter-co/realtime-sync/lib/rs-file-base';
	export type RS_T_UserID = string;
	export class RS_C_UserBase extends EventEmitter {
	    userName: string;
	    isServer: boolean;
	    socket: net.Socket;
	    id: RS_T_UserID;
	    host: boolean;
	    ownedFiles: RS_T_FileID[];
	    openFiles: RS_T_FileID[];
	    constructor(userName?: string, isServer?: boolean, socket?: net.Socket, id?: RS_T_UserID);
	    connect(port: number, host?: string): void;
	    send(sendObj: any): void;
	    handleMessage(mess: any): void;
	}

}
declare module '@otter-co/realtime-sync/lib/rs-messages' {
	import { RS_C_File } from '@otter-co/realtime-sync/lib/rs-file-base';
	export enum RS_E_ClientMessageType {
	    Base = 0,
	    Leave_Report = 1,
	    Join_Request = 2,
	    AddFile_Request = 3,
	    RemFile_Request = 4,
	    UpdateFile_Request = 5,
	}
	export namespace RS_N_Messages_C {
	    interface Base {
	        type: RS_E_ClientMessageType;
	    }
	    interface LeaveReport extends Base {
	        userID: string;
	    }
	    interface JoinRequest extends Base {
	        userID: string;
	        userName: string;
	    }
	    interface AddFileRequest extends Base {
	        userID: string;
	        file?: RS_C_File;
	        files?: RS_C_File[];
	        parentID?: string;
	    }
	    interface RemFileRequest extends Base {
	        userID: string;
	        fileID: string;
	    }
	    interface UpdateFileRequest extends Base {
	        userID: string;
	        fileID: string;
	    }
	}
	export enum RS_E_ServerMessageType {
	    Base = 0,
	    Join_Response = 1,
	    AddFile_Response = 2,
	    RemFile_Response = 3,
	    UpdateFile_Response = 4,
	    Blast_OnJoin = 5,
	    Blast_OnLeave = 6,
	    Blast_FileAdded = 7,
	    Blast_FileRemoved = 8,
	    Blast_FileUpdated = 9,
	}
	export namespace RS_N_Messages_S {
	    interface Base {
	        type: RS_E_ServerMessageType;
	    }
	    interface JoinResponse extends Base {
	        success: boolean;
	        message?: string;
	        serverName?: string;
	        userList?: string[];
	    }
	    interface AddFileReponse extends Base {
	    }
	    interface RemFileResponse extends Base {
	    }
	    interface UpdateFileResponse extends Base {
	    }
	    interface Blast_OnJoin extends Base {
	    }
	    interface Blast_OnLeave extends Base {
	    }
	    interface Blast_OnFileAdded extends Base {
	    }
	    interface Blast_OnFileRemoved extends Base {
	    }
	    interface Blast_OnFileUpdated extends Base {
	    }
	}

}
declare module '@otter-co/realtime-sync/lib/rs-server/rs-server-user' {
	/// <reference types="node" />
	import * as net from 'net';
	import { RS_N_Messages_C } from '@otter-co/realtime-sync/lib/rs-messages';
	import { RS_C_UserBase } from '@otter-co/realtime-sync/lib/rs-user-base';
	export class RS_C_UserServer extends RS_C_UserBase implements RS_C_UserServer {
	    joined: boolean;
	    disconnected: boolean;
	    constructor(socket: net.Socket);
	    handleMessage(mess: RS_N_Messages_C.Base): boolean;
	}
	export interface RS_C_UserServer {
	    emit(event: 'error', data: Error): boolean;
	    on(event: 'error', listener: (data: Error) => void): this;
	    emit(event: 'join-request', data: RS_N_Messages_C.JoinRequest): boolean;
	    on(event: 'join-request', listener: (data: RS_N_Messages_C.JoinRequest) => void): this;
	    emit(event: 'leave-report', data: RS_N_Messages_C.LeaveReport): boolean;
	    on(event: 'leave-report', listener: (data: RS_N_Messages_C.LeaveReport) => void): this;
	    emit(event: 'add-file-request', data: RS_N_Messages_C.AddFileRequest): boolean;
	    on(event: 'add-file-request', listener: (data: RS_N_Messages_C.AddFileRequest) => void): this;
	    emit(event: 'rem-file-request', data: RS_N_Messages_C.RemFileRequest): boolean;
	    on(event: 'rem-file-request', listener: (data: RS_N_Messages_C.RemFileRequest) => void): this;
	    emit(event: 'update-file-request', data: RS_N_Messages_C.UpdateFileRequest): boolean;
	    on(event: 'update-file-request', listener: (data: RS_N_Messages_C.UpdateFileRequest) => void): this;
	}

}
declare module '@otter-co/realtime-sync/lib/const' {
	export namespace NETWORK {
	    const DEFAULT_PORT: number;
	}
	export namespace USER {
	    const DEFAULT_USERNAME = "";
	}
	export namespace FILE {
	    const DEFAULT_FILENAME: string;
	}
	export namespace LOG {
	    const SERVER_START: string;
	    const SERVER_STOP = "";
	    const SERVER_ERROR = "";
	}
	export namespace STRING {
	    const ERROR: {
	        JOIN_USER_ID_EXISTS: string;
	        USERID_ID_DOESNT_MATCH: string;
	        USERCLIENT_ALREADY_CONNECTED: string;
	    };
	}

}
declare module '@otter-co/realtime-sync/lib/rs-server/rs-server' {
	/// <reference types="node" />
	import * as net from 'net';
	import { EventEmitter } from 'events';
	import { RS_N_Messages_S, RS_N_Messages_C } from '@otter-co/realtime-sync/lib/rs-messages';
	import { RS_C_File } from '@otter-co/realtime-sync/lib/rs-file-base';
	import { RS_C_UserServer } from '@otter-co/realtime-sync/lib/rs-server/rs-server-user';
	export class RS_C_Server extends EventEmitter {
	    log: {
	        info: (str: string) => any;
	        warn: (str: string) => any;
	        error: (str: any) => any;
	    };
	    port: number;
	    host: string | undefined;
	    server: net.Server;
	    readonly serverStarted: boolean;
	    userList: RS_C_UserServer[];
	    fileList: RS_C_File[];
	    constructor(log?: {
	        info: (str: string) => any;
	        warn: (str: string) => any;
	        error: (str: any) => any;
	    }, port?: number, host?: string | undefined);
	    start(): Promise<{}>;
	    stop(): Promise<{}>;
	    blast(mess: RS_N_Messages_S.Base): void;
	    private handleError(err);
	    private handleNewUser(soc);
	    onJoinRequest(user: RS_C_UserServer, mess: RS_N_Messages_C.JoinRequest): void;
	    onLeaveReport(user: RS_C_UserServer): void;
	    onAddFileReq(user: RS_C_UserServer, mess: RS_N_Messages_C.AddFileRequest): void;
	    onRemFileReq(user: RS_C_UserServer, mess: RS_N_Messages_C.RemFileRequest): void;
	    onUpdateFileReq(user: RS_C_UserServer, mess: RS_N_Messages_C.UpdateFileRequest): void;
	}

}
declare module '@otter-co/realtime-sync/lib/rs-client/rs-client-user' {
	import { RS_C_UserBase } from '@otter-co/realtime-sync/lib/rs-user-base';
	import { RS_N_Messages_S } from '@otter-co/realtime-sync/lib/rs-messages';
	export class RS_C_UserClient extends RS_C_UserBase implements RS_C_UserBase {
	    connected: boolean;
	    constructor(userName: string, id?: string | void);
	    join(host: string, port: number): Promise<{}>;
	    leave(): Promise<{}>;
	    private onConnect();
	    private onData(data);
	    handleMessage(mess: RS_N_Messages_S.Base): boolean | undefined;
	}
	export interface RS_C_UserClient {
	    emit(event: 'error', data: Error): boolean;
	    on(event: 'error', listener: (data: Error) => void): this;
	    on(event: "join-response", listener: (mess: RS_N_Messages_S.JoinResponse) => void): this;
	    emit(event: "join-response", data: RS_N_Messages_S.JoinResponse): boolean;
	    on(event: "add-file-response", listener: (mess: RS_N_Messages_S.AddFileReponse) => void): this;
	    emit(event: "add-file-response", data: RS_N_Messages_S.AddFileReponse): boolean;
	    on(event: "rem-file-response", listener: (mess: RS_N_Messages_S.RemFileResponse) => void): this;
	    emit(event: "rem-file-response", data: RS_N_Messages_S.RemFileResponse): boolean;
	    on(event: "update-file-response", listener: (mess: RS_N_Messages_S.UpdateFileResponse) => void): this;
	    emit(event: "update-file-response", data: RS_N_Messages_S.UpdateFileResponse): boolean;
	    on(event: "blast-on-join", listener: (mess: RS_N_Messages_S.Blast_OnJoin) => void): this;
	    emit(event: "blast-on-join", data: RS_N_Messages_S.Blast_OnJoin): boolean;
	    on(event: "blast-on-leave", listener: (mess: RS_N_Messages_S.Blast_OnLeave) => void): this;
	    emit(event: "blast-on-leave", data: RS_N_Messages_S.Blast_OnLeave): boolean;
	    on(event: "blast-file-added", listener: (mess: RS_N_Messages_S.Blast_OnFileAdded) => void): this;
	    emit(event: "blast-file-added", data: RS_N_Messages_S.Blast_OnFileAdded): boolean;
	    on(event: "blast-file-removed", listener: (mess: RS_N_Messages_S.Blast_OnFileRemoved) => void): this;
	    emit(event: "blast-file-removed", data: RS_N_Messages_S.Blast_OnFileRemoved): boolean;
	    on(event: "blast-file-updated", listener: (mess: RS_N_Messages_S.Blast_OnFileUpdated) => void): this;
	    emit(event: "blast-file-updated", data: RS_N_Messages_S.Blast_OnFileUpdated): boolean;
	}

}
declare module '@otter-co/realtime-sync/lib/rs-client/rs-client' {
	/// <reference types="node" />
	import { EventEmitter } from 'events';
	import { RS_C_UserClient } from '@otter-co/realtime-sync/lib/rs-client/rs-client-user';
	export class RS_C_Client extends EventEmitter {
	    userName: string;
	    id: string | void;
	    user: RS_C_UserClient;
	    joined: boolean;
	    constructor(userName?: string, id?: string | void);
	    join(host: string, port: number): Promise<{}>;
	    private handleError(err);
	    private handleJoinReponse(mess);
	    private handleAddFileResponse(mess);
	    private handleRemFileResponse(mess);
	    private handleUpdateFileReponse(mess);
	    private handleBlast_OnJoin(mess);
	    private handleBlast_OnLeave(mess);
	    private handleBlast_OnFileAdded(mess);
	    private handleBlast_OnFileRemoved(mess);
	    private handleBlast_FileUpdated(mess);
	}

}
declare module '@otter-co/realtime-sync/index' {
	export * from '@otter-co/realtime-sync/lib/util';
	export * from '@otter-co/realtime-sync/lib/rs-user-base';
	export * from '@otter-co/realtime-sync/lib/rs-file-base';
	export * from '@otter-co/realtime-sync/lib/rs-messages';
	export * from '@otter-co/realtime-sync/lib/rs-server/rs-server';
	export * from '@otter-co/realtime-sync/lib/rs-server/rs-server-user';
	export * from '@otter-co/realtime-sync/lib/rs-client/rs-client';
	export * from '@otter-co/realtime-sync/lib/rs-client/rs-client-user';

}
