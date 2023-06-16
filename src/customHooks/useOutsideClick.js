import { useEffect } from 'react';

export const useOutsideClick = (ref, dispatch, options) => {
  useEffect(() => {
    const closeOptionsModal = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        dispatch(options);
      }
    };
    document
      .getElementById('root')
      .addEventListener('mousedown', closeOptionsModal);

    return () =>
      document
        .getElementById('root')
        .removeEventListener('mousedown', closeOptionsModal);
  });
};
