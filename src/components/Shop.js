import React, { useState, useEffect } from "react";
import DataBase from "../modules/DataBase";
import "../App.scss";
import { Link } from "react-router-dom";
import imageTest from "../assets/images/row26.png";

function Shop() {
	const [beers, setBeers] = useState([]);
	const [beersOnTap, setBeersOnTap] = useState([]);

	// get beer descriptions
	useEffect(() => {
		const getData = async () => {
			const Beers = await DataBase.GetData();
			setBeers(Beers);
			// console.log(Beers);
		};
		getData(beers);
	}, []);

	// get all bar data - and filter taps
	useEffect(() => {
		const getData = async () => {
			const barData = await DataBase.GetData();
			setBeersOnTap(barData.taps);
			console.log(barData);
		};
		getData(beersOnTap);
	}, []);

	return (
		<div className="main-wrapper">
			<div className="page-title">
				<h1>Shop</h1>
			</div>
			<section className="beer-list">
				{beersOnTap.map((beer) => (
					<div className="single-beer" key={beer.id}>
						<div className="single-beer-image">
							<img src={imageTest} />
							{/* <img src={`static/${beer.label}`} /> */}
						</div>
						<div class="single-beer-info">
							<h2 key={beer.beer}>{beer.beer}</h2>
							<Link to={`/shop/${beer.id}`}>
								<button>More Info</button>
							</Link>
							<button>Add to cart</button>
						</div>
					</div>
				))}
			</section>
			<section className="promo-section">
				<h1>Happy Hour</h1>
			</section>
			<section className="stats-section">
				<h1>Stats</h1>
			</section>
		</div>
	);
}

export default Shop;
