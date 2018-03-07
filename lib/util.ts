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