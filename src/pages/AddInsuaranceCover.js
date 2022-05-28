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
import { addInsuaranceCover } from '../store/insuarance_covers/actions';

// ----------------------------------------------------------------------

export default function AddInsuaranceCover() {
  const dispatch = useDispatch();
  const { isAdding, message, error } = useSelector((state) => state.insuaranceCover);
  const { auth_token: authToken } = useSelector((state) => state.auth);
  const [submitting, setSubmitting] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const AddInsuaranceCoverSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(100, 'Too Long!').required('Name required'),
    description: Yup.string().min(10, 'Too Short!').max(300, 'Too Long!').required('Description required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validationSchema: AddInsuaranceCoverSchema,
    onSubmit: () => {
      console.log(formik.values);
      const { name, description } = formik.values;
      setSuccessMessage(''); // clear success message
      setErrorMessage(''); // clear error message
      setSubmitting(true); // set submitting to true
      // dispatch action
      if (!formik.errors.length) {
        dispatch(
          addInsuaranceCover(authToken, {
            name,
            description,
          })
        );
      }
    },
  });

  useEffect(() => {
    if (!isAdding && message) {
      setSuccessMessage(message);
      setSubmitting(false);
      formik.resetForm();
    }
    if (!isAdding && error) {
      if (error === 'Invalid token') {
        setRedirect(true);
      } else {
        setErrorMessage(error);
      }
      setSubmitting(false);
    }
  }, [isAdding, message, error, formik]);

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
            label="Insuarance Cover Name"
            {...getFieldProps('name')}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
          />

          <TextField
            fullWidth
            label="Description"
            {...getFieldProps('description')}
            error={Boolean(touched.description && errors.description)}
            helperText={touched.description && errors.description}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting && submitting}>
            Add Insuarance Cover
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
