import gsap from "gsap";
import Page from "../../classes/Page";

class Home extends Page {
  constructor() {
    super({
      element: ".home",
      elements: {
        header: ".l-header",
        titleSpans: ".hero__title span",
        subTitleSpans: ".hero__subtitle span",
        books: ".book",
      },
    });
  }

  create() {
    super.create();
  }

  createIntroAnim() {
    const { header, titleSpans, subTitleSpans, books } = this.elements;
    if (
      header instanceof HTMLElement &&
      titleSpans instanceof NodeList &&
      subTitleSpans instanceof NodeList &&
      books instanceof NodeList
    ) {
      const timelineOne = gsap.timeline();
      const timelineTwo = gsap.timeline();
      const timelineThree = gsap.timeline();

      timelineOne.from(header, {
        opacity: 0,
        yPercent: -100,
        ease: "power4.out",
        duration: 0.4,
      });
      timelineTwo
        .from(titleSpans, {
          y: 80,
          skewY: "15deg",
          ease: "power4.out",
          stagger: 0.1,
        })
        .from(
          subTitleSpans,
          {
            y: 80,
            skewY: "15deg",
            ease: "power4.out",
            stagger: 0.1,
          },
          "-0.1"
        );
      timelineThree.from(books, {
        autoAlpha: 0,
        stagger: 0.1,
        y: 30,
      });
    }
  }

  show() {
    return super.show().then((_) => {
      this.createIntroAnim();
    });
  }
}

export default Home;
