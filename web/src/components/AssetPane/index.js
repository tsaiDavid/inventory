import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Card, Badge, Table, Divider } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const query = (employeeId) => gql`{
  allAssets {
    edges {
      node {
        description
        employeeAssetsByAssetId(condition: {
          employeeId: ${employeeId} 
        }) {
          edges {
            node {
              dateOut
              dateReturned
              conditionReturned
              otherDetails
              assetId
              employeeId
            }
          }
        }
      }
    }
  }
}`

const { Description } = DescriptionList;

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Asset ID',
  dataIndex: 'assetId',
  key: 'assetId',
}, {
  title: 'Date Out',
  dataIndex: 'dateOut',
  key: 'dateOut',
}];

export default class AssetPane extends Component {
  extractDetails = (edges) => {
    return {
      key: edges[0].node.dateOut,
      ...edges[0].node
    }
  }

  createTableData = (assets) => {
    return assets.edges.map(({ node }) => {
      return {
        name: node.description,
        ...this.extractDetails(node.employeeAssetsByAssetId.edges)
      }
    })
  }

  render() {
    if (!this.props.employeeId) return null

    return (
      <Query query={query(this.props.employeeId)}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading...</div>
          if (error) return <div>Error...</div>

          return (
            <Card bordered={false}>
              <Table dataSource={this.createTableData(data.allAssets)} columns={columns} />
              {/* <DescriptionList size="large" title="Assets" style={{ marginBottom: 32 }}>
                <Description term="Employee Name">{`${firstName} ${lastName}`}</Description>
                <Description term="EID">{id}</Description>
                <Description term="Department">{department}</Description>
              </DescriptionList> */}
            </Card>
          )
        }}
      </Query>
    );
  }
}

AssetPane.propTypes = {
  employeeId: PropTypes.any
}
