import React from "react";
import PropTypes from "prop-types";
import "./Mangas.css";

const Mangas = ({ mangas, mangaStates, onClick }) => (
  <table>
    <thead>
      <tr>
        <th>Manga</th>
        <th>Dernier lu</th>
        <th>Dernier disponible</th>
        <th>Language dernier disponible</th>
      </tr>
    </thead>
    <tbody>
      {mangas.map((manga) => {
        let lastRead, lastAvailable, lastAvailableLanguage, updateButton;
        if (mangaStates.hasOwnProperty(manga)) {
          lastRead = mangaStates[manga].lastRead;
          lastAvailable = mangaStates[manga].lastAvailable;
          lastAvailableLanguage = mangaStates[manga].lastAvailableLanguage;
          updateButton = (
            <button onClick={onClick} value={manga}>
              À jour
            </button>
          );
        }
        return (
          <tr key={manga}>
            <td>{manga}</td>
            <td>{lastRead}</td>
            <td>{lastAvailable}</td>
            <td>{lastAvailableLanguage}</td>
            <td>{updateButton}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

export default Mangas;
