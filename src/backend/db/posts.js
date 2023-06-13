import { v4 as uuid } from 'uuid';
import { formatDate } from '../utils/authUtils';

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    id: 1,
    _id: uuid(),
    content:
      "Just finished reading 'The Great Gatsby' and I'm in love with F. Scott Fitzgerald's writing style. What's your favorite book?",
    likes: {
      likeCount: 10,
      likedBy: [
        'john_doe',
        'jane_doe',
        'alice',
        'bob',
        'emma',
        'oliver',
        'peter',
        'lucy',
        'mary',
        'david',
      ],
      dislikedBy: ['sarah'],
    },
    username: 'jennifer',
    createdAt: '2023-06-12T10:15:30Z',
    updatedAt: formatDate(),
  },
  {
    id: 2,
    _id: uuid(),
    content:
      'I just tried the new sushi place in town and it was amazing! Highly recommend it to anyone who loves sushi 🍣',
    likes: {
      likeCount: 5,
      likedBy: ['john_doe', 'jane_doe', 'alice', 'bob', 'emma'],
      dislikedBy: ['sarah', 'oliver'],
    },
    username: 'chris',
    createdAt: '2023-06-11T16:45:20Z',
    updatedAt: formatDate(),
  },
  {
    id: 3,
    _id: uuid(),
    content: "I can't believe it's already June! Time flies so fast ⏰",
    likes: {
      likeCount: 3,
      likedBy: ['john_doe', 'jane_doe', 'alice'],
      dislikedBy: [],
    },
    username: 'daniel',
    createdAt: '2023-06-10T08:30:15Z',
    updatedAt: formatDate(),
  },
  {
    id: 4,
    _id: uuid(),
    content:
      'Just watched the latest episode of Game of Thrones and it was insane! What are your thoughts?',
    likes: {
      likeCount: 12,
      likedBy: [
        'john_doe',
        'jane_doe',
        'alice',
        'bob',
        'emma',
        'oliver',
        'peter',
        'lucy',
        'mary',
        'david',
        'sarah',
        'tom',
      ],
      dislikedBy: [],
    },
    username: 'samantha',
    createdAt: '2023-06-09T22:05:45Z',
    updatedAt: formatDate(),
  },
  {
    id: 5,
    _id: uuid(),
    content:
      'I love hiking and exploring new trails! Just came back from a 10-mile hike and it was breathtaking 🌲',
    likes: {
      likeCount: 7,
      likedBy: [
        'john_doe',
        'jane_doe',
        'alice',
        'bob',
        'sarah',
        'emma',
        'oliver',
      ],
      dislikedBy: [],
    },
    username: 'kate',
    createdAt: '2023-06-08T14:20:10Z',
    updatedAt: formatDate(),
  },
  {
    id: 6,
    _id: uuid(),
    content:
      'Just started learning how to play the piano and it is so much fun! 🎹',
    likes: {
      likeCount: 2,
      likedBy: ['john_doe', 'jane_doe'],
      dislikedBy: [],
    },
    username: 'michael',
    createdAt: '2021-06-08T14:20:10Z',
    updatedAt: formatDate(),
  },
  {
    id: 7,
    _id: uuid(),
    content:
      'I just got a new job offer and I am so excited to start my new journey! 🎉',
    likes: {
      likeCount: 6,
      likedBy: ['john_doe', 'jane_doe', 'alice', 'bob', 'emma', 'oliver'],
      dislikedBy: ['sarah'],
    },
    username: 'peter',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    id: 8,
    _id: uuid(),
    content:
      "I can't stop listening to this new album by Taylor Swift, it's amazing! 🎶",
    likes: {
      likeCount: 8,
      likedBy: [
        'john_doe',
        'jane_doe',
        'alice',
        'bob',
        'emma',
        'oliver',
        'lucy',
        'mary',
      ],
      dislikedBy: ['sarah'],
    },
    username: 'jessica',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    id: 9,
    _id: uuid(),
    content:
      'I just finished my first marathon and it was a life-changing experience! 🏃‍♂️',
    likes: {
      likeCount: 11,
      likedBy: [
        'john_doe',
        'jane_doe',
        'alice',
        'bob',
        'emma',
        'oliver',
        'peter',
        'lucy',
        'mary',
        'david',
        'tom',
      ],
      dislikedBy: [],
    },
    username: 'ryan',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    id: 10,
    _id: uuid(),
    content:
      'I love cooking and trying out new recipes! Just made a delicious lasagna for dinner 🍝',
    likes: {
      likeCount: 4,
      likedBy: ['john_doe', 'jane_doe', 'alice', 'bob'],
      dislikedBy: ['sarah'],
    },
    username: 'hannah',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
