import Component from "./Component";

export default class AsyncLoad extends Component {
  observer: any;
  constructor({ element }: { element: string | HTMLElement | null }) {
    super({ element, elements: {} });

    this.createObserver();
  }

  createObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const dataSrc = this.element?.getAttribute("data-src");
          if (
            this.element &&
            this.element instanceof HTMLImageElement &&
            !this.element.src &&
            dataSrc
          ) {
            this.element.setAttribute("src", dataSrc);
            this.element.onload = (_) => {
              this.element?.classList.add("loaded");
            };
          }
        }
      });
    });

    this.observer.observe(this.element);
  }
}
