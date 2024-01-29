import React from 'react'
import { Link } from 'react-router-dom'

function Poll({question, title}) {
   
    const { author, timestamp, id } = question

    const readabletime = new Date(timestamp).toLocaleTimeString('en-US');
    const readabledate = new Date(timestamp).toLocaleDateString('en-US');

    return (
        <div className='poll-block-container flex-column'>
                    <div className='pollbox'>
                        <p className='poll-user'>Poll by {author}</p>
                        <p className='timestamp'>{readabletime} - {readabledate}</p>
                    </div>
                    <Link className='see-poll-button' to={`/question/${id}`}>Show</Link>
        </div>
    )
}

export default Poll