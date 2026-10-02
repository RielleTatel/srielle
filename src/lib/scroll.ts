export function scrollToAnchor(target: HTMLElement, offset = 64) {
  const top = window.scrollY + target.getBoundingClientRect().top - offset;
  window.scrollTo(0, Math.max(0, top));
}
