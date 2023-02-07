import { Spinner } from './Spinner';

import type { SpinnerProps } from './Spinner';
import type { Meta, Story } from '@storybook/react';

const meta: Meta = {
  title: 'Components/Elements/Spinner',
  component: Spinner,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<SpinnerProps> = (props) => <Spinner {...props} />;

export const Default = Template.bind({});
Default.args = {};
