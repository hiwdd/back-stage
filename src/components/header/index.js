import styles from './index.less';
import { connect } from 'dva';
import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <div className={styles.top}>
        <img
          src="http://stu.1000phone.net/Public/assets/css/images/logo.png?1563361217"
          alt="千锋"
        />
        <ul className={styles.topUl}>
          <li>
            <span>{this.props.username}</span>
          </li>
          <li>
            <span>编辑</span>
          </li>
          <li>
            <span>设置</span>
          </li>
        </ul>
      </div>
    );
  }
  componentDidUpdate() {
    this.props.initData();
  }
}
export default connect(
  state => {
    // console.log(state);
    return {
      username: state.user.username,
    };
  },
  dispatch => {
    return {
      initData: () => {
        dispatch({
          type: 'user/login',
        });
      },
    };
  },
)(Header);
