// import { faker } from '@faker-js/faker';
import { useParams, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
// @mui
// import { useTheme } from '@mui/material/styles';
import {
  //   Grid,
  Container,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Alert,
} from '@mui/material';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
// sections
import // AppTasks,
// AppNewsUpdate,
// AppOrderTimeline,
// AppCurrentVisits,
// AppWebsiteVisits,
// AppTrafficBySite,
//   AppWidgetSummary,
// AppCurrentSubject,
// AppConversionRates,
'../sections/@dashboard/app';
import { fetchTransactionById } from '../store/transactions/actions';
import URL from '../config/url';
// ----------------------------------------------------------------------

export default function TransactionInfo() {
  // const theme = useTheme();
  const dispatch = useDispatch();
  const params = useParams();
  const { loading, transaction, error } = useSelector((state) => state.transaction);
  const { auth_token: authToken } = useSelector((state) => state.auth);
  const [errorMessage, setErrorMessage] = useState('');
  const [transactionData, setTransactionData] = useState({});
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    dispatch(fetchTransactionById(authToken, params.id));
  }, [dispatch, params.id, authToken]);

  useEffect(() => {
    if (!loading && error) {
      if (error === 'Invalid token') {
        setRedirect(true);
      }
      setErrorMessage(error.message);
    }

    if (!loading && !error && Object.keys(transaction).length > 0) {
      setTransactionData(transaction);
    }
  }, [loading, error, transaction]);

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        {loading && <Typography variant="h4">Loading...</Typography>}
        {error && <Alert severity="error">{errorMessage}</Alert>}
        {!loading && !error && (
          <>
            <Typography variant="h4" sx={{ mb: 5 }}>
              {transactionData?.client?.name}
            </Typography>

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Detail</TableCell>
                      <TableCell>Data</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>{transactionData?.client?.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Phone</TableCell>
                      <TableCell>{transactionData?.client?.phone}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Type of Motor Vehicle</TableCell>
                      <TableCell>{transactionData?.type_of_motor_vehicle?.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Model of Motor Vehicle</TableCell>
                      <TableCell>{transactionData?.model_of_motor_vehicle?.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Motor Vehicle Chasis</TableCell>
                      <TableCell>{transactionData?.motor_vehicle_chasis}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Motor Vehicle Manufacture Year</TableCell>
                      <TableCell>{transactionData?.vehicle_manufacture_year}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Vehicle Registration</TableCell>
                      <TableCell>{transactionData?.vehicle_registration_number}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Type of Insuarance Cover</TableCell>
                      <TableCell>{transactionData?.type_of_insuarance_cover?.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Insuarance Class</TableCell>
                      <TableCell>{transactionData?.class_of_insuarance?.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Insuarance Cover Period</TableCell>
                      <TableCell>{transactionData?.insuarance_cover_period} Months</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Insuarance Cover Extension</TableCell>
                      <TableCell>{transactionData?.insuarance_cover_extension} Months</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Time for Renewal Posting</TableCell>
                      <TableCell>{transactionData?.time_for_renewal_posting}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Amount Charged</TableCell>
                      <TableCell>KES {transactionData?.amount_charged?.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Amount Paid</TableCell>
                      <TableCell>KES {transactionData?.amount_paid?.toLocaleString()}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:file-outline" />}
                onClick={() => {
                  window.open(`${URL}/api/transaction/print_details/${transactionData?._id}`, '_blank');
                }}
              >
                Print
              </Button>
            </Scrollbar>
          </>
        )}
      </Container>
    </Page>
  );
}
