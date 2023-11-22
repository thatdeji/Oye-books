import autoBind from "auto-bind";
import { EventEmitter } from "events";

class Component extends EventEmitter {
  // members
  readonly selector: string | HTMLElement | null;
  readonly selectorChildren: {
    [key: string]: string | HTMLElement | null | NodeList;
  };
  element: HTMLElement | null;
  elements: {
    [key: string]: HTMLElement | null | NodeList;
  };

  constructor({
    element,
    elements,
  }: {
    element: string | HTMLElement | null;
    elements: {
      [key: string]: string | HTMLElement | null | NodeList;
    };
  }) {
    super();

    autoBind(this);

    this.selector = element;
    this.selectorChildren = { ...elements };
    this.element = null;
    this.elements = {};

    this.create();

    this.addEventListeners();
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
        }
      }
    });
  }

  addEventListeners() {}

  removeEventListeners() {}
}

export default Component;
