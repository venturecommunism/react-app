import React from 'react';
import PropTypes from 'prop-types'

export default class DBConnProvider extends React.Component {
  static childContextTypes = {
    conn: PropTypes.object
  };

  static propTypes = {
    conn: PropTypes.object
  };

  getChildContext() {
    return { conn: this.conn };
  }

  constructor(props, context) {
    super(props, context);
    this.conn = props.conn;
  }

  render() {
    let { children } = this.props;
    return React.Children.only(children);
  }
}
