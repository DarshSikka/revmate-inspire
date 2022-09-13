import React, {useState} from 'react';
import '../newdic.css'
// process.env.REACT_APP_API_KEY
/* `dictation/dictationsforuser/${localStorage.getItem("userid")}`
*/
/*
*/
export default function NewDictation(props){
  const [dictation, setDictation]=useState([]);
  const [nam, setNam]=useState("");
  const [pub, setPub]=useState(false);
  const [brute, setBrute]=useState(0);
  //Make an Object with a data key and public key
  // In data there is an array of objects
  // Every object has question key and answer key
  // Every time form is submitted, add on object to this and clear the form
  // Keep a checkbox for whether this is public or no
  if(props.getUser()==="guest"){
    return "You need to be signed in";
  }
  const questionAdd=(e)=>{
    e.preventDefault();
    const [question, answer]=e.target;
    const currentDic=dictation;
    const updatedDic=[...currentDic, {question:question.value, answer:answer.value}];
    setDictation(updatedDic);
    e.target[0].value="";
    e.target[1].value="";
  }
  const delete_question=(index)=>{
          let current_question_answer=dictation;
          if(index===0){
            current_question_answer.shift();
          }
          else{
          current_question_answer.splice(index, index);
          }
          setDictation([...current_question_answer]);
  }
      return(
        <>
        <h1>Make a new dictation</h1>
        <label>Name </label>
        <input placeholder="name"type="text" value={nam} onChange={e=>{
          setNam(e.target.value);
        }} />
       <form onSubmit={questionAdd}> 
       <br/>
       <label>Question </label>
        <input type="text" required placeholder="Questions"/>
        <br/>
         <br/>
         <label>Answer </label>
        
        <input type="text" required placeholder="Answer"/>
        <br/>
        <input className="n" type="submit" />
        
        </form><br /><br />
        <label>Public</label>
        <input checked={pub}type="checkbox" onChange={(e)=>{
          setPub(e.target.checked);
          console.log(pub);
        }}/>
        <div class="questions">
        {dictation.map((ele, index)=>(<>
        <p>Question:{ele.question}<br />Answer:{ele.answer}</p><button onClick={()=>delete_question(index)}>Delete this question</button><br /></>
        ))
        }
        <button onClick={()=>{
          fetch(`${process.env.REACT_APP_API_KEY}/dictation/new`, {
            method:"POST",
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({
              publiclyVisible:pub,
              name:nam,
              createdBy:props.getUser().username,
              dicData:dictation
            })
          }).then(res=>res.json()).then(resp=>window.location="/");
        }
        }>Save</button>
        </div>
        </>
      )
}