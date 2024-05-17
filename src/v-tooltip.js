// v-tooltip.js
export default {
    beforeMount(el, binding) {
      el.setAttribute('data-tooltip', binding.value);
    },
    updated(el, binding) {
      el.setAttribute('data-tooltip', binding.value);
      if (el.disabled) {
        el.classList.add('tooltip-disabled');
      } else {
        el.classList.remove('tooltip-disabled');
      }
    },
    mounted(el) {
      if (el.disabled) {
        el.classList.add('tooltip-disabled');
      }
    },
   
  }
  