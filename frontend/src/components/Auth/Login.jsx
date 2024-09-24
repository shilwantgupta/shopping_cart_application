import React, { useContext } from 'react';
import { Formik } from 'formik';
import { Container, Row, Col, Card } from 'react-bootstrap';
import style from './auth.module.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  return (
    <Container>
      <Row className='justify-content-center'>
        <Col md={5}>
          <Card className='m-4 p-4'>
            <h3>Login</h3>
            <hr />
            <Formik
              initialValues={{ email: '', password: '' }}
              validate={(values) => {
                const errors = {};
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
                  login(values);
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
                      Login
                    </button>
                  </div>
                  <hr />
                  <p>
                    Don't have an account? <Link to='/sign-up'>Signup</Link>
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

export default Login;
