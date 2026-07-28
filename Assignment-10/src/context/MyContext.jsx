import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const MyStore = createContext();

export const ContextProvider = ({ children }) => {
  const [storeUser, setStoreUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("users")) || [];
    } catch {
      return [];
    }
  });
  const [apiData, setApiData] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectCategory, setSelectCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });
  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem("currentUser"));
  });
  const [subtotal, setSubtotal] = useState(
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
  );

  const [shipping, setShipping] = useState(cartItems.length > 2 ? 0 : 9);

  const [total, setTotal] = useState(subtotal + shipping);

  let getApiData = async () => {
    try {
      let res = await axios.get("https://fakestoreapi.com/products");
      setApiData(res.data);
      setProducts(res.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    const newSubtotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    const newShipping = cartItems.length > 0 ? 0 : 0;

    const newTotal = newSubtotal + newShipping;

    setSubtotal(newSubtotal);
    setShipping(newShipping);

    setTotal(newTotal);
  }, [cartItems]);

  let increaseQuantity = (id) => {
    setCartItems((prev) => {
      return prev.map((val) => {
        return val.id === id ? { ...val, quantity: val.quantity + 1 } : val;
      });
    });
  };

  let decreaseQuantity = (id) => {
    setCartItems((prev) => {
      let mapped = prev.map((val) => {
        return val.id === id ? { ...val, quantity: val.quantity - 1 } : val;
      });

      let filteredCart = mapped.filter((val) => val.quantity > 0);

      return filteredCart;
    });
  };

  let deleteProductInCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("Product removed from cart 🗑️");
  };

  return (
    <MyStore.Provider
      value={{
        storeUser,
        setStoreUser,
        apiData,
        setApiData,
        products,
        setProducts,
        selectCategory,
        setSelectCategory,
        sortBy,
        setSortBy,
        cartItems,
        setCartItems,
        increaseQuantity,
        decreaseQuantity,
        deleteProductInCart,
        subtotal,
        setSubtotal,
        shipping,
        setShipping,
        total,
        setTotal,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </MyStore.Provider>
  );
};
