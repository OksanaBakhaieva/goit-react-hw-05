import toast from 'react-hot-toast';

const notify = () =>  toast('Please, input query!');
  
const noquery = () =>  toast('Sorry, there are no movies matching your search query. Please try again!');

const errorMes = () => toast('An error occurred while fetching movies. Please try again later.');

export { notify, noquery, errorMes };