import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { Close16, Popup16, Settings16 } from '@carbon/icons-react';
import { OverflowMenu, OverflowMenuItem } from 'carbon-components-react';
import classnames from 'classnames';
import keyBy from 'lodash/keyBy';

import { settings } from '../../constants/Settings';
import { DATE_PICKER_OPTIONS, TimeRangeOptionsPropTypes } from '../../constants/CardPropTypes';
import { CARD_ACTIONS } from '../../constants/LayoutConstants';
import DateTimePicker, {
  DateTimePickerDefaultValuePropTypes,
} from '../DateTimePicker/DateTimePickerV2';
import Button from '../Button';
import { PRESET_VALUES } from '../../constants/DateConstants';

import CardRangePicker, { CardRangePickerPropTypes } from './CardRangePicker';

const { iotPrefix, prefix } = settings;

export const ToolbarSVGWrapper = (props) => {
  return (
    <Button
      kind="ghost"
      className={classnames(
        `${iotPrefix}--card--toolbar-action`,
        `${iotPrefix}--card--toolbar-svg-wrapper`,
        `${prefix}--btn--icon-only` // can't actually use the hasIconOnly prop because we don't want the tooltip
      )}
      {...props}
      size="sm"
    />
  );
};

const propTypes = {
  /** set of available actions for the card */
  availableActions: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.bool, PropTypes.string]))
    .isRequired,
  /** is the card editable */
  isEditable: PropTypes.bool,
  /** is the card expanded */
  isExpanded: PropTypes.bool,
  /**
   * Define the icon render to be rendered.
   * Can be a React component class
   */
  renderExpandIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  className: PropTypes.string,
  ...omit(CardRangePickerPropTypes, 'onClose'),
  /** Generates the available time range selection options. Each option should include 'this' or 'last'.
   * i.e. { thisWeek: 'This week', lastWeek: 'Last week'}
   */
  timeRange: PropTypes.oneOfType([
    CardRangePickerPropTypes.timeRange,
    DateTimePickerDefaultValuePropTypes,
  ]),
  timeRangeOptions: TimeRangeOptionsPropTypes, // eslint-disable-line react/require-default-props
  i18n: PropTypes.shape({
    last24Hours: PropTypes.string,
    last7Days: PropTypes.string,
    lastMonth: PropTypes.string,
    lastQuarter: PropTypes.string,
    lastYear: PropTypes.string,
    thisWeek: PropTypes.string,
    thisMonth: PropTypes.string,
    thisQuarter: PropTypes.string,
    thisYear: PropTypes.string,
    overflowMenuDescription: PropTypes.string,
    cloneCardLabel: PropTypes.string,
    deleteCardLabel: PropTypes.string,
    closeLabel: PropTypes.string,
    expandLabel: PropTypes.string,
    settingsLabel: PropTypes.string,
  }),
  testId: PropTypes.string,
  locale: PropTypes.string,
  dateTimeMask: PropTypes.string,
};

const defaultProps = {
  isEditable: false,
  isExpanded: false,
  renderExpandIcon: Popup16,
  className: null,
  locale: 'en',
  timeRangeOptions: null,
  timeRange: null,
  i18n: {
    last24Hours: 'Last 24 hours',
    last7Days: 'Last 7 days',
    lastMonth: 'Last month',
    lastQuarter: 'Last quarter',
    lastYear: 'Last year',
    thisWeek: 'This week',
    thisMonth: 'This month',
    thisQuarter: 'This quarter',
    thisYear: 'This year',
    overflowMenuDescription: 'Card actions menu',
    cloneCardLabel: 'Clone card',
    deleteCardLabel: 'Delete card',
    closeLabel: 'Close',
    expandLabel: 'Expand',
    settingsLabel: 'Settings',
  },
  testId: 'card-toolbar',
  dateTimeMask: 'YYYY-MM-DD HH:mm',
};

