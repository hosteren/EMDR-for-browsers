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

// Retrieve tempo from local storage
let local_tick = parseInt(localStorage.getItem('tick'));
let local_dark_mode = JSON.parse(localStorage.getItem('dark_mode'));
let local_volume = parseInt(localStorage.getItem('volume'));

function first_run() {
	if (isNaN(local_tick)) {
		local_tick = 800;
	}
	if (isNaN(local_dark_mode)) {
		local_dark_mode = false;
	}
	if (isNaN(local_volume)) {
		local_volume = -6;
	}

	tick_slider.value = local_tick;
	tick_output.innerText = local_tick;
	
	volume_slider.value = local_volume;
	volume_output.innerText = local_volume;

	dark_toggle.checked = local_dark_mode;
}


function check_dark_mode_checkbox() {
	return dark_toggle.checked;
}

function check_dark_mode() {
	return body.classList.contains('dark');
}

function toggle_dark_mode() {
	if (check_dark_mode_checkbox() == true) {
		body.classList.remove('dark');
	}
	if (check_dark_mode_checkbox() == false){
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


tick_slider.addEventListener('change', function() {
	localStorage.setItem('tick', tick_slider.value);
});

volume_slider.addEventListener('change', function() {
	localStorage.setItem('volume', volume_slider.value);
});

start_button.addEventListener('click', () => {
	resetEmdr();
	startEmdr();
});

stop_button.addEventListener('click', stopEmdr);


dark_toggle.addEventListener('click', () => {
	const checked = JSON.stringify(check_dark_mode_checkbox());
	localStorage.setItem('dark_mode', checked);
	toggle_dark_mode();
});

first_run();
toggle_dark_mode();

bulmaSlider.attach();