import React from 'react'

type InfoProps = {
    gameDesc: string;
}


const Info = ({
    gameDesc
}: InfoProps) => {
  return (
    <div>

        {/*Description*/}
        <article>
            {gameDesc}
        </article>
        
        {/*Screenshots*/}
        <div>

        </div>

        {/*Details*/}
        <div>
            
        </div>
    </div>
  )
}

export default Info