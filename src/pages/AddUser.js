import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
// material
import { Stack, TextField, Alert, InputLabel, Select, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
// import Iconify from '../components/Iconify';
import { addUser } from '../store/users/actions';
import { getRoleOptions } from '../store/roles/actions';

// ----------------------------------------------------------------------

export default function AddUser() {
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.users);
  const { loading: roleLoading, options, error: roleError } = useSelector((state) => state.roles);
  const { auth_token: authToken } = useSelector((state) => state.auth);
  const [submitting, setSubmitting] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    dispatch(getRoleOptions(authToken));
  }, [dispatch, authToken]);

  useEffect(() => {
    if (!roleLoading && roleError) {
      if (roleError === 'Invalid token') {
        setRedirect(true);
      } else {
        setErrorMessage(roleError);
      }
    }
  }, [roleLoading, roleError]);

  const AddUserSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    phone_number: Yup.number().min(10, 'Too Short!').required('Phone Number is  required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    role: Yup.string().required('Role is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      phone_number: '',
      email: '',
      role: '',
      password: '',
    },
    validationSchema: AddUserSchema,
    onSubmit: () => {
      console.log(formik.values);
      setSuccessMessage(''); // clear success message
      setErrorMessage(''); // clear error message
      setSubmitting(true); // set submitting to true
      // dispatch action
      if (!formik.errors.length) {
        dispatch(
          addUser(authToken, {
            ...formik.values,
          })
        );
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, resetForm } = formik;

  useEffect(() => {
    if (!loading && message) {
      setSuccessMessage(message);
      setSubmitting(false);
      resetForm();
    }
    if (!loading && error) {
      if (error === 'Invalid token') {
        setRedirect(true);
      } else {
        setErrorMessage(error);
      }
      setSubmitting(false);
    }
  }, [loading, message, error]);

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <FormikProvider value={formik}>
      <Stack spacing={3} marginBottom={5}>
        {successMessage && (
          <Alert severity="success" draggable>
            {successMessage}
          </Alert>
        )}
        {errorMessage && (
          <Alert severity="error" draggable>
            {errorMessage}
          </Alert>
        )}
      </Stack>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Stack direction={{ xs: 'column', sm: 'column', md: 'column' }} width="50%">
              <TextField
                fullWidth
                name="first_name"
                label="First Name"
                {...getFieldProps('first_name')}
                error={Boolean(touched.first_name && errors.first_name)}
                helperText={touched.first_name && errors.first_name}
              />
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'column', md: 'column' }} width="50%">
              <TextField
                fullWidth
                name="last_name"
                label="Last Name"
                {...getFieldProps('last_name')}
                error={Boolean(touched.last_name && errors.last_name)}
                helperText={touched.last_name && errors.last_name}
              />
            </Stack>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Stack direction={{ xs: 'column', sm: 'column', md: 'column' }} width="50%">
              <TextField
                type="text"
                fullWidth
                name="phone_number"
                label="Phone Number"
                {...getFieldProps('phone_number')}
                error={Boolean(touched.phone_number && errors.phone_number)}
                helperText={touched.phone_number && errors.phone_number}
              />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'column', md: 'column' }} width="50%">
              <TextField
                type="text"
                fullWidth
                name="password"
                label="Password"
                {...getFieldProps('password')}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
            </Stack>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Stack direction={{ xs: 'column', sm: 'column', md: 'column' }} width="50%">
              <InputLabel id="email">Email</InputLabel>
              <TextField
                fullWidth
                id="email"
                name="email"
                placeholder="Email Address"
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'column', md: 'column' }} width="50%">
              <InputLabel id="role">Role</InputLabel>
              <Select
                fullWidth
                id="role"
                name="role"
                {...getFieldProps('role')}
                label="Role"
                error={Boolean(touched.role && errors.role)}
              >
                <MenuItem value="">Select User Role</MenuItem>
                {roleLoading && !options && <MenuItem value="">Loading Options...</MenuItem>}
                {!roleLoading && !options && <MenuItem value="">No Options Found</MenuItem>}
                {!roleLoading &&
                  options &&
                  options.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                {/* {motorVehicleModelOptions.map((modelOfMotorVehicle, index) => (
                  <MenuItem key={index} value={modelOfMotorVehicle.id}>
                    {modelOfMotorVehicle.name}
                  </MenuItem>
                ))} */}
                {/* <MenuItem value="12345">Admin</MenuItem>
                <MenuItem value="123478">Secretary</MenuItem> */}
              </Select>
            </Stack>
          </Stack>

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting && submitting}>
            Add User
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
