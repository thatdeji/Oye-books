import { EventEmitter } from "events";
import autoBind from "auto-bind";
import AsyncLoad from "./AsyncLoad";

class Page extends EventEmitter {
  // members
  readonly selector: string | HTMLElement | null;
  readonly selectorChildren: {
    [key: string]: string | HTMLElement | null | NodeList;
  };
  element: HTMLElement | null;
  elements: {
    [key: string]: HTMLElement | null | NodeList;
  };
  classes: {
    [key: string]: string;
  };

  constructor({
    element,
    elements,
    classes,
  }: {
    element: string | HTMLElement | null;
    elements: {
      [key: string]: string | HTMLElement | null | NodeList;
    };
    classes?: {
      [key: string]: string;
    };
  }) {
    super();

    autoBind(this);

    this.selector = element;
    this.selectorChildren = {
      preloaders: "[data-src]",
      ...elements,
    };
    this.element = null;
    this.elements = {};
    this.classes = { ...classes };

    this.create();
  }

  create() {
    if (this.selector instanceof HTMLElement) {
      this.element = this.selector;
    } else if (this.selector) {
      this.element = document.querySelector(this.selector);
    }
    Object.keys(this.selectorChildren).forEach((key) => {
      const entry = this.selectorChildren[key];
      if (entry instanceof HTMLElement || entry instanceof NodeList) {
        this.elements[key] = entry;
      } else if (entry) {
        const els = this.element?.querySelectorAll<HTMLElement>(entry);
        if (els?.length === 0) {
          this.elements[key] = null;
        } else if (els?.length === 1) {
          this.elements[key] =
            this.element?.querySelector<HTMLElement>(entry) ?? null;
        } else {
          this.elements[key] =
            this.element?.querySelectorAll<HTMLElement>(entry) ?? null;
        }
      }
    });
    this.createPreloaders();
  }

  async show() {
    this.addEventListeners();
    if (this.element instanceof HTMLElement) this.element.style.opacity = "1";
    return Promise.resolve();
  }

  hide() {
    this.removeEventListeners();

    return Promise.resolve();
  }

  createPreloaders() {
    if (this.elements.preloaders instanceof NodeList) {
      [...this.elements.preloaders].forEach((element) => {
        if (element instanceof HTMLElement)
          return new AsyncLoad({
            element,
          });
      });
    }
  }

  addEventListeners() {}

  removeEventListeners() {}
}

export default Page;
