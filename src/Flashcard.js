import React, {useState} from 'react'

function Flashcard({flashcard}) {
    const [flip, setFlip] = useState(false)

    let className = "card"
    if (flip) {
        className += " flippedCard"
    }

    return (
        <div 
            className = {className}
            onClick = {() => setFlip(!flip)}
        >

            <div className = "front">
                {flashcard.question}
                <div className = "flashcard-options">
                    {flashcard.options.map(option =>
                        {return <div className = "flashcard-option">{option}</div>})}
                </div>
            </div>
            
            <div className = "back">
                {flashcard.answer}
            </div>
        </div>
    )
}

export default Flashcard
