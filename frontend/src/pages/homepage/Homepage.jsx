import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";
import { useEffect, useState } from "react";
import { injectModels } from "../../Redux/injectModel";

function Homepage(props) {

  const [data,setData] = useState([])
  async function  getAllPost(){
    try{
      const response = await props.posts.getAllPosts(); 
      console.log(response);
      setData(response);
     }
    catch(error){
      console.log('Fails to give data',error);
    }
  }
    useEffect(()=>{
      getAllPost();
    },[])
  
  return (
    <>
      <Header />
      <div className="home">
        <Posts data={data}/>
        <Sidebar />
      </div>
    </>
  );
}

export default injectModels(['posts'])(Homepage);