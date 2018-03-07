import { RS_C_UserClient } from './rs-client-user';
import * as CONST from '../const';

export class RSClient 
{
    public user: RS_C_UserClient = new RS_C_UserClient( this.userName );

    public joined: boolean = false;

    constructor (
        public log: {
            info: ( str: string ) => any,
            warn: ( str: string ) => any,
            error: ( str: any ) => any
        } = { info: () => { }, warn: () => { }, error: () => { }, },
        public userName: string = CONST.USER.DEFAULT_USERNAME,
    ) { }

    public join ( host: string, port: number )
    {
        return this.user.join( host, port );
    }
}