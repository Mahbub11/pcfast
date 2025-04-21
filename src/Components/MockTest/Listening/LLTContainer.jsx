import React from 'react'
import IconConversationSpeaker from '../../../Assets/SVG/IconConversationSpeaker'

export default function LLTContainer({q,userAns}) {
  return (
    <div>
        <div className="mt-2">
                
                <p className=" text-[20px] font-poppins h-auto px-1 m-auto">
                  <h2 className='flex gap-2'><span>
                  <IconConversationSpeaker height='2rem' width='2rem'></IconConversationSpeaker></span> {q}</h2>
                  <h2 className='mt-5 ml-10'>Your Ans: {userAns}</h2>
                 </p>
                </div>
    </div>
  )
}
