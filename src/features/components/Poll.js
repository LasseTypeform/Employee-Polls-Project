import React from 'react'
import { Link } from 'react-router-dom'

function Poll({question, title}) {
   
    const { author, timestamp, id } = question
    return (
        <div className='poll-block-container'>
                    <div className='unansweredPolls'>
                        <p className='poll-user'>Poll by {author}</p>
                        <p className='timestamp'>timestamp:{timestamp}</p>
                    </div>
                    <Link className='see-poll-button' to={`/question/${id}`}>Show</Link>
        </div>
    )
}

export default Poll