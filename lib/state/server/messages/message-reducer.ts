import
{
    RS_E_Mess_ActionTypes_S as actT,
    RS_I_Mess_Actions_S as actO,
} from './message-actions';

export interface RS_I_MessagesState_S 
{
    messageList: any[];

    newMessages: any[];
    inProgMessages: any[];
    completedMessages: any[];

    outGoingMessages: any[];
}

export default function RS_F_MessagesReducer_S(
    state: RS_I_MessagesState_S = {
        messageList: [],
        newMessages: [],
        inProgMessages: [],
        completedMessages: [],
        outGoingMessages: [],
    },
    act: actO.Base
)
{
    switch( act.type )
    {
        default:
            return state;
    }
}