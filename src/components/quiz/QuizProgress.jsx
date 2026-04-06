import React from 'react'

const QuizProgress = ({ current, total }) => {
    return (
        <div className='mb-3'>Question {current + 1} of {total}</div>
    )
}

export default QuizProgress