export const loadGsap = async () => (await import("gsap")).default;

export const loadScrollTrigger = async () =>
  (await import("gsap/ScrollTrigger")).ScrollTrigger;

export const loadScrollSmoother = async () =>
  (await import("gsap/ScrollSmoother")).ScrollSmoother;

export const loadTextPlugin = async () =>
  (await import("gsap/TextPlugin")).TextPlugin;
