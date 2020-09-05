const Neuron = require('./neuron.js');
const NeuralNetwork = require('./neuralnetwork.js');

// Instantiate User:
//let Neuron = new Neuron();

// file is included here:

/**
* Main Pogram Logic
**/

var debugOn = true; 
var debugOnA = false;
var debugOnB = true;

if(debugOn){
	console.log("Zwerb LLC");
}

var test_neuron_a = new Neuron("Neuron A");
var test_neuron_b = new Neuron("Neuron B");
var test_neuron_c = new Neuron("Neuron C");
var test_neuron_d = new Neuron("Neuron D");
var test_neuron_e = new Neuron();


if(debugOnA){
	console.log(test_neuron_a.name);
	console.log(test_neuron_b.name);
	console.log(test_neuron_c.name);
	console.log(test_neuron_d.name);
	console.log(test_neuron_e.name);
}

test_neuron_a.addDendrite(test_neuron_b,-0.2);
test_neuron_a.addDendrite(test_neuron_c,-99.9);
test_neuron_a.addDendrite(test_neuron_d,0.5);

test_neuron_b.firing = 1.0;
test_neuron_c.firing = 0.0;
test_neuron_d.firing = 1.0;


if(debugOnA){

	console.log(test_neuron_a.dendrite_names);
	console.log(test_neuron_a.dendrite_weights);
	console.log(test_neuron_a.dendrite_firing);

	//console.log(test_neuron_a.dendrites);

	console.log(test_neuron_a.calculatedendrite_raw_input());
	console.log(test_neuron_a.calculateinput_signal());
	console.log("threshold: "+test_neuron_a.activtion_threshold);

	console.log(test_neuron_a.processFiring());
}


//export { Neuron, NeuralNetwork };

var debugOn = true; 
var debugOnA = false;
var debugOnB = true;


/*********************** MAIN FUNCTION ***********************/

	// Number of Sensory Neurons
const nSNeurons = 9;

	// Number of Middle Layers
const nMiddleLayers = 3;
	// Number of Neurons in those layers
const nNNeurons = 16;
	// Amount of interconnectedness between NN and Sensory layers
const fSNConnectedness = 0.6;
	// Amount of intraconnectedness between NN middle layer
const fNNConnectedness = 0.6;


	// Number of output neurons
const nONeurons = 4;
	// Amount of interconnected between NN and Output layers
const fONConnectedness = 0.6;


// Create Some Networks

//Input Layer
var sensory_net_a = new NeuralNetwork("SN_1");
sensory_net_a.generateNeurons(nSNeurons);
sensory_net_a.prependNetworkNameToNeurons();


//Middle Layers
	//Instantiate and Name them
var neural_nets = [];
for(let i = 1; i <= nMiddleLayers; i++){
	neural_nets.push(new NeuralNetwork("NN_"+ i));
}

	// Add neurons, rename them, fully connect them
neural_nets.forEach(nnet => nnet.generateNeurons(nNNeurons));
neural_nets.forEach(nnet => nnet.prependNetworkNameToNeurons());
neural_nets.forEach(nnet => nnet.fullyConnectNeurons_internally());

	// Connect the first layer to the sensory layer
neural_nets[0].randomlyConnectNeurons_externally(sensory_net_a,fSNConnectedness);

	// Connect the rest of the layers to the previous layers (minus the first network)
let num_networks = neural_nets.length
for(let i = 1; i < num_networks; i++){
	neural_nets[i].randomlyConnectNeurons_externally(neural_nets[i-1],fNNConnectedness);
}

	// Connect first layer, Random

//Output Layers
	// Create an output layer, which will represent answers as bits 0 0 0 0
var output_net_a = new NeuralNetwork("ON_1");

	// generate output neurons, rename them, connect them to neural nets final layer
output_net_a.generateNeurons(nONeurons);
output_net_a.prependNetworkNameToNeurons();
output_net_a.randomlyConnectNeurons_externally(neural_nets[neural_nets.length-1],fONConnectedness);



if(debugOnB){

	console.log(output_net_a.neurons[2].dendrite_names);
	console.log(neural_nets[2].neurons[6].dendrite_names);
	console.log(neural_nets[0].neurons[12].dendrite_names);
	

	sensory_net_a.neurons.forEach(neuron => neuron.trigger());

	console.log(neural_nets[0].neurons[6].dendrites_status);
	console.log(neural_nets[0].neurons[6].neuron_status);

}

