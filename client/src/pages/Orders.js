import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ORDERS } from '../utils/queries';
import { ADD_ORDER, UPDATE_ORDER, DELETE_ORDER } from '../utils/mutations';
import { Button, Table, Modal, Form } from 'semantic-ui-react';

const Orders = () => {
  const { loading, data } = useQuery(GET_ORDERS);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [open, setOpen] = useState(false);

  const [addOrder] = useMutation(ADD_ORDER);
  const [updateOrder] = useMutation(UPDATE_ORDER);
  const [deleteOrder] = useMutation(DELETE_ORDER);

  useEffect(() => {
    if (data) {
      setOrders(data.getOrders);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedOrder) {
      await updateOrder({ variables: { ...selectedOrder } });
    } else {
      await addOrder({ variables: { ...selectedOrder } });
    }
    setOpen(false);
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div>
      <h2>Order Management</h2>
      <Button onClick={() => setOpen(true)}>Add Order</Button>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Supplier</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {orders.map((order, index) => (
            <Table.Row key={index}>
              <Table.Cell>{order.date}</Table.Cell>
              <Table.Cell>{order.supplier.name}</Table.Cell>
              <Table.Cell>{order.status}</Table.Cell>
              <Table.Cell>
                <Button onClick={() => {
                  setSelectedOrder(order);
                  setOpen(true);
                }}>Edit</Button>
                <Button onClick={() => deleteOrder({ variables: { id: order.id } })}>Delete</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Modal.Header>{selectedOrder ? 'Edit Order' : 'Add Order'}</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              label="Date"
              type="date"
              value={selectedOrder ? selectedOrder.date : ''}
              onChange={(e) => setSelectedOrder({ ...selectedOrder, date: e.target.value })}
              required
            />
            <Form.Input
              label="Supplier"
              value={selectedOrder ? selectedOrder.supplier.name : ''}
              onChange={(e) => setSelectedOrder({ ...selectedOrder, supplier: e.target.value })}
              required
            />
            <Form.Input
              label="Status"
              value={selectedOrder ? selectedOrder.status : ''}
              onChange={(e) => setSelectedOrder({ ...selectedOrder, status: e.target.value })}
              required
            />
            <Button type="submit">{selectedOrder ? 'Update' : 'Add'}</Button>
          </Form>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default Orders;
