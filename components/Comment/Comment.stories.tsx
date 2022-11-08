import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Comment } from './Comment'

export default {
  title: 'Components/Comment',
  component: Comment,
  argTypes: {},
} as ComponentMeta<typeof Comment>

const Template: ComponentStory<typeof Comment> = (args) => <Comment {...args} />

export const Primary = Template.bind({})

Primary.args = {
  item: {
    amount: 1,
    contents:
      '{"blocks":[{"key":"ese7q","text":"좋다!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    price: 1,
    quantity: 1,
    rate: 1,
    updatedAt: '2022-11-02T07:16:18.026Z',
    userName: '내가 VIP',
    userImage: 'image/default-profile.jpeg',
    productImage:
      'https://kream-phinf.pstatic.net/MjAyMjA1MTZfMjA3/MDAxNjUyNjcxMjcyNTcy.AO5rfBB9wfHmEVhd6mVJRljdrSWrSSAGElGVWqqKR2cg.neZLmxf9poOvVzwv5WF7BEZMGLE7hABfzxARJwtxSz4g.JPEG/a_b289e1ade93740ff926703bb7a25e150.jpg?type=l_webp',
    productName: '상품명',
  },
}
