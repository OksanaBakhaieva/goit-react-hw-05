const getImg = image => {
  if (!image || image === null || image === '') {
    return 'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg';
  }
  return `https://image.tmdb.org/t/p/w500${image}`;
};

const formatDate = date => {
  const options = { month: 'long', year: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
};

export { getImg, formatDate };