let selectedDate = new Date(Date.now());
// const LOCALE = 'cs-CS';
const LOCALE = 'en-GB';

const populateDates = () => {
	const datesDOM = document.querySelectorAll('.date');
	const datesWrapperDOM = document.getElementById('dates-wrapper');

	datesWrapperDOM.addEventListener('click', (e) => {
		const selectedElement = e.target;
		Array.from(datesDOM).map((el) =>
			el === selectedElement
				? selectedElement.classList.add('date-selected')
				: el.classList.remove('date-selected')
		);
		selectedDate = dates[Array.from(datesDOM).indexOf(selectedElement)];
		console.log(selectedDate);
		// filterSessions();
		updateMovieCardsDOM();
	});

	const getDates = () => {
		let dates = [];

		for (let i = 0; i < 7; i++) {
			dates.unshift(new Date(Date.now() - i * 24 * 60 * 60 * 1000));
		}
		for (let i = 1; i < 7; i++) {
			dates.push(new Date(Date.now() + i * 24 * 60 * 60 * 1000));
		}

		return dates;
	};
	const dates = getDates();

	dates.map((date, index) => {
		const weekday = date
			.toLocaleDateString(LOCALE, { weekday: 'long' })
			.slice(0, 3);
		const day = date.getDate();
		const month = date.toLocaleString(LOCALE, { month: 'short' });
		datesDOM[index].children[0].innerText = weekday;
		datesDOM[index].children[1].innerText = day;
		datesDOM[index].children[2].innerText = month;
	});

	return dates;
};

populateDates();

const seatsDOM = document.querySelector('.seats');

seatsDOM.addEventListener('click', (e) => {
	console.log(e.target.classList.contains('seat'));
	if (
		e.target.classList.contains('seat-occupied') ||
		!e.target.classList.contains('seat')
	)
		return;
	e.target.classList.toggle('seat-selected');
	console.log(selectedDate);

	const selectedSeats = document.querySelectorAll('.seats .seat-selected');
	console.log(selectedSeats);

	const seats = {
		available: [],
		occupied: [],
		selected: [],
	};

	// console.log(seatsDOM);
});

const data = [
	{
		name: 'Avatar',
		imageUrl: './images/avatar.jpg',
		year: 2019,
		genre: 'Sci-fi/Action',
		length: '2h 42m',
		sessions: [
			{
				timestamp: new Date(2020, 11, 20, 17, 23),
				seats: {
					occupied: [2, 8, 8],
					selected: [14, 15, 16],
				},
			},
			{
				timestamp: new Date(2020, 11, 20, 19, 23),
				seats: {
					occupied: [2, 8, 8],
					selected: [14, 12, 16],
				},
			},
			// {
			// 	timestamp: 65424245486,
			// 	seats: {
			// 		occupied: [2, 8, 8],
			// 		selected: [3, 15, 16],
			// 	},
			// },
		],
	},
	{
		name: 'The Fifth Element',
		imageUrl: './images/the_fifth_element.jpg',
		year: 1997,
		genre: 'Sci-fi/Action',
		length: '2h 7m',
		sessions: [
			{
				timestamp: new Date(2020, 11, 20, 10, 0),
				seats: {
					occupied: [2, 8, 8],
					selected: [14, 15, 16],
				},
			},
			{
				timestamp: new Date(2020, 11, 21, 10, 0),
				seats: {
					occupied: [2, 8, 8],
					selected: [14, 15, 16],
				},
			},
			{
				timestamp: new Date(2020, 11, 20, 10, 0),
				seats: {
					occupied: [2, 8, 8],
					selected: [14, 15, 16],
				},
			},
			// {
			// 	timestamp: 6542424548643,
			// 	seats: {
			// 		occupied: [2, 8, 8],
			// 		selected: [14, 12, 16],
			// 	},
			// },
			// {
			// 	timestamp: 65424245486,
			// 	seats: {
			// 		occupied: [2, 8, 8],
			// 		selected: [3, 15, 16],
			// 	},
			// },
		],
	},
];

const checkDay = (timestamp) => {
	const timestampDate = timestamp;
	console.log('timestampDate: ', timestampDate);
	console.log('selectedDate: ', selectedDate);
	if (
		timestampDate.getFullYear() === selectedDate.getFullYear() &&
		timestampDate.getMonth() === selectedDate.getMonth() &&
		timestampDate.getDate() === selectedDate.getDate()
	)
		return true;
	else {
		false;
	}
};

const MovieCardData = (movieData) => {
	const { name, imageUrl, year, genre, length, sessions } = movieData;
	console.log('sessions: ', sessions);

	const selectedDateSessions = sessions.filter((session) =>
		checkDay(session.timestamp)
	);
	if (selectedDateSessions.length === 0) return '';
	console.log(selectedDateSessions);

	const timeButton = (time) => {
		return `<div class="time-button">${time}</div>`;
	};

	return `<div class="card movie-card">
		<img class="card-image" src="${imageUrl}" alt="${name}" />
		<div class="card-details">
			<h2 class="card-title">${name}</h2>
			<div class="card-small">
				<span class="movie-year">${year}</span>
				<span class="movie-genre">${genre}</span>
				<span class="movie-length">${length}</span>
			</div>
			<div class="direction-row">
				${selectedDateSessions
					.map((session) =>
						timeButton(
							session.timestamp.toLocaleString('en-GB', { timeStyle: 'short' })
						)
					)
					.join('')}
			</div>
		</div>
	</div>`;
};

const movieCardsWrapper = document.querySelector('.movie-cards-wrapper');
movieCardsWrapper.addEventListener('click', (e) => {
	if (e.target.classList.contains('time-button')) {
		e.target.classList.toggle('time-button-selected');
	}
});

const updateMovieCardsDOM = () => {
	movieCardsWrapper.innerHTML = '';
	data.map((movie) =>
		movieCardsWrapper.insertAdjacentHTML('beforeend', MovieCardData(movie))
	);
};
