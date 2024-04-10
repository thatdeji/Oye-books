import gsap from "gsap";
import Component from "../classes/Component";
import { optimizeCloudinaryUrl } from "../utils/cloudinary";

class Preloader extends Component {
  length: number;
  constructor() {
    super({
      element: ".preloader",
      elements: {
        images: document.querySelectorAll("img"),
        progressBar: ".preloader__progress",
        progressNumber: ".preloader__progress-number",
        wordsGroup: ".preloader__words",
        wordsGroupInner: ".preloader__words-inner",
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
          if (dataSrc) image.src = optimizeCloudinaryUrl(dataSrc);
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
      if (
        this.elements.progressBar instanceof HTMLElement &&
        this.elements.progressNumber instanceof HTMLElement
      ) {
        this.elements.progressBar.style.width = `${percent * 100}%`;
        this.elements.progressNumber.textContent = `${Math.floor(
          percent * 100
        )}`;
      }
      if (percent === 1) {
        if (
          this.elements.wordsGroup instanceof HTMLElement &&
          this.elements.wordsGroupInner instanceof HTMLElement &&
          this.element instanceof HTMLElement
        ) {
          const tl = gsap.timeline();
          tl.to(this.elements.wordsGroupInner, {
            yPercent: -75,
            duration: 3,
            ease: "power3.inOut",
          })
            .to(this.elements.wordsGroup, {
              "clip-path": "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)",
              duration: 1,
              ease: "expo.inOut",
            })
            .to(
              this.element,
              {
                autoAlpha: 0,
                duration: 1,
                onComplete: () => {
                  document.querySelector("html")?.classList.remove("no-scroll");
                  this.emit("completed");
                },
              },
              "-=0.1"
            );
        }
        return Promise.resolve();
      }
    }
  }
}

export default Preloader;
