import { Game } from '@/gameTypes';
import Image from 'next/image';

type GameCardProps = {
  game: Game;
};

const GameCard = ({ game }: GameCardProps) => {
  const {
    id,
    name,
    price,
    released,
    background_image,
    platforms,
    genres,
  } = game;

  const releasedDate = new Date(released).toLocaleDateString();
  const genreList = genres.map((genre) => genre.name).join(', ');

  return (
    <div className="game-card">
      <Image src={background_image} alt={name} />
      <div className="game-card__info">
        <h3 className="game-card__title">{name}</h3>
        <p className="game-card__released">{releasedDate}</p>
        <p className="game-card__genre">{genreList}</p>
      </div>
    </div>
  );
};

export default GameCard;
