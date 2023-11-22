import Navigation from "./classes/Navigation";
import Page from "./classes/Page";
import Preloader from "./components/Preloader";
import Home from "./pages/Home/Home";
import autoBind from "auto-bind";

class App {
  preloader: Preloader;
  pages: {
    [key: string]: Page;
  };
  page: Page;
  navigation: Navigation;

  constructor() {
    autoBind(this);
    //init default on page load
    this.preloader = new Preloader();
    this.pages = {
      "/": new Home(),
    };
    this.page = this.pages[window.location.pathname];
    this.preloader.once("completed", this.onPreloaded.bind(this));
    this.navigation = new Navigation();
    this.navigation.once("completed", () => {
      this.page = this.pages[window.location.pathname];

      this.page.show();
    });
  }

  onPreloaded() {
    console.log("ee");
    this.page.show();
  }

  addEventListeners() {}
}

new App();
