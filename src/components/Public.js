import React from 'react';
import "./published.css"
export default function PublicDics(){
  const [dics, setDics]=React.useState([]);
  fetch(`${process.env.REACT_APP_API_KEY}/dictation/public`).then(resp=>resp.json().then(res=>setDics(res)));
  React.useEffect(()=>{
  console.log(dics);
   })
  return (
    <div className="pub">
    {dics.map(ele=>{return (
      <a href={`/info/${ele._id}`}><button>{ele.name}</button></a>)})}
    </div>
  )
}