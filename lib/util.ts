import * as uuid from 'uuid';
import
{
    RS_T_Message,
    RS_T_MessageID,
    RS_E_MessageTypes,
    RS_N_Messages,
} from './rs-messages';
import { } from './rs-messages';

export namespace U_SafeJSON
{
    export function parse<T = any>( str: string, def: T | null = null ): T | null
    {
        try { return JSON.parse( str ) as T; }
        catch ( e ) { return def; }
    }

    export function stringify ( obj: any, prettyPrint: boolean = false ): string
    {
        return JSON.stringify( obj, void 0, prettyPrint ? '    ' : void 0 );
    }
}

export namespace U_MessageBuilder
{
    export const baseObj = (
        type: RS_E_MessageTypes,
        id: RS_T_MessageID = uuid.v4(),
        payload: any = {}
    ): RS_T_Message => ( {
        id,
        type,
        payload,
    } );


}
