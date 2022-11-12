<script>
	// @ts-nocheck

	import { onMount } from 'svelte';

	import Button from './atomic/Button.svelte';

	const myWorker = {
		workerUrl: 'https://p2pcf.douganderson444.workers.dev/',
		stateHeartbeatWindowMs: 60000, // 1 minutes
		fastPollingRateMs: 1000, // 1 second
		slowPollingRateMs: 5000 // 5 seconds
	};

	let P2PCF;
	let stream;
	let username, publicKey, room;

	let peerId;
	let video;

	const removePeerUi = (peerId) => {
		document.getElementById(peerId)?.remove();
		document.getElementById(`${peerId}-video`)?.remove();
	};

	const addPeerUi = (peerId) => {
		if (document.getElementById(peerId)) return;

		const peerEl = document.createElement('div');
		peerEl.style = 'display: flex;';

		const name = document.createElement('div');
		name.innerText = peerId.substring(0, 5);

		peerEl.id = peerId;
		peerEl.appendChild(name);

		document.getElementById('peers').appendChild(peerEl);
	};

	onMount(async () => {
		if (!document.location.hash) {
			document.location =
				document.location.toString() + `#room-example-${Math.floor(Math.random() * 100000)}`;
		}
		P2PCF = (await import('p2pcf')).default;
		connect();

		document.getElementById('session-id').innerText =
			p2pcf.sessionId.substring(0, 5) + '@' + p2pcf.roomId + ':';

		document.getElementById('send-button').addEventListener('click', () => {
			const box = document.getElementById('send-box');
			addMessage(p2pcf.sessionId.substring(0, 5) + ': ' + box.value);
			p2pcf.broadcast(new TextEncoder().encode(box.value));
			box.value = '';
		});

		document.getElementById('video-button').addEventListener('click', async () => {
			stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

			for (const peer of p2pcf.peers.values()) {
				peer.addStream(stream);
			}
		});

		p2pcf.start();
	});

	function handleConnect(peer) {
		console.log(
			'Peer connect',
			peer.id
			// peer
		);
		if (stream) {
			peer.addStream(stream);
		}

		peer.on('track', (track, stream) => {
			console.log('got track', track);
			video = document.createElement('video');
			video.id = `${peer.id}-video`;
			video.srcObject = stream;
			video.setAttribute('playsinline', true);
			document.getElementById('videos').appendChild(video);
			video.muted = true;
			video.play();
		});

		addPeerUi(peer.id);
	}
	function handleClose(peer) {
		console.log(
			'Peer close',
			peer.id
			// peer
		);
		removePeerUi(peer.id);
	}

	function handleMsg(peer, msg) {
		console.log(
			'Peer msg',
			peer.id
			// msg
			// peer,
		);
		addMessage(peer.id.substring(0, 5) + ': ' + new TextDecoder('utf-8').decode(msg));
	}

	function addMessage(message) {
		const messageEl = document.createElement('div');
		messageEl.innerText = message;

		document.getElementById('messages').appendChild(messageEl);
	}

	function connect() {
		const myUsername = 'user-' + Math.floor(Math.random() * 100000);
		const myRoom = document.location.hash.substring(1);
		const p2pcf = new P2PCF(myUsername, myRoom, myWorker);
		window.p2pcf = p2pcf;

		p2pcf.on('peerconnect', handleConnect);
		p2pcf.on('peerclose', handleClose);
		p2pcf.on('msg', handleMsg);
	}
</script>

<main class="p-4">
	<h3 class="pt-2 m-0" style="padding-top: 8px; margin: 0;">P2PCF example</h3>
	<h6 style="padding-top: 8px; padding-bottom: 24px; margin: 0;">
		Share this URL to connect via P2PCF + WebRTC
	</h6>

	<div style="display: flex; flex-direction: row;">
		<div
			class="border shadow rounded-lg p-4 m-2"
			style="display: flex; flex-direction: column; min-width: 200px;"
		>
			Peers:
			<div id="peers" style="display: flex; flex-direction: column;" />
		</div>
		<div class="border shadow rounded-lg p-4 m-2" style="display: flex; flex-direction: column;">
			Messages:
			<div id="messages" style="display: flex; flex-direction: column;" />
		</div>
	</div>
	<div id="videos" style="display: flex; flex-direction: row;" />
	<div class="bg-neutral-200 rounded-lg shadow" on:click={(e) => (video.muted = false)}>Unmute</div>
	<div style="padding-top: 24px; display: flex; flex-direction: row;">
		<div style="padding-right: 4px; " id="session-id" />
		<form onsubmit="return false;">
			<input class="border" id="send-box" type="text" />
			<button class="border p-2 rounded bg-neutral-200" type="submit" id="send-button">Send</button>
		</form>
	</div>
	<button
		class="border w-24 bg-neutral-200 p-2 rounded"
		style="width: 100px;"
		type="submit"
		id="video-button">Enable Video</button
	>
</main>

<!--
A tiny WebRTC App
<input
	class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
	type="text"
	placeholder="Username"
	on:input={(e) => {
		setUsername(e.target.value);
	}}
/>
<input
	class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
	type="text"
	placeholder="Public Key"
	on:input={(e) => {
		setPublicKey(e.target.value);
	}}
/>

<input
	class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
	type="text"
	placeholder="Room"
	on:input={(e) => {
		setRoom(e.target.value);
	}}
/>

<Button type="green" disabled={!username || !publicKey || !room} on:click={connect}>Connect</Button>

<Spinner />

<div class="text-red-500 text-center">
	{error}
</div>

<div class="text-green-500 text-center">
	{success}
</div>

<Button
	type="red"
	disabled={!p2pcf}
	on:click={() => {
		p2pcf.disconnect();
	}}
>
	Disconnect
</Button>

<Button
	type="green"
	disabled={!p2pcf}
	on:click={() => {
		p2pcf.send('Hello World');
	}}
>
	Send
</Button>

<Button clickHandler={connect}>Connect</Button> -->
<style>
	/* #peers div {
		padding: 8px;
		font-size: 18px;
	}
	#messages div {
		padding: 8px;
		font-size: 18px;
	} */
</style>
