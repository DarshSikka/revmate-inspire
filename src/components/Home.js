import React from 'react';
import hackathon from './hackathon.png';
import '../home.scss';
export default function Home(props){
    return (
      <>
      <div className="revHead">
      <h1>RevMate</h1>
      </div>
      <div flexbox>
      <div class="bodyText">
      <p>
        Looking for a great website to learn? RevMate is the best allowing you to test your knowledge with regular tests. Publish your articles and share knowledge.<br />
       Not only can you store questions but also test your knowledge with tests at reqular intervals.<br />       Happy Learning!
      </p>
      <img width="500"src={hackathon} class="homeImage" />
      </div>
      </div>
      </>
    );
}