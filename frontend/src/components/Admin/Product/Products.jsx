import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import api from '../../../services/interceptor';
import { MdDelete, MdEdit } from 'react-icons/md';
import { toast } from 'react-toastify';
const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    function getProducts() {
      api
        .get('/products')
        .then((res) => {
          const { data } = res.data;
          setProducts(data);
        })
        .catch((err) => console.log(err));
    }

    getProducts();
  }, []);

  const onDelete = (id) => {
    api
      .delete('/products/' + id)
      .then((res) => {
        if (res.status === 200) {
          toast.success('Product deleted successfully!');
          const filtered = products.filter((product) => product._id !== id);
          setProducts(filtered);
        }
      })
      .catch((err) => console.log(err));
  };

  const onEdit = (id) => {
    navigate('/admin/edit-product/' + id);
  };
  return (
    <>
      <div>
        <Link className='btn btn-primary' to='/admin/add-product'>
          + Add Product
        </Link>
      </div>
      <br />
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Title</th>
            <th>Description</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product, index) => {
              return (
                <tr key={product._id}>
                  <td>{++index}</td>
                  <td>{product?.title}</td>
                  <td>{product?.description}</td>
                  <td>{product?.stock}</td>
                  <td>{product?.price}</td>
                  <td>{product?.category}</td>
                  <td>
                    <button onClick={() => onEdit(product._id)}>
                      <MdEdit />
                    </button>
                    <button onClick={() => onDelete(product._id)}>
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className='text-center' colspan='5'>
                No Products
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Products;
