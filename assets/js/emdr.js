const body = document.querySelector('body');
const dark_toggle = document.getElementById('dark-toggle');
const dot = document.getElementById('dot');
const tick_slider = document.getElementById('tick');
const tick_output = document.getElementById('tick-output');
const duration_slider = document.getElementById('duration');
const duration_output = document.getElementById('duration-output');
const volume_slider = document.getElementById('volume');
const volume_output = document.getElementById('volume-output');
const start_button = document.getElementById('start-btn');
const stop_button = document.getElementById('stop-btn');
const action_container = document.getElementById('action-container');
const sliders = document.getElementById('sliders');
const settings_button = document.getElementById('settings-btn');

let emdr;
let timeout;

// If initial values aren't present in localStorage, they will be. They will be..
function first_run() {
	if (isNaN(parseInt(localStorage.getItem('tick')))) {
		localStorage.setItem('tick', 800);
	}
	if (isNaN(JSON.parse(localStorage.getItem('dark_mode')))) {
		localStorage.setItem('dark_mode', JSON.stringify(false));
	}
	if (isNaN(parseInt(localStorage.getItem('hide_settings')))) {
		localStorage.setItem('hide_settings', 0);
	}
	if (isNaN(parseInt(localStorage.getItem('volume')))) {
		localStorage.setItem('volume', -6);
	}
	if (isNaN(parseInt(localStorage.getItem('duration')))) {
		localStorage.setItem('duration', 60);
	}

	tick_slider.value = parseInt(localStorage.getItem('tick'));
	tick_output.innerText = parseInt(localStorage.getItem('tick'));
	
	duration_slider.value = parseInt(localStorage.getItem('duration'));
	duration_output.innerText = parseInt(localStorage.getItem('duration'));

	volume_slider.value = parseInt(localStorage.getItem('volume'));
	volume_output.innerText = parseInt(localStorage.getItem('volume'));

	dark_toggle.checked = JSON.parse(localStorage.getItem('dark_mode'));
}

function toggle_settings() {
	if (localStorage.getItem('hide_settings') == "0") {
		sliders.classList.remove('is-invisible');
		settings_button.innerText = "Hide Settings";
	} else {
		sliders.classList.add('is-invisible');
		settings_button.innerText = "Show Settings";
	}
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

	if (parseInt(localStorage.getItem('duration')) != 0) {
		timeout = setTimeout(function () {
			stopEmdr();
		}, parseInt(localStorage.getItem('duration')) * 1000);
	}
}

function stopEmdr() {
	clearInterval(emdr);
}

function stopTimer() {
	clearTimeout(timeout);
}

function resetEmdr() {
	stopEmdr();
	stopTimer();
	dot.classList.remove('is-pulled-left');
	dot.classList.add('is-pulled-right');
}

first_run();
toggle_dark_mode();
toggle_settings();

tick_slider.addEventListener('change', function() {
	localStorage.setItem('tick', tick_slider.value);
	tick_output.innerText = tick_slider.value;
});

duration_slider.addEventListener('change', function() {
	localStorage.setItem('duration', duration_slider.value);
	duration_output.innerText = duration_slider.value;
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

settings_button.addEventListener('click', () => {
	if (localStorage.getItem('hide_settings') == "0") {
		localStorage.setItem('hide_settings', 1);
	} else {
		localStorage.setItem('hide_settings', 0);
	}
	toggle_settings();
});

dark_toggle.addEventListener('click', () => {
	localStorage.setItem('dark_mode', JSON.stringify(dark_toggle.checked));
	toggle_dark_mode();
});

bulmaSlider.attach();