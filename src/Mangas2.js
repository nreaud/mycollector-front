import React from "react"
import MangaCard from "./MangaCard"
import "./Mangas2.css"

const Mangas2 = ({
  mangas,
  mangaKeysSorted,
  mangaStates,
  mangasImgs,
  onClick,
  onChangeLastRead,
}) => (
  <div className="mangas">
    {mangaKeysSorted.map(mangaKey => (
      <MangaCard
        img={mangasImgs[mangaKey]}
        mangaKey
        manga={mangas[mangaKey]}
        mangaState={mangaStates[mangaKey]}
      />
    ))}
  </div>
)

export default Mangas2
