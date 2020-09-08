import {
  faBeer,
  faCheese,
  faCookieBite,
  faGrinHearts,
  faMeh,
  faPizzaSlice,
  faSadTear,
  faSmile
} from '@fortawesome/free-solid-svg-icons';

export const typeOptions = [
  {
    typeLabel: 'Appetizer',
    icon: faCheese
  },
  {
    typeLabel: 'Drink',
    icon: faBeer
  },
  {
    typeLabel: 'Main',
    icon: faPizzaSlice
  },
  {
    typeLabel: 'Dessert',
    icon: faCookieBite
  }
];

export const ratingOptions = [
  {
    ratingLabel: 'Awful',
    icon: faSadTear,
    color: '#81e6d9'
  },
  {
    ratingLabel: 'Meh',
    icon: faMeh,
    color: '#38b2ac'
  },
  {
    ratingLabel: 'Decent',
    icon: faSmile,
    color: '#2c7a7b'
  },
  {
    ratingLabel: 'Amazing',
    icon: faGrinHearts,
    color: '#234e52'
  }
];
