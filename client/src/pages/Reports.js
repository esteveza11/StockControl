import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPORTS } from '../utils/queries';
import { CSVLink } from 'react-csv';
import { Button, Table } from 'semantic-ui-react';

const Reports = () => {
  const { loading, data } = useQuery(GET_REPORTS);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    if (data) {
      setReports(data.getReports);
    }
  }, [data]);

  if (loading) return <p>Loading reports...</p>;

  return (
    <div>
      <h2>Inventory Reports</h2>
      <Button>
        <CSVLink data={reports} filename="inventory_reports.csv">Export as CSV</CSVLink>
      </Button>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Item Name</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Turnover Rate</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {reports.map((report, index) => (
            <Table.Row key={index}>
              <Table.Cell>{report.date}</Table.Cell>
              <Table.Cell>{report.itemName}</Table.Cell>
              <Table.Cell>{report.quantity}</Table.Cell>
              <Table.Cell>{report.turnoverRate}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default Reports;
