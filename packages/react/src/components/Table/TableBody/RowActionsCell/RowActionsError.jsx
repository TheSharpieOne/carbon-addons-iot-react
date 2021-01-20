import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { WarningAlt16 } from '@carbon/icons-react';
import { Tooltip, Button } from 'carbon-components-react';

import { settings } from '../../../../constants/Settings';
import { RowActionErrorPropTypes } from '../../TablePropTypes';

const { iotPrefix } = settings;

const propTypes = {
  /** I18N label for action failed */
  actionFailedText: PropTypes.string,
  /** I18N label for learn more */
  learnMoreText: PropTypes.string,
  /** I18N label for dismiss */
  dismissText: PropTypes.string,
  /** did an error occur */
  rowActionsError: RowActionErrorPropTypes,
  onClearError: PropTypes.func,
};

const defaultProps = {
  actionFailedText: 'Action failed',
  learnMoreText: 'Learn more',
  dismissText: 'Dismiss',
  rowActionsError: null,
  onClearError: null,
};

const RowActionsError = ({
  rowActionsError,
  actionFailedText,
  learnMoreText,
  dismissText,
  onClearError,
}) => {
  if (!rowActionsError) {
    return null;
  }
  const { title, message, learnMoreURL } = rowActionsError;
  return rowActionsError ? (
    <Fragment>
      <Tooltip
        clickToOpen
        tabIndex={0}
        triggerText=""
        triggerId="tooltip-error"
        tooltipId="tooltip"
        renderIcon={React.forwardRef((props, ref) => (
          <WarningAlt16 ref={ref} />
        ))}
      >
        <div className={`${iotPrefix}--row-actions-error--tooltip`}>
          <p className={`${iotPrefix}--row-actions-error--title`}>{title}</p>
          {message}
          <div className={`${iotPrefix}--row-actions-error--footer`}>
            {learnMoreURL ? (
              <a href={learnMoreURL} target="_blank" rel="noopener noreferrer">
                {learnMoreText}
              </a>
            ) : (
              <div />
            )}
            {onClearError ? (
              <Button
                onClick={(evt) => {
                  onClearError(evt);
                  evt.stopPropagation();
                }}
              >
                {dismissText}
              </Button>
            ) : null}
          </div>
        </div>
      </Tooltip>
      <span className={`${iotPrefix}--row-actions-error--span`}>{actionFailedText}</span>
    </Fragment>
  ) : null;
};

RowActionsError.propTypes = propTypes;
RowActionsError.defaultProps = defaultProps;

export default RowActionsError;
