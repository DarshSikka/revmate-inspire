import React, {useState} from 'react';
console.log(process.env.REACT_APP_API_KEY);
export default function Signup(props){
  const [msg, setMsg]=useState({});
  const exec=(e)=>{
  e.preventDefault();
  const [username, password, confirm, profile]=e.target;
  if(confirm.value!=password.value){
    return setMsg({color:"red", err:"Passwords don't match"})
  }
  const reader=new FileReader();
  reader.onload=(e)=>{
    const uri=e.target.result;
    fetch(`${process.env.REACT_APP_API_KEY}/auth/signup`, {method:"POST",
    headers:{
        'Content-Type':"application/json"
    }, body:JSON.stringify({
        username:username.value,
        password:password.value,
        profile:uri
    })}).then(resp=>resp.json()).then(res=>
    {
      console.log(res);
      if(res.error){
        setMsg({color:"red", err:res.message})
      }
      else{
        setMsg({color:"green", err:res.message})
      }
    });
    
  }
  if(profile.files.length>0){
  reader.readAsDataURL(profile.files[0]);
  }
  else{
    fetch(`${process.env.REACT_APP_API_KEY}/auth/signup`, {method:"POST",
    headers:{
        'Content-Type':"application/json"
    }, body:JSON.stringify({
        username:username.value,
        password:username.value,
        profile:"https://www.booksie.com/files/profiles/22/mr-anonymous_230x230.png"
    })}).then(resp=>resp.json()).then(res=>{
      if(res.error){
        setMsg({color:"red", err:res.message});
      }
      else{
        setMsg({color:"green", err:res.message});
      }
    });
  }
}
  return(
    <>
    <form onSubmit={exec} className="signup">
      <h1>Sign up</h1>
      <span><label htmlFor="username">Username:</label><input name="username" required className="forminput"/></span>
      <span><label>Password:</label><input required type="password"name="password" className="forminput"/></span>
      <span><label>Confirm:</label><input required name="confirm" type="password"className="forminput"/></span>
      <span>
      <label>Profile Picture: </label>
      <input type="file" class="forminput"/>
      </span>
      <button type="submit">SUBMIT</button>
   </form>
   <p style={{color:msg.color}}>{msg.err?msg.err:""}</p>
   </>
  )
}