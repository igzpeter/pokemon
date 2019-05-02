var gallery;
var button;
var proch;

class Gallery {
	constructor() {
		this.create();
	}
	create() {
		gallery = document.createElement('div');
		button = document.createElement('button');
		gallery.setAttribute("id", "Gallery");
		document.body.appendChild(gallery);
		document.body.appendChild(button);
		button.addEventListener("click", next);
	
	}
}

class Pokemon {
	constructor(name, url) {
		this.name = name;
		this.url = url;
		this.create();
	}
	create() {
		let box = document.createElement('div');
		let name = document.createElement('h3');
		let img = document.createElement('img');
		box.setAttribute("class", "pokeBox");
		img.setAttribute("class", "pokeImg");
		img.setAttribute("src", this.url);
		name.innerHTML = this.name;
		gallery.appendChild(box);
		box.appendChild(name);
		box.appendChild(img);
	}
}

function data(url) {
	$.get(url, function(rep){
		proch = rep.next;
		new Gallery;
		rep.results.forEach(function(pokemon){
			$.get(pokemon.url, function(rep){
				new Pokemon(rep.name, rep.sprites.front_default);
			});
		});
	});
}

function next() {
	document.body.removeChild(gallery);
	document.body.removeChild(button);
	data(proch);
}

data('https://pokeapi.co/api/v2/pokemon');