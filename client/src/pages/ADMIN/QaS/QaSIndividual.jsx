import React from 'react'

export const QaSIndividual = ({createdAt,name,userId,question,answer}) => {
  return (
    <div>
        <div>
            <p>Product:{name}</p>
            <p>Question Date:{createdAt}</p>
        </div>
        <p>Question:{question}</p>
        <textarea name="" id="" cols="20" rows="5"></textarea>

        <button>Send answer</button>
        <br />
        <br />
        <br />
    </div>
  )
}
