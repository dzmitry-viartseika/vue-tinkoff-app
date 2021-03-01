import {
  DONE,
  INPROCESS,
  CANCELED,
  ACTIVE,
} from '@/constants/statusesList';

const STATUSES = [
  {
    id: DONE,
    text: 'status.done',
  },
  {
    id: INPROCESS,
    text: 'status.inProcess',
  },
  {
    id: CANCELED,
    text: 'status.canceled',
  },
  {
    id: ACTIVE,
    text: 'status.active',
  },
];

export default STATUSES;
