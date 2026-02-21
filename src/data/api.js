const API_URL = 'https://fakestoreapi.com/products';

export const fetchProducts = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json(); 
    return data;
  } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

export const fetchProductById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        return null;
    }
};