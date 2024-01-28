import React from 'react'
import Poll from './Poll'


function Polls(props) {
    
    const { questions, title } = props

    return (
        <div className='polls-container-wrapper'>
            {
                (questions.length > 0 && title !== undefined) && (
                    <div className='polls-container'>
                        <div className='polls-block-title'>
                            <h4>{title}</h4>
                            </div>
                        <div className='block-for-polls'>


                            {
                               questions.map((q) => (<Poll key={q.id} question={q} title={title}/>
                               )) 
                            }
                            </div>
                        
                        
                    </div>
                )
            }
        </div>
    )
}

export default Polls