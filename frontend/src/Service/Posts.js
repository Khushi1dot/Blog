import { API_ENDPOINTS } from "./Endpoint";
import axios from "axios";
import { ResponseEnum } from "./constant";
const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const GetAllPosts = async () => {
  try {
    const url = `${REACT_APP_API_BASE_URL}${API_ENDPOINTS.GET_ALL_POST}`;
console.log(url);
    const response = await axios.get(url);
    console.log(response.data, "response");
    if (response.data.success === ResponseEnum.SUCCESS) {
      return response.data;
    } else {
      return response.data;
    }
  } catch (error) {
    console.error("Getting all post Error:", error);
    return { success: false, message: error.message };
  }
};


export const Create_Post = async (postData, token) => {
  try {
    console.log('creating post')
    const url = `${REACT_APP_API_BASE_URL}${API_ENDPOINTS.CREATE_POST}`;
    console.log(url);
    const response = await axios.post(url, postData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        
      },
    });
    console.log("Post creation response:", response);

    if (response.data.success === ResponseEnum.SUCCESS) {
         console.log(response.data,'success to create post');
      return response.data; 
    } else {
      console.log(response.data,'failed to create post');
      return response.data;
    }
  } catch (error) {
    console.error("Creating post Error:", error);
    return { success: false, message: error.message };
  }
};
