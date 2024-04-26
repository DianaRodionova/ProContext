<script setup>
import { storeToRefs } from 'pinia'
import { useRootStore } from '@/stores/root'
import Form from '@/components/Form.vue'
import Lists from '@/components/Lists.vue'

const rootStore = useRootStore()
const { lists } = storeToRefs(rootStore)
</script>

<template>
  <div class="app">
    <ul class="app__panel">
      <li class="app__form" v-for="list in lists" :key="list.name">
        <Form :items="list.items" :title="list.name" />
      </li>
    </ul>

    <ul class="app__panel">
      <li class="app__lists" v-for="list in lists" :key="list.name">
        <Lists :list="list" :items="list.items" :title="list.name" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.app {
  display: flex;
  justify-content: space-between;

  width: 1080px;
  height: 100%;
  margin: 0 auto;
  padding: 40px;

  &__panel {
    width: 45%;
    padding: 20px;

    border: 1px solid $black;
    border-radius: $border-radius;
  }

  &__form:not(:last-child) {
    margin-bottom: 10px;
  }

  &__lists:not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>
