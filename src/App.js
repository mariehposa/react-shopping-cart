import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';
import ProductContext from './contexts/ProductContext';
import CartContext from './contexts/CartContext';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState(() => {
		const items = JSON.parse(localStorage.getItem('cart'))

		return items ? items : []
	});

	const addItem = item => {
		setCart([...cart, item]);
		localStorage.setItem("cart", JSON.stringify([...cart, item]))
	};

	const removeItem = id => {
		 const ItemsToRemove = cart.filter( rItem => rItem.id !== id);
		setCart([...ItemsToRemove]);
		localStorage.setItem("cart", JSON.stringify(ItemsToRemove))
	}

	return (
		<div className="App">
			<CartContext.Provider value={{ cart }}>
				<Navigation />
			</CartContext.Provider>

			{/* Routes */}
			<ProductContext.Provider value={{ products, addItem }}>
				<Route exact path="/" component={Products} />
			</ProductContext.Provider>

			<CartContext.Provider value={{ cart, removeItem }}>
				<Route path="/cart" component={ShoppingCart} />}
				/>
			</CartContext.Provider>
		</div>
	);
}

export default App;
