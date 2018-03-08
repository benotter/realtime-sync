import * as readline from 'readline';
import * as CONST from './lib/const';
import { RS_C_Server, RS_C_Client } from './index';

const enum ProgMode 
{
    NotSet,
    Server,
    Client,
}

export function main ( argv: string[] )
{
    let args = argv.slice( 2 );

    let MODE = ProgMode.NotSet,
        PORT = CONST.DEFAULTS.PORT,
        HOST = CONST.DEFAULTS.SERVER.HOST,
        USERNAME: string | null = null,
        USER_ID: string | null = null;

    if ( args.length === 0 )
        return exitBad( "Must at least provide Mode arg, 'server' or 'client' " );

    else if ( args[ 0 ].toLowerCase() === CONST.PROG.ARGS.SERVER_MODE )
    {
        MODE = ProgMode.Server;
        args.shift();
    }
    else if ( args[ 0 ].toLocaleLowerCase() === CONST.PROG.ARGS.CLIENT_MODE )
    {
        MODE = ProgMode.Client;
        args.shift();
    }
    else
        return exitBad( "First Arg must be Mode, 'server' or 'client'" );


    for ( let argI in args as { [ argI: number ]: any } )
    {
        let arg = args[ argI ];

        switch ( arg )
        {
            case CONST.PROG.ARGS.PORT:
                PORT = parseInt( args[ parseInt( argI ) + 1 ] );
                break;

            case CONST.PROG.ARGS.HOST:
                HOST = args[ parseInt( argI ) + 1 ];
                break;

            case CONST.PROG.ARGS.CLIENT_USERNAME:
                USERNAME = args[ parseInt( argI ) + 1 ];
                break;

            case CONST.PROG.ARGS.CLIENT_ID:
                USER_ID = args[ parseInt( argI ) + 1 ];
                break;

            default:
                continue;
        }
    }

    if ( MODE === ProgMode.Server )
        return startServer( PORT, HOST );
    else
        return startClient( PORT, HOST, USERNAME, USER_ID );

}

function exitBad ( mess: string | any | void = void 0 )
{
    if ( mess !== void 0 )
        console.log( mess );

    process.exit( 1 );
}

function exitGood ( mess: string | void = void 0 )
{
    if ( mess !== void 0 )
        console.log( mess );

    process.exit( 0 );
}

function startServer ( port: number, host: string )
{
    
}

function startClient ( port: number, host: string | "", userName: string | null, id: string | null ): any
{
    const rl = readline.createInterface( {
        input: process.stdin,
        output: process.stdout,
    } );

    if ( host === "" )
        return rl.question( CONST.STRING.INPUT.GET_HOST, ( answer ) => 
        {
            if ( answer === "" || answer === null || answer === void 0 )
                return exitBad( "Must Enter Valid Hostname!" );
            else
                return startClient( port, answer, userName, id );
        } );

    if ( !userName )
        return rl.question( CONST.STRING.INPUT.GET_USERNAME, ( answer ) => 
        {
            if ( answer === "" || answer === null || answer === void 0 )
                return exitBad( "Must Enter Valid Username!" );
            else
                return startClient( port, host, answer, id );
        } );

    rl.close();
}