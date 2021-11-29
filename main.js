class Square{
	element;
	height;
	width;
	position = new Vector(0,0);
	velocity = new Vector(0,0);
	forces = [];
	constructor(element){
		let rect = element.getBoundingClientRect()
		this.width = rect.width;
		this.height = rect.height;
		this.element = element;
	}

	lifecycle() {
		// lifecycle
		// get and add forces
		this.forces.push(g);
		this.forces.forEach(f => this.velocity.add(f));
		console.log(this.forces);
		this.forces = [];

		// apply constraints
		// max x - 1200
		if(this.position.x + this.velocity.x + this.width > 1800){
			this.velocity.x = 1800 - this.position.x - this.width;
			this.velocity.y *= 0.9;
		} 
		// max y - 900
	
		if(this.position.y + this.velocity.y + this.height > 727 ){
			this.velocity.y = 727 - this.position.y - this.height;
			this.velocity.x *= 0.9;
		} 

		if(this.position.x + this.velocity.x < 0){
			this.velocity.x = -this.position.x;
			this.velocity.y *= 0.9;
		} 

		if(this.position.y + this.velocity.y < 0 ){
			this.velocity.y = -this.position.y;
			this.velocity.x *= 0.9;
		} 


		if(Math.abs(this.velocity.x) <= 0.1) this.velocity.x = 0;
		if(Math.abs(this.velocity.y) <= 0.1) this.velocity.y = 0;
		// apply velocity

		this.position.add(this.velocity);

		// render
		this.element.style = `transform:translate(${this.position.x}px,${this.position.y}px )`
		this.element.innerHTML = `velocity: x - ${this.velocity.x}; y - ${this.velocity.y}`
	}
}


class Vector{
	x;
	y;
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
	
	add(v2){
		this.x += v2.x;
		this.y += v2.y;
	}
	static add(v1, v2){
		return new Vector(
			v1.x + v2.x,
			v1.y + v2.y,
		);
	}
}




let sliderDegree = document.getElementById("degree");
let outputDegree = document.getElementById("degree-input");
outputDegree.innerHTML = sliderDegree.value;

sliderDegree.oninput = function() {
	outputDegree.innerHTML = this.value;
}

let sliderForce = document.getElementById("force");
let outputForce = document.getElementById("force-input");
outputForce.innerHTML = sliderForce.value;

sliderForce.oninput = function() {
	outputForce.innerHTML = this.value;
}

const world = [];


let greenElement = document.querySelector(".green") 
let greyElement = document.querySelector(".grey") 
let wrapp = document.querySelector(".edge") 
let boxGreen = new Square(greenElement)
let boxWhite = new Square(greyElement)
let g = new Vector(0,10)

	
		function startWorld() {
			world.push(boxGreen);
			world.push(boxWhite);
			
			document.querySelector(".start-white").addEventListener('click',() => {
				const x = (parseInt(sliderForce.value))
				const y = (parseInt(sliderDegree.value))
				
				boxGreen.forces.push(new Vector (x,y));
			})
			document.querySelector(".start-grey").addEventListener('click',() => {
				const x = (parseInt(sliderForce.value))
				const y = (parseInt(sliderDegree.value))
			
				boxWhite.forces.push(new Vector (x,y));
			})
		// }
			// world initialization
			document.addEventListener("keydown", function(event){
				world.forEach(x =>{
					let l = new Vector(Math.floor(Math.random() * 100) -50, Math.floor(Math.random() * -100));
					// let l = new Vector(-10, -20);
					x.forces.push(l);
				}
				);

			})

			setInterval(() => {
				// lifecycle
				world.forEach(x => x.lifecycle());		
			}, 100)
		}

startWorld();
		














