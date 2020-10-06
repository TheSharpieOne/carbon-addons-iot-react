import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, object } from '@storybook/addon-knobs';
import { Switcher24 } from '@carbon/icons-react';
import Chip from '@carbon/icons-react/lib/chip/24';
import Dashboard from '@carbon/icons-react/lib/dashboard/24';
import Group from '@carbon/icons-react/lib/group/24';

import { SuiteHeader, Card, Link } from '../../index';
import { CARD_ACTIONS } from '../../constants/LayoutConstants';

import DashboardEditor from './DashboardEditor';

const sideNavLinks = [
  {
    icon: Switcher24,
    isEnabled: true,
    metaData: {
      tabIndex: 0,
      label: 'Boards',
      element: ({ children, ...rest }) => <div {...rest}>{children}</div>,
      // isActive: true,
    },
    linkContent: 'Boards',
    childContent: [
      {
        metaData: {
          label: 'Yet another link',
          title: 'Yet another link',
          element: 'button',
        },
        content: 'Yet another link',
      },
    ],
  },
  {
    isEnabled: true,
    icon: Chip,
    metaData: {
      label: 'Devices',
      href: 'https://google.com',
      element: 'a',
      target: '_blank',
    },
    linkContent: 'Devices',
  },
  {
    isEnabled: true,
    icon: Dashboard,
    metaData: {
      label: 'Dashboards',
      href: 'https://google.com',
      element: 'a',
      target: '_blank',
    },
    linkContent: 'Dashboards',
    childContent: [
      {
        metaData: {
          label: 'Link 1',
          title: 'Link 1',
          element: 'button',
        },
        content: 'Link 1',
      },
      {
        metaData: {
          label: 'Link 2',
          title: 'Link 2',
        },
        content: 'Link 2',
      },
    ],
  },
  {
    isEnabled: true,
    icon: Group,
    metaData: {
      label: 'Members',
      element: 'button',
    },
    linkContent: 'Members',
    childContent: [
      {
        metaData: {
          label: 'Yet another link',
          title: 'Yet another link',
          element: 'button',
        },
        content: 'Link 3',
        isActive: true,
      },
    ],
  },
];

storiesOf('Watson IoT Experimental/DashboardEditor', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ height: 'calc(100vh - 6rem)' }}>
      <DashboardEditor
        title={text('title', 'My dashboard')}
        onAddImage={action('onAddImage')}
        onCancel={action('onCancel')}
        onSubmit={action('onSubmit')}
        supportedCardTypes={object('supportedCardTypes', [
          'BAR',
          'TIMESERIES',
          'VALUE',
          'TABLE',
          'OTHER',
        ])}
        headerBreadcrumbs={[
          <Link href="www.ibm.com">Dashboard library</Link>,
          <Link href="www.ibm.com">Favorites</Link>,
        ]}
      />
    </div>
  ))
  .add('wrapped in SuiteHeader', () => (
    <div style={{ height: 'calc(100vh - 3rem)', marginRight: '-3rem' }}>
      <SuiteHeader
        suiteName="Application Suite"
        appName="Application Name"
        userDisplayName="Admin User"
        username="adminuser"
        routes={{
          profile: 'https://www.ibm.com',
          navigator: 'https://www.ibm.com',
          admin: 'https://www.ibm.com',
          logout: 'https://www.ibm.com',
          whatsNew: 'https://www.ibm.com',
          gettingStarted: 'https://www.ibm.com',
          documentation: 'https://www.ibm.com',
          requestEnhancement: 'https://www.ibm.com',
          support: 'https://www.ibm.com',
          about: 'https://www.ibm.com',
        }}
        applications={[
          {
            id: 'monitor',
            name: 'Monitor',
            href: 'https://www.ibm.com',
          },
          {
            id: 'health',
            name: 'Health',
            href: 'https://www.ibm.com',
            isExternal: true,
          },
        ]}
        sideNavProps={{
          links: sideNavLinks,
        }}
      />
      <DashboardEditor
        title={text('title', 'My dashboard')}
        onCancel={action('onCancel')}
        onSubmit={action('onSubmit')}
        supportedCardTypes={object('supportedCardTypes', [
          'BAR',
          'TIMESERIES',
          'VALUE',
          'TABLE',
          'OTHER',
        ])}
        headerBreadcrumbs={[
          <Link href="www.ibm.com">Dashboard library</Link>,
          <Link href="www.ibm.com">Favorites</Link>,
        ]}
      />
    </div>
  ))
  .add('custom card preview renderer', () => (
    <div style={{ height: 'calc(100vh - 6rem)' }}>
      <DashboardEditor
        title="Custom dashboard"
        initialValue={{
          cards: [
            {
              id: 'Custom',
              title: 'Custom rendered card',
              type: 'CUSTOM',
              size: 'MEDIUM',
              value: 35,
            },
            {
              id: 'Standard',
              title: 'Default rendered card',
              type: 'VALUE',
              size: 'MEDIUM',
              content: {
                attributes: [
                  {
                    dataSourceId: 'key1',
                    unit: '%',
                    label: 'Key 1',
                  },
                  {
                    dataSourceId: 'key2',
                    unit: 'lb',
                    label: 'Key 2',
                  },
                ],
              },
            },
          ],
          layouts: {},
        }}
        onCancel={action('onCancel')}
        onSubmit={action('onSubmit')}
        supportedCardTypes={object('supportedCardTypes', [
          'BAR',
          'TIMESERIES',
          'VALUE',
          'TABLE',
          'CUSTOM',
          'OTHER',
        ])}
        i18n={{
          cardType_CUSTOM: 'Custom',
        }}
        headerBreadcrumbs={[
          <Link href="www.ibm.com">Dashboard library</Link>,
          <Link href="www.ibm.com">Favorites</Link>,
        ]}
        renderCardPreview={(cardJson, isSelected, onSelectCard, onRemoveCard) => {
          const commonProps = isSelected
            ? { className: 'selected-card' }
            : {
                availableActions: { edit: true, delete: true },
                onCardAction: (id, actionId) => {
                  if (actionId === CARD_ACTIONS.EDIT_CARD) {
                    onSelectCard(id);
                  }
                  if (actionId === CARD_ACTIONS.DELETE_CARD) {
                    onRemoveCard(id);
                  }
                },
              };
          return cardJson.type === 'CUSTOM' ? (
            <Card
              key={cardJson.id}
              id={cardJson.id}
              size={cardJson.size}
              title={cardJson.title}
              isEditable
              {...commonProps}
            >
              <div style={{ padding: '1rem' }}>
                This content is rendered by the renderCardPreview function. The &quot;value&quot;
                property on the card will be rendered here:
                <h3>{cardJson.value}</h3>
              </div>
            </Card>
          ) : (
            undefined
          );
        }}
      />
    </div>
  ));