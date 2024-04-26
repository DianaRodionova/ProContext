import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRootStore = defineStore('root', () => {
  const lists = ref([
    {
      name: 'List1',
      items: [
        { id: 1, title: 'item 1', quantity: 5, color: '#ff0000', checked: false },
        { id: 2, title: 'item 2', quantity: 1, color: '#ff00ff', checked: false },
        { id: 3, title: 'item 3', quantity: 2, color: '#000000', checked: false },
        { id: 4, title: 'item 4', quantity: 0, color: '#ffffff', checked: false }
      ]
    },

    {
      name: 'List2',
      items: [
        { id: 1, title: 'item 1', quantity: 5, color: '#ff0000', checked: false },
        { id: 2, title: 'item 2', quantity: 1, color: '#ff00ff', checked: false },
        { id: 3, title: 'item 3', quantity: 2, color: '#000000', checked: false },
        { id: 4, title: 'item 4', quantity: 0, color: '#ffffff', checked: false },
        { id: 5, title: 'item 4', quantity: 8, color: '#0000ff', checked: false }
      ]
    },
    {
      name: 'List3',
      items: [
        { id: 1, title: 'item 1', quantity: 5, color: '#ff0000', checked: false },
        { id: 2, title: 'item 2', quantity: 1, color: '#dddd00', checked: false },
        { id: 3, title: 'item 3', quantity: 2, color: '#000000', checked: false },
        { id: 4, title: 'item 4', quantity: 0, color: '#ff00ff', checked: false }
      ]
    },
    {
      name: 'List4',
      items: [
        { id: 1, title: 'item 1', quantity: 5, color: '#ff0000', checked: false },
        { id: 2, title: 'item 2', quantity: 1, color: '#ff00ff', checked: false },
        { id: 3, title: 'item 3', quantity: 2, color: '#000000', checked: false },
        { id: 4, title: 'item 4', quantity: 0, color: '#ffffff', checked: false }
      ]
    }
  ])

  function updateChecked(name, id) {
    const list = lists.value.find((item) => item.name === name)
    const item = list.items.find((item) => item.id === id)
    item.checked = !item.checked
  }

  function updateAllChecked(name, val) {
    const list = lists.value.find((item) => item.name === name)
    list.items.forEach((item) => (item.checked = val))
  }

  function deleteItem(name, id) {
    const list = lists.value.find((item) => item.name === name)
    const item = list.items.find((item) => item.id === id)
    item.quantity -= 1
  }

  return {
    lists,
    updateChecked,
    updateAllChecked,
    deleteItem
  }
})
