import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const transactions = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.findName(),
  phone: faker.phone.phoneNumber(),
  vehicleRegistrationNumber: sample(
      [
          'KBC 009N',
          'KCV 009P',
          'KAA 009L',
          'KDV 090M',
          'KDM 090J',
      ]
  ),
  amount: faker.finance.amount(),
  status: sample(['active', 'expired']),
}));

export default transactions;