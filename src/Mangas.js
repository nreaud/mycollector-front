import React from "react";
import PropTypes from "prop-types";
import "./Mangas.css";
import NumberScroller from "./NumberScroller";

const Mangas = ({
  mangas,
  mangaKeysSorted,
  mangaStates,
  onClick,
  onChangeLastRead,
}) => (
  <table>
    <thead>
      <tr>
        <th>Image</th>
        <th>Manga</th>
        <th>Dernier lu</th>
        <th>Dernier disponible</th>
        <th>Language dernier disponible</th>
      </tr>
    </thead>
    <tbody>
      {mangaKeysSorted.map((mangaKey) => {
        let lastReadSelector,
          lastAvailable,
          lastAvailableLanguage,
          updateButton,
          toReadLabel;
        let manga = mangas[mangaKey];
        if (mangaStates.hasOwnProperty(mangaKey)) {
          const mangaAttr = {};
          mangaAttr.manga = mangaKey;
          lastReadSelector = (
            <NumberScroller
              onChange={onChangeLastRead}
              value={mangaStates[mangaKey].lastRead}
              customAttrs={mangaAttr}
              maxValue={lastAvailable}
            />
          );
          lastAvailable = mangaStates[mangaKey].lastAvailable;
          lastAvailableLanguage = mangaStates[mangaKey].lastAvailableLanguage;
          updateButton = (
            <button onClick={onClick} value={mangaKey}>
              À jour
            </button>
          );
          if (mangaStates[mangaKey].toRead) {
            toReadLabel = <label className="toReadLabel">À lire</label>;
          }
        }
        return (
          <tr key={mangaKey}>
            <td>{manga.imgUrl}</td>
            <td>{manga.name}</td>
            <td>{lastReadSelector}</td>
            <td>{lastAvailable}</td>
            <td>{lastAvailableLanguage}</td>
            <td>{updateButton}</td>
            <td>{toReadLabel}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

export default Mangas;
