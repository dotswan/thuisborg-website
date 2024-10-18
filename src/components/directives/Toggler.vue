<script>
export default {
  inserted: (el, binding) => {
    let parent = el,
      tog = !!binding.value.toggler ? parent.querySelectorAll("." + binding.value.toggler) : parent,
      className = !!binding.value.className ? binding.value.className : "opened",
      target = !!parent.querySelector("." + binding.value.target) ? parent.querySelector("." + binding.value.target) : parent;
    if (!!binding.value.toggler) {
      tog.forEach((item) => {
        item.addEventListener("click", (e) => {
          if (target.classList.contains(className)) {
            target.classList.remove(className);
          } else {
            target.classList.add(className);
          }
        });
      });
    } else {
      tog.addEventListener("click", (e) => {
        if (target.classList.contains(className)) {
          target.classList.remove(className);
        } else {
          target.classList.add(className);
        }
      });
    }
  },
};
</script>
