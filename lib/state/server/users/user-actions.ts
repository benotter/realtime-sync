import { RS_T_UserID, RS_C_User_B } from '../../../rs-user-base';
export enum RS_E_User_ActionTypes_S 
{
    ADD_USER = "USER_ADD_USER",
    RETIRE_USER = "USER_RETIRE_USER",
    REM_USER = "USER_REM_USER",
}
export namespace RS_I_User_Actions_S 
{
    export type Base = { type: RS_E_User_ActionTypes_S };
    export type AddUser = Base & {
        user: RS_C_User_B,
    };
    export type RetireUser = Base & {
        userID: RS_T_UserID,
    };
    export type RemUser = Base & {
        userID: RS_T_UserID,
    };

}
export namespace RS_N_User_Actions_S
{
    export const addUser = (user: RS_C_User_B ): RS_I_User_Actions_S.AddUser =>
        ({
            type: RS_E_User_ActionTypes_S.ADD_USER,
            user,
        });
    export const retireUser = ( userID: RS_T_UserID ): RS_I_User_Actions_S.RetireUser =>
        ({
            type: RS_E_User_ActionTypes_S.RETIRE_USER,
            userID,
        });
    export const remUser = (userID: RS_T_UserID ): RS_I_User_Actions_S.RemUser =>
        ({
            type: RS_E_User_ActionTypes_S.REM_USER,
            userID,
        });
}