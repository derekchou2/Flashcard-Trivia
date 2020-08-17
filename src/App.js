import React, {useState, useEffect, useRef} from 'react';
import FlashcardList from './FlashcardList';
import './styles.css'
import axios from 'axios'

function App() {
  const [flashcards, setFlashcards] = useState([])
  const [categories, setCategories] = useState([])

  const categoryEl = useRef()
  const amountEl = useRef()
  const difficultyEl = useRef()

  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php")
    .then(res => {
      setCategories(res.data.trivia_categories)
    })
  }, [])

  function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }

  function handleSubmit(e) {
    e.preventDefault()
    axios.get('https://opentdb.com/api.php', {
      params: {
        difficulty: difficultyEl.current.value,
        amount: amountEl.current.value,
        category: categoryEl.current.value
      }
    })
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
  }

  return (
    <div>
      <form className = "header" onSubmit = {handleSubmit}>
        <div className = "form-group"> 
          <label htmlFor = "category">Category</label>
          <select id = "category" ref = {categoryEl}>
            {categories.map(category => {
              return <option value = {category.id} key = {category.id}>{category.name}</option>
            })}
          </select>
        </div>
        <div className = "form-group">
          <label htmlFor = "difficulty">Difficulty</label>
          <select id = "difficulty" ref = {difficultyEl}>
            <option value = "easy">Easy</option>
            <option value = "medium">Medium</option>
            <option value = "hard">Hard</option>
          </select>
        </div>
        <div className = "form-group">
          <label htmlFor = "amount">Number of Questions</label>
          <input type = "number" id = "amount"
           min = "1" max = "50" step = "1" defaultValue = {10} ref = {amountEl}/>
        </div>
        <div className = "form-group">
          <button className = "button">New Questions</button>
        </div>
      </form>

      <FlashcardList flashcards = {flashcards}/>
   </div>
  );
}

export default App;
