import React, { Component } from "react";
import Mangas from "./Mangas";
import axios from "axios";
import { isEmptyArray } from "./ArrayUtils";

class App extends Component {
  //regex aint perfect
  REGEX_URL = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_+.~#?&//=]*)$/;
  REGEX_PATH_RSRC = /\/([-a-zA-Z0-9()!@:%_+.~#?&=]*\/?)*([-a-zA-Z0-9()!@:%_+.~#?&=]*\/?)/;

  constructor(props) {
    super(props);
    const imgsResource = this.importAll(
      require.context("./resources/mangasImg", false, /\.(png|jpe?g|svg)$/)
    );
    this.state = {
      error: null,
      isLoaded: false,
      imgsResource: imgsResource,
      mangas: {},
      mangasImgs: [],
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
          let mangasImgs = this.loadImgs(result);
          this.setState({ mangas: result, mangasImgs: mangasImgs });
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

  extractImgNameFromUrl(url) {
    let res = "";
    let match = url.match(this.REGEX_URL);
    if (isEmptyArray(match)) {
      let imgPath = match[2];
      let matchImg = imgPath.match(this.REGEX_PATH_RSRC);
      if (isEmptyArray(matchImg)) {
        res = matchImg[1];
      } else {
        console.error("Path to img mal formée: {}", imgPath);
      }
    } else {
      console.error("Url image mal formée: {}", url);
    }
    return res;
  }

  handleOnClick = (event) => {
    // => to bind to this
    const { mangaStates } = this.state;
    const indexMangaClicked = event.target.value;
    const mangaStateClicked = mangaStates[indexMangaClicked];
    const manga = mangaStateClicked.manga;
    const lastRead = mangaStateClicked.lastAvailable;
    axios.post(
      "http://localhost:8080/mangaStates/" + manga + "/lastRead/" + lastRead
    );
  };

  importAll(resource) {
    let images = {};
    resource.keys().map((item, index) => {
      images[item.replace("./", "")] = resource(item);
    });
    return images;
  }

  loadImgs(mangas) {
    const imgsResource = this.state.imgsResource;
    let res = {};
    for (const mangaKey in mangas) {
      let imgName = this.extractImgNameFromUrl(mangas[mangaKey].imgUrl);
      let img = imgsResource[imgName];
      res[mangaKey] = img;
    }
    return res;
  }

  onChangeLastRead = (event) => {
    //Arrow to bind with 'this'
    const lastRead = event.target.value;
    const manga = event.target.getAttribute("manga");
    axios.post(
      "http://localhost:8080/mangaStates/" + manga + "/lastRead/" + lastRead
    );
  };

  render() {
    const {
      error,
      isLoaded,
      mangas,
      mangasImgs,
      mangaKeysSorted,
      mangaStates,
    } = this.state;
    console.log(mangas);
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
      return (
        <div className="App">
          <Mangas
            mangas={mangas}
            mangasImgs={mangasImgs}
            mangaKeysSorted={mangaKeysSorted}
            mangaStates={mangaStates}
            onClick={this.handleOnClick}
            onChangeLastRead={this.onChangeLastRead}
          />
          {this.extractImgNameFromUrl(
            "https://notImplementedURL.com/folder1/folder2/Ajin15.png"
          ) && <p>OK</p>}
        </div>
      );
    }
  }
}

export default App;
