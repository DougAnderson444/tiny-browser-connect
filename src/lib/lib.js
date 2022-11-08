/**
 * Must be imported in the browser env due to webrtc
 */
import P2PCF from 'p2pcf';
import { createDagRepo } from '@douganderson444/ipld-car-txs';
import contactCard from './Apps/ContactCard.svelte.js?raw';

let dag;
let p2pcf;

const defaultOptions = {
	stateHeartbeatWindowMs: 90000, // 1.5 minutes
	fastPollingRateMs: 1000, // 1 second
	slowPollingRateMs: 60000, // 5 seconds
	workerUrl: 'https://p2pcf.douganderson444.workers.dev'
};

export const connect = ({
	username = 'user-' + Math.floor(Math.random() * 100000),
	topic = 'peerpiper',
	options = defaultOptions,
	handleConnect = () => {},
	handleClose = () => {},
	handleMsg = () => {}
}) => {
	p2pcf = new P2PCF(username, topic, options);
	window.p2pcf = p2pcf;

	p2pcf.on('peerconnect', handleConnect);
	p2pcf.on('peerclose', handleClose);
	p2pcf.on('msg', handleMsg);
	// p2pcf.start(); // polling
};

export const disconnect = () => {
	p2pcf.destroy();
	console.log('Disconnected.');
};

export const createDag = async ({ persist } = { persist: true }) => {
	if (!dag && !globalThis.dag) {
		dag = await createDagRepo({ persist });
		globalThis.dag = dag;
	} else {
		dag = globalThis.dag;
	}
	return dag;
};

export const createContactCard = async (dag) => {
	// save base app text to Repo
	const tag = 'ContactCard';
	const contactCardCid = await dag.tx.addData({ value: contactCard });
	console.log('contactCardCid', contactCardCid.toString());
	const tagNode = {
		compiled: contactCardCid
	};
	const rootCID = await dag.tx.addTag(tag, tagNode);
	const buffer = await dag.tx.commit(); // data not duplicated, only new data needs to be saved
	console.log({ buffer });
	return rootCID;
};
