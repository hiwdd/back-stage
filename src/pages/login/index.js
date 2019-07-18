import styles from './index.less';
import { connect } from 'dva';
import { Form, Icon, Input, Button } from 'antd';

const Login = props => {
  const { getFieldDecorator } = props.form;

  return (
    <div className={styles.wrap}>
      <div className={styles.login}>
        <h1 className={styles.header}>学员后台系统</h1>
        <Form className={styles.loginForm}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '用户名不能为空!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="请输入用户名"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '密码不能为空!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="请输入密码"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button
              className={styles.btn}
              type="primary"
              onClick={() => {
                props.handleSubmit(props.form);
              }}
              block
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default connect(
  null,
  (dispatch, props) => {
    return {
      handleSubmit: form => {
        form.validateFields((err, values) => {
          if (!err) {
            // console.log(values);
            dispatch({
              type: 'user/login',
              values,
            });
          }
        });
      },
    };
  },
)(Form.create(null)(Login));
