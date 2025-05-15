import * as Action from './Action';
import store from '../../store';

const postsObj={
 getAllPosts: ()=>store.dispatch(Action.getAllPosts()),
 createPost:(postData)=>store.dispatch(Action.createPost(postData)),
}

export default postsObj;