const CardToolbar = ({
  i18n,
  width,
  isEditable,
  isExpanded,
  renderExpandIcon,
  availableActions,
  timeRange,
  timeRangeOptions: timeRangeOptionsProp,
  onCardAction,
  className,
  testId,
  locale,
  dateTimeMask,
}) => {
  const mergedI18n = { ...defaultProps.i18n, ...i18n };
  // maps the timebox internal label to a translated string
  // Need the default here in case that the CardToolbar is used by multiple different components
  // Also needs to reassign itself if i18n changes
  const timeRangeOptions = useMemo(
    () =>
      timeRangeOptionsProp ||
      (typeof availableActions?.range === 'string' // if we're using date time picker default to those options
        ? keyBy(PRESET_VALUES, 'id')
        : {
            last24Hours: mergedI18n.last24HoursLabel,
            last7Days: mergedI18n.last7DaysLabel,
            lastMonth: mergedI18n.lastMonthLabel,
            lastQuarter: mergedI18n.lastQuarterLabel,
            lastYear: mergedI18n.lastYearLabel,
            thisWeek: mergedI18n.thisWeekLabel,
            thisMonth: mergedI18n.thisMonthLabel,
            thisQuarter: mergedI18n.thisQuarterLabel,
            thisYear: mergedI18n.thisYearLabel,
          }),
    [
      availableActions,
      mergedI18n.last24HoursLabel,
      mergedI18n.last7DaysLabel,
      mergedI18n.lastMonthLabel,
      mergedI18n.lastQuarterLabel,
      mergedI18n.lastYearLabel,
      mergedI18n.thisMonthLabel,
      mergedI18n.thisQuarterLabel,
      mergedI18n.thisWeekLabel,
      mergedI18n.thisYearLabel,
      timeRangeOptionsProp,
    ]
  );

  const handleDateTimePickerChange = useCallback(
    (selectedValue) => {
      onCardAction('CHANGE_TIME_RANGE', selectedValue);
    },
    [onCardAction]
  );

  return isEditable ? (
    <div data-testid={testId} className={classnames(className, `${iotPrefix}--card--toolbar`)}>
      {(availableActions.clone || availableActions.delete) && (
        <OverflowMenu
          flipped
          title={mergedI18n.overflowMenuDescription}
          iconDescription={mergedI18n.overflowMenuDescription}
        >
          {availableActions.clone && (
            <OverflowMenuItem
              onClick={() => {
                onCardAction(CARD_ACTIONS.CLONE_CARD);
              }}
              itemText={mergedI18n.cloneCardLabel}
              title={mergedI18n.cloneCardLabel}
              requireTitle
              data-testid={`${testId}-clone-button`}
            />
          )}
          {availableActions.delete && (
            <OverflowMenuItem
              isDelete
              onClick={() => {
                onCardAction(CARD_ACTIONS.DELETE_CARD);
              }}
              itemText={mergedI18n.deleteCardLabel}
              title={mergedI18n.deleteCardLabel}
              requireTitle
              data-testid={`${testId}-delete-button`}
            />
          )}
        </OverflowMenu>
      )}
    </div>
  ) : (
    <div data-testid={testId} className={classnames(className, `${iotPrefix}--card--toolbar`)}>
      {availableActions.range ? (
        typeof availableActions.range === 'boolean' ? ( // boolean is the old range picker
          <CardRangePicker
            width={width}
            i18n={mergedI18n}
            timeRange={timeRange}
            timeRangeOptions={timeRangeOptions}
            onCardAction={onCardAction}
            cardWidth={width}
            testId={`${testId}-range-picker`}
          />
        ) : (
          // string values mean use the new picker
          <DateTimePicker
            id={testId}
            i18n={mergedI18n}
            dateTimeMask={dateTimeMask}
            locale={locale}
            hasIconOnly={
              // make sure the card is actually sized
              (width > 0 && width < 320) || availableActions.range === DATE_PICKER_OPTIONS.ICON_ONLY
            }
            presets={Object.entries(timeRangeOptions).reduce(
              (acc, [timeRangeOptionKey, timeRangeOption]) => {
                acc.push({
                  id: timeRangeOptionKey,
                  label: timeRangeOption.label || mergedI18n.timeRange,
                  offset: timeRangeOption.offset,
                });
                return acc;
              },
              []
            )}
            defaultValue={timeRange}
            onApply={handleDateTimePickerChange}
          />
        )
      ) : null}
      {availableActions.settings ? (
        <ToolbarSVGWrapper
          title={mergedI18n.settingsLabel}
          onClick={() => onCardAction(CARD_ACTIONS.ON_SETTINGS_CLICK)}
          iconDescription={mergedI18n.settingsLabel}
          renderIcon={Settings16}
          testId={`${testId}-settings-button`}
        />
      ) : null}
      {availableActions.expand ? (
        <>
          {isExpanded ? (
            <ToolbarSVGWrapper
              title={mergedI18n.closeLabel}
              onClick={() => onCardAction(CARD_ACTIONS.CLOSE_EXPANDED_CARD)}
              iconDescription={mergedI18n.closeLabel}
              renderIcon={Close16}
              testId={`${testId}-close-button`}
            />
          ) : (
            <ToolbarSVGWrapper
              title={mergedI18n.expandLabel}
              onClick={() => {
                onCardAction(CARD_ACTIONS.OPEN_EXPANDED_CARD);
              }}
              iconDescription={mergedI18n.expandLabel}
              renderIcon={renderExpandIcon}
              testId={`${testId}-expand-button`}
            />
          )}
        </>
      ) : null}
    </div>
  );
};

CardToolbar.propTypes = propTypes;
CardToolbar.defaultProps = defaultProps;
export default CardToolbar;
