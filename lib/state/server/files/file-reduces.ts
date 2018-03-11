import { RS_C_File, RS_T_FileID } from '../../../rs-file-base';
import
{
    RS_E_File_ActionTypes_S as fT,
    RS_I_File_Actions_S as fO,
} from './file-actions';

export interface RS_I_FilesState 
{
    fileList: RS_C_File[];
    rootFile: RS_T_FileID | null;

    openFiles: RS_T_FileID[];
}

export default function RS_F_FilesReducer (
    state: RS_I_FilesState = {
        fileList: [],
        rootFile: null,
        openFiles: [],
    },
    act: fO.Base,
)
{
    switch ( act.type )
    {
        case fT.FILE_ADD_FILES:
            {
                let { files } = act as fO.AddFiles;
                return Object.assign( {}, state, {
                    fileList: [ ...state.fileList, ...files ],
                } as RS_I_FilesState );
            }
        case fT.FILE_SET_FILES:
            {
                let { fileDetails } = act as fO.SetFiles;
                return Object.assign( {}, state, {

                } as RS_I_FilesState );
            }
        case fT.FILE_REM_FILES:
            {
                let { fileIDs } = act as fO.RemFiles;
                return Object.assign( {}, state, {
                    fileList: state.fileList.filter( f => fileIDs.indexOf( f.id ) === -1 ),
                } as RS_I_FilesState );
            }
        case fT.FILE_SET_OPEN:
            {
                let { setOpen } = act as fO.SetOpen;

                let openF = setOpen.filter( oF => oF.open ).map( oF => oF.fileID );
                let closeF = setOpen.filter( oF => !oF.open ).map( oF => oF.fileID );

                return Object.assign( {}, state, {
                    openFiles: [ ...state.openFiles.filter( fID => closeF.indexOf( fID ) === -1 ), openF ],
                } as RS_I_FilesState );
            }
        default:
            return state;
    }
}