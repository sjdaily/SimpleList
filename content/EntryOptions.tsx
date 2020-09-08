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
    icon: faSadTear
  },
  {
    ratingLabel: 'Meh',
    icon: faMeh
  },
  {
    ratingLabel: 'Decent',
    icon: faSmile
  },
  {
    ratingLabel: 'Amazing',
    icon: faGrinHearts
  }
];
