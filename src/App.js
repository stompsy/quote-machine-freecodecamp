import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
	const [quote, setQuote] = useState(null);

	async function newQuote() {
		try {
			const response = await fetch('https://api.quotable.io/random');
			const { statusCode, statusMessage, ...quote } = await response.json();
			if (!response.ok) throw new Error(`${statusCode} ${statusMessage}`);
			setQuote(quote);
		} catch (error) {
			setQuote({ content: 'Unable to fetch quotes. Try again!' });
		}
	}

	function tweetQuote() {
		const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.content} - ${quote.author}`;
		window.open(twitterUrl, '_blank');
	}

	useEffect(() => {
		newQuote();
	}, []);

	if (!quote) {
		return (
			<div className='app'>
				<div id='quote-box' className='card'>
					<div id='author' className='author'>
						<h2 className='loading'>Loading...</h2>
						<h2 id='new-quote'>
							<i onClick={newQuote} className='fa-solid fa-arrows-rotate'></i>
						</h2>
					</div>
					<div className='buttons'></div>
				</div>
			</div>
		);
	}

	return (
		<div className='app'>
			<div id='quote-box' className='card'>
				<div className='author'>
					<h2 id='author'>{quote.author}</h2>
					<h2>
						<i
							id='new-quote'
							onClick={newQuote}
							className='fa-solid fa-arrows-rotate'
						></i>
						<a
							id='tweet-quote'
							href='twitter.com/intent/tweet'
							onClick={tweetQuote}
						>
							<i className='fa-brands fa-twitter tweet'></i>
						</a>
					</h2>
				</div>
				<p id='text'>"{quote.content}"</p>
			</div>
		</div>
	);
}
