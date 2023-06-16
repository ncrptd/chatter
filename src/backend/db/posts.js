import { formatDate } from '../utils/authUtils';

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: '1',
    content:
      'Must try of this week: Vada Pao from SK Vadewale in Pune. The taste is absolutely mind-boggling and fresh.',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: 'aditya_jadhav',
    fullName: 'Aditya Jadhav',
    postImage:
      'https://res.cloudinary.com/dwebygldw/image/upload/v1653066367/frittr/vada-pav_g0u58t.webp',
    createdAt: '2022-05-01',
    updatedAt: formatDate(),
  },
  {
    _id: '2',
    content:
      "Went to this hangout place, Bob's in Marathalli yesterday. The ambience is real good and the mocktails are really fresh.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },

    username: 'rachit123',
    fullName: 'Rachit Jha',
    createdAt: '2022-05-11',
    postImage:
      'https://res.cloudinary.com/dwebygldw/image/upload/v1652908952/frittr/zwpmppawiyxwthsmikyk.webp',
    updatedAt: formatDate(),
  },
  {
    _id: '3',
    content:
      "Ordered Meghana's Special Chicken Biryani from Meghana's. Recommend 10/10. ✨  ",
    likes: {
      likeCount: 2,
      likedBy: [
        {
          _id: ' ',
          fullName: 'Mohit Singh',
          username: 'singhMohit',
          profileAvatar: 'https://picsum.photos/id/1012/150',
        },
        {
          _id: 'eyJhbGciOi4cj8hFuJfY',
          fullName: 'John Doe',
          username: 'johndoe',
          profileAvatar: 'https://picsum.photos/id/1009/150',
        },
      ],
      dislikedBy: [],
    },
    username: 'gill100',
    fullName: 'Rakshit Gill',
    postImage: null,
    createdAt: '2022-04-20',
    updatedAt: formatDate(),
  },
  {
    _id: '4',
    content:
      "Went out for dinner at Chili's Hyderabad. The taste reminds me of back home in Autralia.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    postImage: null,
    username: 'gill100',
    fullName: 'Rakshit Gill',
    createdAt: '2022-05-05',
    updatedAt: formatDate(),
  },
  {
    _id: '5',
    content: 'What a lovely evening.',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    postImage: null,
    username: 'johndoe',
    fullName: 'John Doe',
    createdAt: '2022-05-11',
    updatedAt: formatDate(),
    userId: 'eyJhbGciOi4cj8hFuJfY',
  },
  {
    _id: '6',
    content:
      'Nairobi is such a great city with so many people going about their business. One thing that you need to know while there are the places where to find great food/meals. Best recommendation is @al_yusra Restaurant located along Banda Street just next to Nation Centre. #Kenya',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: 'johndoe',
    fullName: 'John Doe',
    createdAt: '2022-05-09',
    postImage:
      'https://res.cloudinary.com/dwebygldw/image/upload/v1653066477/frittr/E-HqxXdWUAM0z-U_a44utb.jpg',
    updatedAt: formatDate(),
    userId: 'eyJhbGciOi4cj8hFuJfY',
  },
  {
    _id: '7',
    content:
      'I met this street food seller in Gyeongju on a recommendation from a dating app. This man was adopted and grew up in US. He moved to Korea to find his birth mother. And he did! I often think back to our conversation #MondayMotivation',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: 'peterevans',
    fullName: 'Peter evans',
    postImage:
      'https://res.cloudinary.com/dwebygldw/image/upload/v1653067279/frittr/E7OX3WgXoAEu0gR_z9x7zu.jpg',
    createdAt: '2022-05-01',
    updatedAt: formatDate(),
  },
];
