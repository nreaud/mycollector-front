import React from "react"
import "./MangaCard.css"

const MangaCard = ({ img, mangaKey, manga, mangaState }) => (
  <div className="card">
    <div className="img">
      <img src={img} alt={manga.name} />
    </div>
    <div className="cardContent">
      <div className="cardTitle">
        <span>{manga.name}</span>
      </div>
      <div className="cardText">
        <span>
          {mangaState.lastRead} / {mangaState.lastAvailable}
        </span>
      </div>
    </div>
  </div>
)

export default MangaCard
