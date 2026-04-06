import React from 'react'

const LifelineBadge = ({ count }) => {
    return (
        <div className="alert alert-info">
            Lifelines Reamaining:
            <strong>{count}</strong>
        </div>
    )
}

export default LifelineBadge;