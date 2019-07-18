import styles from './index.less';
import NavLink from 'umi/navlink';

export default function() {
  return (
    <div className={styles.left}>
      <ul className={styles.bottomUl}>
        <li>
          <NavLink exact activeClassName={styles.active} to="/">
            系统首页
          </NavLink>
        </li>
        <li>
          <NavLink exact activeClassName={styles.active} to="/student">
            学生管理
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
