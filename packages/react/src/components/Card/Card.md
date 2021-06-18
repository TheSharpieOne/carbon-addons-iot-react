# `Card` component

## Table of Contents

- [Getting started](#getting-started)
- [Custom card content](#custom-card-content)
- [Props](#props)
- [External links](#external-links)
  - [Source Code](#source-code)
  - [Feedback](#feedback)

## Getting Started

The `Card` component is the foundation of all cards in the library.

```jsx
import { Card } from 'carbon-addons-iot-react';
```

## Implementing a custom card

To develop a custom card component.

- Create a new card component that uses the base Card component
- If you want to hide the title/toolbar, do not pass a title prop
- (Optionally, if you want to use the card in a Dashboard) Extend the Card Renderer so the Dashboard knows how to render your card type
- (Optionally, if you want to use the card in a Dashboard) Create a validator for this card type within "utils/schemas/validators" and add it to the validateDashboardJSON function used to validate dashboards on import.

### Data flow for a card in the dashboard

All data loading for a card goes through the dashboard's onFetchData function. There are two ways to trigger a refetch of data for a card. The first is to directly interact
with the Card's range controls. The second is for the Dashboard to trigger that all of the cards need a reload by updating it's isLoading bit. The CardRenderer component will call the onSetupCard function of the dashboard first
for each card (if it exists), then will call the onFetchData function for the dashboard.

```jsx
const isEditable = true;
<Card
  availableActions={{
    expand: true,
    range: true,
  }}
  breakpoint="lg"
  cardDimensions={{
    LARGE: {
      lg: {
        h: 4,
        w: 8,
      },
      max: {
        h: 4,
        w: 8,
      },
      md: {
        h: 4,
        w: 8,
      },
      sm: {
        h: 4,
        w: 4,
      },
      xl: {
        h: 4,
        w: 8,
      },
      xs: {
        h: 4,
        w: 4,
      },
    },
    LARGETHIN: {
      lg: {
        h: 4,
        w: 4,
      },
      max: {
        h: 4,
        w: 4,
      },
      md: {
        h: 4,
        w: 4,
      },
      sm: {
        h: 4,
        w: 4,
      },
      xl: {
        h: 4,
        w: 4,
      },
      xs: {
        h: 4,
        w: 4,
      },
    },
    LARGEWIDE: {
      lg: {
        h: 4,
        w: 16,
      },
      max: {
        h: 4,
        w: 16,
      },
      md: {
        h: 4,
        w: 8,
      },
      sm: {
        h: 4,
        w: 4,
      },
      xl: {
        h: 4,
        w: 16,
      },
      xs: {
        h: 4,
        w: 4,
      },
    },
    MEDIUM: {
      lg: {
        h: 2,
        w: 8,
      },
      max: {
        h: 2,
        w: 8,
      },
      md: {
        h: 2,
        w: 8,
      },
      sm: {
        h: 2,
        w: 4,
      },
      xl: {
        h: 2,
        w: 8,
      },
      xs: {
        h: 2,
        w: 4,
      },
    },
    MEDIUMTHIN: {
      lg: {
        h: 2,
        w: 4,
      },
      max: {
        h: 2,
        w: 4,
      },
      md: {
        h: 2,
        w: 4,
      },
      sm: {
        h: 2,
        w: 2,
      },
      xl: {
        h: 2,
        w: 4,
      },
      xs: {
        h: 2,
        w: 4,
      },
    },
    MEDIUMWIDE: {
      lg: {
        h: 2,
        w: 16,
      },
      max: {
        h: 2,
        w: 16,
      },
      md: {
        h: 2,
        w: 8,
      },
      sm: {
        h: 2,
        w: 4,
      },
      xl: {
        h: 2,
        w: 16,
      },
      xs: {
        h: 2,
        w: 4,
      },
    },
    SMALL: {
      lg: {
        h: 1,
        w: 4,
      },
      max: {
        h: 1,
        w: 4,
      },
      md: {
        h: 1,
        w: 4,
      },
      sm: {
        h: 1,
        w: 2,
      },
      xl: {
        h: 1,
        w: 4,
      },
      xs: {
        h: 1,
        w: 4,
      },
    },
    SMALLFULL: {
      lg: {
        h: 1,
        w: 16,
      },
      max: {
        h: 1,
        w: 16,
      },
      md: {
        h: 1,
        w: 8,
      },
      sm: {
        h: 2,
        w: 8,
      },
      xl: {
        h: 1,
        w: 16,
      },
      xs: {
        h: 1,
        w: 4,
      },
    },
    SMALLWIDE: {
      lg: {
        h: 1,
        w: 8,
      },
      max: {
        h: 1,
        w: 8,
      },
      md: {
        h: 1,
        w: 8,
      },
      sm: {
        h: 2,
        w: 4,
      },
      xl: {
        h: 1,
        w: 8,
      },
      xs: {
        h: 1,
        w: 4,
      },
    },
    TALL: {
      lg: {
        h: 4,
        w: 4,
      },
      max: {
        h: 4,
        w: 4,
      },
      md: {
        h: 4,
        w: 4,
      },
      sm: {
        h: 4,
        w: 4,
      },
      xl: {
        h: 4,
        w: 4,
      },
      xs: {
        h: 4,
        w: 4,
      },
    },
    WIDE: {
      lg: {
        h: 2,
        w: 8,
      },
      max: {
        h: 2,
        w: 8,
      },
      md: {
        h: 2,
        w: 8,
      },
      sm: {
        h: 2,
        w: 4,
      },
      xl: {
        h: 2,
        w: 8,
      },
      xs: {
        h: 2,
        w: 4,
      },
    },
    XLARGE: {
      lg: {
        h: 4,
        w: 16,
      },
      max: {
        h: 4,
        w: 16,
      },
      md: {
        h: 4,
        w: 8,
      },
      sm: {
        h: 4,
        w: 4,
      },
      xl: {
        h: 4,
        w: 16,
      },
      xs: {
        h: 4,
        w: 4,
      },
    },
    XSMALL: {
      lg: {
        h: 1,
        w: 4,
      },
      max: {
        h: 1,
        w: 2,
      },
      md: {
        h: 1,
        w: 4,
      },
      sm: {
        h: 1,
        w: 2,
      },
      xl: {
        h: 1,
        w: 2,
      },
      xs: {
        h: 1,
        w: 4,
      },
    },
    XSMALLWIDE: {
      lg: {
        h: 1,
        w: 4,
      },
      max: {
        h: 1,
        w: 4,
      },
      md: {
        h: 1,
        w: 4,
      },
      sm: {
        h: 2,
        w: 4,
      },
      xl: {
        h: 1,
        w: 4,
      },
      xs: {
        h: 1,
        w: 4,
      },
    },
  }}
  dashboardBreakpoints={{
    lg: 1056,
    max: 1584,
    md: 672,
    sm: 480,
    xl: 1312,
    xs: 320,
  }}
  dashboardColumns={{
    lg: 16,
    max: 16,
    md: 8,
    sm: 8,
    xl: 16,
    xs: 4,
  }}
  hideHeader
  i18n={{
    cloneCardLabel: 'Clone card',
    closeLabel: 'Close',
    dailyLabel: 'Daily',
    defaultLabel: 'Default',
    deleteCardLabel: 'Delete card',
    editCardLabel: 'Edit card',
    errorLoadingDataLabel: 'Error loading data for this card: ',
    errorLoadingDataShortLabel: 'Data error.',
    expandLabel: 'Expand to fullscreen',
    hourlyLabel: 'Hourly',
    last24HoursLabel: 'Last 24 hrs',
    last7DaysLabel: 'Last 7 days',
    lastMonthLabel: 'Last month',
    lastQuarterLabel: 'Last quarter',
    lastYearLabel: 'Last year',
    monthlyLabel: 'Monthly',
    noDataLabel: 'No data is available for this time range.',
    noDataShortLabel: 'No data',
    overflowMenuDescription: 'Open and close list of options',
    periodToDateLabel: 'Period to date',
    rollingPeriodLabel: 'Rolling period',
    selectTimeRangeLabel: 'Select time range',
    thisMonthLabel: 'This month',
    thisQuarterLabel: 'This quarter',
    thisWeekLabel: 'This week',
    thisYearLabel: 'This year',
    timeRangeLabel: 'Time range',
    weeklyLabel: 'Weekly',
  }}
  id="mycard"
  isEditable={true}
  isEmpty={false}
  isExpanded={false}
  isLazyLoading={false}
  isLoading={false}
  layout="HORIZONTAL"
  onBlur={undefined}
  onCardAction={(cardId, action) => {}}
  onFocus={undefined}
  onMouseDown={undefined}
  onMouseUp={undefined}
  onScroll={undefined}
  onTouchEnd={undefined}
  onTouchStart={undefined}
  renderExpandIcon={undefined}
  rowHeight={{
    lg: 144,
    max: 144,
    md: 144,
    sm: 144,
    xl: 144,
    xs: 144,
  }}
  size="MEDIUM"
  tabIndex={undefined}
  testID="Card"
  timeRange={undefined}
  title="Custom Card Title"
  toolbar={undefined}
  values={[{ timestamp: 12341231231, value1: 'my value' }]}
>
  {!isEditable
    ? (_$, { cardToolbar, values }) => (
        <Table
          id="my table"
          secondaryTitle={title}
          columns={[
            {
              id: 'value1',
              name: 'String',
              filter: { placeholderText: 'enter a string' },
            },
            {
              id: 'timestamp',
              name: 'Date',
              filter: { placeholderText: 'enter a date' },
            },
          ]}
          data={values.map((value, index) => ({
            id: `rowid-${index}`,
            values: value,
          }))}
          view={{ toolbar: { customToolbarContent: cardToolbar } }}
        />
      )
    : 'Fake Sample Data'}
</Card>;
```

## Props

| Name                            | Type                                                                                                                                                  | Default                                                                   | Description                                                                                                                                        |
| :------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                              | string                                                                                                                                                |                                                                           |                                                                                                                                                    |
| size                            | enum: <br/>'SMALL'<br/>'SMALLWIDE'<br/>'SMALLFULL'<br/>'MEDIUMTHIN'<br/>'MEDIUM' <br/> 'MEDIUMWIDE' <br/> 'LARGETHIN' <br/> 'LARGE' <br/> 'LARGEWIDE' |                                                                           | card size                                                                                                                                          |
| layout                          | enum: <br/>'VERTICAL'<br/>'HORIZONTAL'<br/>                                                                                                           |                                                                           |                                                                                                                                                    |
| title                           | string                                                                                                                                                | undefined                                                                 |                                                                                                                                                    |
| toolbar                         | element                                                                                                                                               | undefined                                                                 |                                                                                                                                                    |
| hideHeader                      | bool                                                                                                                                                  | false                                                                     |                                                                                                                                                    |
| timeRange                       | string                                                                                                                                                | undefined                                                                 |                                                                                                                                                    |
| isLoading                       | bool                                                                                                                                                  | false                                                                     |                                                                                                                                                    |
| isEmpty                         | bool                                                                                                                                                  | false                                                                     |                                                                                                                                                    |
| isEditable                      | bool                                                                                                                                                  | false                                                                     |                                                                                                                                                    |
| isExpanded                      | bool                                                                                                                                                  | false                                                                     |                                                                                                                                                    |
| isLazyLoading                   | bool                                                                                                                                                  | false                                                                     |                                                                                                                                                    |
| availableActions                | shape                                                                                                                                                 | { edit: false, clone: false, delete: false, range: false, expand: false,} |                                                                                                                                                    |
| availableActions.edit           | bool                                                                                                                                                  |                                                                           |                                                                                                                                                    |
| availableActions.clone          | bool                                                                                                                                                  |                                                                           |                                                                                                                                                    |
| availableActions.delete         | bool                                                                                                                                                  |                                                                           |                                                                                                                                                    |
| availableActions.expand         | bool                                                                                                                                                  |                                                                           |                                                                                                                                                    |
| availableActions.range          | bool                                                                                                                                                  |                                                                           |                                                                                                                                                    |
| renderExpandIcon                | function, node                                                                                                                                        | undefined                                                                 |                                                                                                                                                    |
| rowHeight                       | shape                                                                                                                                                 |                                                                           | Row height in pixels for each layout                                                                                                               |
| rowHeight.lg                    | number                                                                                                                                                |                                                                           |                                                                                                                                                    |
| rowHeight.md                    | number                                                                                                                                                |                                                                           |                                                                                                                                                    |
| rowHeight.sm                    | number                                                                                                                                                |                                                                           |                                                                                                                                                    |
| rowHeight.xs                    | number                                                                                                                                                |                                                                           |                                                                                                                                                    |
| breakpoint                      | enum:<br>'lg'<br>'max'<br>'md'<br>'sm'<br>'xl'<br>'xs'<br>                                                                                            |                                                                           |                                                                                                                                                    |
| dashboardBreakpoints            | shape                                                                                                                                                 |                                                                           | media query pixel measurement that determines which particular dashboard layout should be used                                                     |
| dashboardBreakpoints.lg         | number                                                                                                                                                |                                                                           |                                                                                                                                                    |
| dashboardBreakpoints.md         | number                                                                                                                                                |                                                                           |                                                                                                                                                    |
| dashboardBreakpoints.sm         | number                                                                                                                                                |                                                                           |                                                                                                                                                    |
| dashboardBreakpoints.xs         | number                                                                                                                                                |                                                                           |                                                                                                                                                    |
| dashboardColumns                | shape                                                                                                                                                 |                                                                           | map of number of columns to a given dashboard layout                                                                                               |
| dashboardColumns.lg             | number                                                                                                                                                |                                                                           |                                                                                                                                                    |
| dashboardColumns.md             | number                                                                                                                                                |                                                                           |                                                                                                                                                    |
| dashboardColumns.sm             | number                                                                                                                                                |                                                                           |                                                                                                                                                    |
| dashboardColumns.xs             | number                                                                                                                                                |                                                                           |                                                                                                                                                    |
| cardDimensions                  | shape [see cardDimensions Prop](#carddimensions-prop)                                                                                                 |                                                                           | array of configurable sizes to dimensions. The numbered sizes represent the number of columns and rows the card spans at that size and breakpoint. |
| i18n                            | shape                                                                                                                                                 |                                                                           |                                                                                                                                                    |
| i18n.noDataLabel                | string                                                                                                                                                | 'No data is available for this time range.'                               |                                                                                                                                                    |
| i18n.noDataShortLabel           | string                                                                                                                                                | 'No data'                                                                 |                                                                                                                                                    |
| i18n.errorLoadingDataLabel      | string                                                                                                                                                | 'Error loading data for this card: '                                      |                                                                                                                                                    |
| i18n.errorLoadingDataShortLabel | string                                                                                                                                                | 'Data error.'                                                             |                                                                                                                                                    |
| i18n.rollingPeriodLabel         | string                                                                                                                                                | 'Rolling period'                                                          |                                                                                                                                                    |
| i18n.last24HoursLabel           | string                                                                                                                                                | 'Last 24 hrs'                                                             |                                                                                                                                                    |
| i18n.last7DaysLabel             | string                                                                                                                                                | 'Last 7 days'                                                             |                                                                                                                                                    |
| i18n.lastMonthLabel             | string                                                                                                                                                | 'Last month'                                                              |                                                                                                                                                    |
| i18n.lastQuarterLabel           | string                                                                                                                                                | 'Last quarter'                                                            |                                                                                                                                                    |
| i18n.periodToDateLabel          | string                                                                                                                                                | 'Period to date'                                                          |                                                                                                                                                    |
| i18n.thisWeekLabel              | string                                                                                                                                                | 'This week'                                                               |                                                                                                                                                    |
| i18n.thisMonthLabel             | string                                                                                                                                                | 'This month'                                                              |                                                                                                                                                    |
| i18n.thisQuarterLabel           | string                                                                                                                                                | 'This quarter'                                                            |                                                                                                                                                    |
| i18n.thisYearLabel              | string                                                                                                                                                | 'This year'                                                               |                                                                                                                                                    |
| i18n.hourlyLabel                | string                                                                                                                                                | 'Hourly'                                                                  |                                                                                                                                                    |
| i18n.dailyLabel                 | string                                                                                                                                                | 'Daily'                                                                   |                                                                                                                                                    |
| i18n.weeklyLabel                | string                                                                                                                                                | 'Weekly'                                                                  |                                                                                                                                                    |
| i18n.monthlyLabel               | string                                                                                                                                                | 'Monthly'                                                                 |                                                                                                                                                    |
| i18n.defaultLabel               | node                                                                                                                                                  | 'Default'                                                                 |                                                                                                                                                    |
| i18n.selectTimeRangeLabel       | string                                                                                                                                                | 'Select time range'                                                       |                                                                                                                                                    |
| i18n.editCardLabel              | string                                                                                                                                                | 'Edit card'                                                               |                                                                                                                                                    |
| i18n.cloneCardLabel             | string                                                                                                                                                | 'Clone card'                                                              |                                                                                                                                                    |
| i18n.deleteCardLabel            | string                                                                                                                                                | 'Delete card'                                                             |                                                                                                                                                    |
| i18n.expandLabel                | string                                                                                                                                                | 'Expand to fullscreen'                                                    |                                                                                                                                                    |
| i18n.closeLabel                 | string                                                                                                                                                | 'Close'                                                                   |                                                                                                                                                    |
| i18n.loadingDataLabel           | string                                                                                                                                                |                                                                           |                                                                                                                                                    |
| i18n.overflowMenuDescription    | string                                                                                                                                                | 'Open and close list of options'                                          |                                                                                                                                                    |
| onMouseDown                     | function                                                                                                                                              | undefined                                                                 |                                                                                                                                                    |
| onMouseUp                       | function                                                                                                                                              | undefined                                                                 |                                                                                                                                                    |
| onTouchEnd                      | function                                                                                                                                              | undefined                                                                 |                                                                                                                                                    |
| onTouchStart                    | function                                                                                                                                              | undefined                                                                 |                                                                                                                                                    |
| onScroll                        | function                                                                                                                                              | undefined                                                                 |                                                                                                                                                    |
| onFocus                         | function                                                                                                                                              | undefined                                                                 |                                                                                                                                                    |
| onBlur                          | function                                                                                                                                              | undefined                                                                 |                                                                                                                                                    |
| tabIndex                        | number                                                                                                                                                | undefined                                                                 |                                                                                                                                                    |
| testID                          | string                                                                                                                                                | CardWrapper.defaultProps.testID                                           |                                                                                                                                                    |

### cardDimensions Prop

| Name                       | Type   | Default | Description |
| :------------------------- | :----- | :------ | :---------- |
| cardDimensions.XSMALL      | shape  |         |             |
| cardDimensions.XSMALL.lg   | shape  |         |             |
| cardDimensions.XSMALL.lg.w | number |         |             |
| cardDimensions.XSMALL.lg.h | number |         |             |
| cardDimensions.XSMALL.md   | shape  |         |             |
| cardDimensions.XSMALL.md.w | number |         |             |
| cardDimensions.XSMALL.md.h | number |         |             |
| cardDimensions.XSMALL.sm   | shape  |         |             |
| cardDimensions.XSMALL.sm.w | number |         |             |
| cardDimensions.XSMALL.sm.h | number |         |             |
| cardDimensions.XSMALL.xs   | shape  |         |             |
| cardDimensions.XSMALL.xs.w | number |         |             |
| cardDimensions.XSMALL.xs.h | number |         |             |
| cardDimensions.SMALL       | shape  |         |             |
| cardDimensions.SMALL.lg    | shape  |         |             |
| cardDimensions.SMALL.lg.w  | number |         |             |
| cardDimensions.SMALL.lg.h  | number |         |             |
| cardDimensions.SMALL.md    | shape  |         |             |
| cardDimensions.SMALL.md.w  | number |         |             |
| cardDimensions.SMALL.md.h  | number |         |             |
| cardDimensions.SMALL.sm    | shape  |         |             |
| cardDimensions.SMALL.sm.w  | number |         |             |
| cardDimensions.SMALL.sm.h  | number |         |             |
| cardDimensions.SMALL.xs    | shape  |         |             |
| cardDimensions.SMALL.xs.w  | number |         |             |
| cardDimensions.SMALL.xs.h  | number |         |             |
| cardDimensions.TALL        | shape  |         |             |
| cardDimensions.TALL.lg     | shape  |         |             |
| cardDimensions.TALL.lg.w   | number |         |             |
| cardDimensions.TALL.lg.h   | number |         |             |
| cardDimensions.TALL.md     | shape  |         |             |
| cardDimensions.TALL.md.w   | number |         |             |
| cardDimensions.TALL.md.h   | number |         |             |
| cardDimensions.TALL.sm     | shape  |         |             |
| cardDimensions.TALL.sm.w   | number |         |             |
| cardDimensions.TALL.sm.h   | number |         |             |
| cardDimensions.TALL.xs     | shape  |         |             |
| cardDimensions.TALL.xs.w   | number |         |             |
| cardDimensions.TALL.xs.h   | number |         |             |
| cardDimensions.MEDIUM      | shape  |         |             |
| cardDimensions.MEDIUM.lg   | shape  |         |             |
| cardDimensions.MEDIUM.lg.w | number |         |             |
| cardDimensions.MEDIUM.lg.h | number |         |             |
| cardDimensions.MEDIUM.md   | shape  |         |             |
| cardDimensions.MEDIUM.md.w | number |         |             |
| cardDimensions.MEDIUM.md.h | number |         |             |
| cardDimensions.MEDIUM.sm   | shape  |         |             |
| cardDimensions.MEDIUM.sm.w | number |         |             |
| cardDimensions.MEDIUM.sm.h | number |         |             |
| cardDimensions.MEDIUM.xs   | shape  |         |             |
| cardDimensions.MEDIUM.xs.w | number |         |             |
| cardDimensions.MEDIUM.xs.h | number |         |             |
| cardDimensions.WIDE        | shape  |         |             |
| cardDimensions.WIDE.lg     | shape  |         |             |
| cardDimensions.WIDE.lg.w   | number |         |             |
| cardDimensions.WIDE.lg.h   | number |         |             |
| cardDimensions.WIDE.md     | shape  |         |             |
| cardDimensions.WIDE.md.w   | number |         |             |
| cardDimensions.WIDE.md.h   | number |         |             |
| cardDimensions.WIDE.sm     | shape  |         |             |
| cardDimensions.WIDE.sm.w   | number |         |             |
| cardDimensions.WIDE.sm.h   | number |         |             |
| cardDimensions.WIDE.xs     | shape  |         |             |
| cardDimensions.WIDE.xs.w   | number |         |             |
| cardDimensions.WIDE.xs.h   | number |         |             |
| cardDimensions.LARGE       | shape  |         |             |
| cardDimensions.LARGE.lg    | shape  |         |             |
| cardDimensions.LARGE.lg.w  | number |         |             |
| cardDimensions.LARGE.lg.h  | number |         |             |
| cardDimensions.LARGE.md    | shape  |         |             |
| cardDimensions.LARGE.md.w  | number |         |             |
| cardDimensions.LARGE.md.h  | number |         |             |
| cardDimensions.LARGE.sm    | shape  |         |             |
| cardDimensions.LARGE.sm.w  | number |         |             |
| cardDimensions.LARGE.sm.h  | number |         |             |
| cardDimensions.LARGE.xs    | shape  |         |             |
| cardDimensions.LARGE.xs.w  | number |         |             |
| cardDimensions.LARGE.xs.h  | number |         |             |
| cardDimensions.XLARGE      | shape  |         |             |
| cardDimensions.XLARGE.lg   | shape  |         |             |
| cardDimensions.XLARGE.lg.w | number |         |             |
| cardDimensions.XLARGE.lg.h | number |         |             |
| cardDimensions.XLARGE.md   | shape  |         |             |
| cardDimensions.XLARGE.md.w | number |         |             |
| cardDimensions.XLARGE.md.h | number |         |             |
| cardDimensions.XLARGE.sm   | shape  |         |             |
| cardDimensions.XLARGE.sm.w | number |         |             |
| cardDimensions.XLARGE.sm.h | number |         |             |
| cardDimensions.XLARGE.xs   | shape  |         |             |
| cardDimensions.XLARGE.xs.w | number |         |             |
| cardDimensions.XLARGE.xs.h | number |         |             |

## External Links

### Source Code

[Source code](https://github.com/carbon-design-system/carbon-addons-iot-react/tree/next/packages/react/src/components/Card)

### Feedback

Help us improve this component by providing feedback, asking questions on Slack, or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon-addons-iot-react/tree/next/packages/react/src/components/Card/Card.md).