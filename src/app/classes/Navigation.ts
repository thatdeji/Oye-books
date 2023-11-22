import autoBind from "auto-bind";
import { EventEmitter } from "events";

class Navigation extends EventEmitter {
  // members
  url: string;

  constructor() {
    super();
    this.url = window.location.pathname;

    autoBind(this);

    this.addLinksListeners();
    this.addEventListeners();
  }

  async onChange({
    push = true,
    url = null,
  }: {
    push?: boolean;
    url: null | string;
  }) {
    if (url) this.url = url?.replace(window.location.origin, "");

    if (push) window.history.pushState({}, document.title, url);

    /**
     * Add logic to switch between pages (load all pages and use display property to hide and show or fetch pages asynchronously), also add page transition if need be
     */

    this.addLinksListeners();

    return this.emit("completed");
  }

  onPopState() {
    this.onChange({
      url: window.location.pathname,
      push: false,
    });
  }

  addLinksListeners() {
    let links = document.querySelectorAll("a");
    [...links].forEach((link) => {
      const isLocal = link.href.indexOf(window.location.origin) > -1;

      const isNotEmail = link.href.indexOf("mailto") === -1;
      const isNotPhone = link.href.indexOf("tel") === -1;

      if (isLocal) {
        link.onclick = (event) => {
          event.preventDefault();

          this.onChange({
            url: link.href,
          });
        };
      } else if (isNotEmail && isNotPhone) {
        link.rel = "noopener";
        link.target = "_blank";
      }
    });
  }

  addEventListeners() {
    window.addEventListener("popstate", this.onPopState.bind(this));
  }
}

export default Navigation;
