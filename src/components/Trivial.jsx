import React, { useEffect, useState } from 'react';
import axios from "axios";

const Trivial = () => {

    const [questions, setQuestions] = useState([]);
    const [numberAmount, setNumberAmount] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);

    const handleChange = (e) => {
        setNumberAmount(e.target.value);
    }

    useEffect(()=> {
        axios.get(`https://opentdb.com/api.php?amount=${numberAmount}&type=multiple`)
        .then(res => {
            setQuestions(res.data.results)
        })
    }, [numberAmount])

    const handleAnswers = (e) => {
        const selectedAnswer = e.target.innerText;
        let isCorrectAnswer = false;
        let li$$ = document.querySelectorAll('li');

        questions.map((question)=> {
            if(selectedAnswer === question.correct_answer){
                setCorrectAnswers(previusAnswers => previusAnswers + 1);
                isCorrectAnswer = true;

                for (let li of li$$){
                    if( li.innerText === question.correct_answer){
                       li.classList.add('correct')
                    }
                 }
            }
        
        })
    
        if(!isCorrectAnswer){
            setIncorrectAnswers(prevIncorrectAnswers => prevIncorrectAnswers + 1);
            for (let li of li$$){
                if( li.innerText === selectedAnswer){
                   li.classList.add('incorrect')
                }
             }
        }
    }

  return (
    <>
        <div className='header'>
            <h1> Trivia Night! </h1>
        </div>
        <div className='quiz'>
            <div className='input-info'>
                <h2> Choose your questions! </h2>
                <input className="input" type='number' onChange={handleChange}/>
                <p> Correct Answers: <strong>{correctAnswers}</strong></p>
                <p> Incorrect Answers: <strong>{incorrectAnswers}</strong></p>
            </div>
            <div className='questions-box'>
            {questions && questions.map((question, index)=> {

                const correctAnswer = question.correct_answer;
                const incorrectAnswer = question.incorrect_answers;
                const answers = [...incorrectAnswer, correctAnswer];

                return (
                    <div key={index} className='que-ans'>
                        <h3 className='q-title'>{question.question}</h3>
                        <ul className='ul-ans'>
                            {answers && answers.map((answer)=>

                                <li  className='li-ans' key={answer} onClick={handleAnswers}> {answer} </li>

                            )}
                        </ul>
                    </div>
                )
                
            })}
            </div>
        </div>
    </>
  
  )
}

export default Trivial;
