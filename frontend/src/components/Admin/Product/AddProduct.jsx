import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { Card, Col, Row } from 'react-bootstrap';
import style from './product.module.css';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../services/interceptor';
const AddProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [initial, setInitial] = useState({
    title: '',
    description: '',
    stock: '',
    price: '',
    category: '',
  });
  useEffect(() => {
    function getProduct() {
      api
        .get('/products/' + id)
        .then((res) => {
          if (res.status === 200) {
            const { data } = res.data;
            setInitial(data);
          }
        })
        .catch((err) => console.log(err));
    }
    if (id) {
      setIsEdit(true);
      getProduct();
    }
  }, [id]);

  console.log(initial);
  return (
    <Row>
      <Col md={5}>
        <Card className='p-4 m-4'>
          <h3>{isEdit ? 'Edit' : 'Add'} Product</h3>
          <hr />
          <Formik
            initialValues={initial}
            enableReinitialize={isEdit}
            validate={(values) => {
              const errors = {};
              if (!values.title) {
                errors.title = 'Title is required.';
              }
              if (!values.description) {
                errors.description = 'Description is required.';
              }
              if (!values.stock) {
                errors.stock = 'Stock is required.';
              }
              if (!values.price) {
                errors.price = 'Price is required.';
              }
              if (!values.category) {
                errors.category = 'Category is required.';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                if (isEdit) {
                  api
                    .put('/products/' + id, values)
                    .then((res) => {
                      if (res.status === 200) {
                        toast.success('Product updated successfully!');
                        navigate('/admin/products');
                      }
                    })
                    .catch((err) => console.log(err));
                } else {
                  api
                    .post('/products', values)
                    .then((res) => {
                      if (res.status === 201) {
                        toast.success('Product saved successfully!');
                        navigate('/admin/products');
                      }
                    })
                    .catch((err) => console.log(err));
                }
                setSubmitting(false);
              }, 400);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className='mt-3'>
                  <input
                    type='text'
                    name='title'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Title'
                    className='form-control'
                    value={values.title}
                  />
                  <span className={style.error}>
                    {errors.title && touched.title && errors.title}
                  </span>
                </div>
                <div className='mt-3'>
                  <select
                    name='category'
                    className='form-control'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.category}
                  >
                    <option value=''>Select category</option>
                    <option value='Electronics'>Electronics</option>
                    <option value='Fitness'>Fitness</option>
                    <option value='Outdoor'>Outdoor</option>
                    <option value='Accessories'>Accessories</option>
                    <option value='Travel'>Travel</option>
                  </select>
                  <span className={style.error}>
                    {errors.category && touched.category && errors.category}
                  </span>
                </div>
                <div className='mt-3'>
                  <input
                    type='number'
                    name='price'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Price'
                    className='form-control'
                    value={values.price}
                  />
                  <span className={style.error}>
                    {errors.price && touched.price && errors.price}
                  </span>
                </div>
                <div className='mt-3'>
                  <input
                    type='number'
                    name='stock'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Stock'
                    className='form-control'
                    value={values.stock}
                  />
                  <span className={style.error}>
                    {errors.stock && touched.stock && errors.stock}
                  </span>
                </div>
                <div className='mt-3'>
                  <textarea
                    name='description'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Description...'
                    className='form-control'
                    value={values.description}
                  ></textarea>
                  <span className={style.error}>
                    {errors.description &&
                      touched.description &&
                      errors.description}
                  </span>
                </div>

                <div className='mt-4'>
                  <button
                    type='submit'
                    className='btn btn-primary'
                    disabled={isSubmitting}
                  >
                    {isEdit ? 'Update' : 'Add'} product
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </Card>
      </Col>
    </Row>
  );
};
export default AddProduct;
