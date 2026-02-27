/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import toast from 'react-hot-toast';

const WishListContext = createContext();

export const useWishList = () => {
  const context = useContext(WishListContext);
  if (!context) {
    throw new Error('useWishList must be used within WishListProvider');
  }  
  return context;
}; 

export const WishListProvider = ({ children }) => {
    const [WishListItems, setWishListItems] = useState(() => {
        const saved = localStorage.getItem('WishListItems');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
    localStorage.setItem('WishListItems', JSON.stringify(WishListItems));
  }, [WishListItems]);


        const addToWishList = (product) => {
            const exists = WishListItems.find((item) => item.id === product.id);

            if (exists) {
                toast.error('Already in WishList!', { icon: '💔'});
                return;
            }

            setWishListItems([...WishListItems, product]);
                toast.success('Added to WishList!', { icon: '❤️', duration: 2000 })
        };

        const removeFromWishList = (productId) => {
            setWishListItems(WishListItems.filter((item) => item.id !== productId));
            toast.success('Removed from WishList', { icon: '💔', duration: 2000});
        };

        const isInWishList = (productId) => {
            return WishListItems.some((item) => item.id === productId);
        };

        return (
            <WishListContext.Provider
            value={{
                WishListItems,
                addToWishList,
                removeFromWishList,
                isInWishList,
            }}
            >
                {children}
            </WishListContext.Provider>
        );
};