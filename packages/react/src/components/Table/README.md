# `Table` component

## Table of Contents

- [Getting started](#getting-started)
- [Sorting](#sorting)
  - [Programmatic sorting](#programmatic-sorting)
  - [Custom sorting](#custom-sorting)
- [Expansion](#expansion)
  - [Programmatic expansion](#programmatic-expansion)
- [Selection](#selection)
  - [Programmatic selection](#programmatic-selection)
- [Filtering](#filtering)
  - [Simple Filtering](#simple-filtering)
  - [☢️ Advanced Filtering Experimental](#%EF%B8%8F-advanced-filtering-experimental)
- [Pagination](#pagination)
- [Batch actions](#batch-actions)
- [Props](#props)
  - [Column Prop](#column-prop)
  - [Data Prop](#data-prop)
  - [ExpandedData Prop](#expandeddata-prop)
  - [Options Prop](#options-prop)
  - [View Prop](#view-prop)
  - [Actions Prop](#actions-prop)
  - [i18n Prop](#i18n-prop)
- [Source Code](#source-code)
- [Feedback](#feedback)

## Getting started

You can implement a data table in your project by importing the `DataTable`
component and using it along with any additional table components that you need.

```js
import { Table } from 'carbon-addons-iot-react';
```

For basic table support, you can render the functional `<Table/>` component with only the columns and data props. This table does not have any state management built in. If you want that, use the `<StatefulTable/>` component or you will need to implement your own listeners and state management. You can reuse our tableReducer and tableActions with the useReducer hook to update state.

To enable simple search on a table, simply set the prop options.hasSearch=true. We wouldn’t recommend enabling column filters on a table and simple search for UX reasons, but it is supported.

Warning: Searching, filtering, and sorting is only enabled for strings, numbers, and booleans.

```js
const columns = [
  {
    id: 'string',
    name: 'String',
    filter: { placeholderText: 'enter a string' },
  },

  {
    id: 'date',
    name: 'Date',
    filter: { placeholderText: 'enter a date' },
  },
  {
    id: 'select',
    name: 'Select',
    filter: {
      placeholderText: 'pick an option',
      options: [
        {
          id: 'option-A',
          text: 'option-A',
        },
        {
          id: 'option-B',
          text: 'option-B',
        },
        {
          id: 'option-C',
          text: 'option-C',
        },
        {
          id: 'option-D',
          text: 'option-D',
        },
        {
          id: 'option-E',
          text: 'option-E',
        },
        {
          id: 'option-F',
          text: 'option-F',
        },
      ],
    },
  },
  {
    id: 'secretField',
    name: 'Secret Information',
  },
  {
    id: 'status',
    name: 'Status',
    renderDataFunction: ({ value }) => {
      // return custom component
    },
    sortFunction: ({ data, columnId, direction }) => {
      // return -1, 0, 1
    },
  },
  {
    id: 'number',
    name: 'Number',
    filter: { placeholderText: 'enter a number' },
  },
  {
    id: 'boolean',
    name: 'Boolean',
    filter: { placeholderText: 'true or false' },
  },
  {
    id: 'node',
    name: 'React Node',
  },
];
```

The `columns` will specify the columns used in your table. The `name`
property for each item will describe what the user sees in the table column
header. The `id` property is used to relate what value a row has for the given
column.

```js
const actions = {
  pagination: {
    /** Specify a callback for when the current page or page size is changed. This callback is passed an object parameter containing the current page and the current page size */
    onChangePage: () => {},
  },
  toolbar: {
    onApplyFilter: () => {},
    onToggleFilter: () => {},
    onShowRowEdit: () => {},
    onToggleColumnSelection: () => {},
    /** Specify a callback for when the user clicks toolbar button to clear all filters. Recieves a parameter of the current filter values for each column */
    onClearAllFilters: () => {},
    onCancelBatchAction: () => {},
    onApplyBatchAction: () => {},
    onApplySearch: () => {},
    /** advanced filter actions */
    onCancelAdvancedFilter: () => {},
    onRemoveAdvancedFilter: () => {},
    onCreateAdvancedFilter: () => {},
    onChangeAdvancedFilter: () => {},
    onApplyAdvancedFilter: () => {},
    onToggleAdvancedFilter: () => {},
  },
  table: {
    onRowClicked: () => {},
    onRowSelected: () => {},
    onSelectAll: () => {},
    onEmptyStateAction: () => {},
    onApplyRowAction: () => {},
    onRowExpanded: () => {},
    onChangeOrdering: () => {},
    onColumnSelectionConfig: () => {},
    onChangeSort: () => {},
    onColumnResize: () => {},
    onOverflowItemClicked: () => {},
  },
};
```

The `actions` used are the callbacks you can supply to update the table state if using a dumb `Table`, or take extra actions if using a `StatefulTable`.

```js
const data = [
  {
    id: 'row-id-1',
    values: {
      string: 'an example string',
      date: new Date().toISOString(),
      select: 'option-a',
      secretField: 'a hidden field',
      number: 1000,
      status: 'RUNNING',
      boolean: false,
      node: <Add20 />,
    }
    rowActions: [
      {
        id: 'drilldown',
        renderIcon: Arrow,
        iconDescription: 'Drill in',
        labelText: 'Drill in',
      },
      {
        id: 'Add',
        renderIcon: Add,
        iconDescription: 'Add',
        labelText: 'Add',
        isOverflow: true,
      },
    ]
  },
  // ...
];
```

You can use the `columns`, actions, and `data` props above to render a `Table` by
writing:

```jsx
<Table id="table" columns={columns} data={data} actions={actions} />
```

After rendering a `Table` component using the code snippet above, you can
optionally add any number of features including sorting, row expansion,
filtering, row selection, batch actions through the `options` prop.

## Sorting

In order to sort the rows in your data table, you will need to include the `isSortable` key on in the `columns` array for each column you would like to be sortable. If this value requires custom sorting you may also pass a sortFunction.

```js
const columns = [
  {
    id: 'string',
    name: 'String',
    isSortable: true,
    filter: { placeholderText: 'enter a string' },
  },
  {
    id: 'status',
    name: 'Status',
    isSortable: true,
  },
  // other columns...
];
```

### Programmatic sorting

In addition to the prop getter specified in the previous section, you can also
change the sort status of the table by using the `sortBy` action made available
in your `render` prop function. This `sortBy` utility takes in the `key` of the
header you want to sort by as an argument. After invoking this method with the
given `key`, the table should be sorted by the header that you've specified.

### Custom sorting

If the default sorting logic doesn't match your use-case, you can provide a
custom sort method as a `sortFunction` key in the `columns` array.

`sortFunction` is a method that takes in the values of two cells, in addition to some
info, and should return -1, 0, or 1 as a result (mirroring the native sort
behavior in JavaScript).

```js
const columns = [
  {
    id: 'string',
    name: 'String',
    isSortable: true,
    filter: { placeholderText: 'enter a string' },
  },
  {
    id: 'status',
    name: 'Status',
    isSortable: true,
    sortFunction: ({ data, columnId, direction }) => {
      // clone inputData because sort mutates the array
      const sortedData = data.map((i) => i);
      sortedData.sort((a, b) => {
        let compare = -1;
        // same status
        if (a.values[columnId] === b.values[columnId]) {
          compare = 0;
        } else if (a.values[columnId] === 'RUNNING' && b.values[columnId] === 'NOT_RUNNING') {
          compare = -1;
        } else if (a.values[columnId] === 'NOT_RUNNING' && b.values[columnId] === 'RUNNING') {
          compare = 1;
        } else if (b.values[columnId] === 'BROKEN') {
          compare = 1;
        } else if (a.values[columnId] === 'BROKEN') {
          compare = -1;
        }

        return direction === 'ASC' ? compare : -compare;
      });
      return sortedData;
    };
  },
  // other columns...
];
```

## Expansion

The `Table` components supports row-level expansion by passing options.hasRowExpansion=true and passing the row content via the view.table.expandedRows prop.

```jsx
const RowExpansionContent = ({ rowId }) => (
  <div key={`${rowId}-expansion`} style={{ padding: 20 }}>
    <h3 key={`${rowId}-title`}>{rowId}</h3>
    <ul style={{ lineHeight: '22px' }}>
      {Object.entries(data.find((i) => i.id === rowId).values).map(([key, value]) => (
        <li key={`${rowId}-${key}`}>
          <b>{key}</b>: {value}
        </li>
      ))}
    </ul>
  </div>
);

<Table
  id="table"
  columns={columns}
  data={data}
  actions={{
    table: {
      onRowClicked: (rowId) => {},
      onRowExpanded: (rowId, expanded) => {},
    },
  }}
  options={{
    hasRowExpansion: true,
    shouldExpandOnRowClick: true,
  }}
  view={{
    table: {
      expandedRows: [
        {
          content: <RowExpansionContent rowId="string" />,
          rowId: 'string',
        },
        {
          content: <RowExpansionContent rowId="status" />,
          rowId: 'status',
        },
      ],
    },
  }}
/>;
```

## Selection

The `Table` component supports row selection when using the options.hasRowSelection prop. It can be set to 'single' for single row selection or 'multi' for multiple row selection.

```jsx
<Table
  id="table"
  columns={columns}
  data={data}
  actions={{
    table: {
      onRowClicked: (rowId: string) => {},
      onRowSelected: (rowId: string, selected: boolean) => {},
    },
  }}
  options={{
    hasRowSelection: 'single' | 'multi',
  }}
  view={{
    table: {
      selectedIds: ['row-4'],
    },
  }}
/>
```

#### Programmatic selection

You can pass which rows are currently selected through the view.table.selectedIds prop. This prop takes an array of selected row ids.

## Filtering

### Simple Filtering

Simple filtering in a `Table` is provided through the `options.hasFilter=true` prop and the `view.toolbar.activeBar='filter'` prop. You set set the current filters by supplying the `view.filters` prop as an array of object with a columnId and a value key.

```jsx
<Table
  id="table"
  columns={columns}
  data={data}
  actions={{
    toolbar: {
      /** filters is an object in the form of: {[columnId: string]: string} */
      onApplyFilter: (filters) => {}
      /** event is the onClick event */
      onToggleFilter: (event) => {},
      /** event is the onClick event */
      onClearAllFilters: (event) => {}
    },
  }}
  options={{
    hasFilter: true,
  }}
  view={{
    filters: [
      {
        columnId: 'string',
        value: 'whiteboard',
      },
      {
        columnId: 'select',
        value: 'option-B',
      },
    ],
    toolbar: {
      activeBar: 'filter',
    },
  }}
/>
```

### ☢️ Advanced Filtering (Experimental)

Advanced filtering is experimental and may be subject to change, so it's usage in production is discouraged, but it can be enabled by passing the `options.hasAdvancedFilters=true`. The advanced filters are created with the `RuleBuilder` component (also experimental), and are passed to the table via the `view.advancedFilters` prop. The currently selected advanced filters are passed via the `view.selectedAdvancedFilterIds` as an array of advanced filter ids. Opening the advanced filter flyout is managed via the `view.toolbar.advancedFilterFlyoutOpen=true` prop. Advanced filtering also includes simple filtering, and can be passed with the same `view.filters` prop as an array of objects with a columnId and value key.

```jsx
<Table
    options={{
      hasAdvancedFilter: true,
    }}
    actions={{
      toolbar: {
        /** filters is an object in the form of: {[columnId: string]: string} */
        onApplyFilter: (filters) => {}
        /** event is the onClick event */
        onToggleFilter: (event) => {},
        /** event is the onClick event */
        onClearAllFilters: (event) => {}
        /** used to cancel and changes made in the flyout and revert to previous state */
        onCancelAdvancedFilter: () => {},
        /** event is the onClick event, advFilterId is the string id of the filter being removed */
        onRemoveAdvancedFilter: (event, advFilterId) => {},
        /** event is the onClick event. Can be used to display a RuleBuilder component to create new advanced rules */
        onCreateAdvancedFilter: (event) => {},
        /** filters is an object in the form of: {selectedItems: [advancedFilter]} */
        onChangeAdvancedFilter: (filters) => {},
        /** filters is an object in the form of
         * {
         *   advanced: [
         *     'advanced-filter-id-1',
         *     'advanced-filter-id-2'
         *   ],
         *   simple: {
         *     [columnId]: 'value'
         *   }
         * }
         */
        onApplyAdvancedFilter: (filters) => {},
        /** used to show/hide the advancedFilterFlyout */
        onToggleAdvancedFilter: () => {},
      }
    }}
    view={{
      advancedFilters: [
        {
          filterAccess: [
            {
              access: 'edit',
              email: 'example@pal.com',
              name: 'Example User',
              username: 'Example-User'
            },
            {
              access: 'read',
              email: 'other@pal.com',
              name: 'Other User',
              username: 'Other-User'
            }
          ],
          filterColumns: [
            {
              filter: {
                placeholderText: 'enter a string'
              },
              id: 'string',
              name: 'String'
            },
            {
              filter: {
                placeholderText: 'enter a date'
              },
              id: 'date',
              name: 'Date'
            },
            {
              filter: {
                options: [
                  {
                    id: 'option-A',
                    text: 'option-A'
                  },
                  {
                    id: 'option-B',
                    text: 'option-B'
                  },
                  {
                    id: 'option-C',
                    text: 'option-C'
                  },
                  {
                    id: 'option-D',
                    text: 'option-D'
                  },
                  {
                    id: 'option-E',
                    text: 'option-E'
                  },
                  {
                    id: 'option-F',
                    text: 'option-F'
                  }
                ],
                placeholderText: 'pick an option'
              },
              id: 'select',
              name: 'Select'
            },
            {
              id: 'secretField',
              name: 'Secret Information'
            },
            {
              id: 'status',
              name: 'Status',
              renderDataFunction: function E(){},
              sortFunction: function E(){}
            },
            {
              filter: {
                placeholderText: 'enter a number'
              },
              id: 'number',
              name: 'Number'
            },
            {
              filter: {
                placeholderText: 'true or false'
              },
              id: 'boolean',
              name: 'Boolean'
            },
            {
              id: 'node',
              name: 'React Node'
            }
          ],
          filterId: 'example-advanced-filter',
          filterMetaText: 'last updated: 2021-03-11 15:34:01',
          filterRules: {
            groupLogic: 'ALL',
            id: '14p5ho3pcu',
            rules: [
              {
                columnId: 'select',
                id: 'rsiru4rjba',
                operand: 'EQ',
                value: 'option-C'
              },
              {
                columnId: 'boolean',
                id: '34bvyub9jq',
                operand: 'EQ',
                value: 'false'
              }
            ]
          },
          filterTags: [
            'fav',
            'other-tag'
          ],
          filterTitleText: 'Example Advanced Filter',
          filterUsers: [
            {
              groups: [
                {
                  id: 'team-a',
                  name: 'Team A',
                  users: [
                    {
                      email: 'tpeck@pal.com',
                      name: 'Templeton Peck',
                      username: '@tpeck'
                    },
                    {
                      email: 'jsmith@pal.com',
                      name: 'John Smith',
                      username: '@jsmith'
                    }
                  ]
                }
              ],
              id: 'teams',
              name: 'Teams'
            },
            {
              email: 'example@pal.com',
              name: 'Example User',
              username: 'Example-User'
            },
            {
              email: 'test@pal.com',
              name: 'Test User',
              username: 'Test-User'
            },
            {
              email: 'other@pal.com',
              name: 'Other User',
              username: 'Other-User'
            }
          ]
        }
      ],
      filters: [
        {
          columnId: 'string',
          value: 'whiteboard'
        },
        {
          columnId: 'select',
          value: 'option-B'
        }
      ],
      selectedAdvancedFilterIds: [
        'example-advanced-filter'
      ],
      toolbar: {
        advancedFilterFlyoutOpen: true
      }
    }}
/>
```

## Pagination

Pagination is controlled through the `options.hasPagingation` prop combined with the `view.pagination` prop. Pagination has one callback event for onChangePage that is fired when the page or the number of items per page changes.

```jsx
<Table
  actions={{
    pagination: {
      onChangePage: ({ page, pageSize }) => {},
    },
  }}
  options={{
    hasPagination: true,
  }}
  view={{
    pagination: {
      isItemPerPageHidden: false,
      maxPages: 100,
      page: 1,
      pageSize: 10,
      pageSizes: [10, 20, 30],
      totalItems: undefined,
    },
  }}
/>
```

## Batch actions

You can combine batch actions with the `Table` component to allow the user
to perform a single action on multiple selected rows. To do this, you can use
the following props:

```jsx
<Table
  id="table"
  columns={columns}
  data={data}
  actions={{
    toolbar: {
      /** cancels the action, and unselects all currently selected rows */
      onCancelBatchAction: () => {},
      /** actionId is the string id of the action being completed, and an arrow of row ids the action was performed on. */
      onApplyBatchAction: (actionId, rowIds) => {},,
    },
    table: {
      /** rowId is a string */
      onRowClicked: (rowId) => {},
      /** rowId is a string, selected is a boolean */
      onRowSelected: (rowId, selected) => {},
      /** allSelected is a boolean. true is all are selected, false otherwise */
      onSelectAll: (allSelected) => {},
    }
  }}
  options={{
    hasFilter: true,
    hasRowSelection: 'multi'
  }}
  view={{
    table: {
      isSelectAllIndeterminate: undefined,
      isSelectAllSelected: undefined,
      selectedIds: [
        'row-3',
        'row-4',
        'row-6',
        'row-7'
      ]
    },
    toolbar: {
      batchActions: [
        {
          iconDescription: 'Delete Item',
          id: 'delete',
          labelText: 'Delete',
          renderIcon: <TrashCan16/>
        }
      ]
    }
  }}
  }}
/>
```

## Props

### Table Props

| Name           | Type   | Default | Description                                                                                                                                                                                            |
| :------------- | :----- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id             | string |         | DOM ID for component                                                                                                                                                                                   |
| secondaryTitle | string |         | Displays smaller title in header                                                                                                                                                                       |
| tooltip        | node   |         |                                                                                                                                                                                                        |
| useZebraStyles | bool   |         | render zebra stripes or not                                                                                                                                                                            |
| lightweight    | bool   |         | lighter styling where regular table too visually heavy                                                                                                                                                 |
| columns        | object |         | (see [column prop](#column-prop))                                                                                                                                                                      |
| data           | object |         | Row value data for the body of the table (see [data prop](#data-prop))                                                                                                                                 |
| expandedData   | object |         | Expanded data for the table details (see [expandedData prop](#expandeddata-prop))                                                                                                                      |
| options        | object |         | Optional properties to customize how the table should be rendered (see [options prop](#options-prop))                                                                                                  |
| view           | object |         | Initial state of the table, should be updated via a local state wrapper component implementation or via a central store/redux see StatefulTable component for an example (see [view prop](#view-prop)) |
| actions        | object |         | Callbacks for actions of the table, can be used to update state in wrapper component to update `view` props (see [actions prop](#actions-prop))                                                        |
| locale         | string |         | what locale should we use to format table values if left empty no locale formatting happens                                                                                                            |
| i18n           | object |         | (see [i18n prop](#i18n-prop))                                                                                                                                                                          |

### Column Prop

| Name                   | Type                     | Default | Description                                                                                                                                                                                            |
| :--------------------- | :----------------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                     | string                   |         | The id of this column                                                                                                                                                                                  |
| name                   | string                   |         | The display name of the column shown in the header                                                                                                                                                     |
| isSortable             | bool                     |         | Is this column sortable?                                                                                                                                                                               |
| sortFunction           | func                     |         | a custom function for sorting this column. Called with: { columnId: PropTypes.string, direction: PropTypes.oneOf(['ASC','DESC']), data: PropTypes.array }                                              |
| width                  | string                   |         | set the width of this column. ex. 150px or 2rem                                                                                                                                                        |
| align                  | string                   |         | 'start', 'center', or 'end'                                                                                                                                                                            |
| renderDataFunction     | func                     |         | A custom function to render this column. Called with: {value: PropTypes.any, columnId: PropTypes.string, rowId: PropTypes.string, row: PropTypes.shape({[columnId: PropTypes.string]: PropTypes.any})} |
| filter                 | object                   |         |                                                                                                                                                                                                        |
| filter.placeholderText | string                   |         | i18n text for the filter                                                                                                                                                                               |
| filter.isMultiselect   | bool                     |         | if true the table is filtered based on a multiselect component                                                                                                                                         |
| filter.options         | object[]                 |         |                                                                                                                                                                                                        |
| filter.options[].id    | string, number, or, bool |         | The id of the filter option used in multiselect filtering                                                                                                                                              |
| filter.options[].text  | string                   |         | the display value for this multiselect filter option                                                                                                                                                   |
| filter.filterFunction  | func                     |         | Custom filter function call with (columnFilterValue, currentValue)                                                                                                                                     |
| options                | object                   |         | Optional items forthe column overflow menu                                                                                                                                                             |
| options[].id           | string, number, or, bool |         | The id of the option used in the overflow menu for this column                                                                                                                                         |
| options[].text         | string                   |         | the display text for this overflow menu item                                                                                                                                                           |

### Data Prop

| Name                    | Type     | Default | Description                                                                                           |
| :---------------------- | :------- | :------ | :---------------------------------------------------------------------------------------------------- |
| id                      | string   |         | the id of this row                                                                                    |
| values                  | object   |         | A {[columnId]: value} object containing all the values for this row                                   |
| children                | object[] |         | An optional array of rows (in the same structure as the data prop) for children nested under this row |
| rowActions              | object   |         | An optional list of actions visible on row how or expansion                                           |
| rowActions[].id         | string   |         | unique id for this action                                                                             |
| rowActions[].renderIcon |          |         | icon that gets pass through to the button component for this action                                   |
| rowActions[].disabled   | bool     |         | disables this action                                                                                  |
| rowActions[].labelText  | string   |         | label text shown on the action button                                                                 |
| rowActions[].isOverflow | bool     |         | If true, the action will be rendered in the overflow menu not inline on the row                       |
| rowActions[].hasDivider | bool     |         |                                                                                                       |
| rowActions[].isDelete   | bool     |         |                                                                                                       |
| rowActions[].isEdit     | bool     |         |                                                                                                       |
| isSelectable            | bool     |         | is this row selecteable                                                                               |

### ExpandedData Prop

| Name                   | Type     | Default | Description                                     |
| :--------------------- | :------- | :------ | :---------------------------------------------- |
| expandedData[]         | object[] |         |                                                 |
| expandedData[].rowId   | string   |         | the rowId this expanded content is attached to  |
| expandedData[].content | node     |         | a react node rendered when this row is expanded |

### Options Prop

| Name                        | Type                                           | Default | Description                                                                                                        |
| :-------------------------- | :--------------------------------------------- | :------ | :----------------------------------------------------------------------------------------------------------------- |
| hasAggregations             | bool                                           |         | If true allows the table to aggregate values of columns in a special row                                           |
| hasPagination               | bool                                           |         | If true the table uses pagination                                                                                  |
| hasRowSelection             | 'multi', 'single', or false                    |         | Enables multiple row selection, single row selection, or turns it off                                              |
| hasRowExpansion             | bool                                           |         | Allows rows to be expanded                                                                                         |
| hasRowNesting               | bool, or {hasSingleNestedHierarchy: bool}      |         | Allows nested rows, or only a depth of one nested row                                                              |
| hasRowActions               | bool                                           |         | If true, row actions are enabled                                                                                   |
| hasFilter                   | bool, 'onKeyPress', or 'onEnterAndBlur'        |         | enables simply filtering if true, simple filtering on demand if 'onKeyPress', or on enter/blur if 'onEnterAndBlur' |
| hasAdvancedFilter           | bool                                           |         | Enables experimental advanced filtering, but cannot be used with `hasFilter`                                       |
| hasOnlyPageData             | bool                                           |         | if true, the data prop will be assumed to only represent the currently visible page                                |
| hasSearch                   | bool                                           |         | if true, simple search capability is enabled                                                                       |
| hasColumnSelection          | bool                                           |         |
| hasColumnSelectionConfig    | bool                                           |         |                                                                                                                    |
| shouldLazyRender            | bool                                           |         |                                                                                                                    |
| hasRowCountInHeader         | bool                                           |         |                                                                                                                    |
| hasResize                   | bool                                           |         |                                                                                                                    |
| hasSingleRowEdit            | bool                                           |         |                                                                                                                    |
| hasUserViewManagement       | bool                                           |         |                                                                                                                    |
| useAutoTableLayoutForResize | bool                                           |         | If true removes the "table-layout: fixed" for resizable tables                                                     |
| wrapCellText                | 'always', 'never', 'auto', or 'alwaysTruncate' |         | \_ auto - Wrap for tables with dynamic columns widths and truncate for tables with fixed or resizable columns      |
|                             |                                                |         | \_ always - Wrap if needed for all table column configurations                                                     |
|                             |                                                |         | \_ never - Tables with dynamic columns widths grow larger and tables with fixed or resizable columns truncate.     |
|                             |                                                |         | \_ alwaysTruncate - Always truncate if needed for all table column configurations                                  |

### View Prop

| Name                                    | Type                             | Default | Description                                                                                                                                         |
| :-------------------------------------- | :------------------------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| aggregations                            | object                           |         | Allows certain columns to have an aggregated value in the footer of the table                                                                       |
| aggregations[].id                       | string                           |         | The columnId of the column to aggregate                                                                                                             |
| aggregations[].value                    | string or func                   |         | If the aggregation is computed elsewhere, the value can be passed here, or a function can be passed to compute it on the fly                        |
| aggregations[].align                    | 'start', 'center', or 'end'      |         | allows the aggregate value to align with the rest of the column                                                                                     |
| aggregations[].isSortable               | bool                             |         | Ensures the aggregate value aligns with the rest of the column by supplying the extra padding needed when a column is sortable                      |
| pagination                              | object                           |         | Sets the pagination values for the table                                                                                                            |
| pagination.pageSize                     | number                           |         | How many rows are displayed per page                                                                                                                |
| pagination.pageSizes                    | number[]                         |         | An array of selections for choosing how many rows are displayed per page.                                                                           |
| pagination.page                         | number                           |         | The current page number                                                                                                                             |
| pagination.totalItems                   | number                           |         | The total number of items available to the table                                                                                                    |
| pagination.maxPages                     | number                           |         | Number of pages rendered in pagination                                                                                                              |
| pagination.isItemPerPageHidden          | bool                             |         | Hide displaying the text for the number of rows per page                                                                                            |
| filters                                 | object[]                         |         | An array of objects setting the current filter state                                                                                                |
| filters[].columnId                      | string                           |         | The columnId of the column being filtered by this value                                                                                             |
| filters[].value                         | string, number, bool, string[]   |         | The value used to filter the given columnId                                                                                                         |
| advancedFilters                         | object[]                         |         | An array of objects containing the minimum details of an advancedFilter object that will be used in the dropdown menu of the advanced filter flyout |
| advancedFilters[].filterId              | string                           |         | The filter id                                                                                                                                       |
| advancedFilters[].filterTitleText       | string                           |         | The display name of the filter                                                                                                                      |
| advancedFilters[].filterRules           | object                           |         | The rules for this filter. See the RuleBuilder for details.                                                                                         |
| selectedAdvancedFilterIds               | string[]                         |         | An array of filter ids for the currently selected filters                                                                                           |
| toolbar                                 | object                           |         |                                                                                                                                                     |
| toolbar.activeBar                       | 'column', 'filter', or 'rowEdit' |         | Specify which header row to display, will display default header row if null                                                                        |
| toolbar.customToolbarContent            | node                             |         | optional content to render inside the toolbar                                                                                                       |
| toolbar.batchActions                    | object[]                         |         | Specify which batch actions to render in the batch action bar. If empty, no batch action toolbar will display                                       |
| toolbar.batchActions[].id               | string                           |         | unique id for this batch action                                                                                                                     |
| toolbar.batchActions[].labeltext        | string                           |         | text shown on the action button                                                                                                                     |
| toolbar.batchActions[].icon             | element                          |         | The icon rendered on the button for this action                                                                                                     |
| toolbar.batchActions[].iconDescription  | string                           |         | The description used for aria on this icon                                                                                                          |
| toolbar.search                          | object                           |         |                                                                                                                                                     |
| toolbar.search.value                    | string                           |         | Deprecated in favor of defaultValue                                                                                                                 |
| toolbar.search.defaultValue             | string                           |         | The current search value passed to the table                                                                                                        |
| toolbar.search.defaultExpanded          | bool                             |         | The current search value passed to the table                                                                                                        |
| toolbar.search.onChange                 | func                             |         |                                                                                                                                                     |
| toolbar.search.onExpand                 | func                             |         |                                                                                                                                                     |
| toolbar.isDisabled                      | bool                             |         | Disable the toolbar                                                                                                                                 |
| toolbar.rowEditBarButtons               | node                             |         | buttons to be shown with when activeBar is 'rowEdit'                                                                                                |
| table                                   | object                           |         |                                                                                                                                                     |
| table.isSelectAllSelected               | bool                             |         | If true, the select all option is checked                                                                                                           |
| table.isSelectAllIndeterminate          | bool                             |         |                                                                                                                                                     |
| table.selectedIds                       | string[]                         |         | An array of row ids that are currently selected                                                                                                     |
| table.sort                              | object                           |         | an object in the form of {columnId: string; direction: 'NONE' or 'ASC' or 'DESC' }                                                                  |
| table.sort.columnId                     | string                           |         | the id of the column to sort                                                                                                                        |
| table.sort.direction                    | 'NONE', 'ASC', or 'DESC'         |         |                                                                                                                                                     |
| table.ordering                          | object[]                         |         | an array of objects representing the order and visibility of the columns                                                                            |
| table.ordering[].columnId               | string                           |         | The id of the column to make hidden or visible                                                                                                      |
| table.ordering[].isHidden               | bool                             |         | If true, the column with columnId will be hidden in the table                                                                                       |
| table.rowActions                        | object[]                         |         |                                                                                                                                                     |
| table.rowsActions[].rowId               | string                           |         | The rowID associated with this action                                                                                                               |
| table.rowActions[].isRunning            | bool                             |         | Is this action currently running on this row                                                                                                        |
| table.rowActions[].isEditMode           | bool                             |         | Is this action available in edit mode                                                                                                               |
| table.rowActions[].error                | object                           |         | Object representing the error state for the action on this row                                                                                      |
| table.rowActions[].error.title          | node                             |         | The title node for this error on this row                                                                                                           |
| table.rowActions[].error.message        | node                             |         | The message node associated with this error on this row action                                                                                      |
| table.rowActions[].error.learnMoreURL   | string                           |         | The link to learn more about this error                                                                                                             |
| table.singleRowEditButtons              | element                          |         | Buttons shown when editing a single row                                                                                                             |
| table.expandedIds                       | string[]                         |         | an array of strings representing the rowIds to be expanded                                                                                          |
| table.emptyState                        | object or element                |         | If a React element is provided, it will be rendered in place of the default                                                                         |
| table.emptyState.message                | node                             |         | The message to show when the table is empty                                                                                                         |
| table.emptyState.messageWithFilters     | node                             |         | Show a different message if no content is in the table matching the filters                                                                         |
| table.emptyState.buttonLabel            | node                             |         | If a label is not provided, no action button will be rendered                                                                                       |
| table.emptyState.buttonLabelWithFilters | node                             |         | Show a different button label if no content is in the table matching the filters                                                                    |
| table.loadingState                      | object                           |         |                                                                                                                                                     |
| table.loadingState.isLoading            | bool                             |         | If the table is currently loading                                                                                                                   |
| table.loadingState.rowCount             | number                           |         | The number of rows loaded                                                                                                                           |

### Actions Prop

| Name                            | Type   | Default | Description                                                                                                                                                                                                     |
| :------------------------------ | :----- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| pagination                      | object |         |
| pagination.onChangePage         | func   |         | Specify a callback for when the current page or page size is changed. This callback is passed an object parameter containing the current page and the current page size                                         |
| toolbar                         | object |         |                                                                                                                                                                                                                 |
| toolbar.onApplyFilter           | func   |         |                                                                                                                                                                                                                 |
| toolbar.onToggleFilter          | func   |         |                                                                                                                                                                                                                 |
| toolbar.onShowRowEdit           | func   |         |                                                                                                                                                                                                                 |
| toolbar.onToggleColumnSelection | func   |         |                                                                                                                                                                                                                 |
| toolbar.onClearAllFilters       | func   |         | Specify a callback for when the user clicks toolbar button to clear all filters. Recieves a parameter of the current filter values for each column                                                              |
| toolbar.onCancelBatchAction     | func   |         |
| toolbar.onApplyBatchAction      | func   |         |
| toolbar.onApplySearch           | func   |         | Apply a search criteria to the table                                                                                                                                                                            |
| toolbar.onDownloadCSV           | func   |         | Download the table contents                                                                                                                                                                                     |
| toolbar.onApplyAdvancedFilter   | func   |         |                                                                                                                                                                                                                 |
| toolbar.onToggleAdvancedFilter  | func   |         | Toggles the advanced filter flyout open                                                                                                                                                                         |
| toolbar.onRemoveAdvancedFilter  | func   |         | Remove the selected advancedFilter from the table                                                                                                                                                               |
| toolbar.onCreateAdvancedFilter  | func   |         | Fired the 'create new advanced filter' button is clicked.                                                                                                                                                       |
| toolbar.onCancelAdvancedFilter  | func   |         | Fired when then 'Cancel' button is clicked in the advanced filter flyout menu                                                                                                                                   |
| toolbar.onChangeAdvancedFilter  | func   |         | Fired when an advanced filter is selected or removed.                                                                                                                                                           |
| table                           | object |         |                                                                                                                                                                                                                 |
| table.onRowSelected             | func   |         |                                                                                                                                                                                                                 |
| table.onRowClicked              | func   |         |                                                                                                                                                                                                                 |
| table.onRowExpanded             | func   |         |                                                                                                                                                                                                                 |
| table.onSelectAll               | func   |         |                                                                                                                                                                                                                 |
| table.onChangeSort              | func   |         |                                                                                                                                                                                                                 |
| table.onApplyRowAction          | func   |         | callback if a row action is clicked called with the id of the action then the id of the row if you return a promise from apply row action the stateful table will assume you're asynchronous and give a spinner |
| table.onClearRowError           | func   |         |                                                                                                                                                                                                                 |
| table.onEmptyStateAction        | func   |         |                                                                                                                                                                                                                 |
| table.onChangeOrdering          | func   |         |                                                                                                                                                                                                                 |
| table.onColumnSelectionConfig   | func   |         |                                                                                                                                                                                                                 |
| table.onColumnResize            | func   |         |                                                                                                                                                                                                                 |
| table.onOverflowItemClicked     | func   |         |                                                                                                                                                                                                                 |
| onUserViewModified              | func   |         | callback for actions relevant for view management                                                                                                                                                               |

### i18n Prop

| Name                      | Type   | Default | Description                                            |
| :------------------------ | :----- | :------ | :----------------------------------------------------- |
| pageBackwardAria          | string |         | pagination                                             |
| pageForwardAria           | string |         |
| pageNumberAria            | string |         |
| itemsPerPage              | string |         |
| itemsRange                | func   |         | (min, max) => `${min}-${max} items`                    |
| currentPage               | func   |         | (page) => `page ${page}`                               |
| itemsRangeWithTotal       | func   |         | (min, max, total) => `${min}-${max} of ${total} items` |
| pageRange                 | func   |         | (current, total) => `${current} of ${total} pages`     |
| overflowMenuAria          | string |         |
| clickToExpandAria         | string |         |
| clickToCollapseAria       | string |         |
| selectAllAria             | string |         |
| selectRowAria             | string |         |
| searchLabel               | string |         | toolbar                                                |
| searchPlaceholder         | string |         |
| clearAllFilters           | string |         |
| columnSelectionButtonAria | string |         |
| columnSelectionConfig     | string |         |
| filterButtonAria          | string |         |
| editButtonAria            | string |         |
| clearFilterAria           | string |         |
| filterAria                | string |         |
| downloadIconDescription   | string |         |
| openMenuAria              | string |         |
| closeMenuAria             | string |         |
| clearSelectionAria        | string |         |
| batchCancel               | string |         |
| itemsSelected             | string |         |
| itemSelected              | string |         |
| inProgressText            | string |         | I18N label for in progress                             |
| actionFailedText          | string |         | I18N label for action failed                           |
| learnMoreText             | string |         | I18N label for learn more                              |
| dismissText               | string |         | I18N label for dismiss                                 |
| filterNone                | string |         |                                                        |
| filterAscending           | string |         |                                                        |
| filterDescending          | string |         |                                                        |
| rowCountInHeader          | func   |         |                                                        |

## Source Code

[Source code](https://github.com/carbon-design-system/carbon-addons-iot-react/tree/next/packages/react/src/components/Table)

## Feedback

Help us improve this component by providing feedback, asking questions on Slack, or updating this file on
[GitHub](https://github.com/carbon-design-system/carbon-addons-iot-react/tree/next/packages/react/src/components/Table/README.md).