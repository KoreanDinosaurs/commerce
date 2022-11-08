import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Profile from './Profile'

export default {
  title: 'Components/Profile',
  component: Profile,
  argTypes: {
    rounded: { control: 'boolean', defaultValue: true },
    size: {
      defaultValue: 'medium',
    },
  },
} as ComponentMeta<typeof Profile>

const Template: ComponentStory<typeof Profile> = (args) => <Profile {...args} />

export const Default = Template.bind({})

Default.args = {
  size: 'medium',
}
