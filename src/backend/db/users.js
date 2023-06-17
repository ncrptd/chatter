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
    profilePic:
      'https://images.pexels.com/photos/810775/pexels-photo-810775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    _id: 'eyJhbGciOi4cj8hFuJsdf',
    firstName: 'Rakshit',
    lastName: 'Gill',
    fullName: 'Rakshit Gill',
    username: 'gill100',
    password: 'gill100',
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bookmarks: [],
    profilePic:
      'https://images.pexels.com/photos/7647313/pexels-photo-7647313.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    _id: 'eyJhbGciOi4k2j8hFuJfY',
    firstName: 'Aditya',
    lastName: 'Jadhav',
    fullName: 'Rakshit Gill',
    username: 'aditya_jadhav',
    password: 'aditya_jadhav',
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bookmarks: [],
    profilePic:
      'https://images.pexels.com/photos/733767/pexels-photo-733767.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    _id: 'eyJhbGciOi4k2j8hF5sdffY',
    firstName: 'Peter',
    lastName: 'Evans',
    fullName: 'Peter Evans',
    username: 'peterevans',
    password: 'peterevans',
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bookmarks: [],
    profilePic:
      'https://images.pexels.com/photos/12417133/pexels-photo-12417133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    _id: 'eyJhbGciOi4ssf442j8hF5sdffY',
    firstName: 'Rachit',
    lastName: 'Jha',
    fullName: 'Rachit Jha',
    username: 'rachit123',
    password: 'rachit123',
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bookmarks: [],
    profilePic:
      'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];
