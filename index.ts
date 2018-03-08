export * from './lib/util';

export * from './lib/rs-user-base';
export * from './lib/rs-file-base';

export * from './lib/rs-messages';

export * from './lib/rs-server/rs-server';
export * from './lib/rs-server/rs-server-user';

export * from './lib/rs-client/rs-client';
export * from './lib/rs-client/rs-client-user';

import * as CONST from './lib/const';

if ( require.main === module )
    main( process.argv );

const enum ProgMode 
{
    NotSet,
    Server,
    Client,
}

function main ( argv: string[] )
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
            case CONST.PROG.ARGS.SERVER_HOST:
                HOST = args[ parseInt( argI ) + 1 ];
                break;
            case CONST.PROG.ARGS.CLIENT_USERNAME:
                USERNAME = args[ parseInt( argI ) + 1 ];
                break;
            case CONST.PROG.ARGS.CLIENT_ID:
                USER_ID = args[ parseInt( argI ) + 1 ];
            default:
                continue;
        }
    }

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

function startServer()
{

}

function startClient()
{
    
}