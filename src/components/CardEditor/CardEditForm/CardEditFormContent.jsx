import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { CARD_TYPES } from '../../../constants/LayoutConstants';
import { DataItemsPropTypes } from '../../DashboardEditor/editorUtils';

import CommonCardEditFormFields from './CommonCardEditFormFields';
import DataSeriesFormContent from './CardEditFormItems/DataSeriesFormItems/DataSeriesFormContent';
import ImageCardFormContent from './CardEditFormItems/ImageCardFormItems/ImageCardFormContent';
import TableCardFormContent from './CardEditFormItems/TableCardFormItems/TableCardFormContent';

const propTypes = {
  /** card data value */
  cardConfig: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    size: PropTypes.string,
    type: PropTypes.string,
    content: PropTypes.oneOfType([
      PropTypes.shape({
        series: PropTypes.arrayOf(
          PropTypes.shape({
            label: PropTypes.string,
            dataSourceId: PropTypes.string,
            color: PropTypes.string,
          })
        ),
        xLabel: PropTypes.string,
        yLabel: PropTypes.string,
        unit: PropTypes.string,
        includeZeroOnXaxis: PropTypes.bool,
        includeZeroOnYaxis: PropTypes.bool,
        timeDataSourceId: PropTypes.string,
        showLegend: PropTypes.bool,
      }),
      PropTypes.shape({
        id: PropTypes.string,
        src: PropTypes.string,
        zoomMax: PropTypes.number,
      }),
    ]),
  }),
  /** Callback function when form data changes */
  onChange: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    cardTitle: PropTypes.string,
    description: PropTypes.string,
    size: PropTypes.string,
    selectASize: PropTypes.string,
    timeRange: PropTypes.string,
    selectATimeRange: PropTypes.string,
    last24HoursLabel: PropTypes.string,
    last7DaysLabel: PropTypes.string,
    lastMonthLabel: PropTypes.string,
    lastQuarterLabel: PropTypes.string,
    lastYearLabel: PropTypes.string,
    thisWeekLabel: PropTypes.string,
    thisMonthLabel: PropTypes.string,
    thisQuarterLabel: PropTypes.string,
    thisYearLabel: PropTypes.string,
  }),
  /** if provided, returns an array of strings which are the timeRanges to be allowed
   * on each card
   * getValidTimeRanges(card, selectedDataItems)
   */
  getValidTimeRanges: PropTypes.func,
  /** if provided, returns an array of strings which are the dataItems to be allowed
   * on each card
   * getValidDataItems(card, selectedTimeRange)
   */
  getValidDataItems: PropTypes.func,
  /** an array of dataItems to be included on each card
   * this prop will be ignored if getValidDataItems is defined
   */
  dataItems: DataItemsPropTypes,
  currentBreakpoint: PropTypes.string,
  /** an object where the keys are available dimensions and the values are the values available for those dimensions
   *  ex: { manufacturer: ['Rentech', 'GHI Industries'], deviceid: ['73000', '73001', '73002'] }
   */
  availableDimensions: PropTypes.shape({}),
  /** optional link href's for each card type that will appear in a tooltip */
  dataSeriesItemLinks: PropTypes.shape({
    simpleBar: PropTypes.string,
    groupedBar: PropTypes.string,
    stackedBar: PropTypes.string,
    timeSeries: PropTypes.string,
    value: PropTypes.string,
    custom: PropTypes.string,
    table: PropTypes.string,
    image: PropTypes.string,
  }),
};

const defaultProps = {
  cardConfig: {},
  i18n: {},
  getValidDataItems: null,
  getValidTimeRanges: null,
  dataItems: [],
  currentBreakpoint: 'xl',
  availableDimensions: {},
  dataSeriesItemLinks: null,
};

const CardEditFormContent = ({
  cardConfig,
  onChange,
  i18n,
  dataItems,
  getValidDataItems,
  getValidTimeRanges,
  currentBreakpoint,
  availableDimensions,
  dataSeriesItemLinks,
  // eslint-disable-next-line react/prop-types
  onFetchDynamicDemoHotspots,
}) => {
  const { type, timeRange } = cardConfig;
  const mergedI18n = { ...defaultProps.i18n, ...i18n };
  const [selectedDataItems, setSelectedDataItems] = useState([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRange || '');

  const handleTranslation = useCallback(
    (idToTranslate) => {
      const { openMenuText, closeMenuText, clearAllText } = mergedI18n;
      switch (idToTranslate) {
        default:
          return '';
        case 'clear.all':
          return clearAllText || 'Clear all';
        case 'open.menu':
          return openMenuText || 'Open menu';
        case 'close.menu':
          return closeMenuText || 'Close menu';
      }
    },
    [mergedI18n]
  );

  return (
    <>
      <CommonCardEditFormFields
        cardConfig={cardConfig}
        onChange={onChange}
        i18n={mergedI18n}
        getValidTimeRanges={getValidTimeRanges}
        currentBreakpoint={currentBreakpoint}
        selectedDataItems={selectedDataItems}
        setSelectedTimeRange={setSelectedTimeRange}
        translateWithId={handleTranslation}
      />
      {type === CARD_TYPES.IMAGE ? (
        <ImageCardFormContent
          cardConfig={cardConfig}
          i18n={mergedI18n}
          onChange={onChange}
          dataSeriesItemLinks={dataSeriesItemLinks}
          dataItems={dataItems}
          availableDimensions={availableDimensions}
          translateWithId={handleTranslation}
          onFetchDynamicDemoHotspots={onFetchDynamicDemoHotspots}
        />
      ) : type === CARD_TYPES.TABLE ? (
        <TableCardFormContent
          cardConfig={cardConfig}
          i18n={mergedI18n}
          onChange={onChange}
          dataItems={dataItems}
          selectedDataItems={selectedDataItems}
          setSelectedDataItems={setSelectedDataItems}
          getValidDataItems={getValidDataItems}
          availableDimensions={availableDimensions}
          dataSeriesItemLinks={dataSeriesItemLinks}
          translateWithId={handleTranslation}
        />
      ) : (
        <DataSeriesFormContent
          cardConfig={cardConfig}
          onChange={onChange}
          dataItems={dataItems}
          selectedDataItems={selectedDataItems}
          setSelectedDataItems={setSelectedDataItems}
          selectedTimeRange={selectedTimeRange}
          getValidDataItems={getValidDataItems}
          availableDimensions={availableDimensions}
          i18n={mergedI18n}
          dataSeriesItemLinks={dataSeriesItemLinks}
          translateWithId={handleTranslation}
        />
      )}
    </>
  );
};

CardEditFormContent.propTypes = propTypes;
CardEditFormContent.defaultProps = defaultProps;

export default CardEditFormContent;
