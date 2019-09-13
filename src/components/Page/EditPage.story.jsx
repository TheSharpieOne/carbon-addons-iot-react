import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';

import EditPage from './EditPage';

const commonEditPageProps = {
  title: 'Page Title',
  onClose: action('onClose'),
  onSave: action('onSave'),
  children: <div>child</div>,
};
const breadcrumb = [<a href="/">Home</a>, <a href="/">Type</a>, <span>Instance</span>];
storiesOf('EditPage', module)
  .add('normal', () => <EditPage {...commonEditPageProps} />)
  .add('isLoading', () => <EditPage {...commonEditPageProps} isLoading />)
  .add('with blurb', () => (
    <EditPage {...commonEditPageProps} blurb={text('blurb', 'My blurrrrbbbb!!')} />
  ))
  .add('with breadcrumb', () => <EditPage {...commonEditPageProps} breadcrumb={breadcrumb} />);