import store from "../../store";
import * as Action from "./Action";

// authObj is an object that has a logi method, which dispatches the login action from the action.js file
// to the Redux store.
const authObj = {
  login: (object) => store.dispatch(Action.login(object)),
  register:(object)=> store.dispatch(Action.register(object)),
  logout: () =>store.dispatch(Action.logout()),
  update:(updateData)=>store.dispatch(Action.updateUser(updateData)),
  getUser:()=>store.dispatch(Action.getUser()),
};

export default authObj;
