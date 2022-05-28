import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
// import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// material
import {
  Stack,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  Alert,
  // IconButton,
  // InputAdornment
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
// import Iconify from '../components/Iconify';
import { fetchOptions, addTransaction } from '../store/transactions/actions';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth_token: authToken } = useSelector((state) => state.auth);
  const { loading, error, message, options } = useSelector((state) => state.transaction);

  // const [showPassword, setShowPassword] = useState(false);
  const [clientOptions, setClientOptions] = useState([]);

  const [motorVehicleTypeOptions, setMotorVehicleTypeOptions] = useState([]);

  const [motorVehicleModelOptions, setMotorVehicleModelOptions] = useState([]);

  const [insuaranceCoverOptions, setInsuaranceCoverOptions] = useState([]);

  const [insuaranceClassOptions, setInsuaranceClassOptions] = useState([]);

  const [errorMessage, setErrorMessage] = useState('');

  const [successMessage, setSuccessMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchOptions(authToken));
  }, [dispatch, authToken]);

  const RecordTransactionSchema = Yup.object().shape({
    // name: Yup.string().min(2, 'Too Short!').max(100, 'Too Long!').required('Name required'),
    // phone: Yup.string().min(2, 'Too Short!').max(10, 'Too Long!').required('Number required'),
    client_id: Yup.string().required('Client required'),
    vehicle_registration: Yup.string()
      .min(2, 'Too Short!')
      .max(10, 'Too Long!')
      .required('Vehicle registration is required'),

    type_of_motor_vehicle_id: Yup.string().required('Type of motor vehicle is required'),
    model_of_motor_vehicle_id: Yup.string().required('Model of motor vehicle is required'),
    motor_vehicle_chasis: Yup.string().required('Motor vehicle chasis is required'),
    motor_vehicle_manufacture_year: Yup.string().required('Motor vehicle manufacture year is required'),
    type_of_insuarance_cover_id: Yup.string().required('Type of insuarance cover is required'),
    class_of_insuarance_id: Yup.string().required('Class of insuarance is required'),

    amount_charged: Yup.number().required('Amount charged is required'),
    amount_paid: Yup.number().required('Amount paid is required'),
    insuarance_cover_period: Yup.number().required('Insuarance cover period is required'),
    time_for_renewal_posting: Yup.string().required('Time for renewal posting is required'),
    insuarance_cover_extension: Yup.number().required('Insuarance cover extension is required'),
  });

  const formik = useFormik({
    initialValues: {
      client_id: '',
      vehicle_registration: '',
      type_of_motor_vehicle_id: '',
      model_of_motor_vehicle_id: '',
      motor_vehicle_chasis: '',
      motor_vehicle_manufacture_year: '',
      type_of_insuarance_cover_id: '',
      class_of_insuarance_id: '',
      amount_charged: '',
      amount_paid: '',
      insuarance_cover_period: '',
      time_for_renewal_posting: '',
      insuarance_cover_extension: '',
    },
    validationSchema: RecordTransactionSchema,
    onSubmit: () => {
      console.log(formik.values);
      const {
        client_id: clientId,
        vehicle_registration: vehicleRegistration,
        type_of_motor_vehicle_id: typeOfMotorVehicleId,
        model_of_motor_vehicle_id: modelOfMotorVehicleId,
        motor_vehicle_chasis: motorVehicleChasis,
        motor_vehicle_manufacture_year: motorVehicleManufactureYear,
        type_of_insuarance_cover_id: typeOfInsuaranceCoverId,
        class_of_insuarance_id: classOfInsuaranceId,
        amount_charged: amountCharged,
        amount_paid: amountPaid,
        insuarance_cover_period: insuaranceCoverPeriod,
        time_for_renewal_posting: timeForRenewalPosting,
        insuarance_cover_extension: insuaranceCoverExtension,
      } = formik.values; // get the values from the form

      if (!typeOfMotorVehicleId) {
        formik.setErrors({
          type_of_motor_vehicle_id: 'Type of motor vehicle is required',
        });
        formik.setSubmitting(false);
        return;
      }

      if (!modelOfMotorVehicleId) {
        formik.setErrors({
          model_of_motor_vehicle_id: 'Model of motor vehicle is required',
        });
        formik.setSubmitting(false);
        return;
      }

      if (!typeOfInsuaranceCoverId) {
        formik.setErrors({
          type_of_insuarance_cover_id: 'Type of insuarance cover is required',
        });
        formik.setSubmitting(false);
        return;
      }

      if (!classOfInsuaranceId) {
        formik.setErrors({
          class_of_insuarance_id: 'Class of insuarance is required',
        });
        formik.setSubmitting(false);
        return;
      }

      // Everything is okay.
      if (!formik.errors.length) {
        setSubmitting(true);
        dispatch(
          addTransaction(authToken, {
            client: clientId,
            vehicle_registration_number: vehicleRegistration,
            type_of_motor_vehicle: typeOfMotorVehicleId,
            model_of_motor_vehicle: modelOfMotorVehicleId,
            motor_vehicle_chasis: motorVehicleChasis,
            vehicle_manufacture_year: motorVehicleManufactureYear,
            type_of_insuarance_cover: typeOfInsuaranceCoverId,
            class_of_insuarance: classOfInsuaranceId,
            amount_charged: amountCharged,
            amount_paid: amountPaid,
            insuarance_cover_period_in_months: insuaranceCoverPeriod,
            time_for_renewal_posting: timeForRenewalPosting,
            insuarance_cover_extension_in_months: insuaranceCoverExtension,
          })
        );
      }
    },
  });

  useEffect(() => {
    if (!loading && !error && options) {
      setClientOptions(options.clients);
      setMotorVehicleTypeOptions(options.motorVehicleTypeOptions);
      setMotorVehicleModelOptions(options.motorVehicleModelOptions);
      setInsuaranceCoverOptions(options.insuaranceCovers);
      setInsuaranceClassOptions(options.insuaranceClasses);
    }

    if (!loading && !error && message) {
      setSuccessMessage(message);
      setSubmitting(false);
      formik.resetForm();
    }

    if (!loading && error) {
      setErrorMessage(error);
      setSubmitting(false);
    }
  }, [loading, error, options, formik, message]);

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  console.log('error', errors);

  return (
    <FormikProvider value={formik}>
      {loading && <Alert severity="warning">Loading...</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack>
            {/* <TextField
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
            /> */}
            <InputLabel id="client_id">Client</InputLabel>
            <Select fullWidth id="client_id" {...getFieldProps('client_id')}>
              <MenuItem value="">Select Client</MenuItem>
              {clientOptions.map((client, index) => (
                <MenuItem key={index} value={client.id}>
                  {client.name}
                </MenuItem>
              ))}
            </Select>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Stack direction={{ xs: 'column', sm: 'column', md: 'column' }} width="50%">
              <InputLabel id="type_of_motor_vehicle">Type of Motor Vehicle</InputLabel>
              <Select
                fullWidth
                id="type_of_motor_vehicle"
                labelId="type_of_motor_vehicle"
                {...getFieldProps('type_of_motor_vehicle_id')}
                label="Type of motor vehicle"
                error={Boolean(touched.type_of_motor_vehicle_id && errors.type_of_motor_vehicle_id)}
                onChange={(e) => {
                  formik.setFieldValue('type_of_motor_vehicle_id', e.target.value);
                }}
              >
                <MenuItem value="">Select type of motor vehicle</MenuItem>
                {motorVehicleTypeOptions.map((typeOfMotorVehicle, index) => (
                  <MenuItem key={index} value={typeOfMotorVehicle.id}>
                    {typeOfMotorVehicle.name}
                  </MenuItem>
                ))}
                {/* <MenuItem value="car">Car</MenuItem>
                <MenuItem value="motorbike">Motorbike</MenuItem>
                <MenuItem value="truck">Truck</MenuItem>
                <MenuItem value="bus">Bus</MenuItem>
                <MenuItem value="van">Van</MenuItem>
                <MenuItem value="other">Other</MenuItem> */}
              </Select>
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'column', md: 'column' }} width="50%">
              <InputLabel id="model_of_motor_vehicle">Model of Motor Vehicle</InputLabel>
              <Select
                fullWidth
                id="model_of_motor_vehicle"
                {...getFieldProps('model_of_motor_vehicle_id')}
                label="Model of motor vehicle"
                error={Boolean(touched.model_of_motor_vehicle_id && errors.model_of_motor_vehicle_id)}
              >
                <MenuItem value="">Select model of motor vehicle</MenuItem>
                {motorVehicleModelOptions.map((modelOfMotorVehicle, index) => (
                  <MenuItem key={index} value={modelOfMotorVehicle.id}>
                    {modelOfMotorVehicle.name}
                  </MenuItem>
                ))}
                {/* <MenuItem value="Toyota">Toyota</MenuItem>
                <MenuItem value="Honda">Honda</MenuItem>
                <MenuItem value="Nissan">Nissan</MenuItem>
                <MenuItem value="Mercedes">Mercedes</MenuItem>
                <MenuItem value="BMW">BMW</MenuItem>
                <MenuItem value="Audi">Audi</MenuItem>
                <MenuItem value="Volkswagen">Volkswagen</MenuItem>
                <MenuItem value="Ford">Ford</MenuItem>
                <MenuItem value="Other">Other</MenuItem> */}
              </Select>
            </Stack>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Motor Vehicle Chasis"
              {...getFieldProps('motor_vehicle_chasis')}
              error={Boolean(touched.motor_vehicle_chasis && errors.motor_vehicle_chasis)}
              helperText={touched.motor_vehicle_chasis && errors.motor_vehicle_chasis}
            />

            <TextField
              fullWidth
              label="Motor Vehicle Manufacture Year"
              type="number"
              {...getFieldProps('motor_vehicle_manufacture_year')}
              error={Boolean(touched.motor_vehicle_manufacture_year && errors.motor_vehicle_manufacture_year)}
              helperText={touched.motor_vehicle_manufacture_year && errors.motor_vehicle_manufacture_year}
            />
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Stack direction={{ xs: 'column', md: 'column', sm: 'column' }} width="50%">
              <InputLabel id="type_of_insuarance_cover">Type of insuarance cover</InputLabel>
              <Select
                fullWidth
                id="type_of_insuarance_cover"
                {...getFieldProps('type_of_insuarance_cover_id')}
                label="Type of Insuarance Cover"
                error={Boolean(touched.type_of_insuarance_cover_id && errors.type_of_insuarance_cover_id)}
              >
                <MenuItem value="">Select type of insuarance cover</MenuItem>
                {insuaranceCoverOptions.map((typeOfInsuaranceCover, index) => (
                  <MenuItem key={index} value={typeOfInsuaranceCover.id}>
                    {typeOfInsuaranceCover.name}
                  </MenuItem>
                ))}
                {/* <MenuItem value="third_party">Third Party</MenuItem>
                <MenuItem value="comprehensive_cover">Comprehensive Cover</MenuItem> */}
              </Select>
            </Stack>

            <Stack direction={{ xs: 'column', md: 'column', sm: 'column' }} width="50%">
              <InputLabel id="class_of_insuarance">Class of insuarance</InputLabel>
              <Select
                fullWidth
                id="class_of_insuarance"
                labelId="class_of_insuarance"
                label="Class of insuarance"
                {...getFieldProps('class_of_insuarance_id')}
                error={Boolean(touched.class_of_insuarance_id && errors.class_of_insuarance_id)}
              >
                <MenuItem value="">Select class of insuarance</MenuItem>
                {/* <MenuItem value="private_motor">Private motor</MenuItem>
                <MenuItem value="moto_commercial">Moto Commercial</MenuItem>
                <MenuItem value="motorcycle_private">Motorcycle Private</MenuItem>
                <MenuItem value="motorcycle_psv">Motorcycle PSV</MenuItem>
                <MenuItem value="psv_unmarked">PSV unmarked</MenuItem>
                <MenuItem value="taxi">Taxi</MenuItem>
                <MenuItem value="psv_matatu">PSV Matatu</MenuItem> */}
                {insuaranceClassOptions.map((classOfInsuarance, index) => (
                  <MenuItem key={index} value={classOfInsuarance.id}>
                    {classOfInsuarance.name}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
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
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Stack direction={{ xs: 'column', sm: 'column', md: 'column' }} width="50%">
              <InputLabel id="insuarance_cover_period">Insuarance Cover Period</InputLabel>
              <TextField
                fullWidth
                id="insuarance_cover_period"
                placeholder="Insuarance cover period in months"
                type="number"
                {...getFieldProps('insuarance_cover_period')}
                error={Boolean(touched.insuarance_cover_period && errors.insuarance_cover_period)}
                helperText={touched.insuarance_cover_period && errors.insuarance_cover_period}
              />
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'column', md: 'column' }} width="50%">
              <InputLabel id="time_for_renewal_posting">Time for renewal posting</InputLabel>
              <TextField
                fullWidth
                id="time_for_renewal_posting"
                type="date"
                {...getFieldProps('time_for_renewal_posting')}
                error={Boolean(touched.time_for_renewal_posting && errors.time_for_renewal_posting)}
                helperText={touched.time_for_renewal_posting && errors.time_for_renewal_posting}
              />
            </Stack>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Vehicle Registration Number"
              {...getFieldProps('vehicle_registration')}
              error={Boolean(touched.vehicle_registration && errors.vehicle_registration)}
              helperText={touched.vehicle_registration && errors.vehicle_registration}
            />
            <TextField
              fullWidth
              label="Insuarance cover extension (months)"
              type="number"
              {...getFieldProps('insuarance_cover_extension')}
              error={Boolean(touched.insuarance_cover_extension && errors.insuarance_cover_extension)}
              helperText={touched.insuarance_cover_extension && errors.insuarance_cover_extension}
            />
          </Stack>

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting && submitting}>
            Add Transaction
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
