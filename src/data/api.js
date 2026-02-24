import { CustomProducts } from "./CustomProducts";

const API_URL = 'https://fakestoreapi.com/products';

export const fetchProducts = async () => {
  try {
    const response = await fetch(API_URL);
    const apiData = await response.json(); 
    
    const allProducts = [...apiData, ...CustomProducts];
    return allProducts;
    } catch (error) {
    console.error('Error fetching products:', error);
    return CustomProducts; 
  }
};

export const fetchProductById = async (id) => {
    const numericId = parseInt(id);

    if (numericId >= 101) {
        const customProduct = CustomProducts.find(p => p.id === numericId);
        return customProduct || null;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
};