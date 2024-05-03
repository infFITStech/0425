<script setup>
defineProps({
  display: {
    type: String,
    default: 'flex'
  },
  useMargin: Boolean
})
</script>

<template>
  <div
    :class="[display, useMargin ? 'my-2 mx-3' : 'py-2 px-3']"
    class="navbar-item-label items-center cursor-pointer dark:text-white dark:hover:text-slate-400 "
    style="position: fixed; top: 12px; left: -10px;"
  >
    <slot />
  </div>
</template>
