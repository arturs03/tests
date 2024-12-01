import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import SearchInput from '@/components//SearchInput.vue'
import { nextTick } from 'vue'

describe('SearchInput', async () => {
  const wrapper = mount(SearchInput)

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  const searchInputEl = wrapper.find('[data-test="search-input"]')

  it('renders component correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  describe('suggested list', async () => {
    const matchList = ['apple', 'apricot', 'almond', 'anise', 'azalea']

    it('emits input value', async () => {
      await searchInputEl.setValue('a')
      await searchInputEl.trigger('keyup', { key: 'a' })

      vi.advanceTimersByTime(400)
      await nextTick()

      expect(wrapper.emitted().search[0]).toEqual(['a'])
    })

    it('re-renders list items from 0 to 5', async () => {
      const oldList = getListItemElements(wrapper)
      expect(oldList.length).toEqual(0)

      await wrapper.setProps({
        list: matchList,
      })
      await nextTick()

      const newList = getListItemElements(wrapper)
      expect(newList).toMatchObject(matchList)
    })

    it('emits selected value "apple"', async () => {
      const firstItem = wrapper.find('.suggested-list__item')
      await firstItem.trigger('click')
      expect(wrapper.emitted().selected[0]).toEqual([matchList[0]])
    })
  })
})

function getListItemElements(wrapper: VueWrapper): string[] {
  return wrapper.findAll('.suggested-list__item').map((item) => item.element.innerHTML)
}
