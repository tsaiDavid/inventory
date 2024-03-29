import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';
import styles from './BasicProfile.less';
import AssetPane from '../../components/AssetPane';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const query = gql`
{
  employeeById(id: 1) {
		id
    firstName
    lastName
    department
  }
}`

const { Description } = DescriptionList;

const progressColumns = [{
  title: '时间',
  dataIndex: 'time',
  key: 'time',
}, {
  title: '当前进度',
  dataIndex: 'rate',
  key: 'rate',
}, {
  title: '状态',
  dataIndex: 'status',
  key: 'status',
  render: text => (
    text === 'success' ? <Badge status="success" text="成功" /> : <Badge status="processing" text="进行中" />
  ),
}, {
  title: '操作员ID',
  dataIndex: 'operator',
  key: 'operator',
}, {
  title: '耗时',
  dataIndex: 'cost',
  key: 'cost',
}];

// @connect(({ profile, loading }) => ({
//   profile,
//   loading: loading.effects['profile/fetchBasic'],
// }))
export default class BasicProfile extends Component {
  // componentDidMount() {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'profile/fetchBasic',
  //   });
  // }

  render() {
    // const { profile, loading } = this.props;
    // const { basicGoods, basicProgress } = profile;
    // let goodsData = [];
    // if (basicGoods.length) {
    //   let num = 0;
    //   let amount = 0;
    //   basicGoods.forEach((item) => {
    //     num += Number(item.num);
    //     amount += Number(item.amount);
    //   });
    //   goodsData = basicGoods.concat({
    //     id: '总计',
    //     num,
    //     amount,
    //   });
    // }
    // const renderContent = (value, row, index) => {
    //   const obj = {
    //     children: value,
    //     props: {},
    //   };
    //   if (index === basicGoods.length) {
    //     obj.props.colSpan = 0;
    //   }
    //   return obj;
    // };
    // const goodsColumns = [{
    //   title: '商品编号',
    //   dataIndex: 'id',
    //   key: 'id',
    //   render: (text, row, index) => {
    //     if (index < basicGoods.length) {
    //       return <a href="">{text}</a>;
    //     }
    //     return {
    //       children: <span style={{ fontWeight: 600 }}>总计</span>,
    //       props: {
    //         colSpan: 4,
    //       },
    //     };
    //   },
    // }, {
    //   title: '商品名称',
    //   dataIndex: 'name',
    //   key: 'name',
    //   render: renderContent,
    // }, {
    //   title: '商品条码',
    //   dataIndex: 'barcode',
    //   key: 'barcode',
    //   render: renderContent,
    // }, {
    //   title: '单价',
    //   dataIndex: 'price',
    //   key: 'price',
    //   align: 'right',
    //   render: renderContent,
    // }, {
    //   title: '数量（件）',
    //   dataIndex: 'num',
    //   key: 'num',
    //   align: 'right',
    //   render: (text, row, index) => {
    //     if (index < basicGoods.length) {
    //       return text;
    //     }
    //     return <span style={{ fontWeight: 600 }}>{text}</span>;
    //   },
    // }, {
    //   title: '金额',
    //   dataIndex: 'amount',
    //   key: 'amount',
    //   align: 'right',
    //   render: (text, row, index) => {
    //     if (index < basicGoods.length) {
    //       return text;
    //     }
    //     return <span style={{ fontWeight: 600 }}>{text}</span>;
    //   },
    // }];

    return (
      <Query query={query}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading...</div>
          if (error) return <div>Error...</div>

          const { firstName, lastName, id, department } = data.employeeById

          return (
            <Fragment>
              {/* Personal Details of User */}
              <Card bordered={false}>
                <DescriptionList size="large" title="Personal Details" style={{ marginBottom: 32 }}>
                  <Description term="Employee Name">{`${firstName} ${lastName}`}</Description>
                  <Description term="EID">{id}</Description>
                  <Description term="Department">{department}</Description>
                </DescriptionList>          
              </Card>
              <br />
              {/* List View of Assets */}
              <AssetPane employeeId={id} />
            </Fragment>
          )
        }}
      </Query>
    );
  }
}
