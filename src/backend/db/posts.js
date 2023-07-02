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
    postPic:
      'https://images.pexels.com/photos/15017417/pexels-photo-15017417/free-photo-of-vada-pav.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    createdAt: '2022-05-01',
    updatedAt: formatDate(),
    userId: 'eyJhbGciOi4k2j8hFuJfY',

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
    postPic:
      'https://images.pexels.com/photos/16684654/pexels-photo-16684654/free-photo-of-tables-and-chairs-on-the-outside-of-a-cafe.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    updatedAt: formatDate(),
    userId: 'eyJhbGciOi4ssf442j8hF5sdffY',
  },
  {
    _id: '3',
    content:
      "Ordered Meghana's Special Chicken Biryani from Meghana's. Recommend 10/10. ✨  ",
    likes: {
      likeCount: 1,
      likedBy: [
        {
          _id: ' ',
          fullName: 'Mohit Singh',
          username: 'singhMohit',
          profileAvatar: 'https://picsum.photos/id/1012/150',
        },

      ],
      dislikedBy: [],
    },
    username: 'gill100',
    fullName: 'Rakshit Gill',
    postPic: null,
    createdAt: '2022-04-20',
    updatedAt: formatDate(),
    userId: 'eyJhbGciOi4cj8hFuJsdf',
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
    postPic: null,
    username: 'gill100',
    fullName: 'Rakshit Gill',
    createdAt: '2022-05-05',
    updatedAt: formatDate(),
    userId: 'eyJhbGciOi4cj8hFuJsdf',
  },
  {
    _id: '5',
    content:
      'I met this street food seller in Gyeongju on a recommendation from a dating app. This man was adopted and grew up in US. He moved to Korea to find his birth mother. And he did! I often think back to our conversation #MondayMotivation',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: 'peterevans',
    fullName: 'Peter evans',
    postPic:
      'https://res.cloudinary.com/dwebygldw/image/upload/v1653067279/frittr/E7OX3WgXoAEu0gR_z9x7zu.jpg',
    createdAt: '2022-05-01',
    updatedAt: formatDate(),
    userId: 'eyJhbGciOi4k2j8hF5sdffY',
  },
  {
    _id: '6',
    content: 'What a lovely evening.',
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    postPic: null,
    username: 'rockeywithane',
    fullName: 'Rockey Biswas',
    createdAt: '2022-05-11',
    updatedAt: formatDate(),
    userId: 'eyJhbGciOi4cj8hFuJfY',
    postPic: 'https://images.pexels.com/photos/698907/pexels-photo-698907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    _id: '7',
    content:
      'Nairobi is such a great city with so many people going about their business. One thing that you need to know while there are the places where to find great food/meals. Best recommendation is @al_yusra Restaurant located along Banda Street just next to Nation Centre. #Kenya',
    likes: {
      likeCount: 1,
      likedBy: [{
        _id: ' ',
        fullName: 'Mohit Singh',
        username: 'singhMohit',
        profileAvatar: 'https://picsum.photos/id/1012/150',
      },],
      dislikedBy: [],
    },
    username: 'rockeywithane',
    fullName: 'Rockey Biswas',
    createdAt: '2022-05-09',
    postPic:
      'https://images.pexels.com/photos/12851371/pexels-photo-12851371.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    updatedAt: formatDate(),
    userId: 'eyJhbGciOi4cj8hFuJfY',
  },
  {
    _id: '8',
    content:
      "Visiting the Pyramids of Giza was a surreal experience! The ancient Egyptian history and architecture are truly mesmerizing. Don't miss the chance to explore this wonder of the world. #Egypt #Pyramids",
    likes: {
      likeCount: 1,
      likedBy: [{
        _id: ' ',
        fullName: 'Mohit Singh',
        username: 'singhMohit',
        profileAvatar: 'https://picsum.photos/id/1012/150',
      },],
      dislikedBy: [],
    },
    username: 'rockeywithane',
    fullName: 'Rockey Biswas',
    createdAt: '2021-07-09',
    postPic:
      'https://images.pexels.com/photos/8863506/pexels-photo-8863506.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    updatedAt: formatDate(),
    userId: 'eyJhbGciOi4cj8hFuJfY',
  },

];
