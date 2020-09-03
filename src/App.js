import React, { Component } from "react";
import Mangas from "./Mangas";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      mangas: {},
      mangaKeysSorted: [],
      mangaStates: {},
    };
  }

  extractMangaKeysSorted = (mangaStates) => {
    // => to bind to this
    return Object.keys(mangaStates);
  };

  componentDidMount() {
    axios
      .get("http://localhost:8080/mangas")
      .then((res) => res.data)
      .then(
        (result) => {
          this.setState({ mangas: result });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error: error,
          });
        }
      )
      .then(
        axios
          .get("http://localhost:8080/mangaStates?sort=TO_READ")
          .then((res) => res.data)
          .then(
            (result) => {
              let mangaKeysSorted = this.extractMangaKeysSorted(result);
              this.setState({
                isLoaded: true,
                mangaKeysSorted: mangaKeysSorted,
                mangaStates: result,
              });
            },
            // Remarque : il est important de traiter les erreurs ici
            // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
            // des exceptions provenant de réels bugs du composant.
            (error) => {
              this.setState({
                isLoaded: true,
                error: error,
              });
            }
          )
      );
  }

  extractImgNameFromUrl(url) {}

  handleOnClick = (event) => {
    // => to bind to this
    const { mangaStates } = this.state;
    const indexMangaClicked = event.target.value;
    const mangaStateClicked = mangaStates[indexMangaClicked];
    console.log("Up to date manga:");
    console.log(mangaStateClicked);
    const manga = mangaStateClicked.manga;
    const lastRead = mangaStateClicked.lastAvailable;
    axios.post(
      "http://localhost:8080/mangaStates/" + manga + "/lastRead/" + lastRead
    );
  };

  onChangeLastRead = (event) => {
    //Arrow to bind with 'this'
    const lastRead = event.target.value;
    const manga = event.target.getAttribute("manga");
    console.log("manga attr");
    console.log(manga);
    console.log(manga + " last Read is " + lastRead);
    axios.post(
      "http://localhost:8080/mangaStates/" + manga + "/lastRead/" + lastRead
    );
  };

  render() {
    const {
      error,
      isLoaded,
      mangas,
      mangaKeysSorted,
      mangaStates,
    } = this.state;
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
      return (
        <div className="App">
          <Mangas
            mangas={mangas}
            mangaKeysSorted={mangaKeysSorted}
            mangaStates={mangaStates}
            onClick={this.handleOnClick}
            onChangeLastRead={this.onChangeLastRead}
          />
        </div>
      );
    }
  }
}

export default App;
