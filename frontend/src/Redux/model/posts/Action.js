import { Posts } from "../../../Service/index";
import * as CONSTANT from "./constant";

export const getAllPosts = () => async (dispatch) => {
  try {
    const response = await Posts.GetAllPosts();
    console.log(response, "response");
    if (response.success) {
      console.log(response);
      dispatch({
        type: CONSTANT.GET_ALL_POSTS,
        payload: response.data,
      });
      return response;
    } else {
      return response;
    }
  } catch (error) {
    console.log(error, "res is not success");
  }
};



export const createPost = (postData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await Posts.Create_Post(postData, token);
    console.log("Creating Post Response:", response);

    if (response.token && response.user) {
      const { user, token } = response;
      console.log(token, 'token');
      console.log(user, 'user');

      dispatch({
        type: CONSTANT.CREATE_POST,
        payload: { user, token },
      });
      return response;
    } else {
      return response;
    }
  } catch (error) {
    console.log(error, "issue in creating post");
    return { success: false, message: error.message };
  }
};
