import React from 'react';
import {useParams, Link} from 'react-router-dom';
export default function TestTaker(props){
  const dictationName=useParams();
    const [question, setQuestion]=React.useState("");
    const [ques, setQues]=React.useState([]);
    const [score, setScore]=React.useState(0.0);
    const [isFetching, setIsFetching]=React.useState(true);
    const [curIndex, setCurIndex]=React.useState(1);
    const [isEnded, setIsEnded]=React.useState(false);
    const [answered, setAnswered]=React.useState([]);
    const [report, setReport]=React.useState([]);
      console.log(props.sendCard);
    const handleAnswers=(e)=>{
      e.preventDefault();

      const joined=ques.map((ele, index)=>{
        console.log(answered);
          return ({...ele, userAnswer:answered[index]})
         })
      setReport([...joined]);
        console.log(answered);
      console.log(curIndex);
       const [ans]=e.target;
       if(!isEnded)
       setAnswered([...answered, ans.value])
       if(ans.value.toUpperCase()===question.answer.toUpperCase()){
         setScore(score+1.0);
       }
       else{
         setScore(score-0.5);
       }
       setCurIndex(curIndex+1);
       if(curIndex==ques.length){
         setIsEnded(true);
       }
       e.target[0].value="";
       setQuestion(ques[curIndex]);
      }
    if(isFetching){
      fetch(`${process.env.REACT_APP_API_KEY}/dictation/dictation/${dictationName.id}`).then(res=>res.json()).then(resp=>{
        if(resp.error){
          return <>"Some error occured fetching this dictation"</>
        }
        else{
          setQues(resp.dicData);
          console.log(typeof ques);
          console.log(ques);
          setQuestion(ques[0]);
          setIsFetching(false);
        }
      });
    }
  return (
    <>
    <form onSubmit={handleAnswers}>
    <label>Question is: {question?question.question:""}</label><br />
    <input type="text" placeholder="answer" />
    </form>
    {isEnded?`The test is over and you got ${score} marks`:""}
    {isEnded?<Link to="/report"><button 
      onClick={
      ()=>{
     props.sendCard( 
       report
     )
     props.scorer(score);
     console.log(report);        //random
    }
    }>Report Card</button></Link>:""}
    </>
  )
}