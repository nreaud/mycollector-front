import React, { Component } from "react";
import Mangas from "./Mangas";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      mangas: [],
      mangaStates: {},
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/mangas")
      .then((res) => res.data)
      .then(
        (result) => {
          this.setState({
            mangas: Object.keys(result).map((key) => result[key]),
          });
        },
        // Remarque : il est important de traiter les erreurs ici
        // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
        // des exceptions provenant de réels bugs du composant.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      )
      .then(
        axios
          .get("http://localhost:8080/mangaStates")
          .then((res) => res.data)
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                mangaStates: result,
              });
            },
            // Remarque : il est important de traiter les erreurs ici
            // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
            // des exceptions provenant de réels bugs du composant.
            (error) => {
              this.setState({
                isLoaded: true,
                error,
              });
            }
          )
      );
  }

  handleOnClick = (event) => {
    const { mangaStates } = this.state;
    const indexMangaClicked = event.target.value;
    const mangaStateClicked = mangaStates[indexMangaClicked];
    console.log("Clicked");
    console.log(mangaStateClicked);
    const manga = mangaStateClicked.manga;
    const lastRead = mangaStateClicked.lastAvailable;
    axios.post(
      "http://localhost:8080/mangaStates/" + manga + "/lastRead/" + lastRead
    );
  };

  render() {
    const { error, isLoaded, mangas, mangaStates } = this.state;
    console.log("=== Mangas ===");
    console.log(mangas);
    console.log("=== Manga States ===");
    console.log(mangaStates);
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
      return (
        <div className="App">
          <Mangas
            mangas={mangas}
            mangaStates={mangaStates}
            onClick={this.handleOnClick}
          />
        </div>
      );
    }
  }
}

export default App;
