'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
  className: _propTypes2["default"].string,
  colSpan: _propTypes2["default"].number,
  title: _propTypes2["default"].node,
  dataIndex: _propTypes2["default"].string,
  width: _propTypes2["default"].oneOfType([_propTypes2["default"].number, _propTypes2["default"].string]),
  fixed: _propTypes2["default"].oneOf([true, 'left', 'right']),
  render: _propTypes2["default"].func,
  onCellClick: _propTypes2["default"].func,
  ifshow: _propTypes2["default"].bool,
  fieldType: _propTypes2["default"].string // 类型
};

var Column = function (_Component) {
  _inherits(Column, _Component);

  function Column() {
    _classCallCheck(this, Column);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  return Column;
}(_react.Component);

Column.defaultProps = {
  ifshow: true
};


Column.propTypes = propTypes;

exports["default"] = Column;
module.exports = exports['default'];