import React, { useState } from 'react'

const QuestionCard = ({ question, options, onSubmit }) => {

    const [selected, setSelected] = useState(null);

    const handleSubmit = () => {
        if (selected !== null) {
            onSubmit(selected);
            setSelected(null);
        }
    };

    return (
        <div className='question-card'>
            <p className='question-text'>{question}</p>

            <div className='options'>
                {options.map((opt, index) => (
                    <button className={`option-btn ${selected === index ? "selected" : ""}`}
                        onClick={() => setSelected(index)}
                        key={index}>
                        {opt}
                    </button>
                ))}
            </div>

            <button className='"submit-btn'
                disabled={selected === null}
                onClick={handleSubmit}>
                Submit Answer
            </button>
        </div>
    )
}

export default QuestionCard