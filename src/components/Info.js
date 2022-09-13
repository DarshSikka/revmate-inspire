import React from 'react';
import {useParams} from 'react-router-dom';
export default function Info(){
  const {id}=useParams();
  const [userProfile, setUserProfile]=React.useState("");
  const [dic, setDic]=React.useState({});
  fetch(`${process.env.REACT_APP_API_KEY}/dictation/dictation/${id}`).then(result=>result.json()).then(res=>{
    if(!res.error){
      setDic(res)
      fetch(`${process.env.REACT_APP_API_KEY}/auth/profile?user=${res.createdBy}`).then(resp=>resp.text()).then(res=>{setUserProfile(res);console.log(res);});
    }}
    );
  return (
     <div>
     <h2>
     <code>{dic.name}</code> Brought to you by <code>{dic.createdBy}</code>
     </h2>
     <a href={`/dictation/${dic._id}`}><img src={userProfile} /></a>
     <h4>Note: Click on the users profile to take the quiz</h4>
     </div>
  )
}