import React, {useState, useEffect} from 'react';
import FlashcardList from './FlashcardList';
import './styles.css'
import axios from 'axios'

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS)

  useEffect(() => {
    axios.get('https://opentdb.com/api.php?amount=10')
    .then(res => {
      setFlashcards(res.data.results.map((questionItem, index) => {
        const answer = decodeString(questionItem.correct_answer)
        const options = [...questionItem.incorrect_answers.map(a => decodeString(a)),
           answer
          ]
        
        return {
          id: `${index}-${Date.now()}`,
          question: decodeString(questionItem.question),
          answer: answer,
          // randomizes order of options
          options: options.sort(() => Math.random() - .5)
        }
      }))
      console.log(res.data)
    })
  }, []) 

  function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }

  return (
   <FlashcardList flashcards = {flashcards}/>
  );
}


const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: "what is 2 + 2?",
    answer: '4',
    options: [
      '4',
      '5',
      '6',
      '7'
    ]
  },
  {
    id: 2,
    question: "what is the capital of America?",
    answer: 'Washington DC',
    options: [
      'Washington DC',
      'Africa',
      'NYC',
      'Boston'
    ]
  }
]

export default App;
