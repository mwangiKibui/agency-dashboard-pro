import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
// material
import { Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
// store
import { login, resetAuth } from '../../../store/auth/actions';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { isLoggedIn, error } = useSelector((state) => state.auth);
  const [redirect, setRedirect] = useState(false);
  const [authError, setAuthError] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      setRedirect(true);
    }
    if (error) {
      if (error === 'Password incorrect') {
        setAuthError(() => ({
          password: error,
        }));
        setSubmitting(false);
      } else if (error === 'User not found') {
        setAuthError(() => ({
          email: error,
        }));
        setSubmitting(false);
      }
    }
  }, [isLoggedIn, error]);

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
      const {
        values: { email },
      } = formik;
      const {
        values: { password },
      } = formik;

      if (!formik.errors.email && !formik.errors.password) {
        // Update auth state.
        setAuthError({});
        // Update the loading state.
        setSubmitting(true);
        // dispatch login action.
        dispatch(
          login({
            email,
            password,
          })
        );
      }
    },
  });

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...formik.getFieldProps('email')}
            error={Boolean((formik.touched.email && formik.errors.email) || authError.email)}
            helperText={(formik.touched.email && formik.errors.email) || authError.email}
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
            error={Boolean((formik.touched.password && formik.errors.password) || authError.password)}
            helperText={(formik.touched.password && formik.errors.password) || authError.password}
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

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={formik.isSubmitting && isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
