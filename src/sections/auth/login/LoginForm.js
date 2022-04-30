import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { useDispatch } from 'react-redux';
// material
import { Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
// store
import {loginSuccessful} from '../../../store/auth/actions';

// ----------------------------------------------------------------------


export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      const {values:{email}} = formik;
      const {values:{password}} = formik;

      if(email !== "test@shajeagency.com"){
        formik.setErrors({
          email: 'Wrong Email Address',
        });
        formik.setSubmitting(false);
        return;
      }

      if(password !== "123456"){
        // Password is wrong.
        formik.setErrors({
          password: 'Wrong Password',
        });
        formik.setSubmitting(false);
        return;
      }

      if(!formik.errors.email && !formik.errors.password){
        // Update auth state.
        dispatch(loginSuccessful({
          email,
          "name":"Kennedy Muriuki",
          "position":"Administrator"
        }));
        // Navigate to Dashboard.
        navigate('/');
      }
    },
  });

  // const { errors, touched, values, handleSubmit, getFieldProps,isSubmitting } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  // useEffect(() => {
  //   // dispatch(loginSuccessful({
  //   //   id: 1,
  //   //   name: 'John Doe',
  //   //   email: '',
  //   //   password: '',
  //   //   isLoggedIn: true,
  //   //   isLoginSuccessful: true,
  //   //   isLoginFailed: false,
  //   //   isRegisterSuccessful: false,
  //   //   isRegisterFailed: false,
  //   //   error: '',
  //   // }));
  //   console.log("things have changed...",formik.errors);
  // },[formik.errors]);
  console.log("formik.errors",formik.errors);
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off"  onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...formik.getFieldProps('email')}
            error={Boolean(formik.touched.email && formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...formik.getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(formik.touched.password && formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...formik.getFieldProps('remember')} checked={formik.values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={formik.isSubmitting}>
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
