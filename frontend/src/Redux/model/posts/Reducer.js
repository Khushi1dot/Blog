import * as CONSTANT from './constant';

const initialState={
    data:[],
    post:null,
}
const postReducer=(state=initialState,action)=>{
    switch(action.type){
        case CONSTANT.GET_ALL_POSTS:
            return {
                ...state,
                data:action.payload
            };
            case CONSTANT.CREATE_POST:
                return{
                    ...state,
                    post:action.payload,
                }
            default:
            return state;
    }
}

export default postReducer;