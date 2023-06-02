import React from 'react'


type GameCardProps = {
    game: Game
}

const GameCard = ({
    game
}: GameCardProps) => {

    const {
        id,
        name,
        price,
        released,
        bg_image,
        platforms,
        genre,
    } = game;

    const releasedDate = new Date(released).toLocaleDateString();


  return (
    <div>

    </div>
  )
}

export default GameCard