import React, { useState, useRef } from "react";
import "./App.css";
import { quiz } from "./Data";
function App() {
  const ref = useRef(null);
  const [numQ, setNumQ] = useState(0); // count number questions
  const [score, SetScore] = useState(0); //  count number of corect answer
  const [finsh, SetFinsh] = useState(true);  // to finsh quiz
  const [showScore, SetshowScore] = useState(false); // control to show score
  const lenghts = quiz.questions.length;
  let Q = quiz.questions[numQ].question; // current questions
  let Ans = quiz.questions[numQ].answers;// all answer
  let Corect = quiz.questions[numQ].correctIndex; //corect answer

  const changeQ = () => { // this function count number of questions and control corecr answer or false
    if (numQ < lenghts - 1) {
      setNumQ((prev) => ++prev);
    }
    if (numQ === lenghts - 2) {
      SetFinsh(false);
      console.log("hj");
    }
    for (let i = 0; i < ref.current.children.length; i++) {
      ref.current.children[i].classList.remove("pad");
      ref.current.children[i].classList.remove("corect");
    }
    ref.current.children[Corect].classList.remove("corect");
  };

  const corects = () => { // show corect answer
    ref.current.children[Corect].classList.add("corect");
  };

  const updatScore = () => { // control show score after finsh quiz
    SetshowScore(true);
  };
  return (
    <div className="App">
      <div className="container">
        <h1>Quiz</h1>
        {showScore ? (
          <div className="score">
            <h2>
              Answered <span>{score}</span> question out of {lenghts} questions
            </h2>
            <button onClick={
              () => {SetshowScore(false) 
              setNumQ(0)
              SetScore(0)
              SetFinsh(true)
              }
              }
            >Try Agin</button>
          </div>
        ) : (
          <div className="quiz">
            <h2 className="question">{Q}</h2>
            <strong>
              question <span>{numQ + 1}</span> from {quiz.questions.length}{" "}
              questions{" "}
            </strong>
            <div className="content" ref={ref}>
              {Ans.map((q, i) => {
                return (
                  <div
                    className={`answer`}
                    key={i}
                    onClick={(e) => {
                      console.log(e.target);

                      if (q === Ans[Corect]) {
                        e.target.classList.add("corect");
                        SetScore((prev) => ++prev);
                      } else {
                        e.target.classList.add(`pad`);
                        corects();
                      }
                    }}>
                    {q}
                  </div>
                );
              })}
            </div>
            <div className="control">
              {finsh ? (
                <button
                  onClick={() => {
                    changeQ();
                  }}>
                  Next
                </button>
              ) : (
                <button
                  onClick={() => {
                    updatScore();
                  }}>
                  Finsh
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;


