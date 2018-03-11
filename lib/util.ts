import
{
    RS_E_MessageTypes_C as cT,
    RS_E_MessageTypes_S as sT,
    RS_N_Messages_C as cM,
    RS_N_Messages_S as sM,
} from './rs-messages';

export namespace U_SafeJSON
{
    export function parse<T = any>( str: string, def: T | null = null ): T | null
    {
        try { return JSON.parse( str ) as T; }
        catch ( e ) { return def; }
    }

    export function stringify ( obj: any, prettyPrint: boolean = false ): string
    {
        return JSON.stringify( obj, void 0, prettyPrint ? ' ' : void 0 );
    }
}

export namespace U_MessageBuilder_C
{
    export const baseObj = ( type: cT ): cM.BaseRequest => ( { type } );

    
}

export namespace U_MessageBuilder_S 
{
    export const baseObj = ( type: sT ): sM.BaseResponse => ( { type } );
}