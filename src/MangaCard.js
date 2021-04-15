import React from "react"
import "./MangaCard.css"

const MangaCard = ({ img, manga, mangaState }) => (
  <div className="card">
    <div className="img">
      <img src={img} alt={manga.name} height="200" width="150" />
    </div>
    <div className="cardContent">
      <div className="cardTitle">
        <span>{manga.name}</span>
      </div>
      <div className="cardText">
        <span className="chapterNumber">{mangaState.lastRead}</span>
        <span className="chapterTotal">/ {mangaState.lastAvailable}</span>
      </div>
    </div>
    {mangaState.toRead && <span className="toRead">À lire!</span>}
  </div>
)

export default MangaCard
