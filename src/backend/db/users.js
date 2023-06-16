import { formatDate } from '../utils/authUtils';
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: 'eyJhbGciOi4cj8hFuJfY',
    firstName: 'john',
    lastName: 'doe',
    fullName: 'John Doe',
    username: 'johndoe',
    password: 'johndoe12345',
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bookmarks: [],
  },
];
