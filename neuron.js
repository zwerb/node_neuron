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
 * This is an experimental class to represent a Neuron
 *
 * ### TO-DO:
 * 	-narrow down the best object / array / structure to represent the parts of the neuron
 *
 *
 *
 * 
 * @usageNotes
 *
 * ### Example
 *
 * var neuron_a = new Neuron();
 * 
 */


class Neuron {
	constructor(name = "unnamed neuron", inbound_connection_neurons = [], outbound_connection_neurons = [], inbound_weights = []){
			this._name = name;
			this._dendrites = [];
			this._terminals = [];

			this._activtion_threshold = 0.0;
			this._firing = 0.0;
			this._input_signal = 0.0;
			this._dendrite_raw_input = 0.0;
			this._sigmoid_weight = 1;

			/*Init Dendrites*/
			this._dendrites = inbound_connection_neurons.reduce(function(conn_wgt,neuron){
					let dendrite = {};
					dendrite["neuron"] = neuron;
					dendrite["weight"] = default_weight;
					conn_wgt.push(dendrite);
				},[]);

			/*Init Terminals*/
			this._terminals = outbound_connection_neurons;

			this._propagation_signal = 0.0;

		}
	get name(){
		return this._name;
	}

	get activtion_threshold(){
		return this._activtion_threshold;
	}

	get input_signal(){
		return this._input_signal;
	}

	get dendrite_raw_input(){
		return this._dendrite_raw_input;
	}

	get firing(){
		return this._firing;
	}

	get num_dendrites(){
		return this._dendrites.length;
	}

	get sigmoid_weight(){
		return this._sigmoid_weight;
	}

	get dendrites(){
		return this._dendrites;
	}

	get terminals(){
		return this._terminals;
	}

	get dendrite_names(){
		return this._dendrites.map(dendrite => dendrite.neuron.name);
	}

	get dendrite_weights(){
		return this._dendrites.map(dendrite => dendrite.weight);
	}

	get dendrite_firing(){
		return this._dendrites.map(dendrite => dendrite.neuron.firing);
	}

	get neuron_status(){
		let neuron_status = {};

		neuron_status["name"] = this.name;
		neuron_status["num_dendrites"] = this.num_dendrites;
		neuron_status["dendrite_raw_input"] = this.dendrite_raw_input;
		neuron_status["sigmoid_weight"] = this.sigmoid_weight;
		neuron_status["input_signal"] = this.input_signal;
		neuron_status["activtion_threshold"] = this.activtion_threshold;
		neuron_status["firing"] = this.firing;

		return neuron_status;

	}

	get dendrites_status(){
		let dendrites_status = [];

		this.dendrites.forEach(function(dendrite, index){
			let dendrite_status = {};
			dendrite_status["id"] = index + 1;
			dendrite_status["name"] = dendrite.neuron.name;
			dendrite_status["weight"] = dendrite.weight;
			dendrite_status["firing"] = dendrite.neuron.firing;

			dendrites_status.push(dendrite_status);
		});
		
		return dendrites_status;
	}

	set name(sName = "unnamed neuron set name"){
		this._name = sName;
	}

	set firing(fFiring = 0.0){
		this._firing = fFiring;
	}

	set activtion_threshold(fActivation_threshold = 0.0){
		this._activtion_threshold = fActivation_threshold;
	}

	set sigmoid_weight(fSigmoid_weight = 0.0){
		this._sigmoid_weight = fSigmoid_weight;
	}

	trigger(){
		this._firing = 1.0;
	}

	inverse_trigger(){
		this._firing = -1.0;
	}

	neutralize(){
		this._firing = 0.0;
	}

	// calculate (static/do not process frame) how to adjust weights based on signal
	calculatePropagationSignal(){

	}

	// process 
	processPropagation(){

	}

	// function for a neuron to receive a signal that their firing was harmful
	badSignal(){
		this._propagation_signal = -1.0;
	}

	// function for a neuron to receive a signal that their firing was useful
	goodSignal(){

	}

	// make this one line
	addDendrite(neuron = new Neuron(), weight = 0.0){
		let dendrite = {};
			dendrite["neuron"] = neuron;
			dendrite["weight"] = weight;
		this._dendrites.push(dendrite);

		return dendrite;
	}

	calculateFiring(){
		if(this._input_signal > this._activtion_threshold){
			this._firing = 1.0;
		}else{
			this._firing = 0.0;
		}

		return this._firing;
	}

		// make this into inline if statemnet
	processFiring(){
		//return (1.0 || 0.0) >  ;
		if(this.calculateinput_signal() > this._activtion_threshold){
			this._firing = 1.0;
		}else{
			this._firing = 0.0;
		}

		return this._firing;
	}

	//Shorten this to one line
	calculateinput_signal(){
		let tempSig = this.calculatedendrite_raw_input();
		let tempVal = 1/(1+Math.exp(-Math.abs(tempSig)*this._sigmoid_weight));
		if (tempSig < 0 ){
			tempVal = tempVal * -1;
		}
		return this._input_signal = tempVal;
	}

	// Shorten this to reduce function, one line
	calculatedendrite_raw_input(){
		return this._input_signal = this._dendrites.reduce((signal, dendrite) => signal + (dendrite.weight * dendrite.neuron.firing), 0);
	}

	// Process a Frame
	process(){
		//process a frame
		if(this._propagation_signal < 0){
			this._firing = -1.0;
		}else{
			processFiring();
		}
		this._propagation_signal = 0.0;
	}
}


class frame_system{

	constructor(name = "unnamed system"){
		this._name = name;
	}

}

module.exports = Neuron;


