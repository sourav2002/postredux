import axios from "axios";
import React from "react";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
// // import { useDispatch } from "react-redux";

// import {reactionAdded} from "./postsSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
};

export const ReactionButton = ({ post }) => {
//   // const dispatch = useDispatch();
const navigate = useNavigate()
const [user,setUser]=useState()
const [reactions , setReactions] = useState()
 const getLikes = async()=>{
  const get = await axios.get('http://localhost:5000/post',{
    params:{
      id : post._id
    }
  }).then((e)=>{
    const user = e.data
   setUser(user)
  setReactions(user.reactions)
  })
 
 }
 useEffect(()=>{getLikes()},[])
 
    const reactionHandler = async(name,id) => {
      
      const {reactions} = user
      const tale = reactions[name]++
      setReactions({...reactions , [name]:tale})
      const v = reactions[name]
     setReactions({...reactions , [name] : v })
      const data = {
       reactions : reactions
      }
          
     const saveLikes = await axios.patch(`http://localhost:5000/posts/likes`, {
      data : {
        id, reactions  
      }
     })
  .then((e)=>{
   const raw = e.data
   const message = raw.success
 if(!message)window.alert("Unable to like the post")
  })

}
  
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    const id = post._id
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button shadow-sm px-2 py-1 mb-8 text-xl border border-dotted mr-4"
        onClick={() =>reactionHandler(name,id)}
      >
        {emoji} {reactions?reactions[name]:post.reactions[name]}
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};
export default ReactionButton;
