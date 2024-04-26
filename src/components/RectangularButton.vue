<script setup>
const props = defineProps({
  text: {
    type: String,
    default: 'Клик'
  }
})
</script>

<template>
  <button class="rectangular-button" type="button">{{ props.text }}</button>
</template>

<style lang="scss" scoped>
.rectangular-button {
  width: 100px;
  height: 28px;

  color: $white;
  border-radius: $border-radius;
  background-color: $blue;
}
</style>
