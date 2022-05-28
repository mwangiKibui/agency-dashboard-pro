const URL =
  process.env.NODE_ENV === 'production'
    ? 'https://shaje-insuarance-agency-api.herokuapp.com/'
    : 'http://localhost:3000';

export default URL;
