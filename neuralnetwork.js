/**
 * @license
 * Copyright Zwerb LLC. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/zwerb/node_neuron/master/LICENSE
 */
/**
 * @description
 *
 * This is an experimental class to represent a Neural Network 
 * which is a collection or layer of Neuron classes.
 *
 * @usageNotes
 *
 * ### Example
 *
 * var network_a = new NeuralNetwork();
 * 
 */

const Neuron = require('./neuron.js');

/**
*
*  Neural Network Class
*
**/
class NeuralNetwork {
	constructor(name = "unnamed neural network", neurons = []){
		this._name = name;
		this._neurons = neurons;
	}

	createNeuron(name = "unnamed network neuron", inbound_connections = [], outbound_connections = []){
		this._neurons.push(new Neuron(name,inbound_connections,outbound_connections));
	}

	insertNeuron(neuron){
		if (neuron instanceof Neuron){
			this._neurons.push(neuron);
		}else{
			this.createNeuron();
		}
	}

	generateNeurons(nNumberOfNeurons = 0){
		for(let i = 0; i < nNumberOfNeurons; i++){
			this._neurons.push(new Neuron("GN_"+(i+1)));
		} 
	}

	fullyConnectNeurons_internally(){
		let neurons = this._neurons;
		neurons.forEach(function(neuron_x){
			neurons.forEach(function(neuron_y){
				if(neuron_x != neuron_y){
					neuron_x.addDendrite(neuron_y);
				}
			});
		});
	}

	randomlyConnectNeurons_internally(chance = 0.5){
		let neurons = this._neurons;
		neurons.forEach(function(neuron_x){
			neurons.forEach(function(neuron_y){
				if(neuron_x != neuron_y){
					if(Math.random(0,1) <= chance){
						neuron_x.addDendrite(neuron_y);
					}
				}
			});
		});
	}

	// Connect terminals from external "network" too all dendrites from this network
	fullyConnectNeurons_externally(network){
		let neurons = this._neurons;
		neurons.forEach(function(neuron_x){
			network.neurons.forEach(function(neuron_y){
				if(neuron_x != neuron_y){
					neuron_x.addDendrite(neuron_y);
				}
			});
		});
	}

	randomlyConnectNeurons_externally(network, chance = 0.5){
		let neurons = this._neurons;
		neurons.forEach(function(neuron_x){
			network.neurons.forEach(function(neuron_y){
				if(neuron_x != neuron_y){
					if(Math.random(0,1) <= chance){
						neuron_x.addDendrite(neuron_y);
					}
				}
			});
		});
	}

	get name(){
		return this._name;
	}

	get neurons(){
		return this._neurons;
	}

	get neuron_and_network_names(){
		return this._neurons.map( neuron => neuron.name );
	}

	prependNetworkNameToNeurons(){
		let netname = this.name;
		this._neurons.forEach(function(neuron){
			neuron.name =  netname + "-" + neuron.name;
		});
	}

	get size(){
		return this._neurons.length;
	}

}

class frame_system{

	constructor(name = "unnamed system"){
		this._name = name;
	}

}

module.exports = NeuralNetwork;


