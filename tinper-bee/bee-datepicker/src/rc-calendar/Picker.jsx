import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { polyfill } from 'react-lifecycles-compat';
import createChainedFunction from 'rc-util/lib/createChainedFunction';
import KeyCode from 'rc-util/lib/KeyCode';
import placements from './picker/placements';
import Trigger from 'rc-trigger';

function noop() {
}

function refFn(field, component) {
  this[field] = component;
}

class Picker extends React.Component {
  static propTypes = {
    animation: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    disabled: PropTypes.bool,
    transitionName: PropTypes.string,
    onChange: PropTypes.func,
    onOpenChange: PropTypes.func,
    children: PropTypes.func,
    getCalendarContainer: PropTypes.func,
    calendar: PropTypes.element,
    style: PropTypes.object,
    open: PropTypes.bool,
    defaultOpen: PropTypes.bool,
    prefixCls: PropTypes.string,
    placement: PropTypes.any,
    value: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    defaultValue: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    align: PropTypes.object,
    enterKeyDown: PropTypes.bool, //enter 键是否打开日期面板
  }

  static defaultProps = {
    prefixCls: 'rc-calendar-picker',
    style: {},
    align: {},
    placement: 'bottomLeft',
    defaultOpen: false,
    onChange: noop,
    onOpenChange: noop,
    enterKeyDown:true,
  }

  constructor(props) {
    super(props);

    let open;
    if ('open' in props) {
      open = props.open;
    } else {
      open = props.defaultOpen;
    }
    const value = props.value || props.defaultValue;
    this.saveCalendarRef = refFn.bind(this, 'calendarInstance');

    this.state = {
      open,
      value,
    };
  }

  componentDidUpdate(_, prevState) {
    if (!prevState.open && this.state.open) {
      // setTimeout is for making sure saveCalendarRef happen before focusCalendar
      this.focusTimeout = setTimeout(this.focusCalendar, 0, this);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.focusTimeout);
  }

  onCalendarKeyDown = (event) => {
    if (event.keyCode === KeyCode.ESC) {
      event.stopPropagation();
      this.close(this.focus);
    }
    this.props.onKeyDown&&this.props.onKeyDown(event);
  }

  onCalendarSelect = (value, cause = {}) => {
    const props = this.props;
    let isDisabled = props.disabledDate && props.disabledDate(value);
    if (isDisabled) return;
    if (!('value' in props)) {
      this.setState({
        value,
      });
    }
    if (
      cause.source === 'keyboard' ||
      cause.source === 'dateInputSelect' ||
      (!props.calendar.props.timePicker && cause.source !== 'dateInput') ||
      cause.source === 'todayButton') {
      this.close(this.focus);
    }
    props.onChange(value);
  }

  onKeyDown = (event) => {
    const { enterKeyDown } = this.props;
    if (event.keyCode === KeyCode.DOWN || (enterKeyDown && event.keyCode === KeyCode.ENTER) ) {
      if(!this.state.open) this.open();
      event.preventDefault();
    }
    this.props.onKeyDown&&this.props.onKeyDown(event);
  }

  onCalendarOk = () => {
    this.close(this.focus);
  }

  onCalendarClear = () => {
    this.close(this.focus);
  }

  onVisibleChange = (open) => {
    this.setOpen(open);
  }

  static getDerivedStateFromProps(nextProps) {
    const newState = {};
    const { value, open } = nextProps;
    if ('value' in nextProps) {
      newState.value = value;
    }
    if (open !== undefined) {
      newState.open = open;
    }
    return newState;
  }

  getCalendarElement = () => {
    const props = this.props;
    const state = this.state;
    const calendarProps = props.calendar.props;
    const { value } = state;
    const defaultValue = value;
    const extraProps = {
      ref: this.saveCalendarRef,
      defaultValue: defaultValue || calendarProps.defaultValue,
      selectedValue: value,
      onKeyDown: this.onCalendarKeyDown,
      onOk: createChainedFunction(calendarProps.onOk, this.onCalendarOk),
      onSelect: createChainedFunction(calendarProps.onSelect, this.onCalendarSelect),
      onClear: createChainedFunction(calendarProps.onClear, this.onCalendarClear),
    };

    return React.cloneElement(props.calendar, extraProps);
  }

  setOpen = (open, callback) => {
    const { onOpenChange } = this.props;
    if (this.state.open !== open) {
      if (!('open' in this.props)) {
        this.setState({
          open,
        }, callback);
      }
      onOpenChange(open);
    }
  }

  open = (callback) => {
    this.setOpen(true, callback);
  }

  close = (callback) => {
    this.setOpen(false, callback);
  }

  focus = () => {
    if (!this.state.open) {
      ReactDOM.findDOMNode(this).focus();
    }
  }

  focusCalendar = () => {
    if (this.state.open && !!this.calendarInstance) {
      this.calendarInstance.focus();
    }
  }

  render() {
    const props = this.props;
    const {
      prefixCls, placement,
      style, getCalendarContainer,
      align, animation,
      disabled,
      dropdownClassName,
      transitionName, children,
    } = props;
    const state = this.state;
    return (
      <Trigger
        popup={this.getCalendarElement()}
        popupAlign={align}
        builtinPlacements={placements}
        popupPlacement={placement}
        action={(disabled && !state.open) ? [] : ['click']}
        destroyPopupOnHide
        getPopupContainer={getCalendarContainer}
        popupStyle={style}
        popupAnimation={animation}
        popupTransitionName={transitionName}
        popupVisible={state.open}
        onPopupVisibleChange={this.onVisibleChange}
        prefixCls={prefixCls}
        popupClassName={dropdownClassName}
      >
        {React.cloneElement(children(state, props), { onKeyDown: this.onKeyDown })}
      </Trigger>
    );
  }
}

polyfill(Picker);

export default Picker;
