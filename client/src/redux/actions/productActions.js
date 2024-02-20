import {
  setProducts,
  setLoading,
  setError,
  setPagination,
  setFavourite,
  setFavouritesToggle,
  setProduct,
  productReviewed
} from "../slices/product";
import axios from "axios";

export const getProducts = (page, favouriteToggle) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const { data } = await axios.get(`/api/products/${page}/${10}`);
    const { products, pagination } = data;
    dispatch(setProducts(products));
    dispatch(setPagination(pagination));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error occured please try again later."
      )
    );
  }
};
export const addToFavorites = (id) => async (dispatch, getState) => {
	const {
		product: { favourite },
	} = getState();

	const newFavorites = [...favourite, id];
	localStorage.setItem('favourites', JSON.stringify(newFavorites));
	dispatch(setFavourite(newFavorites));
};


export const removeFromFavorites = (id) => async (dispatch, getState) => {
	const {
		product: { favourite },
	} = getState();

	const newFavorites = favourite.filter((favoriteId) => favoriteId !== id);
	localStorage.setItem('favourites', JSON.stringify(newFavorites));
	dispatch(setFavourite(newFavorites));
};

export const toggleFavorites = (toggle) => async (dispatch, getState) => {
	const {
		product: { favourite, products },
	} = getState();

	if (toggle) {
		const filteredProducts = products.filter((product) => favourite.includes(product._id));
		dispatch(setFavouritesToggle(toggle));
		dispatch(setProducts(filteredProducts));
	} else {
		dispatch(setFavouritesToggle(false));
		dispatch(getProducts(1));
	}
};

export const getProduct = (id) =>async(dispatch) =>{
  dispatch(setLoading(true))
  try {
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch(setProduct(data))
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error occured please try again later."
      )
    );
  }
}

export const createProductReview = (productId, userId, comment, rating, title) => async (dispatch, getState) => {
	const {
		user: { userInfo },
	} = getState();
	try {
		const config = { headers: { Authorization: `Bearer ${userInfo.token}`, 'Content-Type': 'application/json' } };

		await axios.post(`/api/products/reviews/${productId}`, { comment, userId, rating, title }, config);
		dispatch(productReviewed(true));
	} catch (error) {
		dispatch(
			setError(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
					? error.message
					: 'An expected error has occured. Please try again later.'
			)
		);
	}
};