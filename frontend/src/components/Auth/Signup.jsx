import React from 'react';
import { Formik } from 'formik';
import { Container, Row, Col, Card } from 'react-bootstrap';
import style from './auth.module.css';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/interceptor';
import { toast } from 'react-toastify';
const Signup = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Row className='justify-content-center'>
        <Col md={5}>
          <Card className='m-4 p-4'>
            <h3>Signup</h3>
            <hr />
            <Formik
              initialValues={{ name: '', email: '', password: '' }}
              validate={(values) => {
                const errors = {};
                if (!values.name) {
                  errors.name = 'Name is required.';
                }
                if (!values.email) {
                  errors.email = 'Email is required.';
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = 'Invalid email address';
                }
                if (!values.password) {
                  errors.password = 'Password is required.';
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  api
                    .post('/auth/sign-up', values)
                    .then((res) => {
                      if (res.status === 201) {
                        toast.success('Signup successfully!');
                        navigate('/login');
                      }
                    })
                    .catch((err) => console.log(err));
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
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                  <div>
                    <input
                      type='text'
                      name='name'
                      onChange={handleChange}
                      className='mt-2 form-control'
                      placeholder='Name'
                      onBlur={handleBlur}
                      value={values.name}
                    />
                    <span className={style.error}>
                      {errors.name && touched.name && errors.name}
                    </span>
                  </div>
                  <div>
                    <input
                      type='email'
                      name='email'
                      onChange={handleChange}
                      className='mt-2 form-control'
                      placeholder='Email'
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    <span className={style.error}>
                      {errors.email && touched.email && errors.email}
                    </span>
                  </div>
                  <div>
                    <input
                      type='password'
                      name='password'
                      onChange={handleChange}
                      className='mt-2 form-control'
                      placeholder='Password'
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    <span className={style.error}>
                      {errors.password && touched.password && errors.password}
                    </span>
                  </div>
                  <div>
                    <button
                      className='btn btn-primary mt-3'
                      type='submit'
                      disabled={isSubmitting}
                    >
                      Sign up
                    </button>
                  </div>
                  <hr />
                  <p>
                    Already have an account? <Link to='/login'>Login</Link>
                  </p>
                </form>
              )}
            </Formik>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
