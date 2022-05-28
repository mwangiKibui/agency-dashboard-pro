import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
// material
import { Stack, TextField, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
// import Iconify from '../components/Iconify';
import { addClient, clientsReset } from '../store/clients/actions';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const dispatch = useDispatch();
  const { additionSuccess, additionFailed, error } = useSelector((state) => state.clients);
  const { auth_token: authToken } = useSelector((state) => state.auth);
  const [submitting, setSubmitting] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    dispatch(clientsReset());
  }, [dispatch]);

  const RecordTransactionSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(100, 'Too Long!').required('Name required'),
    phone: Yup.string().min(2, 'Too Short!').max(10, 'Too Long!').required('Number required'),
    idNumber: Yup.string().min(2, 'Too Short!').max(10, 'Too Long!').required('ID Number is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      idNumber: '',
    },
    validationSchema: RecordTransactionSchema,
    onSubmit: () => {
      console.log(formik.values);
      const { name, phone, idNumber } = formik.values;
      setSuccessMessage(''); // clear success message
      setErrorMessage(''); // clear error message
      setSubmitting(true); // set submitting to true
      // dispatch action
      if (!formik.errors.length) {
        dispatch(
          addClient(authToken, {
            name,
            phone,
            id_number: idNumber,
          })
        );
      }
    },
  });

  useEffect(() => {
    if (additionSuccess) {
      setSuccessMessage('Client added successfully.');
      setSubmitting(false);
      formik.resetForm();
    }
    if (additionFailed && error) {
      if (error === 'Invalid token') {
        setRedirect(true);
      } else {
        setErrorMessage(error);
      }
      setSubmitting(false);
    }
  }, [additionSuccess, additionFailed, error, formik]);

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

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
          <TextField
            fullWidth
            label="Client Name"
            {...getFieldProps('name')}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
          />

          <TextField
            fullWidth
            label="Client Phone"
            type="number"
            {...getFieldProps('phone')}
            error={Boolean(touched.phone && errors.phone)}
            helperText={touched.phone && errors.phone}
          />

          <TextField
            fullWidth
            label="Client ID Number"
            type="number"
            {...getFieldProps('idNumber')}
            error={Boolean(touched.idNumber && errors.idNumber)}
            helperText={touched.idNumber && errors.idNumber}
          />
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting && submitting}>
            Register Client
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
