  import React from 'react';
  import '../auth.scss';
  export default function Signin() {
    const [curstatus, setCurStatus]=React.useState({});
    const exec=(e)=>{
      e.preventDefault();
      const [username, password]=e.target;
      const createdObj={username:username.value, password:password.value
      };
      fetch(`${process.env.REACT_APP_API_KEY}/auth/login`, {
        method:"POST",
        headers:{
          'Content-Type':"application/json"
        },
        body:JSON.stringify(createdObj)
      }).then(resp=>resp.json()).then(res=>{
        if(res.error){
          setCurStatus({color:"red", err:res.message})
        }
        else{
          setCurStatus({color:"green",err:res.message });
          localStorage.setItem("userid", res.userid);
        }
      })
    }
    return (
      <>
      <div class="button-container">
    <form onSubmit={exec} className="signin">
        <h1>Log In to your Account</h1>
    <label>Username</label>
    <input name="username" id="username" type="text" required /><br />
    <label>Password</label>
    <input name="password" type="password" required /><br />
    <button type="submit">SUBMIT</button>
   </form>
   <p style={{color:curstatus.color || "red"}}>{curstatus?curstatus.err:""}</p>
   </div>
   </>
   );
  }