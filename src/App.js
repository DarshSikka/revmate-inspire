
import './App.css';
import Dictations from './components/Dictations';
import Signup from './components/signup';
import Nav from './components/nav';
import Signin from './components/signin';
import Home from './components/Home';
import NewDictation from './components/NewDictation';
import TestTaker from './components/TestTaker';
import Report from './components/Report';
import PublicDics from './components/Public';
import Info from './components/Info';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import React, {useState} from 'react';
function App() {
  const [score, setScore]=useState(0);
  const [user, setUser]=useState({});
  const [yourDics, setYourDics]=useState([]);
  const [isfetching, setIsfetching]=useState(true);
  const [fetchingDictations, setFetchingDictations]=useState(true);
  const [reportCard, setReportCard]=useState([]);
  const generateReport=(data)=>{
    setReportCard(data);
    console.log(data);
    console.log(reportCard);
  }
  const setscorer=(score)=>{ 
    setScore(score);
  }
  if(isfetching){
  fetch(`${process.env.REACT_APP_API_KEY}/auth/user/${localStorage.getItem("userid")}`).then(resp=>resp.json()).then(res=>{
    if(res.error){
      setUser("guest");
    }
    else{
      setUser(res.message);
    }
  setIsfetching(false);
  })}
  if(user && fetchingDictations){
   fetch(`${process.env.REACT_APP_API_KEY}
/dictation/dictationsforuser/?user=${localStorage.getItem("userid")}`).then(resp=>resp.json()).then(res=>{
     console.log(res);
     if(res.error){
      setYourDics([]);
      console.log(yourDics);
    }
    else{
      setYourDics(res.message);
      setFetchingDictations(false);
    }});
  }
  return (
    <div id="app">
    <Router>
    <Nav />
        <div className="lol">
        <Switch>
          <Route exact path="/">
            <Home yourDics={yourDics}getUser={()=>user}/>
          </Route>
          <Route  path="/Dictations">
            <Dictations yourDics={yourDics}getUser={()=>user}/>
          </Route>
          <Route path="/signin">
          <Signin yourDics={yourDics} getUser={()=>user}/>
          </Route>
          <Route path="/signup">
          <Signup yourDics={yourDics}/>
          </Route>
          <Route path="/newdic">
            <NewDictation yourDics={yourDics}getUser={()=>user}/>
          </Route>
          <Route path="/dictation/:id">
              <TestTaker scorer={setscorer}sendCard={generateReport}/>
          </Route>
          <Route path="/report">
             <Report data={reportCard} score={score}/>
          </Route>
          <Route path="/published">
          <PublicDics />
          </Route>
          <Route path="/info/:id">
          <Info />
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
  );
}


    

export default App;
