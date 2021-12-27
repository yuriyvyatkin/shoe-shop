export default function scrollDown() {
  setTimeout(() => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
  }, 500);
}
