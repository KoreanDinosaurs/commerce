import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Header from './Header'

export default {
  title: 'Components/Header',
  component: Header,
  argTypes: {},
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />

export const LoggedIn = Template.bind({})

LoggedIn.args = {
  session: true,
}

export const LoggedOut = Template.bind({})

LoggedOut.args = {
  session: false,
}
