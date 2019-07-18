import { connect } from 'dva';
import React from 'react';
import { Table, Button, Modal, Input, Popconfirm } from 'antd';
import styles from './index.less';

class Student extends React.Component {
  columns = [
    { title: '序号', dataIndex: 'id' },
    { title: '姓名', dataIndex: 'name' },
    { title: '年龄', dataIndex: 'age' },
    {
      title: '性别',
      dataIndex: 'sex',
      render: text => {
        return <div>{text === 1 ? '男' : '女'}</div>;
      },
    },
    {
      title: '操作',
      render: (text, record, index) => {
        let { nameVal, ageVal, sexVal } = this.state;
        return (
          <div>
            <Button
              type="dashed"
              onClick={() => {
                // this.handleEdi(record.id);
                this.showModal(record);
              }}
            >
              编辑
            </Button>
            <Modal
              title="修改"
              visible={this.state.visible}
              onOk={() => {
                this.props.handleOk(record.id, nameVal, ageVal, sexVal);
                this.setState({
                  visible: false,
                });
              }}
              onCancel={this.handleCancel}
            >
              <label>
                姓名：
                <Input name="nameVal" value={nameVal} onChange={this.handleChg} />
              </label>
              <label>
                年龄：
                <Input name="ageVal" value={ageVal} onChange={this.handleChg} />
              </label>
              <label>
                性别：
                <Input name="sexVal" value={sexVal} onChange={this.handleChg} />
              </label>
            </Modal>
            <Popconfirm
              title="确认要删除吗?"
              onConfirm={() => {
                this.props.handleDel(record.id);
              }}
              onCancel={() => {}}
              okText="Yes"
              cancelText="No"
            >
              <Button type="danger">删除</Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  state = { visible: false, nameVal: '', ageVal: '', sexVal: '' };

  showModal = record => {
    this.setState({
      visible: true,
      nameVal: record.name,
      ageVal: record.age,
      sexVal: record.sex,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  handleChg = e => {
    let name = e.target.name;
    this.setState({
      [name]: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <div className={styles.search}>
          <Input ref={el => (this.myInput = el)} />
          <Button
            onClick={() => {
              // console.log(this.myInput.input.value);
              this.props.handleInit(1, this.props.limit, this.myInput.input.value);
            }}
          >
            搜索
          </Button>
        </div>
        <Table
          rowKey="id"
          columns={this.columns}
          dataSource={this.props.data}
          pagination={{
            defaultPageSize: this.props.limit,
            total: this.props.total,
            onChange: (page, pageSize) => {
              this.props.handleInit(page, pageSize);
            },
          }}
        />
      </div>
    );
  }
  componentDidMount() {
    this.props.handleInit();
  }
}
export default connect(
  state => {
    return {
      data: state.student.list,
      page: state.student.page,
      limit: state.student.limit,
      total: state.student.total,
    };
  },
  dispatch => {
    return {
      handleInit: (page = 1, pageSize = 5, searchName = '') => {
        dispatch({
          type: 'student/initData',
          page,
          pageSize,
          searchName,
        });
      },
      handleDel: id => {
        dispatch({
          type: 'student/delData',
          id,
        });
      },
      handleOk: (id, nameVal, ageVal, sexVal) => {
        dispatch({
          type: 'student/ediData',
          id,
          nameVal,
          ageVal,
          sexVal,
        });
      },
    };
  },
)(Student);
