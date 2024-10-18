<script>
export default {
  inserted: (el, binding) => {
    function doIt() {
      el.classList.add("animate__animated");
      el.classList.add(`${binding.value}`);
    }

    function handleIntersect(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(el);
          doIt();
        }
      });
    }

    function createObserver() {
      const options = {
        root: null,
        threshold: "0",
      };
      const observer = new IntersectionObserver(handleIntersect, options);
      observer.observe(el);
    }

    if (window["IntersectionObserver"]) {
      createObserver();
    }
  },
};
</script>
