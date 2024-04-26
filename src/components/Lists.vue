<script setup>
import { ref, computed } from 'vue'
import { useRootStore } from '@/stores/root'
import RectangularButton from '@/components/RectangularButton.vue'
import ColorButton from '@/components/ColorButton.vue'

const rootStore = useRootStore()

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  title: String
})

const isSort = ref(true)

const nameButton = computed(() => {
  return isSort.value ? 'Перемешать' : 'Сортировать'
})

const sortedItems = computed(() => {
  return props.items.filter((item) => item.checked)
})

const shuffledItems = computed(() => {
  if (isSort.value) {
    return
  }

  let shuffledItems = []

  for (let i = 0; i <= sortedItems.value.length - 1; i++) {
    for (let j = 1; j <= sortedItems.value[i].quantity; j++) {
      shuffledItems.push(sortedItems.value[i])
    }
  }

  return shuffledItems.sort(() => Math.random() - 0.5)
})

function changeSort() {
  isSort.value = !isSort.value
}
</script>

<template>
  <div class="lists">
    <div class="lists__header">
      <h3 class="lists__title">{{ title }}</h3>

      <RectangularButton type="button" :text="nameButton" @click="changeSort" />
    </div>

    <ul v-if="isSort">
      <li class="lists__item" v-for="item in sortedItems" :key="item.id">
        <ColorButton
          class="lists__item-button"
          v-for="n in item.quantity"
          :key="n"
          :color="item.color"
          @click="rootStore.deleteItem(title, item.id)"
        />
      </li>
    </ul>

    <ul v-else class="lists__lists">
      <li class="lists__item" v-for="(item, i) in shuffledItems" :key="i">
        <ColorButton
          class="lists__item-button"
          :color="item.color"
          @click="rootStore.deleteItem(title, item.id)"
        />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.lists {
  padding: 10px;

  border: 1px solid $black;
  border-radius: $border-radius;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 10px;
  }

  &__title {
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
  }

  &__lists {
    display: flex;
    flex-wrap: wrap;
  }

  &__item {
    &-button {
      &:not(:last-child) {
        margin-right: 3px;
      }
    }

    &:not(:last-child) {
      margin-right: 3px;
    }
  }
}
</style>
