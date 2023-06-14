const getEncodedToken = () => {
  const data = localStorage.getItem('user');
  return data ? JSON.parse(data).encodedToken : false;
};

export { getEncodedToken };
