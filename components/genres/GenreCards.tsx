import { useRouter } from 'next/navigation';
import React from 'react'

type GenreCardsProps = {
  name: string;
  image: string;
  listSlug: string;
}

const GenreCards = ({
  name,
  image,
  listSlug
}: GenreCardsProps) => {
  const router = useRouter()
  //routing to the genre list page
  const handleClick = () => {
    router.push(`/genrepage/${listSlug}`);
  }

  return (
    <div className="flex flex-col justify-center items-center
    rounded-full w-40 h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 cursor-pointer"
      style={{
        backgroundImage: `url(${image ? image : "../../public/imgs/imgPlaceholder.jpg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      onClick={handleClick}
    >
      <div className="bg-gray-900 bg-opacity-70 w-full h-full hover:bg-opacity-40
      transition-all duration-300 rounded-full flex items-center justify-center">
        <h1 className="text-gray-100 text-xl font-bold">{name}</h1>
      </div>
    </div>
  )
}

export default GenreCards