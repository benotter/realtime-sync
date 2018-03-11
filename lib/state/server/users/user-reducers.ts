import { RS_T_UserID, RS_C_User_B } from '../../../rs-user-base';
import { 
    RS_E_User_ActionTypes_S as uT,
    RS_I_User_Actions_S as uO,
} from './user-actions';

export interface RS_I_UserState_S 
{
    userList: RS_C_User_B[],

    retiredUsers: RS_T_UserID[],
}

export default function RS_F_Users_Reducer(
    state: RS_I_UserState_S = {
        userList: [],
        retiredUsers: [],
    },
    act: uO.Base,
)
{
    switch( act.type )
    {
        case uT.ADD_USER:
        case uT.RETIRE_USER:
        case uT.REM_USER:
        default:
            return state;
    }
}