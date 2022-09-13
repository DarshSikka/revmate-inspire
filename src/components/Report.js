import React from 'react';
export default function Report(props){
return(
  <>
  <table id="report">
        <tr id="header">
            <th>Question</th>
            <th>Answer</th>
        </tr>
        {console.log(props.data)}
        {
          props.data.map(ele=>{
          return(
          <tr>
          <td>{ele.question}</td>
          <td>{ele.answer}</td>
          </tr>
          )
        })
        }
    </table>
    You scored {props.score}
    </>
)
}