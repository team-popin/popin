import axios from 'axios';

const GET_CATEGORIES="GET_CATEGORIES";

const getallCategories = categories =>({type: GET_CATEGORIES, categories})

export const getCategories = () => {

  return async dispatch => {
    const { data } = await axios.get('/api/product/category')
    dispatch(getallCategories(data))
  }
}

export default function allCategories(state=[], action){
  switch(action.type){
    case GET_CATEGORIES:
      return action.categories;
    default:
    return state;
  }
}

