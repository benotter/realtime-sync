import 
{
    CONST,
    RSUserClient,
} from '../lib';

export class RSClient 
{
    public user: RSUserClient = new RSUserClient( this.userName );

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