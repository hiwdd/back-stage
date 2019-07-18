import styles from './index.less';
import Header from '../components/header';
import Menu from '../components/menu';

function BasicLayout(props) {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.bottom}>
        <Menu />
        <div className={styles.right}>
          <div>{props.children}</div>
        </div>
      </div>
    </div>
  );
}

function SimpleLayout(props) {
  return <div className={styles.container}>{props.children}</div>;
}

export default function(props) {
  if (props.location.pathname === '/login') {
    return <SimpleLayout {...props} />;
  }
  return <BasicLayout {...props} />;
}
