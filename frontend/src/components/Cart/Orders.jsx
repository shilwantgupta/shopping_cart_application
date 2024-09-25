import React, { useEffect, useState } from 'react';
import api from '../../services/interceptor';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    function getOrders() {
      api
        .get('/orders')
        .then((res) => {
          const { data } = res.data;
          setOrders(data);
        })
        .catch((err) => console.log(err));
    }

    getOrders();
  }, []);

  return (
    <>
      <h3>Orders List</h3>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Name</th>
            <th>Order #</th>
            <th>Total Amt.</th>
            <th>Payment Method</th>
            <th>Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order, index) => {
              return (
                <tr key={order._id}>
                  <td>{++index}</td>
                  <td>{order?.user?.name}</td>
                  <td>{order?.orderno}</td>
                  <td>₹{order?.totalAmount}</td>
                  <td>{order?.paymentMethod}</td>
                  <td>
                    {order?.shippingAddress?.street},
                    {order?.shippingAddress?.city},
                    {order?.shippingAddress?.state} -
                    {order?.shippingAddress?.zip}
                  </td>
                  <td>{order?.status}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className='text-center' colspan='7'>
                No orders
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Orders;
