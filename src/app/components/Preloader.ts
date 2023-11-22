import Component from "../classes/Component";

class Preloader extends Component {
  length: number;
  constructor() {
    super({
      element: ".preloader",
      elements: {
        images: document.querySelectorAll("img"),
      },
    });
    this.length = 0;

    this.createLoader();
  }

  createLoader() {
    if (this.elements.images instanceof NodeList) {
      [...this.elements.images].forEach((image) => {
        if (image instanceof HTMLImageElement) {
          const dataSrc = image?.getAttribute("data-src");
          if (dataSrc) image.src = dataSrc;
          image.onload = () => this.onAssetLoaded();
        }
      });
    }
  }

  onAssetLoaded() {
    this.length += 1;
    if (this.elements.images instanceof NodeList) {
      const images = [...this.elements.images];
      const percent = this.length / images?.length;
      if (percent === 1) {
        return new Promise((_) => {
          this.emit("completed");
        });
      }
    }
  }
}

export default Preloader;
