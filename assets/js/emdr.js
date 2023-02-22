const body = document.querySelector('body');
const dark_toggle = document.getElementById('dark-toggle');
const dot = document.getElementById('dot');
const tick_slider = document.getElementById('tick');
const tick_output = document.getElementById('tick-output');
const volume_slider = document.getElementById('volume');
const volume_output = document.getElementById('volume-output');
const start_button = document.getElementById('start-btn');
const stop_button = document.getElementById('stop-btn');

let emdr;

// If initial values aren't present in localStorage, they will be. They will be..
function first_run() {
	if (isNaN(parseInt(localStorage.getItem('tick')))) {
		localStorage.setItem('tick', 800);
	}
	if (isNaN(JSON.parse(localStorage.getItem('dark_mode')))) {
		localStorage.setItem('dark_mode', JSON.stringify(false));

	}
	if (isNaN(parseInt(localStorage.getItem('volume')))) {
		localStorage.setItem('volume', -6);
	}

	tick_slider.value = parseInt(localStorage.getItem('tick'));
	tick_output.innerText = parseInt(localStorage.getItem('tick'));
	
	volume_slider.value = parseInt(localStorage.getItem('volume'));
	volume_output.innerText = parseInt(localStorage.getItem('volume'));

	dark_toggle.checked = JSON.parse(localStorage.getItem('dark_mode'));
}

function check_dark_mode() {
	return body.classList.contains('dark');
}

function toggle_dark_mode() {
	if (dark_toggle.checked == false) {
		body.classList.remove('dark');
	}
	if (dark_toggle.checked == true){
		body.classList.add('dark');
	}
	
}

function startEmdr() {
	emdr = setInterval(function () {
		const isPulledLeft = dot.classList.contains('is-pulled-left');
		const pan = isPulledLeft ? -1 : 1;
		const panner = new Tone.PanVol(pan, parseInt(localStorage.getItem('volume'))).toDestination();
		const oscillator = new Tone.Oscillator('C3', 'sine').connect(panner);
		oscillator.start().stop('+32n');
		dot.classList.toggle('is-pulled-left');
		dot.classList.toggle('is-pulled-right');
	}, parseInt(localStorage.getItem('tick')));
}

function stopEmdr() {
	clearInterval(emdr);
}

function resetEmdr() {
	stopEmdr();
	dot.classList.remove('is-pulled-left');
	dot.classList.add('is-pulled-right');
}

first_run();
toggle_dark_mode();

tick_slider.addEventListener('change', function() {
	localStorage.setItem('tick', tick_slider.value);
	tick_output.innerText = tick_slider.value;
});

volume_slider.addEventListener('change', function() {
	localStorage.setItem('volume', volume_slider.value);
	volume_output.innerText = volume_slider.value;
});

start_button.addEventListener('click', () => {
	resetEmdr();
	startEmdr();
});

stop_button.addEventListener('click', stopEmdr);


dark_toggle.addEventListener('click', () => {
	localStorage.setItem('dark_mode', JSON.stringify(dark_toggle.checked));
	toggle_dark_mode();
});

bulmaSlider.attach();