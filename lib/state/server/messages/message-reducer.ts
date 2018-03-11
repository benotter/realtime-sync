import { RS_T_Message, RS_T_MessageID } from '../../../rs-messages';
import
{
    RS_E_Mess_ActionTypes_S as actT,
    RS_I_Mess_Actions_S as actO,
} from './message-actions';

export interface RS_I_MessagesState_S 
{
    messageList: RS_T_Message[];

    newMessages: RS_T_MessageID[];

    inProgMessages: RS_T_MessageID[];

    completedMessages: RS_T_MessageID[];

    outGoingMessages: RS_T_Message[];
}

export default function RS_F_MessagesReducer_S (
    state: RS_I_MessagesState_S = {
        messageList: [],

        newMessages: [],
        inProgMessages: [],
        completedMessages: [],
        outGoingMessages: [],
    },
    act: actO.Base
): RS_I_MessagesState_S
{
    switch ( act.type )
    {
        case actT.MESS_ADD_NEW:
            {
                let { messages } = act as actO.AddNew;
                return Object.assign( {}, state, {
                    messageList: [ ...state.messageList, ...messages ],
                    newMessages: [ ...state.newMessages, ...messages.map( m => m.id ) ],
                } as RS_I_MessagesState_S );
            }

        case actT.MESS_SET_IN_PROG:
            {
                let { messIDs } = act as actO.SetInProg;
                return Object.assign( {}, state, {
                    newMessages: state.newMessages.filter( mID => messIDs.indexOf( mID ) === -1 ),
                    inProgMessages: [ ...state.inProgMessages, ...messIDs ],
                } as RS_I_MessagesState_S );
            }
        case actT.MESS_SET_COMPLETE:
            {
                let { messIDs } = act as actO.SetComplete;
                return Object.assign( {}, state, {
                    newMessages: state.newMessages.filter( mID => messIDs.indexOf( mID ) === -1 ),
                    inProgMessages: state.inProgMessages.filter( mID => messIDs.indexOf( mID ) === -1 ),
                    completedMessages: [ ...state.completedMessages, ...messIDs ],
                } as RS_I_MessagesState_S );
            }
        case actT.MESS_CLEAR_COMPLETED:
            {
                return Object.assign( {}, state, {
                    messageList: state.messageList.filter(
                        m => state.completedMessages.indexOf( m.id ) === -1
                    ),
                    completedMessages: [] as RS_T_MessageID[],
                } as RS_I_MessagesState_S );
            }

        case actT.MESS_ADD_OUTGOING:
            {
                let { messages } = act as actO.AddOutGoing;
                return Object.assign( {}, state, {
                    outGoingMessages: [ ...state.outGoingMessages, ...messages ],
                } as RS_I_MessagesState_S );
            }
        case actT.MESS_CLEAR_OUTGOING:
            {
                return Object.assign( {}, state, {
                    outGoingMessages: [] as RS_T_Message[],
                } as RS_I_MessagesState_S );
            }
            
        default:
            return state;
    }
}