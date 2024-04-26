<script setup>
import { ref, computed } from 'vue'
import { useRootStore } from '@/stores/root'

const rootStore = useRootStore()

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  title: String
})

const isOpen = ref(false)

const checked = ref([])

const actionClasses = computed(() => {
  return {
    active: isOpen.value
  }
})

const isAllChecked = computed({
  get: () =>
    ({
      0: false,
      [props.items.length]: true
    })[checked.value.length],
  set: (val) => (
    (checked.value = val ? props.items.map((item) => item.id) : []),
    rootStore.updateAllChecked(props.title, val)
  )
})

function changeOpen() {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <form class="form" name="tree">
    <div class="form__header">
      <button class="form__button" type="button" @click="changeOpen">
        <svg
          class="form__button-icon"
          :class="actionClasses"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 6L8 11L13 6"
            stroke="currentColor"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <input
        class="visually-hidden form__header-input"
        type="checkbox"
        v-model="isAllChecked"
        :id="title"
        :indeterminate.prop="isAllChecked === undefined"
      />

      <label class="form__header-label" :for="title"> {{ title }} </label>
    </div>

    <fieldset v-if="isOpen" class="form__fieldset">
      <ul>
        <li class="form__item" v-for="item in items" :key="item.id">
          <input
            class="visually-hidden form__checkbox"
            type="checkbox"
            v-model="checked"
            :value="item.id"
            :id="item.id + title"
            @change="rootStore.updateChecked(title, item.id)"
          />

          <label class="form__label" :for="item.id + title">{{ item.title }}</label>

          <input class="form__number" id="number" type="number" v-model="item.quantity" min="0" />

          <input class="form__color" type="color" v-model="item.color" />
        </li>
      </ul>
    </fieldset>
  </form>
</template>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;

  padding: 10px;

  border: 1px solid $black;
  border-radius: $border-radius;

  &__header {
    display: flex;
    align-items: center;

    margin-bottom: 10px;

    &-label {
      font-size: 16px;
      line-height: 19px;

      position: relative;

      display: block;

      padding-left: 26px;

      cursor: pointer;
      user-select: none;

      &::before {
        position: absolute;
        left: 0;
        top: 0;

        width: 16px;
        height: 16px;

        content: '';

        border: 1px solid $black;
      }
    }

    &-input:checked + &-label::after {
      position: absolute;
      top: 2px;
      left: 2px;

      width: 12px;
      height: 12px;

      content: '';

      background-image: url('@/assets/icons/check.svg');
      background-repeat: no-repeat;
      background-position: 50% 50%;
    }

    &-input:indeterminate + &-label::after {
      position: absolute;
      top: 6px;
      left: 6px;

      width: 4px;
      height: 4px;

      content: '';

      background-color: $black;
    }
  }

  &__button {
    width: 18px;
    height: 18px;
    margin-right: 10px;

    &-icon {
      width: 18px;
      height: 18px;

      transform: rotate(-90deg);

      &.active {
        transform: rotate(0deg);
      }
    }
  }

  &__item {
    display: flex;
    align-items: center;

    margin-bottom: 10px;
    padding-left: 80px;
  }

  &__label {
    position: relative;

    display: block;
    flex-grow: 1;

    margin-right: 8px;

    cursor: pointer;
    user-select: none;

    &::before {
      position: absolute;
      left: -26px;
      top: 0;

      width: 16px;
      height: 16px;

      content: '';

      border: 1px solid $black;
    }
  }

  &__checkbox:checked + &__label::after {
    position: absolute;
    top: 2px;
    left: -24px;

    width: 12px;
    height: 12px;

    content: '';

    background-image: url('@/assets/icons/check.svg');
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }

  &__number {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }

  &__color {
    flex-shrink: 0;

    width: 16px;
    height: 16px;

    cursor: pointer;

    border: 1px solid $grey;
  }
}
</style>
