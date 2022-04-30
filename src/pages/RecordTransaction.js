import * as Yup from 'yup';
// import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import { 
  Stack, 
  TextField, 
  // IconButton, 
  // InputAdornment 
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
// import Iconify from '../components/Iconify';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

 // const [showPassword, setShowPassword] = useState(false);

  const RecordTransactionSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(100, 'Too Long!').required('Name required'),
    phone: Yup.string().min(2, 'Too Short!').max(10, 'Too Long!').required('Number required'),
    vehicle_registration: Yup.string().min(2, 'Too Short!').max(10,'Too Long!').required('Vehicle registration is required'),
    amount_charged: Yup.number().required('Amount charged is required'),
    amount_paid: Yup.number().required('Amount paid is required'),
    insuarance_cover_period: Yup.number().required('Insuarance cover period is required'),
    time_for_renewal_posting: Yup.number().required('Time for renewal posting is required'),
    insuarance_cover_extension: Yup.number().required('Insuarance cover extension is required'),
  });

  const formik = useFormik({
    initialValues: {
        name: '',
        phone: '',
        vehicle_registration: '',
        amount_charged: '',
        amount_paid: '',
        insuarance_cover_period: '',
        time_for_renewal_posting: '',
        insuarance_cover_extension: '',
    },
    validationSchema: RecordTransactionSchema,
    onSubmit: () => {
      navigate('/transaction');
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
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
          </Stack>

          <TextField
            fullWidth
            label="Vehicle Registration Number"
            {...getFieldProps('vehicle_registration')}
            error={Boolean(touched.vehicle_registration && errors.vehicle_registration)}
            helperText={touched.vehicle_registration && errors.vehicle_registration}
          />

            <TextField
                fullWidth
                label="Amount Charged(KES)"
                type="number"
                {...getFieldProps('amount_charged')}
                error={Boolean(touched.amount_charged && errors.amount_charged)}
                helperText={touched.amount_charged && errors.amount_charged}
            />

            <TextField
                fullWidth
                label="Amount Paid(KES)"
                type="number"
                {...getFieldProps('amount_paid')}
                error={Boolean(touched.amount_paid && errors.amount_paid)}
                helperText={touched.amount_paid && errors.amount_paid}
            />  

            <TextField
                fullWidth
                label="Insuarance cover period (months)"
                type="number"
                {...getFieldProps('insuarance_cover_period')}
                error={Boolean(touched.insuarance_cover_period && errors.insuarance_cover_period)}
                helperText={touched.insuarance_cover_period && errors.insuarance_cover_period}
            />

            <TextField
                fullWidth
                label="Time for renewal posting (months)"
                type="number"
                {...getFieldProps('time_for_renewal_posting')}
                error={Boolean(touched.time_for_renewal_posting && errors.time_for_renewal_posting)}
                helperText={touched.time_for_renewal_posting && errors.time_for_renewal_posting}
            />

            <TextField
                fullWidth
                label="Insuarance cover extension (months)"
                type="number"
                {...getFieldProps('insuarance_cover_extension')}
                error={Boolean(touched.insuarance_cover_extension && errors.insuarance_cover_extension)}
                helperText={touched.insuarance_cover_extension && errors.insuarance_cover_extension}
            />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Register Client
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
