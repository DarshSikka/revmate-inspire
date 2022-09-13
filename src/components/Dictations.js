import React from 'react';
import '../dic.css'
export default function Dictations(props){
  return(
      <div><div class="dic">
      <h1>New Dictation</h1>
    </div>
    <div class="greeting">
    <img src={props.getUser().profile || "https://www.booksie.com/files/profiles/22/mr-anonymous_230x230.png"} />
      <h2>
        Hey {props.getUser().username || "Guest"}, <br />
        What would you like to learn today?
      </h2>
      <a href="/newdic">
      <button className="newdic">
      New Dictation
      </button><br />
      {
        props.yourDics.map(ele=>{
          return (
            <center>
            <a href={`https://revmate.darshsikka.repl.co/dictation/${ele._id}`}><button className="list">{`${ele.name}`}</button></a>
            </center>
          )
        })
      }
      </a>
      
    </div></div>
  )
}