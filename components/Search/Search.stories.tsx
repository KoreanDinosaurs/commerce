import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Search from './Search'

export default {
  title: 'Components/Search',
  component: Search,
  argTypes: {},
} as ComponentMeta<typeof Search>

const Template: ComponentStory<typeof Search> = (args) => <Search {...args} />

export const Default = Template.bind({})

Default.args = {
  placeholder: '검색어를 입력해주세요',
}

export const IconSearch = Template.bind({})

IconSearch.args = {
  placeholder: '검색어를 입력해주세요',
  leftIcon: true,
  rightIcon: true,
}
