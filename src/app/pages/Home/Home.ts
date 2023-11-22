import Page from "../../classes/Page";

class Home extends Page {
  constructor() {
    super({
      element: ".home",
      elements: {
        wrapper: ".home__wrapper",
      },
    });
  }

  create() {
    super.create();
  }
}

export default Home;
