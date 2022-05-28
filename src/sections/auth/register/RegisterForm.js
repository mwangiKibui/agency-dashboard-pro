import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
// ----------------------------------------------------------------------
import { register, resetAuth } from '../../../store/auth/actions';

export default function RegisterForm() {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const { isLoggedIn, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      setRedirect(true);
    }
    if (error) {
      // specify the errors from registration.
      if (error === 'User already exists') {
        setAuthError(() => ({
          email: 'Email already exists',
        }));
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    }
  }, [isLoggedIn, error]);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      setAuthError({}); // clear the errors.
      setSubmitting(true); // reset submitting state.
      dispatch(
        register({
          first_name: formik.values.firstName,
          last_name: formik.values.lastName,
          email: formik.values.email,
          password: formik.values.password,
        })
      ); // registration action.
    },
  });

  if (redirect) {
    return <Navigate to="/" />;
  }

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean((touched.email && errors.email) || authError.email)}
            helperText={(touched.email && errors.email) || authError.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting && submitting}>
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
