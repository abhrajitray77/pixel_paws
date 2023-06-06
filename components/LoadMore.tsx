import React from 'react'
import { PacmanLoader } from 'react-spinners';

type LoadMoreProps = {
    playAnim: boolean;
}

const LoadMore = ({
    playAnim
}: LoadMoreProps) => {
  return (
    <button className='bg-red-500 p-2 rounded-lg px-3 hover:scale-105 transition-transform
    duration-300 ease-in-out'>
        {playAnim ? (
            <div className="flex justify-center">
                <div className="w-6 h-6 text-amber-400"><PacmanLoader loading={playAnim} size={50}/></div>
            </div>
        )
        : (
            <div className="flex justify-center">
                <p className="text-gray-200 font-semibold">Load More</p>
            </div>
        )}
    </button>
  )
}

export default LoadMore