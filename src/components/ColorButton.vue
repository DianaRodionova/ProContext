<script setup>
const props = defineProps({
  color: {
    type: String,
    default: '#000000'
  }
})
</script>

<template>
  <button class="color-button" type="button" :style="{ 'background-color': props.color }" />
</template>

<style lang="scss" scoped>
.color-button {
  width: 16px;
  height: 16px;

  border: 1px solid $grey;
}
</style>
