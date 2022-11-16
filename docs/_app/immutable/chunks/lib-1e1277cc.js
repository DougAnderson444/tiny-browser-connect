import { e as events } from "./events-4b10efcd.js";
import { b as browser, q as queueMicrotask_1, e as errCode$1, i as itAll, a as itDrain, c as itFilter, n as notFoundError$1, K as Key, d as browserLevel, f as dbOpenFailedError, g as dbWriteFailedError, h as dbDeleteFailedError, j as coerce$1, k as equals$4, l as base32$2, m as base58btc$1, p as pushable, o as base32pad$1, r as createRepo$1, M as MemoryLock, s as base64url$1, t as coerce$2, u as equals$5, v as base32$3, w as base58btc$2, x as encode$e, y as decode$i, z as mitt, C as CarReader, A as headerLength, B as blockLength, D as createWriter, E as dagCBOR, F as dagJSON } from "./base32-9ef16083.js";
import { c as commonjsGlobal, b as base32$4, C as CID$3, d as decode$j } from "./_page-08a178f6.js";
var getBrowserRtc = function getBrowserRTC() {
  if (typeof globalThis === "undefined")
    return null;
  var wrtc = {
    RTCPeerConnection: globalThis.RTCPeerConnection || globalThis.mozRTCPeerConnection || globalThis.webkitRTCPeerConnection,
    RTCSessionDescription: globalThis.RTCSessionDescription || globalThis.mozRTCSessionDescription || globalThis.webkitRTCSessionDescription,
    RTCIceCandidate: globalThis.RTCIceCandidate || globalThis.mozRTCIceCandidate || globalThis.webkitRTCIceCandidate
  };
  if (!wrtc.RTCPeerConnection)
    return null;
  return wrtc;
};
var numbers = "0123456789", letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", specials = "!$%^&*()_+|~-=`{}[]:;<>?,./";
function _defaults(opts) {
  opts || (opts = {});
  return {
    length: opts.length || 8,
    numeric: typeof opts.numeric === "boolean" ? opts.numeric : true,
    letters: typeof opts.letters === "boolean" ? opts.letters : true,
    special: typeof opts.special === "boolean" ? opts.special : false,
    exclude: Array.isArray(opts.exclude) ? opts.exclude : []
  };
}
function _buildChars(opts) {
  var chars2 = "";
  if (opts.numeric) {
    chars2 += numbers;
  }
  if (opts.letters) {
    chars2 += letters;
  }
  if (opts.special) {
    chars2 += specials;
  }
  for (var i = 0; i <= opts.exclude.length; i++) {
    chars2 = chars2.replace(opts.exclude[i], "");
  }
  return chars2;
}
var randomString = function randomString2(opts) {
  opts = _defaults(opts);
  var i, rn, rnd = "", len = opts.length;
  opts.exclude;
  var randomChars = _buildChars(opts);
  for (i = 1; i <= len; i++) {
    rnd += randomChars.substring(rn = Math.floor(Math.random() * randomChars.length), rn + 1);
  }
  return rnd;
};
/*! simple-peer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
const debug = browser.exports("simple-peer");
const getBrowserRTC2 = getBrowserRtc;
const randomstring$1 = randomString;
const queueMicrotask = queueMicrotask_1;
const EventEmitter = events.exports;
const errCode = errCode$1;
const MAX_BUFFERED_AMOUNT = 64 * 1024;
const ICECOMPLETE_TIMEOUT = 5 * 1e3;
const CHANNEL_CLOSING_TIMEOUT = 5 * 1e3;
function filterTrickle(sdp) {
  return sdp.replace(/a=ice-options:trickle\s\n/g, "");
}
function warn(message) {
  console.warn(message);
}
class Peer extends EventEmitter {
  constructor(opts) {
    opts = Object.assign({
      allowHalfOpen: false
    }, opts);
    super(opts);
    this.id = opts.id || randomstring$1({ length: 20 });
    this._debug("new peer %o", opts);
    this.channelName = opts.initiator ? opts.channelName || randomstring$1({ length: 20 }) : null;
    this.initiator = opts.initiator || false;
    this.channelConfig = opts.channelConfig || Peer.channelConfig;
    this.channelNegotiated = this.channelConfig.negotiated;
    this.config = Object.assign({}, Peer.config, opts.config);
    this.proprietaryConstraints = Object.assign({}, Peer.proprietaryConstraints, opts.proprietaryConstraints);
    this.offerOptions = opts.offerOptions || {};
    this.answerOptions = opts.answerOptions || {};
    this.sdpTransform = opts.sdpTransform || ((sdp) => sdp);
    this.streams = opts.streams || (opts.stream ? [opts.stream] : []);
    this.trickle = opts.trickle !== void 0 ? opts.trickle : true;
    this.allowHalfTrickle = opts.allowHalfTrickle !== void 0 ? opts.allowHalfTrickle : false;
    this.iceCompleteTimeout = opts.iceCompleteTimeout || ICECOMPLETE_TIMEOUT;
    this.destroyed = false;
    this.destroying = false;
    this._connected = false;
    this.remoteAddress = void 0;
    this.remoteFamily = void 0;
    this.remotePort = void 0;
    this.localAddress = void 0;
    this.localFamily = void 0;
    this.localPort = void 0;
    this._wrtc = opts.wrtc && typeof opts.wrtc === "object" ? opts.wrtc : getBrowserRTC2();
    if (!this._wrtc) {
      if (typeof window === "undefined") {
        throw errCode(new Error("No WebRTC support: Specify `opts.wrtc` option in this environment"), "ERR_WEBRTC_SUPPORT");
      } else {
        throw errCode(new Error("No WebRTC support: Not a supported browser"), "ERR_WEBRTC_SUPPORT");
      }
    }
    this._pcReady = false;
    this._channelReady = false;
    this._iceComplete = false;
    this._iceCompleteTimer = null;
    this._channel = null;
    this._pendingCandidates = [];
    this._isNegotiating = false;
    this._firstNegotiation = true;
    this._batchedNegotiation = false;
    this._queuedNegotiation = false;
    this._sendersAwaitingStable = [];
    this._senderMap = /* @__PURE__ */ new Map();
    this._closingInterval = null;
    this._remoteTracks = [];
    this._remoteStreams = [];
    this._chunk = null;
    this._cb = null;
    this._interval = null;
    try {
      this._pc = new this._wrtc.RTCPeerConnection(this.config, this.proprietaryConstraints);
    } catch (err) {
      this.destroy(errCode(err, "ERR_PC_CONSTRUCTOR"));
      return;
    }
    this._isReactNativeWebrtc = typeof this._pc._peerConnectionId === "number";
    this._pc.oniceconnectionstatechange = () => {
      this._onIceStateChange();
    };
    this._pc.onicegatheringstatechange = () => {
      this._onIceStateChange();
    };
    this._pc.onconnectionstatechange = () => {
      this._onConnectionStateChange();
    };
    this._pc.onsignalingstatechange = () => {
      this._onSignalingStateChange();
    };
    this._pc.onicecandidate = (event) => {
      this._onIceCandidate(event);
    };
    if (typeof this._pc.peerIdentity === "object") {
      this._pc.peerIdentity.catch((err) => {
        this.destroy(errCode(err, "ERR_PC_PEER_IDENTITY"));
      });
    }
    if (this.initiator || this.channelNegotiated) {
      this._setupData({
        channel: this._pc.createDataChannel(this.channelName, this.channelConfig)
      });
    } else {
      this._pc.ondatachannel = (event) => {
        this._setupData(event);
      };
    }
    if (this.streams) {
      this.streams.forEach((stream) => {
        this.addStream(stream);
      });
    }
    this._pc.ontrack = (event) => {
      this._onTrack(event);
    };
    this._debug("initial negotiation");
    this._needsNegotiation();
    this._onFinishBound = () => {
      this._onFinish();
    };
    this.once("finish", this._onFinishBound);
  }
  get bufferSize() {
    return this._channel && this._channel.bufferedAmount || 0;
  }
  get connected() {
    return this._connected && this._channel.readyState === "open";
  }
  address() {
    return { port: this.localPort, family: this.localFamily, address: this.localAddress };
  }
  signal(data) {
    if (this.destroying)
      return;
    if (this.destroyed)
      throw errCode(new Error("cannot signal after peer is destroyed"), "ERR_DESTROYED");
    if (typeof data === "string") {
      try {
        data = JSON.parse(data);
      } catch (err) {
        data = {};
      }
    }
    this._debug("signal()");
    if (data.renegotiate && this.initiator) {
      this._debug("got request to renegotiate");
      this._needsNegotiation();
    }
    if (data.transceiverRequest && this.initiator) {
      this._debug("got request for transceiver");
      this.addTransceiver(data.transceiverRequest.kind, data.transceiverRequest.init);
    }
    if (data.candidate) {
      if (this._pc.remoteDescription && this._pc.remoteDescription.type) {
        this._addIceCandidate(data.candidate);
      } else {
        this._pendingCandidates.push(data.candidate);
      }
    }
    if (data.sdp) {
      this._pc.setRemoteDescription(new this._wrtc.RTCSessionDescription(data)).then(() => {
        if (this.destroyed)
          return;
        this._pendingCandidates.forEach((candidate) => {
          this._addIceCandidate(candidate);
        });
        this._pendingCandidates = [];
        if (this._pc.remoteDescription.type === "offer")
          this._createAnswer();
      }).catch((err) => {
        this.destroy(errCode(err, "ERR_SET_REMOTE_DESCRIPTION"));
      });
    }
    if (!data.sdp && !data.candidate && !data.renegotiate && !data.transceiverRequest) {
      this.destroy(errCode(new Error("signal() called with invalid signal data"), "ERR_SIGNALING"));
    }
  }
  _addIceCandidate(candidate) {
    const iceCandidateObj = new this._wrtc.RTCIceCandidate(candidate);
    this._pc.addIceCandidate(iceCandidateObj).catch((err) => {
      if (!iceCandidateObj.address || iceCandidateObj.address.endsWith(".local")) {
        warn("Ignoring unsupported ICE candidate.");
      } else {
        this.destroy(errCode(err, "ERR_ADD_ICE_CANDIDATE"));
      }
    });
  }
  send(chunk) {
    if (this.destroying)
      return;
    if (this.destroyed)
      throw errCode(new Error("cannot send after peer is destroyed"), "ERR_DESTROYED");
    this._channel.send(chunk);
  }
  addTransceiver(kind, init) {
    if (this.destroying)
      return;
    if (this.destroyed)
      throw errCode(new Error("cannot addTransceiver after peer is destroyed"), "ERR_DESTROYED");
    this._debug("addTransceiver()");
    if (this.initiator) {
      try {
        this._pc.addTransceiver(kind, init);
        this._needsNegotiation();
      } catch (err) {
        this.destroy(errCode(err, "ERR_ADD_TRANSCEIVER"));
      }
    } else {
      this.emit("signal", {
        type: "transceiverRequest",
        transceiverRequest: { kind, init }
      });
    }
  }
  addStream(stream) {
    if (this.destroying)
      return;
    if (this.destroyed)
      throw errCode(new Error("cannot addStream after peer is destroyed"), "ERR_DESTROYED");
    this._debug("addStream()");
    stream.getTracks().forEach((track) => {
      this.addTrack(track, stream);
    });
  }
  addTrack(track, stream) {
    if (this.destroying)
      return;
    if (this.destroyed)
      throw errCode(new Error("cannot addTrack after peer is destroyed"), "ERR_DESTROYED");
    this._debug("addTrack()");
    const submap = this._senderMap.get(track) || /* @__PURE__ */ new Map();
    let sender = submap.get(stream);
    if (!sender) {
      sender = this._pc.addTrack(track, stream);
      submap.set(stream, sender);
      this._senderMap.set(track, submap);
      this._needsNegotiation();
    } else if (sender.removed) {
      throw errCode(new Error("Track has been removed. You should enable/disable tracks that you want to re-add."), "ERR_SENDER_REMOVED");
    } else {
      throw errCode(new Error("Track has already been added to that stream."), "ERR_SENDER_ALREADY_ADDED");
    }
  }
  replaceTrack(oldTrack, newTrack, stream) {
    if (this.destroying)
      return;
    if (this.destroyed)
      throw errCode(new Error("cannot replaceTrack after peer is destroyed"), "ERR_DESTROYED");
    this._debug("replaceTrack()");
    const submap = this._senderMap.get(oldTrack);
    const sender = submap ? submap.get(stream) : null;
    if (!sender) {
      throw errCode(new Error("Cannot replace track that was never added."), "ERR_TRACK_NOT_ADDED");
    }
    if (newTrack)
      this._senderMap.set(newTrack, submap);
    if (sender.replaceTrack != null) {
      sender.replaceTrack(newTrack);
    } else {
      this.destroy(errCode(new Error("replaceTrack is not supported in this browser"), "ERR_UNSUPPORTED_REPLACETRACK"));
    }
  }
  removeTrack(track, stream) {
    if (this.destroying)
      return;
    if (this.destroyed)
      throw errCode(new Error("cannot removeTrack after peer is destroyed"), "ERR_DESTROYED");
    this._debug("removeSender()");
    const submap = this._senderMap.get(track);
    const sender = submap ? submap.get(stream) : null;
    if (!sender) {
      throw errCode(new Error("Cannot remove track that was never added."), "ERR_TRACK_NOT_ADDED");
    }
    try {
      sender.removed = true;
      this._pc.removeTrack(sender);
    } catch (err) {
      if (err.name === "NS_ERROR_UNEXPECTED") {
        this._sendersAwaitingStable.push(sender);
      } else {
        this.destroy(errCode(err, "ERR_REMOVE_TRACK"));
      }
    }
    this._needsNegotiation();
  }
  removeStream(stream) {
    if (this.destroying)
      return;
    if (this.destroyed)
      throw errCode(new Error("cannot removeStream after peer is destroyed"), "ERR_DESTROYED");
    this._debug("removeSenders()");
    stream.getTracks().forEach((track) => {
      this.removeTrack(track, stream);
    });
  }
  _needsNegotiation() {
    this._debug("_needsNegotiation");
    if (this._batchedNegotiation)
      return;
    this._batchedNegotiation = true;
    queueMicrotask(() => {
      this._batchedNegotiation = false;
      if (this.initiator || !this._firstNegotiation) {
        this._debug("starting batched negotiation");
        this.negotiate();
      } else {
        this._debug("non-initiator initial negotiation request discarded");
      }
      this._firstNegotiation = false;
    });
  }
  negotiate() {
    if (this.destroying)
      return;
    if (this.destroyed)
      throw errCode(new Error("cannot negotiate after peer is destroyed"), "ERR_DESTROYED");
    if (this.initiator) {
      if (this._isNegotiating) {
        this._queuedNegotiation = true;
        this._debug("already negotiating, queueing");
      } else {
        this._debug("start negotiation");
        setTimeout(() => {
          this._createOffer();
        }, 0);
      }
    } else {
      if (this._isNegotiating) {
        this._queuedNegotiation = true;
        this._debug("already negotiating, queueing");
      } else {
        this._debug("requesting negotiation from initiator");
        this.emit("signal", {
          type: "renegotiate",
          renegotiate: true
        });
      }
    }
    this._isNegotiating = true;
  }
  destroy(err) {
    this._destroy(err, () => {
    });
  }
  _destroy(err, cb) {
    if (this.destroyed || this.destroying)
      return;
    this.destroying = true;
    this._debug("destroying (error: %s)", err && (err.message || err));
    queueMicrotask(() => {
      this.destroyed = true;
      this.destroying = false;
      this._debug("destroy (error: %s)", err && (err.message || err));
      this._connected = false;
      this._pcReady = false;
      this._channelReady = false;
      this._remoteTracks = null;
      this._remoteStreams = null;
      this._senderMap = null;
      clearInterval(this._closingInterval);
      this._closingInterval = null;
      clearInterval(this._interval);
      this._interval = null;
      this._chunk = null;
      this._cb = null;
      if (this._onFinishBound)
        this.removeListener("finish", this._onFinishBound);
      this._onFinishBound = null;
      if (this._channel) {
        try {
          this._channel.close();
        } catch (err2) {
        }
        this._channel.onmessage = null;
        this._channel.onopen = null;
        this._channel.onclose = null;
        this._channel.onerror = null;
      }
      if (this._pc) {
        try {
          this._pc.close();
        } catch (err2) {
        }
        this._pc.oniceconnectionstatechange = null;
        this._pc.onicegatheringstatechange = null;
        this._pc.onsignalingstatechange = null;
        this._pc.onicecandidate = null;
        this._pc.ontrack = null;
        this._pc.ondatachannel = null;
      }
      this._pc = null;
      this._channel = null;
      if (err)
        this.emit("error", err);
      this.emit("close");
      cb();
    });
  }
  _setupData(event) {
    if (!event.channel) {
      return this.destroy(errCode(new Error("Data channel event is missing `channel` property"), "ERR_DATA_CHANNEL"));
    }
    this._channel = event.channel;
    this._channel.binaryType = "arraybuffer";
    if (typeof this._channel.bufferedAmountLowThreshold === "number") {
      this._channel.bufferedAmountLowThreshold = MAX_BUFFERED_AMOUNT;
    }
    this.channelName = this._channel.label;
    this._channel.onmessage = (event2) => {
      this._onChannelMessage(event2);
    };
    this._channel.onbufferedamountlow = () => {
      this._onChannelBufferedAmountLow();
    };
    this._channel.onopen = () => {
      this._onChannelOpen();
    };
    this._channel.onclose = () => {
      this._onChannelClose();
    };
    this._channel.onerror = (event2) => {
      const err = event2.error instanceof Error ? event2.error : new Error(`Datachannel error: ${event2.message} ${event2.filename}:${event2.lineno}:${event2.colno}`);
      this.destroy(errCode(err, "ERR_DATA_CHANNEL"));
    };
    let isClosing = false;
    this._closingInterval = setInterval(() => {
      if (this._channel && this._channel.readyState === "closing") {
        if (isClosing)
          this._onChannelClose();
        isClosing = true;
      } else {
        isClosing = false;
      }
    }, CHANNEL_CLOSING_TIMEOUT);
  }
  _read() {
  }
  _write(chunk, encoding, cb) {
    if (this.destroyed)
      return cb(errCode(new Error("cannot write after peer is destroyed"), "ERR_DATA_CHANNEL"));
    if (this._connected) {
      try {
        this.send(chunk);
      } catch (err) {
        return this.destroy(errCode(err, "ERR_DATA_CHANNEL"));
      }
      if (this._channel.bufferedAmount > MAX_BUFFERED_AMOUNT) {
        this._debug("start backpressure: bufferedAmount %d", this._channel.bufferedAmount);
        this._cb = cb;
      } else {
        cb(null);
      }
    } else {
      this._debug("write before connect");
      this._chunk = chunk;
      this._cb = cb;
    }
  }
  _onFinish() {
    if (this.destroyed)
      return;
    const destroySoon = () => {
      setTimeout(() => this.destroy(), 1e3);
    };
    if (this._connected) {
      destroySoon();
    } else {
      this.once("connect", destroySoon);
    }
  }
  _startIceCompleteTimeout() {
    if (this.destroyed)
      return;
    if (this._iceCompleteTimer)
      return;
    this._debug("started iceComplete timeout");
    this._iceCompleteTimer = setTimeout(() => {
      if (!this._iceComplete) {
        this._iceComplete = true;
        this._debug("iceComplete timeout completed");
        this.emit("iceTimeout");
        this.emit("_iceComplete");
      }
    }, this.iceCompleteTimeout);
  }
  _createOffer() {
    if (this.destroyed)
      return;
    this._pc.createOffer(this.offerOptions).then((offer) => {
      if (this.destroyed)
        return;
      if (!this.trickle && !this.allowHalfTrickle)
        offer.sdp = filterTrickle(offer.sdp);
      offer.sdp = this.sdpTransform(offer.sdp);
      const sendOffer = () => {
        if (this.destroyed)
          return;
        const signal = this._pc.localDescription || offer;
        this._debug("signal");
        this.emit("signal", {
          type: signal.type,
          sdp: signal.sdp
        });
      };
      const onSuccess = () => {
        this._debug("createOffer success");
        if (this.destroyed)
          return;
        if (this.trickle || this._iceComplete)
          sendOffer();
        else
          this.once("_iceComplete", sendOffer);
      };
      const onError = (err) => {
        this.destroy(errCode(err, "ERR_SET_LOCAL_DESCRIPTION"));
      };
      this._pc.setLocalDescription(offer).then(onSuccess).catch(onError);
    }).catch((err) => {
      this.destroy(errCode(err, "ERR_CREATE_OFFER"));
    });
  }
  _requestMissingTransceivers() {
    if (this._pc.getTransceivers) {
      this._pc.getTransceivers().forEach((transceiver) => {
        if (!transceiver.mid && transceiver.sender.track && !transceiver.requested) {
          transceiver.requested = true;
          this.addTransceiver(transceiver.sender.track.kind);
        }
      });
    }
  }
  _createAnswer() {
    if (this.destroyed)
      return;
    this._pc.createAnswer(this.answerOptions).then((answer) => {
      if (this.destroyed)
        return;
      if (!this.trickle && !this.allowHalfTrickle)
        answer.sdp = filterTrickle(answer.sdp);
      answer.sdp = this.sdpTransform(answer.sdp);
      const sendAnswer = () => {
        if (this.destroyed)
          return;
        const signal = this._pc.localDescription || answer;
        this._debug("signal");
        this.emit("signal", {
          type: signal.type,
          sdp: signal.sdp
        });
        if (!this.initiator)
          this._requestMissingTransceivers();
      };
      const onSuccess = () => {
        if (this.destroyed)
          return;
        if (this.trickle || this._iceComplete)
          sendAnswer();
        else
          this.once("_iceComplete", sendAnswer);
      };
      const onError = (err) => {
        this.destroy(errCode(err, "ERR_SET_LOCAL_DESCRIPTION"));
      };
      this._pc.setLocalDescription(answer).then(onSuccess).catch(onError);
    }).catch((err) => {
      this.destroy(errCode(err, "ERR_CREATE_ANSWER"));
    });
  }
  _onConnectionStateChange() {
    if (this.destroyed)
      return;
    if (this._pc.connectionState === "failed") {
      this.destroy(errCode(new Error("Connection failed."), "ERR_CONNECTION_FAILURE"));
    }
  }
  _onIceStateChange() {
    if (this.destroyed)
      return;
    const iceConnectionState = this._pc.iceConnectionState;
    const iceGatheringState = this._pc.iceGatheringState;
    this._debug(
      "iceStateChange (connection: %s) (gathering: %s)",
      iceConnectionState,
      iceGatheringState
    );
    this.emit("iceStateChange", iceConnectionState, iceGatheringState);
    if (iceConnectionState === "connected" || iceConnectionState === "completed") {
      this._pcReady = true;
      this._maybeReady();
    }
    if (iceConnectionState === "failed") {
      this.destroy(errCode(new Error("Ice connection failed."), "ERR_ICE_CONNECTION_FAILURE"));
    }
    if (iceConnectionState === "closed") {
      this.destroy(errCode(new Error("Ice connection closed."), "ERR_ICE_CONNECTION_CLOSED"));
    }
  }
  getStats(cb) {
    const flattenValues = (report) => {
      if (Object.prototype.toString.call(report.values) === "[object Array]") {
        report.values.forEach((value) => {
          Object.assign(report, value);
        });
      }
      return report;
    };
    if (this._pc.getStats.length === 0 || this._isReactNativeWebrtc) {
      this._pc.getStats().then((res) => {
        const reports = [];
        res.forEach((report) => {
          reports.push(flattenValues(report));
        });
        cb(null, reports);
      }, (err) => cb(err));
    } else if (this._pc.getStats.length > 0) {
      this._pc.getStats((res) => {
        if (this.destroyed)
          return;
        const reports = [];
        res.result().forEach((result) => {
          const report = {};
          result.names().forEach((name2) => {
            report[name2] = result.stat(name2);
          });
          report.id = result.id;
          report.type = result.type;
          report.timestamp = result.timestamp;
          reports.push(flattenValues(report));
        });
        cb(null, reports);
      }, (err) => cb(err));
    } else {
      cb(null, []);
    }
  }
  _maybeReady() {
    this._debug("maybeReady pc %s channel %s", this._pcReady, this._channelReady);
    if (this._connected || this._connecting || !this._pcReady || !this._channelReady)
      return;
    this._connecting = true;
    const findCandidatePair = () => {
      if (this.destroyed)
        return;
      this.getStats((err, items) => {
        if (this.destroyed)
          return;
        if (err)
          items = [];
        const remoteCandidates = {};
        const localCandidates = {};
        const candidatePairs = {};
        let foundSelectedCandidatePair = false;
        items.forEach((item) => {
          if (item.type === "remotecandidate" || item.type === "remote-candidate") {
            remoteCandidates[item.id] = item;
          }
          if (item.type === "localcandidate" || item.type === "local-candidate") {
            localCandidates[item.id] = item;
          }
          if (item.type === "candidatepair" || item.type === "candidate-pair") {
            candidatePairs[item.id] = item;
          }
        });
        const setSelectedCandidatePair = (selectedCandidatePair) => {
          foundSelectedCandidatePair = true;
          let local = localCandidates[selectedCandidatePair.localCandidateId];
          if (local && (local.ip || local.address)) {
            this.localAddress = local.ip || local.address;
            this.localPort = Number(local.port);
          } else if (local && local.ipAddress) {
            this.localAddress = local.ipAddress;
            this.localPort = Number(local.portNumber);
          } else if (typeof selectedCandidatePair.googLocalAddress === "string") {
            local = selectedCandidatePair.googLocalAddress.split(":");
            this.localAddress = local[0];
            this.localPort = Number(local[1]);
          }
          if (this.localAddress) {
            this.localFamily = this.localAddress.includes(":") ? "IPv6" : "IPv4";
          }
          let remote = remoteCandidates[selectedCandidatePair.remoteCandidateId];
          if (remote && (remote.ip || remote.address)) {
            this.remoteAddress = remote.ip || remote.address;
            this.remotePort = Number(remote.port);
          } else if (remote && remote.ipAddress) {
            this.remoteAddress = remote.ipAddress;
            this.remotePort = Number(remote.portNumber);
          } else if (typeof selectedCandidatePair.googRemoteAddress === "string") {
            remote = selectedCandidatePair.googRemoteAddress.split(":");
            this.remoteAddress = remote[0];
            this.remotePort = Number(remote[1]);
          }
          if (this.remoteAddress) {
            this.remoteFamily = this.remoteAddress.includes(":") ? "IPv6" : "IPv4";
          }
          this._debug(
            "connect local: %s:%s remote: %s:%s",
            this.localAddress,
            this.localPort,
            this.remoteAddress,
            this.remotePort
          );
        };
        items.forEach((item) => {
          if (item.type === "transport" && item.selectedCandidatePairId) {
            setSelectedCandidatePair(candidatePairs[item.selectedCandidatePairId]);
          }
          if (item.type === "googCandidatePair" && item.googActiveConnection === "true" || (item.type === "candidatepair" || item.type === "candidate-pair") && item.selected) {
            setSelectedCandidatePair(item);
          }
        });
        if (!foundSelectedCandidatePair && (!Object.keys(candidatePairs).length || Object.keys(localCandidates).length)) {
          setTimeout(findCandidatePair, 100);
          return;
        } else {
          this._connecting = false;
          this._connected = true;
        }
        if (this._chunk) {
          try {
            this.send(this._chunk);
          } catch (err2) {
            return this.destroy(errCode(err2, "ERR_DATA_CHANNEL"));
          }
          this._chunk = null;
          this._debug('sent chunk from "write before connect"');
          const cb = this._cb;
          this._cb = null;
          cb(null);
        }
        if (typeof this._channel.bufferedAmountLowThreshold !== "number") {
          this._interval = setInterval(() => this._onInterval(), 150);
          if (this._interval.unref)
            this._interval.unref();
        }
        this._debug("connect");
        this.emit("connect");
      });
    };
    findCandidatePair();
  }
  _onInterval() {
    if (!this._cb || !this._channel || this._channel.bufferedAmount > MAX_BUFFERED_AMOUNT) {
      return;
    }
    this._onChannelBufferedAmountLow();
  }
  _onSignalingStateChange() {
    if (this.destroyed)
      return;
    if (this._pc.signalingState === "stable") {
      this._isNegotiating = false;
      this._debug("flushing sender queue", this._sendersAwaitingStable);
      this._sendersAwaitingStable.forEach((sender) => {
        this._pc.removeTrack(sender);
        this._queuedNegotiation = true;
      });
      this._sendersAwaitingStable = [];
      if (this._queuedNegotiation) {
        this._debug("flushing negotiation queue");
        this._queuedNegotiation = false;
        this._needsNegotiation();
      } else {
        this._debug("negotiated");
        this.emit("negotiated");
      }
    }
    this._debug("signalingStateChange %s", this._pc.signalingState);
    this.emit("signalingStateChange", this._pc.signalingState);
  }
  _onIceCandidate(event) {
    if (this.destroyed)
      return;
    if (event.candidate && this.trickle) {
      this.emit("signal", {
        type: "candidate",
        candidate: {
          candidate: event.candidate.candidate,
          sdpMLineIndex: event.candidate.sdpMLineIndex,
          sdpMid: event.candidate.sdpMid
        }
      });
    } else if (!event.candidate && !this._iceComplete) {
      this._iceComplete = true;
      this.emit("_iceComplete");
    }
    if (event.candidate) {
      this._startIceCompleteTimeout();
    }
  }
  _onChannelMessage(event) {
    if (this.destroyed)
      return;
    this.emit("data", event.data);
  }
  _onChannelBufferedAmountLow() {
    if (this.destroyed || !this._cb)
      return;
    this._debug("ending backpressure: bufferedAmount %d", this._channel.bufferedAmount);
    const cb = this._cb;
    this._cb = null;
    cb(null);
  }
  _onChannelOpen() {
    if (this._connected || this.destroyed)
      return;
    this._debug("on channel open");
    this._channelReady = true;
    this._maybeReady();
  }
  _onChannelClose() {
    if (this.destroyed)
      return;
    this._debug("on channel close");
    this.destroy();
  }
  _onTrack(event) {
    if (this.destroyed)
      return;
    const { track, receiver, streams } = event;
    streams.forEach((eventStream) => {
      this._debug("on track");
      this.emit("track", track, eventStream, receiver);
      this._remoteTracks.push({ track, stream: eventStream });
      if (this._remoteStreams.some((remoteStream) => {
        return remoteStream.id === eventStream.id;
      }))
        return;
      this._remoteStreams.push(eventStream);
      queueMicrotask(() => {
        this._debug("on stream");
        this.emit("stream", eventStream, receiver);
      });
    });
  }
  _debug() {
    const args = [].slice.call(arguments);
    args[0] = "[" + this.id + "] " + args[0];
    debug.apply(null, args);
  }
}
Peer.WEBRTC_SUPPORT = !!getBrowserRTC2();
Peer.config = {
  iceServers: [
    {
      urls: [
        "stun:stun.l.google.com:19302",
        "stun:{}.stun.twilio.com:3478"
      ]
    }
  ],
  sdpSemantics: "unified-plan"
};
Peer.channelConfig = {};
Peer.proprietaryConstraints = {};
var tinySimplePeer = Peer;
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var lookup = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
for (var i = 0; i < chars.length; i++) {
  lookup[chars.charCodeAt(i)] = i;
}
var encode$d = function(arraybuffer) {
  var bytes = new Uint8Array(arraybuffer), i, len = bytes.length, base642 = "";
  for (i = 0; i < len; i += 3) {
    base642 += chars[bytes[i] >> 2];
    base642 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
    base642 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
    base642 += chars[bytes[i + 2] & 63];
  }
  if (len % 3 === 2) {
    base642 = base642.substring(0, base642.length - 1) + "=";
  } else if (len % 3 === 1) {
    base642 = base642.substring(0, base642.length - 2) + "==";
  }
  return base642;
};
var decode$h = function(base642) {
  var bufferLength = base642.length * 0.75, len = base642.length, i, p2 = 0, encoded1, encoded2, encoded3, encoded4;
  if (base642[base642.length - 1] === "=") {
    bufferLength--;
    if (base642[base642.length - 2] === "=") {
      bufferLength--;
    }
  }
  var arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
  for (i = 0; i < len; i += 4) {
    encoded1 = lookup[base642.charCodeAt(i)];
    encoded2 = lookup[base642.charCodeAt(i + 1)];
    encoded3 = lookup[base642.charCodeAt(i + 2)];
    encoded4 = lookup[base642.charCodeAt(i + 3)];
    bytes[p2++] = encoded1 << 2 | encoded2 >> 4;
    bytes[p2++] = (encoded2 & 15) << 4 | encoded3 >> 2;
    bytes[p2++] = (encoded3 & 3) << 6 | encoded4 & 63;
  }
  return arraybuffer;
};
var convertHex = { exports: {} };
(function(module) {
  !function(globals) {
    var convertHex2 = {
      bytesToHex: function(bytes) {
        return arrBytesToHex(bytes);
      },
      hexToBytes: function(hex) {
        if (hex.length % 2 === 1)
          throw new Error("hexToBytes can't have a string with an odd number of characters.");
        if (hex.indexOf("0x") === 0)
          hex = hex.slice(2);
        return hex.match(/../g).map(function(x2) {
          return parseInt(x2, 16);
        });
      }
    };
    function arrBytesToHex(bytes) {
      return bytes.map(function(x2) {
        return padLeft(x2.toString(16), 2);
      }).join("");
    }
    function padLeft(orig, len) {
      if (orig.length > len)
        return orig;
      return Array(len - orig.length + 1).join("0") + orig;
    }
    if (module.exports) {
      module.exports = convertHex2;
    } else {
      globals.convertHex = convertHex2;
    }
  }(commonjsGlobal);
})(convertHex);
var arrayBufferToHex = function arrayBufferToHex2(arrayBuffer) {
  if (typeof arrayBuffer !== "object" || arrayBuffer === null || typeof arrayBuffer.byteLength !== "number") {
    throw new TypeError("Expected input to be an ArrayBuffer");
  }
  var view = new Uint8Array(arrayBuffer);
  var result = "";
  var value;
  for (var i = 0; i < view.length; i++) {
    value = view[i].toString(16);
    result += value.length === 1 ? "0" + value : value;
  }
  return result;
};
const CONNECT_TIMEOUT = 15e3;
const MAX_MESSAGE_LENGTH_BYTES = 16e3;
const CHUNK_HEADER_LENGTH_BYTES = 12;
const CHUNK_MAGIC_WORD = 8121;
const CHUNK_MAX_LENGTH_BYTES = MAX_MESSAGE_LENGTH_BYTES - CHUNK_HEADER_LENGTH_BYTES;
const SIGNAL_MESSAGE_HEADER_WORDS = [33451, 33229, 4757, 41419];
const CANDIDATE_TYPES = {
  host: 0,
  srflx: 1,
  relay: 2
};
const CANDIDATE_TCP_TYPES = {
  active: 0,
  passive: 1,
  so: 2
};
const CANDIDATE_IDX = {
  TYPE: 0,
  PROTOCOL: 1,
  IP: 2,
  PORT: 3,
  RELATED_IP: 4,
  RELATED_PORT: 5,
  TCP_TYPE: 6
};
const DEFAULT_STUN_ICE = [
  { urls: "stun:stun1.l.google.com:19302" },
  { urls: "stun:{}.stun.twilio.com:3478" }
];
const DEFAULT_TURN_ICE = [
  {
    urls: "turn:openrelay.metered.ca:80",
    username: "openrelayproject",
    credential: "openrelayproject"
  },
  {
    urls: "turn:openrelay.metered.ca:443",
    username: "openrelayproject",
    credential: "openrelayproject"
  },
  {
    urls: "turn:openrelay.metered.ca:443?transport=tcp",
    username: "openrelayproject",
    credential: "openrelayproject"
  }
];
const randomstring = (len) => {
  const bytes = crypto.getRandomValues(new Uint8Array(len));
  const str = bytes.reduce((accum, v) => accum + String.fromCharCode(v), "");
  return btoa(str).replaceAll("=", "");
};
const textDecoder$1 = new TextDecoder("utf-8");
const textEncoder$1 = new TextEncoder();
const arrToText = textDecoder$1.decode.bind(textDecoder$1);
const textToArr = textEncoder$1.encode.bind(textEncoder$1);
const removeInPlace = (a2, condition) => {
  let i = 0;
  let j = 0;
  while (i < a2.length) {
    const val = a2[i];
    if (!condition(val, i, a2))
      a2[j++] = val;
    i++;
  }
  a2.length = j;
  return a2;
};
const ua$1 = window.navigator.userAgent;
const iOS = !!ua$1.match(/iPad/i) || !!ua$1.match(/iPhone/i);
const webkit = !!ua$1.match(/WebKit/i);
const iOSSafari = !!(iOS && webkit && !ua$1.match(/CriOS/i));
const isFirefox = !!((navigator == null ? void 0 : navigator.userAgent.toLowerCase().indexOf("firefox")) > -1);
const hexToBase64 = (hex) => encode$d(convertHex.exports.hexToBytes(hex));
const base64ToHex = (b64) => arrayBufferToHex(decode$h(b64));
function createSdp(isOffer, iceUFrag, icePwd, dtlsFingerprintBase64) {
  const dtlsHex = base64ToHex(dtlsFingerprintBase64);
  let dtlsFingerprint = "";
  for (let i = 0; i < dtlsHex.length; i += 2) {
    dtlsFingerprint += `${dtlsHex[i]}${dtlsHex[i + 1]}${i === dtlsHex.length - 2 ? "" : ":"}`.toUpperCase();
  }
  const sdp = [
    "v=0",
    "o=- 5498186869896684180 2 IN IP4 127.0.0.1",
    "s=-",
    "t=0 0",
    "a=msid-semantic: WMS",
    "m=application 9 UDP/DTLS/SCTP webrtc-datachannel",
    "c=IN IP4 0.0.0.0",
    "a=mid:0",
    "a=sctp-port:5000"
  ];
  if (isOffer) {
    sdp.push("a=setup:actpass");
  } else {
    sdp.push("a=setup:active");
  }
  sdp.push(`a=ice-ufrag:${iceUFrag}`);
  sdp.push(`a=ice-pwd:${icePwd}`);
  sdp.push(`a=fingerprint:sha-256 ${dtlsFingerprint}`);
  return sdp.join("\r\n") + "\r\n";
}
const parseCandidate = (line) => {
  let parts;
  if (line.indexOf("a=candidate:") === 0) {
    parts = line.substring(12).split(" ");
  } else {
    parts = line.substring(10).split(" ");
  }
  const candidate = [
    CANDIDATE_TYPES[parts[7]],
    parts[2].toLowerCase() === "udp" ? 0 : 1,
    parts[4],
    parseInt(parts[5], 10)
  ];
  for (let i = 8; i < parts.length; i += 2) {
    switch (parts[i]) {
      case "raddr":
        while (candidate.length < 5)
          candidate.push(null);
        candidate[4] = parts[i + 1];
        break;
      case "rport":
        while (candidate.length < 6)
          candidate.push(null);
        candidate[5] = parseInt(parts[i + 1], 10);
        break;
      case "tcptype":
        while (candidate.length < 7)
          candidate.push(null);
        candidate[6] = CANDIDATE_TCP_TYPES[parts[i + 1]];
        break;
    }
  }
  while (candidate.length < 8)
    candidate.push(null);
  candidate[7] = parseInt(parts[3], 10);
  return candidate;
};
class P2PCF extends events.exports {
  constructor(clientId = "", roomId = "", options = {}) {
    var _a2;
    super();
    if (!clientId || clientId.length < 4) {
      throw new Error("Client ID must be at least four characters");
    }
    if (!roomId || roomId.length < 4) {
      throw new Error("Room ID must be at least four characters");
    }
    this._step = this._step.bind(this);
    this.peers = /* @__PURE__ */ new Map();
    this.msgChunks = /* @__PURE__ */ new Map();
    this.connectedSessions = [];
    this.clientId = clientId;
    this.roomId = roomId;
    this.sessionId = randomstring(20);
    this.packages = [];
    this.dataTimestamp = null;
    this.lastPackages = null;
    this.lastProcessedReceivedDataTimestamps = /* @__PURE__ */ new Map();
    this.packageReceivedFromPeers = /* @__PURE__ */ new Set();
    this.startedAtTimestamp = null;
    this.peerOptions = options.rtcPeerConnectionOptions || {};
    this.peerProprietaryConstraints = options.rtcPeerConnectionProprietaryConstraints || {};
    this.peerSdpTransform = options.sdpTransform || ((sdp) => sdp);
    this.workerUrl = options.workerUrl || "https://p2pcf.minddrop.workers.dev";
    if (this.workerUrl.endsWith("/")) {
      this.workerUrl = this.workerUrl.substring(0, this.workerUrl.length - 1);
    }
    this.stunIceServers = options.stunIceServers || DEFAULT_STUN_ICE;
    this.turnIceServers = options.turnIceServers || DEFAULT_TURN_ICE;
    this.networkChangePollIntervalMs = options.networkChangePollIntervalMs || 15e3;
    this.stateExpirationIntervalMs = options.stateExpirationIntervalMs || 2 * 60 * 1e3;
    this.stateHeartbeatWindowMs = options.stateHeartbeatWindowMs || 3e4;
    this.fastPollingDurationMs = options.fastPollingDurationMs || 1e4;
    this.fastPollingRateMs = options.fastPollingRateMs || 750;
    this.slowPollingRateMs = options.slowPollingRateMs || 1500;
    this.wrtc = getBrowserRtc();
    this.dtlsCert = null;
    this.udpEnabled = null;
    this.isSymmetric = null;
    this.dtlsFingerprint = null;
    this.reflexiveIps = /* @__PURE__ */ new Set();
    this.isSending = false;
    this.finished = false;
    this.nextStepTime = -1;
    this.deleteKey = null;
    this.sentFirstPoll = false;
    this.stopFastPollingAt = -1;
    if (!((_a2 = window.history.state) == null ? void 0 : _a2._p2pcfContextId)) {
      window.history.replaceState(
        {
          ...window.history.state,
          _p2pcfContextId: randomstring(20)
        },
        window.location.href
      );
    }
    this.contextId = window.history.state._p2pcfContextId;
  }
  async _init() {
    if (this.dtlsCert === null) {
      this.dtlsCert = await this.wrtc.RTCPeerConnection.generateCertificate({
        name: "ECDSA",
        namedCurve: "P-256"
      });
    }
  }
  async _step(finish = false) {
    const {
      sessionId,
      clientId,
      roomId,
      contextId,
      stateExpirationIntervalMs,
      stateHeartbeatWindowMs,
      packages,
      fastPollingDurationMs,
      fastPollingRateMs,
      slowPollingRateMs
    } = this;
    const now = Date.now();
    if (finish) {
      if (this.finished)
        return;
      if (!this.deleteKey)
        return;
      this.finished = true;
    } else {
      if (this.nextStepTime > now)
        return;
      if (this.isSending)
        return;
      if (this.reflexiveIps.length === 0)
        return;
    }
    this.isSending = true;
    try {
      const localDtlsFingerprintBase64 = hexToBase64(
        this.dtlsFingerprint.replaceAll(":", "")
      );
      const localPeerInfo = [
        sessionId,
        clientId,
        this.isSymmetric,
        localDtlsFingerprintBase64,
        this.startedAtTimestamp,
        [...this.reflexiveIps]
      ];
      const payload = { r: roomId, k: contextId };
      if (finish) {
        payload.dk = this.deleteKey;
      }
      const expired = this.dataTimestamp === null || now - this.dataTimestamp >= stateExpirationIntervalMs - stateHeartbeatWindowMs;
      const packagesChanged = this.lastPackages !== JSON.stringify(packages);
      let includePackages = false;
      if (expired || packagesChanged || finish) {
        this.dataTimestamp = now;
        removeInPlace(packages, (pkg) => {
          const sentAt = pkg[pkg.length - 2];
          return now - sentAt > 60 * 1e3;
        });
        includePackages = true;
      }
      if (finish) {
        includePackages = false;
      }
      if (this.sentFirstPoll) {
        payload.d = localPeerInfo;
        payload.t = this.dataTimestamp;
        payload.x = this.stateExpirationIntervalMs;
        if (includePackages) {
          payload.p = packages;
          this.lastPackages = JSON.stringify(packages);
        }
      }
      const body = JSON.stringify(payload);
      const headers = { "Content-Type": "application/json " };
      let keepalive = false;
      if (finish) {
        headers["X-Worker-Method"] = "DELETE";
        keepalive = true;
      }
      const res = await fetch(this.workerUrl, {
        method: "POST",
        headers,
        body,
        keepalive
      });
      const { ps: remotePeerDatas, pk: remotePackages, dk } = await res.json();
      if (dk) {
        this.deleteKey = dk;
      }
      if (finish)
        return;
      if (remotePeerDatas.length === 0 && !this.sentFirstPoll) {
        payload.d = localPeerInfo;
        payload.t = this.dataTimestamp;
        payload.x = this.stateExpirationIntervalMs;
        payload.p = packages;
        this.lastPackages = JSON.stringify(packages);
        const res2 = await fetch(this.workerUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const { dk: dk2 } = await res2.json();
        if (dk2) {
          this.deleteKey = dk2;
        }
      }
      this.sentFirstPoll = true;
      const previousPeerSessionIds = [...this.peers.keys()];
      this._handleWorkerResponse(
        localPeerInfo,
        localDtlsFingerprintBase64,
        packages,
        remotePeerDatas,
        remotePackages
      );
      const activeSessionIds = remotePeerDatas.map((p2) => p2[0]);
      const peersChanged = previousPeerSessionIds.length !== activeSessionIds.length || activeSessionIds.find((c) => !previousPeerSessionIds.includes(c)) || previousPeerSessionIds.find((c) => !activeSessionIds.includes(c));
      if (peersChanged) {
        this.stopFastPollingAt = now + fastPollingDurationMs;
      }
      if (now < this.stopFastPollingAt) {
        this.nextStepTime = now + fastPollingRateMs;
      } else {
        this.nextStepTime = now + slowPollingRateMs;
      }
    } catch (e) {
      console.error(e);
      this.nextStepTime = now + slowPollingRateMs;
    } finally {
      this.isSending = false;
    }
  }
  _handleWorkerResponse(localPeerData, localDtlsFingerprintBase64, localPackages, remotePeerDatas, remotePackages) {
    const localStartedAtTimestamp = this.startedAtTimestamp;
    const {
      dtlsCert: localDtlsCert,
      peers,
      lastProcessedReceivedDataTimestamps,
      packageReceivedFromPeers,
      stunIceServers,
      turnIceServers
    } = this;
    const [localSessionId, , localSymmetric] = localPeerData;
    const now = Date.now();
    for (const remotePeerData of remotePeerDatas) {
      const [
        remoteSessionId,
        remoteClientId,
        remoteSymmetric,
        remoteDtlsFingerprintBase64,
        remoteStartedAtTimestamp,
        remoteReflexiveIps,
        remoteDataTimestamp
      ] = remotePeerData;
      if (lastProcessedReceivedDataTimestamps.get(remoteSessionId) === remoteDataTimestamp) {
        continue;
      }
      const isPeerA = localSymmetric === remoteSymmetric ? localStartedAtTimestamp === remoteStartedAtTimestamp ? localSessionId > remoteSessionId : localStartedAtTimestamp > remoteStartedAtTimestamp : localSymmetric;
      const iceServers = localSymmetric || remoteSymmetric ? turnIceServers : stunIceServers;
      const delaySetRemoteUntilReceiveCandidates = isFirefox;
      const remotePackage = remotePackages.find((p2) => p2[1] === remoteSessionId);
      const peerOptions = { ...this.peerOptions, iceServers };
      if (localDtlsCert) {
        peerOptions.certificates = [localDtlsCert];
      }
      if (isPeerA) {
        if (peers.has(remoteSessionId))
          continue;
        if (!remotePackage)
          continue;
        lastProcessedReceivedDataTimestamps.set(
          remoteSessionId,
          remoteDataTimestamp
        );
        if (packageReceivedFromPeers.has(remoteSessionId))
          continue;
        packageReceivedFromPeers.add(remoteSessionId);
        const [
          ,
          ,
          remoteIceUFrag,
          remoteIcePwd,
          remoteDtlsFingerprintBase642,
          localIceUFrag,
          localIcePwd,
          ,
          remoteCandidates
        ] = remotePackage;
        const peer = new tinySimplePeer({
          config: peerOptions,
          initiator: false,
          iceCompleteTimeout: Infinity,
          proprietaryConstraints: this.peerProprietaryConstraints,
          sdpTransform: (sdp) => {
            const lines = [];
            for (const l2 of sdp.split("\r\n")) {
              if (l2.startsWith("a=ice-ufrag")) {
                lines.push(`a=ice-ufrag:${localIceUFrag}`);
              } else if (l2.startsWith("a=ice-pwd")) {
                lines.push(`a=ice-pwd:${localIcePwd}`);
              } else {
                lines.push(l2);
              }
            }
            return this.peerSdpTransform(lines.join("\r\n"));
          }
        });
        peer.id = remoteSessionId;
        peer.client_id = remoteClientId;
        this._wireUpCommonPeerEvents(peer);
        peers.set(peer.id, peer);
        const pkg = [
          remoteSessionId,
          localSessionId,
          null,
          null,
          null,
          null,
          null,
          now,
          []
        ];
        const pkgCandidates = pkg[pkg.length - 1];
        const initialCandidateSignalling = (e) => {
          var _a2;
          if (!((_a2 = e.candidate) == null ? void 0 : _a2.candidate))
            return;
          pkgCandidates.push(e.candidate.candidate);
        };
        peer.on("signal", initialCandidateSignalling);
        const finishIce = () => {
          peer.removeListener("signal", initialCandidateSignalling);
          if (localPackages.includes(pkg))
            return;
          if (pkgCandidates.length === 0)
            return;
          localPackages.push(pkg);
        };
        peer.once("_iceComplete", finishIce);
        setTimeout(() => {
          if (peer._iceComplete || peer.connected)
            return;
          console.warn("Peer A didn't connect in time", peer.id);
          peer._iceComplete = true;
          this._removePeer(peer, true);
          this._updateConnectedSessions();
        }, CONNECT_TIMEOUT);
        const remoteSdp = createSdp(
          true,
          remoteIceUFrag,
          remoteIcePwd,
          remoteDtlsFingerprintBase642
        );
        for (const candidate of remoteCandidates) {
          peer.signal({ candidate: { candidate, sdpMLineIndex: 0 } });
        }
        peer.signal({ type: "offer", sdp: remoteSdp });
      } else {
        if (!peers.has(remoteSessionId)) {
          lastProcessedReceivedDataTimestamps.set(
            remoteSessionId,
            remoteDataTimestamp
          );
          const remoteUfrag = randomstring(12);
          const remotePwd = randomstring(32);
          const peer2 = new tinySimplePeer({
            config: peerOptions,
            proprietaryConstraints: this.rtcPeerConnectionProprietaryConstraints,
            iceCompleteTimeout: Infinity,
            initiator: true,
            sdpTransform: this.peerSdpTransform
          });
          peer2.id = remoteSessionId;
          peer2.client_id = remoteClientId;
          this._wireUpCommonPeerEvents(peer2);
          peers.set(peer2.id, peer2);
          const pkg = [
            remoteSessionId,
            localSessionId,
            null,
            null,
            null,
            remoteUfrag,
            remotePwd,
            now,
            []
          ];
          const pkgCandidates = pkg[pkg.length - 1];
          const initialCandidateSignalling = (e) => {
            var _a2;
            if (!((_a2 = e.candidate) == null ? void 0 : _a2.candidate))
              return;
            pkgCandidates.push(e.candidate.candidate);
          };
          peer2.on("signal", initialCandidateSignalling);
          const finishIce = () => {
            peer2.removeListener("signal", initialCandidateSignalling);
            if (localPackages.includes(pkg))
              return;
            if (pkgCandidates.length === 0)
              return;
            localPackages.push(pkg);
          };
          peer2.once("_iceComplete", finishIce);
          setTimeout(() => {
            if (peer2._iceComplete || peer2.connected)
              return;
            console.warn("Peer B failed to connect in time", peer2.id);
            peer2._iceComplete = true;
            this._removePeer(peer2, true);
            this._updateConnectedSessions();
          }, CONNECT_TIMEOUT);
          const enqueuePackageFromOffer = (e) => {
            if (e.type !== "offer")
              return;
            peer2.removeListener("signal", enqueuePackageFromOffer);
            for (const l2 of e.sdp.split("\r\n")) {
              switch (l2.split(":")[0]) {
                case "a=ice-ufrag":
                  pkg[2] = l2.substring(12);
                  break;
                case "a=ice-pwd":
                  pkg[3] = l2.substring(10);
                  break;
                case "a=fingerprint":
                  pkg[4] = hexToBase64(l2.substring(22).replaceAll(":", ""));
                  break;
              }
            }
            let remoteSdp = createSdp(
              false,
              remoteUfrag,
              remotePwd,
              remoteDtlsFingerprintBase64
            );
            for (let i = 0; i < remoteReflexiveIps.length; i++) {
              remoteSdp += `a=candidate:0 1 udp ${i + 1} ${remoteReflexiveIps[i]} 30000 typ srflx\r
`;
            }
            if (!delaySetRemoteUntilReceiveCandidates) {
              peer2.signal({ type: "answer", sdp: remoteSdp });
            } else {
              peer2._pendingRemoteSdp = remoteSdp;
            }
          };
          peer2.once("signal", enqueuePackageFromOffer);
        }
        if (!remotePackage)
          continue;
        const [, , , , , , , , remoteCandidates] = remotePackage;
        if (packageReceivedFromPeers.has(remoteSessionId))
          continue;
        if (!peers.has(remoteSessionId))
          continue;
        const peer = peers.get(remoteSessionId);
        if (delaySetRemoteUntilReceiveCandidates && !peer._pc.remoteDescription && peer._pendingRemoteSdp) {
          if (!peer.connected) {
            for (const candidate of remoteCandidates) {
              peer.signal({ candidate: { candidate, sdpMLineIndex: 0 } });
            }
          }
          peer.signal({ type: "answer", sdp: peer._pendingRemoteSdp });
          delete peer._pendingRemoteSdp;
          packageReceivedFromPeers.add(remoteSessionId);
        }
        if (!delaySetRemoteUntilReceiveCandidates && peer._pc.remoteDescription && remoteCandidates.length > 0) {
          if (!peer.connected) {
            for (const candidate of remoteCandidates) {
              peer.signal({ candidate: { candidate, sdpMLineIndex: 0 } });
            }
          }
          packageReceivedFromPeers.add(remoteSessionId);
        }
      }
    }
    const remoteSessionIds = remotePeerDatas.map((p2) => p2[0]);
    for (const [sessionId, peer] of peers.entries()) {
      if (remoteSessionIds.includes(sessionId))
        continue;
      if (!peer.connected) {
        console.warn("Removing unconnected peer not in peer list", peer.id);
        this._removePeer(peer, true);
      }
    }
  }
  async start() {
    this.startedAtTimestamp = Date.now();
    await this._init();
    const [
      udpEnabled,
      isSymmetric,
      reflexiveIps,
      dtlsFingerprint
    ] = await this._getNetworkSettings(this.dtlsCert);
    if (this.finished)
      return;
    this.udpEnabled = udpEnabled;
    this.isSymmetric = isSymmetric;
    this.reflexiveIps = reflexiveIps;
    this.dtlsFingerprint = dtlsFingerprint;
    this.networkSettingsInterval = setInterval(async () => {
      const [
        newUdpEnabled,
        newIsSymmetric,
        newReflexiveIps,
        newDtlsFingerprint
      ] = await this._getNetworkSettings(this.dtlsCert);
      if (newUdpEnabled !== this.udpEnabled || newIsSymmetric !== this.isSymmetric || newDtlsFingerprint !== this.dtlsFingerprint || !![...newReflexiveIps].find((ip) => ![...this.reflexiveIps].find((ip2) => ip === ip2)) || !![...reflexiveIps].find((ip) => ![...newReflexiveIps].find((ip2) => ip === ip2))) {
        this.dataTimestamp = null;
      }
      this.udpEnabled = newUdpEnabled;
      this.isSymmetric = newIsSymmetric;
      this.reflexiveIps = newReflexiveIps;
      this.dtlsFingerprint = newDtlsFingerprint;
    }, this.networkChangePollIntervalMs);
    this._step = this._step.bind(this);
    this.stepInterval = setInterval(this._step, 500);
    this.destroyOnUnload = () => this.destroy();
    for (const ev of iOSSafari ? ["pagehide"] : ["unload"]) {
      window.addEventListener(ev, this.destroyOnUnload);
    }
  }
  _removePeer(peer, destroy = false) {
    const { packageReceivedFromPeers, packages, peers } = this;
    if (!peers.has(peer.id))
      return;
    removeInPlace(packages, (pkg) => pkg[0] === peer.id);
    packageReceivedFromPeers.delete(peer.id);
    peers.delete(peer.id);
    if (destroy) {
      peer.destroy();
    }
    this.emit("peerclose", peer);
  }
  send(peer, msg) {
    if (!peer.connected)
      return;
    let dataArrBuffer = null;
    let messageId = null;
    if (msg instanceof ArrayBuffer) {
      dataArrBuffer = msg;
    } else if (msg instanceof Uint8Array) {
      if (msg.buffer.byteLength === msg.length) {
        dataArrBuffer = msg.buffer;
      } else {
        dataArrBuffer = msg.buffer.slice(msg.byteOffset, msg.byteOffset + msg.byteLength);
      }
    } else {
      throw new Error("Unsupported send data type", msg);
    }
    if (dataArrBuffer.byteLength > MAX_MESSAGE_LENGTH_BYTES || new Uint16Array(dataArrBuffer, 0, 1) === CHUNK_MAGIC_WORD) {
      messageId = Math.floor(Math.random() * 256 * 128);
    }
    if (messageId !== null) {
      for (let offset = 0, chunkId = 0; offset < dataArrBuffer.byteLength; offset += CHUNK_MAX_LENGTH_BYTES, chunkId++) {
        const chunkSize = Math.min(
          CHUNK_MAX_LENGTH_BYTES,
          dataArrBuffer.byteLength - offset
        );
        let bufSize = CHUNK_HEADER_LENGTH_BYTES + chunkSize;
        while (bufSize % 4 !== 0) {
          bufSize++;
        }
        const buf = new ArrayBuffer(bufSize);
        new Uint8Array(buf, CHUNK_HEADER_LENGTH_BYTES).set(
          new Uint8Array(dataArrBuffer, offset, chunkSize)
        );
        const u16 = new Uint16Array(buf);
        const u32 = new Uint32Array(buf);
        u16[0] = CHUNK_MAGIC_WORD;
        u16[1] = messageId;
        u16[2] = chunkId;
        u16[3] = offset + CHUNK_MAX_LENGTH_BYTES >= dataArrBuffer.byteLength ? 1 : 0;
        u32[2] = dataArrBuffer.byteLength;
        peer.send(buf);
      }
    } else {
      peer.send(dataArrBuffer);
    }
  }
  broadcast(msg) {
    for (const peer of this.peers.values()) {
      this.send(peer, msg);
    }
  }
  destroy() {
    if (this._step) {
      this._step(true);
    }
    if (this.networkSettingsInterval) {
      clearInterval(this.networkSettingsInterval);
      this.networkSettingsInterval = null;
    }
    if (this.stepInterval) {
      clearInterval(this.stepInterval);
      this.stepInterval = null;
    }
    if (this.destroyOnUnload) {
      for (const ev of iOSSafari ? ["pagehide"] : ["beforeunload", "unload"]) {
        window.removeEventListener(ev, this.destroyOnUnload);
      }
      this.destroyOnUnload = null;
    }
    for (const peer of this.peers.values()) {
      peer.destroy();
    }
  }
  _chunkHandler(data, messageId, chunkId) {
    let target = null;
    if (!this.msgChunks.has(messageId)) {
      const totalLength = new Uint32Array(data, 0, 3)[2];
      target = new Uint8Array(totalLength);
      this.msgChunks.set(messageId, target);
    } else {
      target = this.msgChunks.get(messageId);
    }
    const offsetToSet = chunkId * CHUNK_MAX_LENGTH_BYTES;
    const numBytesToSet = Math.min(
      target.byteLength - offsetToSet,
      CHUNK_MAX_LENGTH_BYTES
    );
    target.set(
      new Uint8Array(data, CHUNK_HEADER_LENGTH_BYTES, numBytesToSet),
      chunkId * CHUNK_MAX_LENGTH_BYTES
    );
    return target.buffer;
  }
  _updateConnectedSessions() {
    this.connectedSessions.length = 0;
    for (const [sessionId, peer] of this.peers) {
      if (peer.connected) {
        this.connectedSessions.push(sessionId);
        continue;
      }
    }
  }
  async _getNetworkSettings() {
    await this._init();
    let dtlsFingerprint = null;
    const candidates = [];
    const reflexiveIps = /* @__PURE__ */ new Set();
    const peerOptions = { iceServers: this.stunIceServers };
    if (this.dtlsCert) {
      peerOptions.certificates = [this.dtlsCert];
    }
    const pc = new this.wrtc.RTCPeerConnection(peerOptions);
    const dc = pc.createDataChannel("x");
    const p2 = new Promise((resolve) => {
      setTimeout(() => resolve(), 5e3);
      pc.onicecandidate = (e) => {
        if (!e.candidate)
          return resolve();
        if (e.candidate.candidate) {
          candidates.push(parseCandidate(e.candidate.candidate));
        }
      };
    });
    pc.createOffer().then((offer) => {
      for (const l2 of offer.sdp.split("\n")) {
        if (l2.indexOf("a=fingerprint") === -1)
          continue;
        dtlsFingerprint = l2.split(" ")[1].trim();
      }
      pc.setLocalDescription(offer);
    });
    await p2;
    dc.close();
    pc.close();
    let isSymmetric = false;
    let udpEnabled = false;
    for (const c of candidates) {
      if (c[0] !== CANDIDATE_TYPES.srflx)
        continue;
      udpEnabled = true;
      reflexiveIps.add(c[CANDIDATE_IDX.IP]);
      for (const d2 of candidates) {
        if (d2[0] !== CANDIDATE_TYPES.srflx)
          continue;
        if (c === d2)
          continue;
        if (typeof c[CANDIDATE_IDX.RELATED_PORT] === "number" && typeof d2[CANDIDATE_IDX.RELATED_PORT] === "number" && c[CANDIDATE_IDX.RELATED_PORT] === d2[CANDIDATE_IDX.RELATED_PORT] && c[CANDIDATE_IDX.PORT] !== d2[CANDIDATE_IDX.PORT]) {
          isSymmetric = true;
          break;
        }
      }
    }
    return [udpEnabled, isSymmetric, reflexiveIps, dtlsFingerprint];
  }
  _handlePeerError(peer, err) {
    if (err.errorDetail === "sctp-failure" && err.message.indexOf("User-Initiated Abort") >= 0) {
      return;
    }
    console.error(err);
  }
  _checkForSignalOrEmitMessage(peer, msg) {
    if (msg.byteLength < SIGNAL_MESSAGE_HEADER_WORDS.length * 2) {
      this.emit("msg", peer, msg);
      return;
    }
    const u16 = new Uint16Array(msg, 0, SIGNAL_MESSAGE_HEADER_WORDS.length);
    for (let i = 0; i < SIGNAL_MESSAGE_HEADER_WORDS.length; i++) {
      if (u16[i] !== SIGNAL_MESSAGE_HEADER_WORDS[i]) {
        this.emit("msg", peer, msg);
        return;
      }
    }
    const u8 = new Uint8Array(msg, SIGNAL_MESSAGE_HEADER_WORDS.length * 2);
    let payload = arrToText(u8);
    if (payload.endsWith("\0")) {
      payload = payload.substring(0, payload.length - 1);
    }
    peer.signal(payload);
  }
  _wireUpCommonPeerEvents(peer) {
    peer.on("connect", () => {
      this.emit("peerconnect", peer);
      removeInPlace(this.packages, (pkg) => pkg[0] === peer.id);
      this._updateConnectedSessions();
    });
    peer.on("data", (data) => {
      let messageId = null;
      let u16 = null;
      if (data.byteLength >= CHUNK_HEADER_LENGTH_BYTES) {
        u16 = new Uint16Array(data, 0, CHUNK_HEADER_LENGTH_BYTES / 2);
        if (u16[0] === CHUNK_MAGIC_WORD) {
          messageId = u16[1];
        }
      }
      if (messageId !== null) {
        try {
          const chunkId = u16[2];
          const last = u16[3] !== 0;
          const msg = this._chunkHandler(data, messageId, chunkId, last);
          if (last) {
            this._checkForSignalOrEmitMessage(peer, msg);
            this.msgChunks.delete(messageId);
          }
        } catch (e) {
          console.error(e);
        }
      } else {
        this._checkForSignalOrEmitMessage(peer, data);
      }
    });
    peer.on("error", (err) => {
      console.warn(err);
    });
    peer.on("close", () => {
      this._removePeer(peer);
      this._updateConnectedSessions();
    });
    peer.on("signal", (signalData) => {
      const payloadBytes = textToArr(
        JSON.stringify(signalData)
      );
      let len = payloadBytes.byteLength + SIGNAL_MESSAGE_HEADER_WORDS.length * 2;
      if (len % 2 !== 0) {
        len++;
      }
      const buf = new ArrayBuffer(len);
      const u8 = new Uint8Array(buf);
      const u16 = new Uint16Array(buf);
      u8.set(payloadBytes, SIGNAL_MESSAGE_HEADER_WORDS.length * 2);
      for (let i = 0; i < SIGNAL_MESSAGE_HEADER_WORDS.length; i++) {
        u16[i] = SIGNAL_MESSAGE_HEADER_WORDS[i];
      }
      this.send(peer, buf);
    });
  }
}
const code$5 = 85;
const sortAll$1 = (iterable, sorter) => {
  return async function* () {
    const values = await itAll(iterable);
    yield* values.sort(sorter);
  }();
};
const take$1 = async function* (source, limit) {
  let items = 0;
  if (limit < 1) {
    return;
  }
  for await (const entry of source) {
    yield entry;
    items++;
    if (items === limit) {
      return;
    }
  }
};
var itTake = take$1;
class BaseDatastore {
  open() {
    return Promise.reject(new Error(".open is not implemented"));
  }
  close() {
    return Promise.reject(new Error(".close is not implemented"));
  }
  put(key, val, options) {
    return Promise.reject(new Error(".put is not implemented"));
  }
  get(key, options) {
    return Promise.reject(new Error(".get is not implemented"));
  }
  has(key, options) {
    return Promise.reject(new Error(".has is not implemented"));
  }
  delete(key, options) {
    return Promise.reject(new Error(".delete is not implemented"));
  }
  async *putMany(source, options = {}) {
    for await (const { key, value } of source) {
      await this.put(key, value, options);
      yield { key, value };
    }
  }
  async *getMany(source, options = {}) {
    for await (const key of source) {
      yield this.get(key, options);
    }
  }
  async *deleteMany(source, options = {}) {
    for await (const key of source) {
      await this.delete(key, options);
      yield key;
    }
  }
  batch() {
    let puts = [];
    let dels = [];
    return {
      put(key, value) {
        puts.push({ key, value });
      },
      delete(key) {
        dels.push(key);
      },
      commit: async (options) => {
        await itDrain(this.putMany(puts, options));
        puts = [];
        await itDrain(this.deleteMany(dels, options));
        dels = [];
      }
    };
  }
  async *_all(q, options) {
    throw new Error("._all is not implemented");
  }
  async *_allKeys(q, options) {
    throw new Error("._allKeys is not implemented");
  }
  query(q, options) {
    let it = this._all(q, options);
    if (q.prefix != null) {
      it = itFilter(
        it,
        (e) => e.key.toString().startsWith(q.prefix)
      );
    }
    if (Array.isArray(q.filters)) {
      it = q.filters.reduce((it2, f) => itFilter(it2, f), it);
    }
    if (Array.isArray(q.orders)) {
      it = q.orders.reduce((it2, f) => sortAll$1(it2, f), it);
    }
    if (q.offset != null) {
      let i = 0;
      it = itFilter(it, () => i++ >= q.offset);
    }
    if (q.limit != null) {
      it = itTake(it, q.limit);
    }
    return it;
  }
  queryKeys(q, options) {
    let it = this._allKeys(q, options);
    if (q.prefix != null) {
      it = itFilter(
        it,
        (key) => key.toString().startsWith(q.prefix)
      );
    }
    if (Array.isArray(q.filters)) {
      it = q.filters.reduce((it2, f) => itFilter(it2, f), it);
    }
    if (Array.isArray(q.orders)) {
      it = q.orders.reduce((it2, f) => sortAll$1(it2, f), it);
    }
    if (q.offset != null) {
      let i = 0;
      it = itFilter(it, () => i++ >= q.offset);
    }
    if (q.limit != null) {
      it = itTake(it, q.limit);
    }
    return it;
  }
}
class MemoryDatastore extends BaseDatastore {
  constructor() {
    super();
    this.data = {};
  }
  open() {
    return Promise.resolve();
  }
  close() {
    return Promise.resolve();
  }
  async put(key, val) {
    this.data[key.toString()] = val;
  }
  async get(key) {
    const exists = await this.has(key);
    if (!exists)
      throw notFoundError$1();
    return this.data[key.toString()];
  }
  async has(key) {
    return this.data[key.toString()] !== void 0;
  }
  async delete(key) {
    delete this.data[key.toString()];
  }
  async *_all() {
    yield* Object.entries(this.data).map(([key, value]) => ({ key: new Key(key), value }));
  }
  async *_allKeys() {
    yield* Object.entries(this.data).map(([key]) => new Key(key));
  }
}
async function* filter(source, fn2) {
  for await (const entry of source) {
    if (await fn2(entry)) {
      yield entry;
    }
  }
}
async function* map(source, func) {
  for await (const val of source) {
    yield func(val);
  }
}
async function* take(source, limit) {
  let items = 0;
  if (limit < 1) {
    return;
  }
  for await (const entry of source) {
    yield entry;
    items++;
    if (items === limit) {
      return;
    }
  }
}
async function all(source) {
  const arr = [];
  for await (const entry of source) {
    arr.push(entry);
  }
  return arr;
}
async function* sort(source, sorter) {
  const arr = await all(source);
  yield* arr.sort(sorter);
}
var Level = browserLevel.BrowserLevel;
class LevelDatastore extends BaseDatastore {
  constructor(path, opts = {}) {
    super();
    this.db = typeof path === "string" ? new Level(path, {
      ...opts,
      keyEncoding: "utf8",
      valueEncoding: "view"
    }) : path;
    this.opts = {
      createIfMissing: true,
      compression: false,
      ...opts
    };
  }
  async open() {
    try {
      await this.db.open(this.opts);
    } catch (err) {
      throw dbOpenFailedError(err);
    }
  }
  async put(key, value) {
    try {
      await this.db.put(key.toString(), value);
    } catch (err) {
      throw dbWriteFailedError(err);
    }
  }
  async get(key) {
    let data;
    try {
      data = await this.db.get(key.toString());
    } catch (err) {
      if (err.notFound)
        throw notFoundError$1(err);
      throw dbWriteFailedError(err);
    }
    return data;
  }
  async has(key) {
    try {
      await this.db.get(key.toString());
    } catch (err) {
      if (err.notFound)
        return false;
      throw err;
    }
    return true;
  }
  async delete(key) {
    try {
      await this.db.del(key.toString());
    } catch (err) {
      throw dbDeleteFailedError(err);
    }
  }
  close() {
    return this.db && this.db.close();
  }
  batch() {
    const ops = [];
    return {
      put: (key, value) => {
        ops.push({
          type: "put",
          key: key.toString(),
          value
        });
      },
      delete: (key) => {
        ops.push({
          type: "del",
          key: key.toString()
        });
      },
      commit: () => {
        return this.db.batch(ops);
      }
    };
  }
  query(q) {
    let it = this._query({
      values: true,
      prefix: q.prefix
    });
    if (Array.isArray(q.filters)) {
      it = q.filters.reduce((it2, f) => filter(it2, f), it);
    }
    if (Array.isArray(q.orders)) {
      it = q.orders.reduce((it2, f) => sort(it2, f), it);
    }
    const { offset, limit } = q;
    if (offset) {
      let i = 0;
      it = filter(it, () => i++ >= offset);
    }
    if (limit) {
      it = take(it, limit);
    }
    return it;
  }
  queryKeys(q) {
    let it = map(this._query({
      values: false,
      prefix: q.prefix
    }), ({ key }) => key);
    if (Array.isArray(q.filters)) {
      it = q.filters.reduce((it2, f) => filter(it2, f), it);
    }
    if (Array.isArray(q.orders)) {
      it = q.orders.reduce((it2, f) => sort(it2, f), it);
    }
    const { offset, limit } = q;
    if (offset) {
      let i = 0;
      it = filter(it, () => i++ >= offset);
    }
    if (limit) {
      it = take(it, limit);
    }
    return it;
  }
  _query(opts) {
    const iteratorOpts = {
      keys: true,
      keyEncoding: "buffer",
      values: opts.values
    };
    if (opts.prefix != null) {
      const prefix = opts.prefix.toString();
      iteratorOpts.gte = prefix;
      iteratorOpts.lt = prefix + "\xFF";
    }
    const iterator = this.db.iterator(iteratorOpts);
    if (iterator[Symbol.asyncIterator]) {
      return levelIteratorToIterator(iterator);
    }
    if (iterator.next != null && iterator.end != null) {
      return oldLevelIteratorToIterator(iterator);
    }
    throw new Error("Level returned incompatible iterator");
  }
}
async function* levelIteratorToIterator(li2) {
  for await (const [key, value] of li2) {
    yield { key: new Key(key, false), value };
  }
  await li2.close();
}
function oldLevelIteratorToIterator(li2) {
  return {
    [Symbol.asyncIterator]() {
      return {
        next: () => new Promise((resolve, reject) => {
          li2.next((err, key, value) => {
            if (err)
              return reject(err);
            if (key == null) {
              return li2.end((err2) => {
                if (err2)
                  return reject(err2);
                resolve({ done: true, value: void 0 });
              });
            }
            resolve({ done: false, value: { key: new Key(key, false), value } });
          });
        }),
        return: () => new Promise((resolve, reject) => {
          li2.end((err) => {
            if (err)
              return reject(err);
            resolve({ done: true, value: void 0 });
          });
        })
      };
    }
  };
}
var encode_1$2 = encode$c;
var MSB$3 = 128, REST$3 = 127, MSBALL$2 = ~REST$3, INT$2 = Math.pow(2, 31);
function encode$c(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT$2) {
    out[offset++] = num & 255 | MSB$3;
    num /= 128;
  }
  while (num & MSBALL$2) {
    out[offset++] = num & 255 | MSB$3;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode$c.bytes = offset - oldOffset + 1;
  return out;
}
var decode$g = read$2;
var MSB$1$2 = 128, REST$1$2 = 127;
function read$2(buf, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b2, l2 = buf.length;
  do {
    if (counter >= l2) {
      read$2.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b2 = buf[counter++];
    res += shift < 28 ? (b2 & REST$1$2) << shift : (b2 & REST$1$2) * Math.pow(2, shift);
    shift += 7;
  } while (b2 >= MSB$1$2);
  read$2.bytes = counter - offset;
  return res;
}
var N1$2 = Math.pow(2, 7);
var N2$2 = Math.pow(2, 14);
var N3$2 = Math.pow(2, 21);
var N4$2 = Math.pow(2, 28);
var N5$2 = Math.pow(2, 35);
var N6$2 = Math.pow(2, 42);
var N7$2 = Math.pow(2, 49);
var N8$2 = Math.pow(2, 56);
var N9$2 = Math.pow(2, 63);
var length$2 = function(value) {
  return value < N1$2 ? 1 : value < N2$2 ? 2 : value < N3$2 ? 3 : value < N4$2 ? 4 : value < N5$2 ? 5 : value < N6$2 ? 6 : value < N7$2 ? 7 : value < N8$2 ? 8 : value < N9$2 ? 9 : 10;
};
var varint$2 = {
  encode: encode_1$2,
  decode: decode$g,
  encodingLength: length$2
};
var _brrp_varint$2 = varint$2;
const decode$f = (data, offset = 0) => {
  const code2 = _brrp_varint$2.decode(data, offset);
  return [
    code2,
    _brrp_varint$2.decode.bytes
  ];
};
const encodeTo$2 = (int, target, offset = 0) => {
  _brrp_varint$2.encode(int, target, offset);
  return target;
};
const encodingLength$2 = (int) => {
  return _brrp_varint$2.encodingLength(int);
};
const create$3 = (code2, digest2) => {
  const size = digest2.byteLength;
  const sizeOffset = encodingLength$2(code2);
  const digestOffset = sizeOffset + encodingLength$2(size);
  const bytes = new Uint8Array(digestOffset + size);
  encodeTo$2(code2, bytes, 0);
  encodeTo$2(size, bytes, sizeOffset);
  bytes.set(digest2, digestOffset);
  return new Digest$2(code2, size, digest2, bytes);
};
const decode$e = (multihash) => {
  const bytes = coerce$1(multihash);
  const [code2, sizeOffset] = decode$f(bytes);
  const [size, digestOffset] = decode$f(bytes.subarray(sizeOffset));
  const digest2 = bytes.subarray(sizeOffset + digestOffset);
  if (digest2.byteLength !== size) {
    throw new Error("Incorrect length");
  }
  return new Digest$2(code2, size, digest2, bytes);
};
const equals$3 = (a2, b2) => {
  if (a2 === b2) {
    return true;
  } else {
    return a2.code === b2.code && a2.size === b2.size && equals$4(a2.bytes, b2.bytes);
  }
};
class Digest$2 {
  constructor(code2, size, digest2, bytes) {
    this.code = code2;
    this.size = size;
    this.digest = digest2;
    this.bytes = bytes;
  }
}
class CID$2 {
  constructor(version2, code2, multihash, bytes) {
    this.code = code2;
    this.version = version2;
    this.multihash = multihash;
    this.bytes = bytes;
    this.byteOffset = bytes.byteOffset;
    this.byteLength = bytes.byteLength;
    this.asCID = this;
    this._baseCache = /* @__PURE__ */ new Map();
    Object.defineProperties(this, {
      byteOffset: hidden$2,
      byteLength: hidden$2,
      code: readonly$3,
      version: readonly$3,
      multihash: readonly$3,
      bytes: readonly$3,
      _baseCache: hidden$2,
      asCID: hidden$2
    });
  }
  toV0() {
    switch (this.version) {
      case 0: {
        return this;
      }
      default: {
        const { code: code2, multihash } = this;
        if (code2 !== DAG_PB_CODE$2) {
          throw new Error("Cannot convert a non dag-pb CID to CIDv0");
        }
        if (multihash.code !== SHA_256_CODE$2) {
          throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
        }
        return CID$2.createV0(multihash);
      }
    }
  }
  toV1() {
    switch (this.version) {
      case 0: {
        const { code: code2, digest: digest2 } = this.multihash;
        const multihash = create$3(code2, digest2);
        return CID$2.createV1(this.code, multihash);
      }
      case 1: {
        return this;
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
      }
    }
  }
  equals(other) {
    return other && this.code === other.code && this.version === other.version && equals$3(this.multihash, other.multihash);
  }
  toString(base3) {
    const { bytes, version: version2, _baseCache } = this;
    switch (version2) {
      case 0:
        return toStringV0$2(bytes, _baseCache, base3 || base58btc$1.encoder);
      default:
        return toStringV1$2(bytes, _baseCache, base3 || base32$2.encoder);
    }
  }
  toJSON() {
    return {
      code: this.code,
      version: this.version,
      hash: this.multihash.bytes
    };
  }
  get [Symbol.toStringTag]() {
    return "CID";
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return "CID(" + this.toString() + ")";
  }
  static isCID(value) {
    deprecate$2(/^0\.0/, IS_CID_DEPRECATION$2);
    return !!(value && (value[cidSymbol$2] || value.asCID === value));
  }
  get toBaseEncodedString() {
    throw new Error("Deprecated, use .toString()");
  }
  get codec() {
    throw new Error('"codec" property is deprecated, use integer "code" property instead');
  }
  get buffer() {
    throw new Error("Deprecated .buffer property, use .bytes to get Uint8Array instead");
  }
  get multibaseName() {
    throw new Error('"multibaseName" property is deprecated');
  }
  get prefix() {
    throw new Error('"prefix" property is deprecated');
  }
  static asCID(value) {
    if (value instanceof CID$2) {
      return value;
    } else if (value != null && value.asCID === value) {
      const { version: version2, code: code2, multihash, bytes } = value;
      return new CID$2(version2, code2, multihash, bytes || encodeCID$2(version2, code2, multihash.bytes));
    } else if (value != null && value[cidSymbol$2] === true) {
      const { version: version2, multihash, code: code2 } = value;
      const digest2 = decode$e(multihash);
      return CID$2.create(version2, code2, digest2);
    } else {
      return null;
    }
  }
  static create(version2, code2, digest2) {
    if (typeof code2 !== "number") {
      throw new Error("String codecs are no longer supported");
    }
    switch (version2) {
      case 0: {
        if (code2 !== DAG_PB_CODE$2) {
          throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE$2}) block encoding`);
        } else {
          return new CID$2(version2, code2, digest2, digest2.bytes);
        }
      }
      case 1: {
        const bytes = encodeCID$2(version2, code2, digest2.bytes);
        return new CID$2(version2, code2, digest2, bytes);
      }
      default: {
        throw new Error("Invalid version");
      }
    }
  }
  static createV0(digest2) {
    return CID$2.create(0, DAG_PB_CODE$2, digest2);
  }
  static createV1(code2, digest2) {
    return CID$2.create(1, code2, digest2);
  }
  static decode(bytes) {
    const [cid, remainder] = CID$2.decodeFirst(bytes);
    if (remainder.length) {
      throw new Error("Incorrect length");
    }
    return cid;
  }
  static decodeFirst(bytes) {
    const specs = CID$2.inspectBytes(bytes);
    const prefixSize = specs.size - specs.multihashSize;
    const multihashBytes = coerce$1(bytes.subarray(prefixSize, prefixSize + specs.multihashSize));
    if (multihashBytes.byteLength !== specs.multihashSize) {
      throw new Error("Incorrect length");
    }
    const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
    const digest2 = new Digest$2(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
    const cid = specs.version === 0 ? CID$2.createV0(digest2) : CID$2.createV1(specs.codec, digest2);
    return [
      cid,
      bytes.subarray(specs.size)
    ];
  }
  static inspectBytes(initialBytes) {
    let offset = 0;
    const next = () => {
      const [i, length2] = decode$f(initialBytes.subarray(offset));
      offset += length2;
      return i;
    };
    let version2 = next();
    let codec = DAG_PB_CODE$2;
    if (version2 === 18) {
      version2 = 0;
      offset = 0;
    } else if (version2 === 1) {
      codec = next();
    }
    if (version2 !== 0 && version2 !== 1) {
      throw new RangeError(`Invalid CID version ${version2}`);
    }
    const prefixSize = offset;
    const multihashCode = next();
    const digestSize = next();
    const size = offset + digestSize;
    const multihashSize = size - prefixSize;
    return {
      version: version2,
      codec,
      multihashCode,
      digestSize,
      multihashSize,
      size
    };
  }
  static parse(source, base3) {
    const [prefix, bytes] = parseCIDtoBytes$2(source, base3);
    const cid = CID$2.decode(bytes);
    cid._baseCache.set(prefix, source);
    return cid;
  }
}
const parseCIDtoBytes$2 = (source, base3) => {
  switch (source[0]) {
    case "Q": {
      const decoder = base3 || base58btc$1;
      return [
        base58btc$1.prefix,
        decoder.decode(`${base58btc$1.prefix}${source}`)
      ];
    }
    case base58btc$1.prefix: {
      const decoder = base3 || base58btc$1;
      return [
        base58btc$1.prefix,
        decoder.decode(source)
      ];
    }
    case base32$2.prefix: {
      const decoder = base3 || base32$2;
      return [
        base32$2.prefix,
        decoder.decode(source)
      ];
    }
    default: {
      if (base3 == null) {
        throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
      }
      return [
        source[0],
        base3.decode(source)
      ];
    }
  }
};
const toStringV0$2 = (bytes, cache, base3) => {
  const { prefix } = base3;
  if (prefix !== base58btc$1.prefix) {
    throw Error(`Cannot string encode V0 in ${base3.name} encoding`);
  }
  const cid = cache.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes).slice(1);
    cache.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
const toStringV1$2 = (bytes, cache, base3) => {
  const { prefix } = base3;
  const cid = cache.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes);
    cache.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
const DAG_PB_CODE$2 = 112;
const SHA_256_CODE$2 = 18;
const encodeCID$2 = (version2, code2, multihash) => {
  const codeOffset = encodingLength$2(version2);
  const hashOffset = codeOffset + encodingLength$2(code2);
  const bytes = new Uint8Array(hashOffset + multihash.byteLength);
  encodeTo$2(version2, bytes, 0);
  encodeTo$2(code2, bytes, codeOffset);
  bytes.set(multihash, hashOffset);
  return bytes;
};
const cidSymbol$2 = Symbol.for("@ipld/js-cid/CID");
const readonly$3 = {
  writable: false,
  configurable: false,
  enumerable: true
};
const hidden$2 = {
  writable: false,
  enumerable: false,
  configurable: false
};
const version$2 = "0.0.0-dev";
const deprecate$2 = (range, message) => {
  if (range.test(version$2)) {
    console.warn(message);
  } else {
    throw new Error(message);
  }
};
const IS_CID_DEPRECATION$2 = `CID.isCID(v) is deprecated and will be removed in the next major release.
Following code pattern:

if (CID.isCID(value)) {
  doSomethingWithCID(value)
}

Is replaced with:

const cid = CID.asCID(value)
if (cid) {
  // Make sure to use cid instead of value
  doSomethingWithCID(cid)
}
`;
const code$4 = 85;
const sortAll = (iterable, sorter) => {
  return async function* () {
    const values = await itAll(iterable);
    yield* values.sort(sorter);
  }();
};
class BaseBlockstore {
  open() {
    return Promise.reject(new Error(".open is not implemented"));
  }
  close() {
    return Promise.reject(new Error(".close is not implemented"));
  }
  put(key, val, options) {
    return Promise.reject(new Error(".put is not implemented"));
  }
  get(key, options) {
    return Promise.reject(new Error(".get is not implemented"));
  }
  has(key, options) {
    return Promise.reject(new Error(".has is not implemented"));
  }
  delete(key, options) {
    return Promise.reject(new Error(".delete is not implemented"));
  }
  async *putMany(source, options = {}) {
    for await (const { key, value } of source) {
      await this.put(key, value, options);
      yield { key, value };
    }
  }
  async *getMany(source, options = {}) {
    for await (const key of source) {
      yield this.get(key, options);
    }
  }
  async *deleteMany(source, options = {}) {
    for await (const key of source) {
      await this.delete(key, options);
      yield key;
    }
  }
  batch() {
    let puts = [];
    let dels = [];
    return {
      put(key, value) {
        puts.push({ key, value });
      },
      delete(key) {
        dels.push(key);
      },
      commit: async (options) => {
        await itDrain(this.putMany(puts, options));
        puts = [];
        await itDrain(this.deleteMany(dels, options));
        dels = [];
      }
    };
  }
  async *_all(q, options) {
    throw new Error("._all is not implemented");
  }
  async *_allKeys(q, options) {
    throw new Error("._allKeys is not implemented");
  }
  query(q, options) {
    let it = this._all(q, options);
    if (q.prefix != null) {
      it = itFilter(
        it,
        (e) => e.key.toString().startsWith(q.prefix || "")
      );
    }
    if (Array.isArray(q.filters)) {
      it = q.filters.reduce((it2, f) => itFilter(it2, f), it);
    }
    if (Array.isArray(q.orders)) {
      it = q.orders.reduce((it2, f) => sortAll(it2, f), it);
    }
    if (q.offset != null) {
      let i = 0;
      it = itFilter(it, () => i++ >= (q.offset || 0));
    }
    if (q.limit != null) {
      it = itTake(it, q.limit);
    }
    return it;
  }
  queryKeys(q, options) {
    let it = this._allKeys(q, options);
    if (q.prefix != null) {
      it = itFilter(it, (cid) => cid.toString().startsWith(q.prefix || ""));
    }
    if (Array.isArray(q.filters)) {
      it = q.filters.reduce((it2, f) => itFilter(it2, f), it);
    }
    if (Array.isArray(q.orders)) {
      it = q.orders.reduce((it2, f) => sortAll(it2, f), it);
    }
    if (q.offset != null) {
      let i = 0;
      it = itFilter(it, () => i++ >= q.offset);
    }
    if (q.limit != null) {
      it = itTake(it, q.limit);
    }
    return it;
  }
}
function cidToKey(cid) {
  const c = CID$2.asCID(cid);
  if (!c) {
    throw errCode$1(new Error("Not a valid cid"), "ERR_INVALID_CID");
  }
  return new Key("/" + base32$2.encode(c.multihash.bytes).slice(1).toUpperCase(), false);
}
function keyToCid(key) {
  return CID$2.createV1(code$4, decode$e(base32$2.decode("b" + key.toString().slice(1).toLowerCase())));
}
function convertPrefix(prefix) {
  const firstChar = prefix.substring(0, 1);
  if (firstChar === "/") {
    return convertPrefix(prefix.substring(1));
  }
  let decoder;
  if (firstChar.toLowerCase() === "b") {
    decoder = (input) => base32$2.decode(input.toLowerCase()).subarray(2);
  } else if (firstChar.toLowerCase() === "c") {
    decoder = (input) => base32pad$1.decode(input.toLowerCase()).subarray(2);
  } else if (firstChar === "z") {
    decoder = (input) => base58btc$1.decode(input).subarray(2);
  } else if (firstChar === "Q") {
    decoder = (input) => base58btc$1.decode("z" + input);
  } else {
    decoder = (input) => base32$2.decode("b" + input.toLowerCase()).subarray(2);
  }
  let bytes;
  for (let i = 1; i < prefix.length; i++) {
    try {
      bytes = decoder(prefix.substring(0, i));
    } catch (err) {
      if (err.message !== "Unexpected end of data") {
        throw err;
      }
    }
  }
  let str = "/C";
  if (bytes) {
    str = `/${base32$2.encode(bytes).slice(1, -1).toUpperCase() || "C"}`;
  }
  return str;
}
function convertQuery(query) {
  return {
    ...query,
    prefix: query.prefix ? convertPrefix(query.prefix) : void 0,
    filters: query.filters ? query.filters.map(
      (filter2) => (pair) => {
        return filter2({ key: keyToCid(pair.key), value: pair.value });
      }
    ) : void 0,
    orders: query.orders ? query.orders.map(
      (order) => (a2, b2) => {
        return order({ key: keyToCid(a2.key), value: a2.value }, { key: keyToCid(b2.key), value: b2.value });
      }
    ) : void 0
  };
}
function convertKeyQuery(query) {
  return {
    ...query,
    prefix: query.prefix ? convertPrefix(query.prefix) : void 0,
    filters: query.filters ? query.filters.map(
      (filter2) => (key) => {
        return filter2(keyToCid(key));
      }
    ) : void 0,
    orders: query.orders ? query.orders.map(
      (order) => (a2, b2) => {
        return order(keyToCid(a2), keyToCid(b2));
      }
    ) : void 0
  };
}
class BlockstoreDatastoreAdapter extends BaseBlockstore {
  constructor(datastore) {
    super();
    this.child = datastore;
  }
  open() {
    return this.child.open();
  }
  close() {
    return this.child.close();
  }
  async *query(query, options) {
    for await (const { key, value } of this.child.query(convertQuery(query), options)) {
      yield { key: keyToCid(key), value };
    }
  }
  async *queryKeys(query, options) {
    for await (const key of this.child.queryKeys(convertKeyQuery(query), options)) {
      yield keyToCid(key);
    }
  }
  async get(cid, options) {
    return this.child.get(cidToKey(cid), options);
  }
  async *getMany(cids, options) {
    for await (const cid of cids) {
      yield this.get(cid, options);
    }
  }
  async put(cid, value, options) {
    await this.child.put(cidToKey(cid), value, options);
  }
  async *putMany(blocks, options) {
    const output = pushable({
      objectMode: true
    });
    const runner = globalThis.process && globalThis.process.nextTick ? globalThis.process.nextTick : globalThis.setImmediate || globalThis.setTimeout;
    runner(async () => {
      try {
        const store = this.child;
        await itDrain(this.child.putMany(async function* () {
          for await (const block of blocks) {
            const key = cidToKey(block.key);
            const exists = await store.has(key, options);
            if (!exists) {
              yield { key, value: block.value };
            }
            output.push(block);
          }
        }()));
        output.end();
      } catch (err) {
        output.end(err);
      }
    });
    yield* output;
  }
  has(cid, options) {
    return this.child.has(cidToKey(cid), options);
  }
  delete(cid, options) {
    return this.child.delete(cidToKey(cid), options);
  }
  deleteMany(cids, options) {
    const out = pushable({
      objectMode: true
    });
    itDrain(this.child.deleteMany(async function* () {
      for await (const cid of cids) {
        yield cidToKey(cid);
        out.push(cid);
      }
      out.end();
    }(), options)).catch((err) => {
      out.end(err);
    });
    return out;
  }
}
function createRepo(print, codecs2, options) {
  const repoPath = options.path || "ipfs";
  return createRepo$1(repoPath, (codeOrName) => codecs2.getCodec(codeOrName), {
    root: new LevelDatastore(repoPath, {
      prefix: "",
      version: 2
    }),
    blocks: new BlockstoreDatastoreAdapter(
      new LevelDatastore(`${repoPath}/blocks`, {
        prefix: "",
        version: 2
      })
    ),
    datastore: new LevelDatastore(`${repoPath}/datastore`, {
      prefix: "",
      version: 2
    }),
    keys: new LevelDatastore(`${repoPath}/keys`, {
      prefix: "",
      version: 2
    }),
    pins: new LevelDatastore(`${repoPath}/pins`, {
      prefix: "",
      version: 2
    })
  }, {
    autoMigrate: options.autoMigrate,
    onMigrationProgress: options.onMigrationProgress || print,
    repoLock: MemoryLock
  });
}
function toBase64url(b2) {
  return base64url$1.encode(b2).slice(1);
}
function fromBase64url(s) {
  return base64url$1.decode(`u${s}`);
}
var encode_1$1 = encode$b;
var MSB$2 = 128, REST$2 = 127, MSBALL$1 = ~REST$2, INT$1 = Math.pow(2, 31);
function encode$b(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT$1) {
    out[offset++] = num & 255 | MSB$2;
    num /= 128;
  }
  while (num & MSBALL$1) {
    out[offset++] = num & 255 | MSB$2;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode$b.bytes = offset - oldOffset + 1;
  return out;
}
var decode$d = read$1;
var MSB$1$1 = 128, REST$1$1 = 127;
function read$1(buf, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b2, l2 = buf.length;
  do {
    if (counter >= l2) {
      read$1.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b2 = buf[counter++];
    res += shift < 28 ? (b2 & REST$1$1) << shift : (b2 & REST$1$1) * Math.pow(2, shift);
    shift += 7;
  } while (b2 >= MSB$1$1);
  read$1.bytes = counter - offset;
  return res;
}
var N1$1 = Math.pow(2, 7);
var N2$1 = Math.pow(2, 14);
var N3$1 = Math.pow(2, 21);
var N4$1 = Math.pow(2, 28);
var N5$1 = Math.pow(2, 35);
var N6$1 = Math.pow(2, 42);
var N7$1 = Math.pow(2, 49);
var N8$1 = Math.pow(2, 56);
var N9$1 = Math.pow(2, 63);
var length$1 = function(value) {
  return value < N1$1 ? 1 : value < N2$1 ? 2 : value < N3$1 ? 3 : value < N4$1 ? 4 : value < N5$1 ? 5 : value < N6$1 ? 6 : value < N7$1 ? 7 : value < N8$1 ? 8 : value < N9$1 ? 9 : 10;
};
var varint$1 = {
  encode: encode_1$1,
  decode: decode$d,
  encodingLength: length$1
};
var _brrp_varint$1 = varint$1;
const decode$c = (data, offset = 0) => {
  const code2 = _brrp_varint$1.decode(data, offset);
  return [
    code2,
    _brrp_varint$1.decode.bytes
  ];
};
const encodeTo$1 = (int, target, offset = 0) => {
  _brrp_varint$1.encode(int, target, offset);
  return target;
};
const encodingLength$1 = (int) => {
  return _brrp_varint$1.encodingLength(int);
};
const create$2 = (code2, digest2) => {
  const size = digest2.byteLength;
  const sizeOffset = encodingLength$1(code2);
  const digestOffset = sizeOffset + encodingLength$1(size);
  const bytes = new Uint8Array(digestOffset + size);
  encodeTo$1(code2, bytes, 0);
  encodeTo$1(size, bytes, sizeOffset);
  bytes.set(digest2, digestOffset);
  return new Digest$1(code2, size, digest2, bytes);
};
const decode$b = (multihash) => {
  const bytes = coerce$2(multihash);
  const [code2, sizeOffset] = decode$c(bytes);
  const [size, digestOffset] = decode$c(bytes.subarray(sizeOffset));
  const digest2 = bytes.subarray(sizeOffset + digestOffset);
  if (digest2.byteLength !== size) {
    throw new Error("Incorrect length");
  }
  return new Digest$1(code2, size, digest2, bytes);
};
const equals$2 = (a2, b2) => {
  if (a2 === b2) {
    return true;
  } else {
    return a2.code === b2.code && a2.size === b2.size && equals$5(a2.bytes, b2.bytes);
  }
};
class Digest$1 {
  constructor(code2, size, digest2, bytes) {
    this.code = code2;
    this.size = size;
    this.digest = digest2;
    this.bytes = bytes;
  }
}
class CID$1 {
  constructor(version2, code2, multihash, bytes) {
    this.code = code2;
    this.version = version2;
    this.multihash = multihash;
    this.bytes = bytes;
    this.byteOffset = bytes.byteOffset;
    this.byteLength = bytes.byteLength;
    this.asCID = this;
    this._baseCache = /* @__PURE__ */ new Map();
    Object.defineProperties(this, {
      byteOffset: hidden$1,
      byteLength: hidden$1,
      code: readonly$2,
      version: readonly$2,
      multihash: readonly$2,
      bytes: readonly$2,
      _baseCache: hidden$1,
      asCID: hidden$1
    });
  }
  toV0() {
    switch (this.version) {
      case 0: {
        return this;
      }
      default: {
        const { code: code2, multihash } = this;
        if (code2 !== DAG_PB_CODE$1) {
          throw new Error("Cannot convert a non dag-pb CID to CIDv0");
        }
        if (multihash.code !== SHA_256_CODE$1) {
          throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
        }
        return CID$1.createV0(multihash);
      }
    }
  }
  toV1() {
    switch (this.version) {
      case 0: {
        const { code: code2, digest: digest2 } = this.multihash;
        const multihash = create$2(code2, digest2);
        return CID$1.createV1(this.code, multihash);
      }
      case 1: {
        return this;
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
      }
    }
  }
  equals(other) {
    return other && this.code === other.code && this.version === other.version && equals$2(this.multihash, other.multihash);
  }
  toString(base3) {
    const { bytes, version: version2, _baseCache } = this;
    switch (version2) {
      case 0:
        return toStringV0$1(bytes, _baseCache, base3 || base58btc$2.encoder);
      default:
        return toStringV1$1(bytes, _baseCache, base3 || base32$3.encoder);
    }
  }
  toJSON() {
    return {
      code: this.code,
      version: this.version,
      hash: this.multihash.bytes
    };
  }
  get [Symbol.toStringTag]() {
    return "CID";
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return "CID(" + this.toString() + ")";
  }
  static isCID(value) {
    deprecate$1(/^0\.0/, IS_CID_DEPRECATION$1);
    return !!(value && (value[cidSymbol$1] || value.asCID === value));
  }
  get toBaseEncodedString() {
    throw new Error("Deprecated, use .toString()");
  }
  get codec() {
    throw new Error('"codec" property is deprecated, use integer "code" property instead');
  }
  get buffer() {
    throw new Error("Deprecated .buffer property, use .bytes to get Uint8Array instead");
  }
  get multibaseName() {
    throw new Error('"multibaseName" property is deprecated');
  }
  get prefix() {
    throw new Error('"prefix" property is deprecated');
  }
  static asCID(value) {
    if (value instanceof CID$1) {
      return value;
    } else if (value != null && value.asCID === value) {
      const { version: version2, code: code2, multihash, bytes } = value;
      return new CID$1(version2, code2, multihash, bytes || encodeCID$1(version2, code2, multihash.bytes));
    } else if (value != null && value[cidSymbol$1] === true) {
      const { version: version2, multihash, code: code2 } = value;
      const digest2 = decode$b(multihash);
      return CID$1.create(version2, code2, digest2);
    } else {
      return null;
    }
  }
  static create(version2, code2, digest2) {
    if (typeof code2 !== "number") {
      throw new Error("String codecs are no longer supported");
    }
    switch (version2) {
      case 0: {
        if (code2 !== DAG_PB_CODE$1) {
          throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE$1}) block encoding`);
        } else {
          return new CID$1(version2, code2, digest2, digest2.bytes);
        }
      }
      case 1: {
        const bytes = encodeCID$1(version2, code2, digest2.bytes);
        return new CID$1(version2, code2, digest2, bytes);
      }
      default: {
        throw new Error("Invalid version");
      }
    }
  }
  static createV0(digest2) {
    return CID$1.create(0, DAG_PB_CODE$1, digest2);
  }
  static createV1(code2, digest2) {
    return CID$1.create(1, code2, digest2);
  }
  static decode(bytes) {
    const [cid, remainder] = CID$1.decodeFirst(bytes);
    if (remainder.length) {
      throw new Error("Incorrect length");
    }
    return cid;
  }
  static decodeFirst(bytes) {
    const specs = CID$1.inspectBytes(bytes);
    const prefixSize = specs.size - specs.multihashSize;
    const multihashBytes = coerce$2(bytes.subarray(prefixSize, prefixSize + specs.multihashSize));
    if (multihashBytes.byteLength !== specs.multihashSize) {
      throw new Error("Incorrect length");
    }
    const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
    const digest2 = new Digest$1(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
    const cid = specs.version === 0 ? CID$1.createV0(digest2) : CID$1.createV1(specs.codec, digest2);
    return [
      cid,
      bytes.subarray(specs.size)
    ];
  }
  static inspectBytes(initialBytes) {
    let offset = 0;
    const next = () => {
      const [i, length2] = decode$c(initialBytes.subarray(offset));
      offset += length2;
      return i;
    };
    let version2 = next();
    let codec = DAG_PB_CODE$1;
    if (version2 === 18) {
      version2 = 0;
      offset = 0;
    } else if (version2 === 1) {
      codec = next();
    }
    if (version2 !== 0 && version2 !== 1) {
      throw new RangeError(`Invalid CID version ${version2}`);
    }
    const prefixSize = offset;
    const multihashCode = next();
    const digestSize = next();
    const size = offset + digestSize;
    const multihashSize = size - prefixSize;
    return {
      version: version2,
      codec,
      multihashCode,
      digestSize,
      multihashSize,
      size
    };
  }
  static parse(source, base3) {
    const [prefix, bytes] = parseCIDtoBytes$1(source, base3);
    const cid = CID$1.decode(bytes);
    cid._baseCache.set(prefix, source);
    return cid;
  }
}
const parseCIDtoBytes$1 = (source, base3) => {
  switch (source[0]) {
    case "Q": {
      const decoder = base3 || base58btc$2;
      return [
        base58btc$2.prefix,
        decoder.decode(`${base58btc$2.prefix}${source}`)
      ];
    }
    case base58btc$2.prefix: {
      const decoder = base3 || base58btc$2;
      return [
        base58btc$2.prefix,
        decoder.decode(source)
      ];
    }
    case base32$3.prefix: {
      const decoder = base3 || base32$3;
      return [
        base32$3.prefix,
        decoder.decode(source)
      ];
    }
    default: {
      if (base3 == null) {
        throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
      }
      return [
        source[0],
        base3.decode(source)
      ];
    }
  }
};
const toStringV0$1 = (bytes, cache, base3) => {
  const { prefix } = base3;
  if (prefix !== base58btc$2.prefix) {
    throw Error(`Cannot string encode V0 in ${base3.name} encoding`);
  }
  const cid = cache.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes).slice(1);
    cache.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
const toStringV1$1 = (bytes, cache, base3) => {
  const { prefix } = base3;
  const cid = cache.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes);
    cache.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
const DAG_PB_CODE$1 = 112;
const SHA_256_CODE$1 = 18;
const encodeCID$1 = (version2, code2, multihash) => {
  const codeOffset = encodingLength$1(version2);
  const hashOffset = codeOffset + encodingLength$1(code2);
  const bytes = new Uint8Array(hashOffset + multihash.byteLength);
  encodeTo$1(version2, bytes, 0);
  encodeTo$1(code2, bytes, codeOffset);
  bytes.set(multihash, hashOffset);
  return bytes;
};
const cidSymbol$1 = Symbol.for("@ipld/js-cid/CID");
const readonly$2 = {
  writable: false,
  configurable: false,
  enumerable: true
};
const hidden$1 = {
  writable: false,
  enumerable: false,
  configurable: false
};
const version$1 = "0.0.0-dev";
const deprecate$1 = (range, message) => {
  if (range.test(version$1)) {
    console.warn(message);
  } else {
    throw new Error(message);
  }
};
const IS_CID_DEPRECATION$1 = `CID.isCID(v) is deprecated and will be removed in the next major release.
Following code pattern:

if (CID.isCID(value)) {
  doSomethingWithCID(value)
}

Is replaced with:

const cid = CID.asCID(value)
if (cid) {
  // Make sure to use cid instead of value
  doSomethingWithCID(cid)
}
`;
function fromSplit$1(split) {
  const [protectedHeader, payload, signature] = split;
  return {
    payload,
    signatures: [{ protected: protectedHeader, signature }],
    link: CID$1.decode(fromBase64url(payload))
  };
}
function encodeSignature(signature) {
  const encoded = {
    signature: fromBase64url(signature.signature)
  };
  if (signature.header)
    encoded.header = signature.header;
  if (signature.protected)
    encoded.protected = fromBase64url(signature.protected);
  return encoded;
}
function encode$a(jws) {
  const payload = fromBase64url(jws.payload);
  try {
    CID$1.decode(payload);
  } catch (e) {
    throw new Error("Not a valid DagJWS");
  }
  return {
    payload,
    signatures: jws.signatures.map(encodeSignature)
  };
}
function decodeSignature(encoded) {
  const sign = {
    signature: toBase64url(encoded.signature)
  };
  if (encoded.header)
    sign.header = encoded.header;
  if (encoded.protected)
    sign.protected = toBase64url(encoded.protected);
  return sign;
}
function decode$a(encoded) {
  const decoded = {
    payload: toBase64url(encoded.payload),
    signatures: encoded.signatures.map(decodeSignature)
  };
  decoded.link = CID$1.decode(new Uint8Array(encoded.payload));
  return decoded;
}
function fromSplit(split) {
  const [protectedHeader, encrypted_key, iv, ciphertext, tag] = split;
  const jwe = {
    ciphertext,
    iv,
    protected: protectedHeader,
    tag
  };
  if (encrypted_key)
    jwe.recipients = [{ encrypted_key }];
  return jwe;
}
function encodeRecipient(recipient) {
  const encRec = {};
  if (recipient.encrypted_key)
    encRec.encrypted_key = fromBase64url(recipient.encrypted_key);
  if (recipient.header)
    encRec.header = recipient.header;
  return encRec;
}
function encode$9(jwe) {
  const encJwe = {
    ciphertext: fromBase64url(jwe.ciphertext),
    protected: fromBase64url(jwe.protected),
    iv: fromBase64url(jwe.iv),
    tag: fromBase64url(jwe.tag)
  };
  if (jwe.aad)
    encJwe.aad = fromBase64url(jwe.aad);
  if (jwe.recipients)
    encJwe.recipients = jwe.recipients.map(encodeRecipient);
  if (jwe.unprotected)
    encJwe.unprotected = jwe.unprotected;
  return encJwe;
}
function decodeRecipient(encoded) {
  const recipient = {};
  if (encoded.encrypted_key)
    recipient.encrypted_key = toBase64url(encoded.encrypted_key);
  if (encoded.header)
    recipient.header = encoded.header;
  return recipient;
}
function decode$9(encoded) {
  const jwe = {
    ciphertext: toBase64url(encoded.ciphertext),
    protected: toBase64url(encoded.protected),
    iv: toBase64url(encoded.iv),
    tag: toBase64url(encoded.tag)
  };
  if (encoded.aad)
    jwe.aad = toBase64url(encoded.aad);
  if (encoded.recipients)
    jwe.recipients = encoded.recipients.map(decodeRecipient);
  if (encoded.unprotected)
    jwe.unprotected = encoded.unprotected;
  return jwe;
}
const name$3 = "dag-jose";
const code$3 = 133;
function isDagJWS(jose) {
  return "payload" in jose && typeof jose.payload === "string" && "signatures" in jose && Array.isArray(jose.signatures);
}
function isEncodedJWS(jose) {
  return "payload" in jose && jose.payload instanceof Uint8Array && "signatures" in jose && Array.isArray(jose.signatures);
}
function isEncodedJWE(jose) {
  return "ciphertext" in jose && jose.ciphertext instanceof Uint8Array && "iv" in jose && jose.iv instanceof Uint8Array && "protected" in jose && jose.protected instanceof Uint8Array && "tag" in jose && jose.tag instanceof Uint8Array;
}
function isDagJWE(jose) {
  return "ciphertext" in jose && typeof jose.ciphertext === "string" && "iv" in jose && typeof jose.iv === "string" && "protected" in jose && typeof jose.protected === "string" && "tag" in jose && typeof jose.tag === "string";
}
function toGeneral(jose) {
  if (typeof jose === "string") {
    const split = jose.split(".");
    if (split.length === 3) {
      return fromSplit$1(split);
    } else if (split.length === 5) {
      return fromSplit(split);
    }
    throw new Error("Not a valid JOSE string");
  }
  if (isDagJWS(jose) || isDagJWE(jose)) {
    return jose;
  }
  throw new Error("Not a valid unencoded JOSE object");
}
function encode$8(obj) {
  if (typeof obj === "string") {
    obj = toGeneral(obj);
  }
  let encodedJose;
  if (isDagJWS(obj)) {
    encodedJose = encode$a(obj);
  } else if (isDagJWE(obj)) {
    encodedJose = encode$9(obj);
  } else {
    throw new Error("Not a valid JOSE object");
  }
  return new Uint8Array(encode$e(encodedJose));
}
function decode$8(data) {
  let encoded;
  try {
    encoded = decode$i(data);
  } catch (e) {
    throw new Error("Not a valid DAG-JOSE object");
  }
  if (isEncodedJWS(encoded)) {
    return decode$a(encoded);
  } else if (isEncodedJWE(encoded)) {
    return decode$9(encoded);
  } else {
    throw new Error("Not a valid DAG-JOSE object");
  }
}
const dagJOSE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  name: name$3,
  code: code$3,
  toGeneral,
  encode: encode$8,
  decode: decode$8
}, Symbol.toStringTag, { value: "Module" }));
const LOAD_CODEC = (codeOrName) => Promise.reject(new Error(`No codec found for "${codeOrName}"`));
class Multicodecs {
  constructor(options) {
    this._codecsByName = {};
    this._codecsByCode = {};
    this._loadCodec = options.loadCodec || LOAD_CODEC;
    for (const codec of options.codecs) {
      this.addCodec(codec);
    }
  }
  addCodec(codec) {
    if (this._codecsByName[codec.name] || this._codecsByCode[codec.code]) {
      throw new Error(`Resolver already exists for codec "${codec.name}"`);
    }
    this._codecsByName[codec.name] = codec;
    this._codecsByCode[codec.code] = codec;
  }
  removeCodec(codec) {
    delete this._codecsByName[codec.name];
    delete this._codecsByCode[codec.code];
  }
  async getCodec(code2) {
    const table = typeof code2 === "string" ? this._codecsByName : this._codecsByCode;
    if (table[code2]) {
      return table[code2];
    }
    const codec = await this._loadCodec(code2);
    if (table[code2] == null) {
      this.addCodec(codec);
    }
    return codec;
  }
  listCodecs() {
    return Object.values(this._codecsByName);
  }
}
const LOAD_HASHER = (codeOrName) => Promise.reject(new Error(`No hasher found for "${codeOrName}"`));
class Multihashes {
  constructor(options) {
    this._hashersByName = {};
    this._hashersByCode = {};
    this._loadHasher = options.loadHasher || LOAD_HASHER;
    for (const hasher of options.hashers) {
      this.addHasher(hasher);
    }
  }
  addHasher(hasher) {
    if (this._hashersByName[hasher.name] || this._hashersByCode[hasher.code]) {
      throw new Error(`Resolver already exists for codec "${hasher.name}"`);
    }
    this._hashersByName[hasher.name] = hasher;
    this._hashersByCode[hasher.code] = hasher;
  }
  removeHasher(hasher) {
    delete this._hashersByName[hasher.name];
    delete this._hashersByCode[hasher.code];
  }
  async getHasher(code2) {
    const table = typeof code2 === "string" ? this._hashersByName : this._hashersByCode;
    if (table[code2]) {
      return table[code2];
    }
    const hasher = await this._loadHasher(code2);
    if (table[code2] == null) {
      this.addHasher(hasher);
    }
    return hasher;
  }
  listHashers() {
    return Object.values(this._hashersByName);
  }
}
function notFoundError(err) {
  err = err || new Error("Not Found");
  return errCode$1(err, "ERR_NOT_FOUND");
}
class MemoryBlockstore extends BaseBlockstore {
  constructor() {
    super();
    this.data = {};
  }
  open() {
    return Promise.resolve();
  }
  close() {
    return Promise.resolve();
  }
  async put(key, val) {
    this.data[base32$4.encode(key.multihash.bytes)] = val;
  }
  async get(key) {
    const exists = await this.has(key);
    if (!exists)
      throw notFoundError();
    return this.data[base32$4.encode(key.multihash.bytes)];
  }
  async has(key) {
    return this.data[base32$4.encode(key.multihash.bytes)] !== void 0;
  }
  async delete(key) {
    delete this.data[base32$4.encode(key.multihash.bytes)];
  }
  async *_all() {
    yield* Object.entries(this.data).map(([key, value]) => ({ key: CID$3.createV1(code$5, decode$j(base32$4.decode(key))), value }));
  }
  async *_allKeys() {
    yield* Object.entries(this.data).map(([key]) => CID$3.createV1(code$5, decode$j(base32$4.decode(key))));
  }
}
var encode_1 = encode$7;
var MSB = 128, REST = 127, MSBALL = ~REST, INT = Math.pow(2, 31);
function encode$7(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT) {
    out[offset++] = num & 255 | MSB;
    num /= 128;
  }
  while (num & MSBALL) {
    out[offset++] = num & 255 | MSB;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode$7.bytes = offset - oldOffset + 1;
  return out;
}
var decode$7 = read;
var MSB$1 = 128, REST$1 = 127;
function read(buf, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b2, l2 = buf.length;
  do {
    if (counter >= l2) {
      read.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b2 = buf[counter++];
    res += shift < 28 ? (b2 & REST$1) << shift : (b2 & REST$1) * Math.pow(2, shift);
    shift += 7;
  } while (b2 >= MSB$1);
  read.bytes = counter - offset;
  return res;
}
var N1 = Math.pow(2, 7);
var N2 = Math.pow(2, 14);
var N3 = Math.pow(2, 21);
var N4 = Math.pow(2, 28);
var N5 = Math.pow(2, 35);
var N6 = Math.pow(2, 42);
var N7 = Math.pow(2, 49);
var N8 = Math.pow(2, 56);
var N9 = Math.pow(2, 63);
var length = function(value) {
  return value < N1 ? 1 : value < N2 ? 2 : value < N3 ? 3 : value < N4 ? 4 : value < N5 ? 5 : value < N6 ? 6 : value < N7 ? 7 : value < N8 ? 8 : value < N9 ? 9 : 10;
};
var varint = {
  encode: encode_1,
  decode: decode$7,
  encodingLength: length
};
var _brrp_varint = varint;
const decode$6 = (data, offset = 0) => {
  const code2 = _brrp_varint.decode(data, offset);
  return [
    code2,
    _brrp_varint.decode.bytes
  ];
};
const encodeTo = (int, target, offset = 0) => {
  _brrp_varint.encode(int, target, offset);
  return target;
};
const encodingLength = (int) => {
  return _brrp_varint.encodingLength(int);
};
const empty = new Uint8Array(0);
const toHex = (d2) => d2.reduce((hex, byte) => hex + byte.toString(16).padStart(2, "0"), "");
const fromHex = (hex) => {
  const hexes = hex.match(/../g);
  return hexes ? new Uint8Array(hexes.map((b2) => parseInt(b2, 16))) : empty;
};
const equals$1 = (aa, bb) => {
  if (aa === bb)
    return true;
  if (aa.byteLength !== bb.byteLength) {
    return false;
  }
  for (let ii = 0; ii < aa.byteLength; ii++) {
    if (aa[ii] !== bb[ii]) {
      return false;
    }
  }
  return true;
};
const coerce = (o) => {
  if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
    return o;
  if (o instanceof ArrayBuffer)
    return new Uint8Array(o);
  if (ArrayBuffer.isView(o)) {
    return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
};
const isBinary$1 = (o) => o instanceof ArrayBuffer || ArrayBuffer.isView(o);
const fromString = (str) => new TextEncoder().encode(str);
const toString = (b2) => new TextDecoder().decode(b2);
const byteslib = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  equals: equals$1,
  coerce,
  isBinary: isBinary$1,
  fromHex,
  toHex,
  fromString,
  toString,
  empty
}, Symbol.toStringTag, { value: "Module" }));
const create$1 = (code2, digest2) => {
  const size = digest2.byteLength;
  const sizeOffset = encodingLength(code2);
  const digestOffset = sizeOffset + encodingLength(size);
  const bytes = new Uint8Array(digestOffset + size);
  encodeTo(code2, bytes, 0);
  encodeTo(size, bytes, sizeOffset);
  bytes.set(digest2, digestOffset);
  return new Digest(code2, size, digest2, bytes);
};
const decode$5 = (multihash) => {
  const bytes = coerce(multihash);
  const [code2, sizeOffset] = decode$6(bytes);
  const [size, digestOffset] = decode$6(bytes.subarray(sizeOffset));
  const digest2 = bytes.subarray(sizeOffset + digestOffset);
  if (digest2.byteLength !== size) {
    throw new Error("Incorrect length");
  }
  return new Digest(code2, size, digest2, bytes);
};
const equals = (a2, b2) => {
  if (a2 === b2) {
    return true;
  } else {
    return a2.code === b2.code && a2.size === b2.size && equals$1(a2.bytes, b2.bytes);
  }
};
class Digest {
  constructor(code2, size, digest2, bytes) {
    this.code = code2;
    this.size = size;
    this.digest = digest2;
    this.bytes = bytes;
  }
}
function base(ALPHABET, name2) {
  if (ALPHABET.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (var i = 0; i < ALPHABET.length; i++) {
    var x2 = ALPHABET.charAt(i);
    var xc2 = x2.charCodeAt(0);
    if (BASE_MAP[xc2] !== 255) {
      throw new TypeError(x2 + " is ambiguous");
    }
    BASE_MAP[xc2] = i;
  }
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode2(source) {
    if (source instanceof Uint8Array)
      ;
    else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length2 = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size);
    while (pbegin !== pend) {
      var carry = source[pbegin];
      var i2 = 0;
      for (var it1 = size - 1; (carry !== 0 || i2 < length2) && it1 !== -1; it1--, i2++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i2;
      pbegin++;
    }
    var it2 = size - length2;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) {
      str += ALPHABET.charAt(b58[it2]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length2 = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size = (source.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size);
    while (source[psz]) {
      var carry = BASE_MAP[source.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i2 = 0;
      for (var it3 = size - 1; (carry !== 0 || i2 < length2) && it3 !== -1; it3--, i2++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i2;
      psz++;
    }
    if (source[psz] === " ") {
      return;
    }
    var it4 = size - length2;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size - it4));
    var j2 = zeroes;
    while (it4 !== size) {
      vch[j2++] = b256[it4++];
    }
    return vch;
  }
  function decode2(string) {
    var buffer = decodeUnsafe(string);
    if (buffer) {
      return buffer;
    }
    throw new Error(`Non-${name2} character`);
  }
  return {
    encode: encode2,
    decodeUnsafe,
    decode: decode2
  };
}
var src = base;
var _brrp__multiformats_scope_baseX = src;
class Encoder {
  constructor(name2, prefix, baseEncode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
  }
  encode(bytes) {
    if (bytes instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes)}`;
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
}
class Decoder {
  constructor(name2, prefix, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    if (prefix.codePointAt(0) === void 0) {
      throw new Error("Invalid prefix character");
    }
    this.prefixCodePoint = prefix.codePointAt(0);
    this.baseDecode = baseDecode;
  }
  decode(text) {
    if (typeof text === "string") {
      if (text.codePointAt(0) !== this.prefixCodePoint) {
        throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      }
      return this.baseDecode(text.slice(this.prefix.length));
    } else {
      throw Error("Can only multibase decode strings");
    }
  }
  or(decoder) {
    return or(this, decoder);
  }
}
class ComposedDecoder {
  constructor(decoders) {
    this.decoders = decoders;
  }
  or(decoder) {
    return or(this, decoder);
  }
  decode(input) {
    const prefix = input[0];
    const decoder = this.decoders[prefix];
    if (decoder) {
      return decoder.decode(input);
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }
}
const or = (left, right) => new ComposedDecoder({
  ...left.decoders || { [left.prefix]: left },
  ...right.decoders || { [right.prefix]: right }
});
class Codec {
  constructor(name2, prefix, baseEncode, baseDecode) {
    this.name = name2;
    this.prefix = prefix;
    this.baseEncode = baseEncode;
    this.baseDecode = baseDecode;
    this.encoder = new Encoder(name2, prefix, baseEncode);
    this.decoder = new Decoder(name2, prefix, baseDecode);
  }
  encode(input) {
    return this.encoder.encode(input);
  }
  decode(input) {
    return this.decoder.decode(input);
  }
}
const from$1 = ({ name: name2, prefix, encode: encode2, decode: decode2 }) => new Codec(name2, prefix, encode2, decode2);
const baseX = ({ prefix, name: name2, alphabet: alphabet2 }) => {
  const { encode: encode2, decode: decode2 } = _brrp__multiformats_scope_baseX(alphabet2, name2);
  return from$1({
    prefix,
    name: name2,
    encode: encode2,
    decode: (text) => coerce(decode2(text))
  });
};
const decode$4 = (string, alphabet2, bitsPerChar, name2) => {
  const codes = {};
  for (let i = 0; i < alphabet2.length; ++i) {
    codes[alphabet2[i]] = i;
  }
  let end = string.length;
  while (string[end - 1] === "=") {
    --end;
  }
  const out = new Uint8Array(end * bitsPerChar / 8 | 0);
  let bits = 0;
  let buffer = 0;
  let written = 0;
  for (let i = 0; i < end; ++i) {
    const value = codes[string[i]];
    if (value === void 0) {
      throw new SyntaxError(`Non-${name2} character`);
    }
    buffer = buffer << bitsPerChar | value;
    bits += bitsPerChar;
    if (bits >= 8) {
      bits -= 8;
      out[written++] = 255 & buffer >> bits;
    }
  }
  if (bits >= bitsPerChar || 255 & buffer << 8 - bits) {
    throw new SyntaxError("Unexpected end of data");
  }
  return out;
};
const encode$6 = (data, alphabet2, bitsPerChar) => {
  const pad = alphabet2[alphabet2.length - 1] === "=";
  const mask = (1 << bitsPerChar) - 1;
  let out = "";
  let bits = 0;
  let buffer = 0;
  for (let i = 0; i < data.length; ++i) {
    buffer = buffer << 8 | data[i];
    bits += 8;
    while (bits > bitsPerChar) {
      bits -= bitsPerChar;
      out += alphabet2[mask & buffer >> bits];
    }
  }
  if (bits) {
    out += alphabet2[mask & buffer << bitsPerChar - bits];
  }
  if (pad) {
    while (out.length * bitsPerChar & 7) {
      out += "=";
    }
  }
  return out;
};
const rfc4648 = ({ name: name2, prefix, bitsPerChar, alphabet: alphabet2 }) => {
  return from$1({
    prefix,
    name: name2,
    encode(input) {
      return encode$6(input, alphabet2, bitsPerChar);
    },
    decode(input) {
      return decode$4(input, alphabet2, bitsPerChar, name2);
    }
  });
};
const base58btc = baseX({
  name: "base58btc",
  prefix: "z",
  alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
});
const base58flickr = baseX({
  name: "base58flickr",
  prefix: "Z",
  alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});
const base58 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base58btc,
  base58flickr
}, Symbol.toStringTag, { value: "Module" }));
const base32 = rfc4648({
  prefix: "b",
  name: "base32",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567",
  bitsPerChar: 5
});
const base32upper = rfc4648({
  prefix: "B",
  name: "base32upper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  bitsPerChar: 5
});
const base32pad = rfc4648({
  prefix: "c",
  name: "base32pad",
  alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
  bitsPerChar: 5
});
const base32padupper = rfc4648({
  prefix: "C",
  name: "base32padupper",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
  bitsPerChar: 5
});
const base32hex = rfc4648({
  prefix: "v",
  name: "base32hex",
  alphabet: "0123456789abcdefghijklmnopqrstuv",
  bitsPerChar: 5
});
const base32hexupper = rfc4648({
  prefix: "V",
  name: "base32hexupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  bitsPerChar: 5
});
const base32hexpad = rfc4648({
  prefix: "t",
  name: "base32hexpad",
  alphabet: "0123456789abcdefghijklmnopqrstuv=",
  bitsPerChar: 5
});
const base32hexpadupper = rfc4648({
  prefix: "T",
  name: "base32hexpadupper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
  bitsPerChar: 5
});
const base32z = rfc4648({
  prefix: "h",
  name: "base32z",
  alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
  bitsPerChar: 5
});
const base32$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base32,
  base32upper,
  base32pad,
  base32padupper,
  base32hex,
  base32hexupper,
  base32hexpad,
  base32hexpadupper,
  base32z
}, Symbol.toStringTag, { value: "Module" }));
class CID {
  constructor(version2, code2, multihash, bytes) {
    this.code = code2;
    this.version = version2;
    this.multihash = multihash;
    this.bytes = bytes;
    this.byteOffset = bytes.byteOffset;
    this.byteLength = bytes.byteLength;
    this.asCID = this;
    this._baseCache = /* @__PURE__ */ new Map();
    Object.defineProperties(this, {
      byteOffset: hidden,
      byteLength: hidden,
      code: readonly$1,
      version: readonly$1,
      multihash: readonly$1,
      bytes: readonly$1,
      _baseCache: hidden,
      asCID: hidden
    });
  }
  toV0() {
    switch (this.version) {
      case 0: {
        return this;
      }
      default: {
        const { code: code2, multihash } = this;
        if (code2 !== DAG_PB_CODE) {
          throw new Error("Cannot convert a non dag-pb CID to CIDv0");
        }
        if (multihash.code !== SHA_256_CODE) {
          throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
        }
        return CID.createV0(multihash);
      }
    }
  }
  toV1() {
    switch (this.version) {
      case 0: {
        const { code: code2, digest: digest2 } = this.multihash;
        const multihash = create$1(code2, digest2);
        return CID.createV1(this.code, multihash);
      }
      case 1: {
        return this;
      }
      default: {
        throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
      }
    }
  }
  equals(other) {
    return other && this.code === other.code && this.version === other.version && equals(this.multihash, other.multihash);
  }
  toString(base3) {
    const { bytes, version: version2, _baseCache } = this;
    switch (version2) {
      case 0:
        return toStringV0(bytes, _baseCache, base3 || base58btc.encoder);
      default:
        return toStringV1(bytes, _baseCache, base3 || base32.encoder);
    }
  }
  toJSON() {
    return {
      code: this.code,
      version: this.version,
      hash: this.multihash.bytes
    };
  }
  get [Symbol.toStringTag]() {
    return "CID";
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return "CID(" + this.toString() + ")";
  }
  static isCID(value) {
    deprecate(/^0\.0/, IS_CID_DEPRECATION);
    return !!(value && (value[cidSymbol] || value.asCID === value));
  }
  get toBaseEncodedString() {
    throw new Error("Deprecated, use .toString()");
  }
  get codec() {
    throw new Error('"codec" property is deprecated, use integer "code" property instead');
  }
  get buffer() {
    throw new Error("Deprecated .buffer property, use .bytes to get Uint8Array instead");
  }
  get multibaseName() {
    throw new Error('"multibaseName" property is deprecated');
  }
  get prefix() {
    throw new Error('"prefix" property is deprecated');
  }
  static asCID(value) {
    if (value instanceof CID) {
      return value;
    } else if (value != null && value.asCID === value) {
      const { version: version2, code: code2, multihash, bytes } = value;
      return new CID(version2, code2, multihash, bytes || encodeCID(version2, code2, multihash.bytes));
    } else if (value != null && value[cidSymbol] === true) {
      const { version: version2, multihash, code: code2 } = value;
      const digest2 = decode$5(multihash);
      return CID.create(version2, code2, digest2);
    } else {
      return null;
    }
  }
  static create(version2, code2, digest2) {
    if (typeof code2 !== "number") {
      throw new Error("String codecs are no longer supported");
    }
    switch (version2) {
      case 0: {
        if (code2 !== DAG_PB_CODE) {
          throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE}) block encoding`);
        } else {
          return new CID(version2, code2, digest2, digest2.bytes);
        }
      }
      case 1: {
        const bytes = encodeCID(version2, code2, digest2.bytes);
        return new CID(version2, code2, digest2, bytes);
      }
      default: {
        throw new Error("Invalid version");
      }
    }
  }
  static createV0(digest2) {
    return CID.create(0, DAG_PB_CODE, digest2);
  }
  static createV1(code2, digest2) {
    return CID.create(1, code2, digest2);
  }
  static decode(bytes) {
    const [cid, remainder] = CID.decodeFirst(bytes);
    if (remainder.length) {
      throw new Error("Incorrect length");
    }
    return cid;
  }
  static decodeFirst(bytes) {
    const specs = CID.inspectBytes(bytes);
    const prefixSize = specs.size - specs.multihashSize;
    const multihashBytes = coerce(bytes.subarray(prefixSize, prefixSize + specs.multihashSize));
    if (multihashBytes.byteLength !== specs.multihashSize) {
      throw new Error("Incorrect length");
    }
    const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
    const digest2 = new Digest(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
    const cid = specs.version === 0 ? CID.createV0(digest2) : CID.createV1(specs.codec, digest2);
    return [
      cid,
      bytes.subarray(specs.size)
    ];
  }
  static inspectBytes(initialBytes) {
    let offset = 0;
    const next = () => {
      const [i, length2] = decode$6(initialBytes.subarray(offset));
      offset += length2;
      return i;
    };
    let version2 = next();
    let codec = DAG_PB_CODE;
    if (version2 === 18) {
      version2 = 0;
      offset = 0;
    } else if (version2 === 1) {
      codec = next();
    }
    if (version2 !== 0 && version2 !== 1) {
      throw new RangeError(`Invalid CID version ${version2}`);
    }
    const prefixSize = offset;
    const multihashCode = next();
    const digestSize = next();
    const size = offset + digestSize;
    const multihashSize = size - prefixSize;
    return {
      version: version2,
      codec,
      multihashCode,
      digestSize,
      multihashSize,
      size
    };
  }
  static parse(source, base3) {
    const [prefix, bytes] = parseCIDtoBytes(source, base3);
    const cid = CID.decode(bytes);
    cid._baseCache.set(prefix, source);
    return cid;
  }
}
const parseCIDtoBytes = (source, base3) => {
  switch (source[0]) {
    case "Q": {
      const decoder = base3 || base58btc;
      return [
        base58btc.prefix,
        decoder.decode(`${base58btc.prefix}${source}`)
      ];
    }
    case base58btc.prefix: {
      const decoder = base3 || base58btc;
      return [
        base58btc.prefix,
        decoder.decode(source)
      ];
    }
    case base32.prefix: {
      const decoder = base3 || base32;
      return [
        base32.prefix,
        decoder.decode(source)
      ];
    }
    default: {
      if (base3 == null) {
        throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
      }
      return [
        source[0],
        base3.decode(source)
      ];
    }
  }
};
const toStringV0 = (bytes, cache, base3) => {
  const { prefix } = base3;
  if (prefix !== base58btc.prefix) {
    throw Error(`Cannot string encode V0 in ${base3.name} encoding`);
  }
  const cid = cache.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes).slice(1);
    cache.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
const toStringV1 = (bytes, cache, base3) => {
  const { prefix } = base3;
  const cid = cache.get(prefix);
  if (cid == null) {
    const cid2 = base3.encode(bytes);
    cache.set(prefix, cid2);
    return cid2;
  } else {
    return cid;
  }
};
const DAG_PB_CODE = 112;
const SHA_256_CODE = 18;
const encodeCID = (version2, code2, multihash) => {
  const codeOffset = encodingLength(version2);
  const hashOffset = codeOffset + encodingLength(code2);
  const bytes = new Uint8Array(hashOffset + multihash.byteLength);
  encodeTo(version2, bytes, 0);
  encodeTo(code2, bytes, codeOffset);
  bytes.set(multihash, hashOffset);
  return bytes;
};
const cidSymbol = Symbol.for("@ipld/js-cid/CID");
const readonly$1 = {
  writable: false,
  configurable: false,
  enumerable: true
};
const hidden = {
  writable: false,
  enumerable: false,
  configurable: false
};
const version = "0.0.0-dev";
const deprecate = (range, message) => {
  if (range.test(version)) {
    console.warn(message);
  } else {
    throw new Error(message);
  }
};
const IS_CID_DEPRECATION = `CID.isCID(v) is deprecated and will be removed in the next major release.
Following code pattern:

if (CID.isCID(value)) {
  doSomethingWithCID(value)
}

Is replaced with:

const cid = CID.asCID(value)
if (cid) {
  // Make sure to use cid instead of value
  doSomethingWithCID(cid)
}
`;
const from = ({ name: name2, code: code2, encode: encode2 }) => new Hasher(name2, code2, encode2);
class Hasher {
  constructor(name2, code2, encode2) {
    this.name = name2;
    this.code = code2;
    this.encode = encode2;
  }
  digest(input) {
    if (input instanceof Uint8Array) {
      const result = this.encode(input);
      return result instanceof Uint8Array ? create$1(this.code, result) : result.then((digest2) => create$1(this.code, digest2));
    } else {
      throw Error("Unknown type, must be binary type");
    }
  }
}
const name$2 = "raw";
const code$2 = 85;
const encode$5 = (node) => coerce(node);
const decode$3 = (data) => coerce(data);
const raw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  name: name$2,
  code: code$2,
  encode: encode$5,
  decode: decode$3
}, Symbol.toStringTag, { value: "Module" }));
const sha = (name2) => async (data) => new Uint8Array(await crypto.subtle.digest(name2, data));
const sha256 = from({
  name: "sha2-256",
  code: 18,
  encode: sha("SHA-256")
});
const sha512 = from({
  name: "sha2-512",
  code: 19,
  encode: sha("SHA-512")
});
const sha2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  sha256,
  sha512
}, Symbol.toStringTag, { value: "Module" }));
const readonly = ({ enumerable = true, configurable = false } = {}) => ({
  enumerable,
  configurable,
  writable: false
});
const links = function* (source, base3) {
  if (source == null)
    return;
  if (source instanceof Uint8Array)
    return;
  for (const [key, value] of Object.entries(source)) {
    const path = [
      ...base3,
      key
    ];
    if (value != null && typeof value === "object") {
      if (Array.isArray(value)) {
        for (const [index, element] of value.entries()) {
          const elementPath = [
            ...path,
            index
          ];
          const cid = CID.asCID(element);
          if (cid) {
            yield [
              elementPath.join("/"),
              cid
            ];
          } else if (typeof element === "object") {
            yield* links(element, elementPath);
          }
        }
      } else {
        const cid = CID.asCID(value);
        if (cid) {
          yield [
            path.join("/"),
            cid
          ];
        } else {
          yield* links(value, path);
        }
      }
    }
  }
};
const tree = function* (source, base3) {
  if (source == null)
    return;
  for (const [key, value] of Object.entries(source)) {
    const path = [
      ...base3,
      key
    ];
    yield path.join("/");
    if (value != null && !(value instanceof Uint8Array) && typeof value === "object" && !CID.asCID(value)) {
      if (Array.isArray(value)) {
        for (const [index, element] of value.entries()) {
          const elementPath = [
            ...path,
            index
          ];
          yield elementPath.join("/");
          if (typeof element === "object" && !CID.asCID(element)) {
            yield* tree(element, elementPath);
          }
        }
      } else {
        yield* tree(value, path);
      }
    }
  }
};
const get = (source, path) => {
  let node = source;
  for (const [index, key] of path.entries()) {
    node = node[key];
    if (node == null) {
      throw new Error(`Object has no property at ${path.slice(0, index + 1).map((part) => `[${JSON.stringify(part)}]`).join("")}`);
    }
    const cid = CID.asCID(node);
    if (cid) {
      return {
        value: cid,
        remaining: path.slice(index + 1).join("/")
      };
    }
  }
  return { value: node };
};
class Block {
  constructor({ cid, bytes, value }) {
    if (!cid || !bytes || typeof value === "undefined")
      throw new Error("Missing required argument");
    this.cid = cid;
    this.bytes = bytes;
    this.value = value;
    this.asBlock = this;
    Object.defineProperties(this, {
      cid: readonly(),
      bytes: readonly(),
      value: readonly(),
      asBlock: readonly()
    });
  }
  links() {
    return links(this.value, []);
  }
  tree() {
    return tree(this.value, []);
  }
  get(path = "/") {
    return get(this.value, path.split("/").filter(Boolean));
  }
}
const encode$4 = async ({ value, codec, hasher }) => {
  if (typeof value === "undefined")
    throw new Error('Missing required argument "value"');
  if (!codec || !hasher)
    throw new Error("Missing required argument: codec or hasher");
  const bytes = codec.encode(value);
  const hash = await hasher.digest(bytes);
  const cid = CID.create(1, codec.code, hash);
  return new Block({
    value,
    bytes,
    cid
  });
};
const createUnsafe = ({
  bytes,
  cid,
  value: maybeValue,
  codec
}) => {
  const value = maybeValue !== void 0 ? maybeValue : codec && codec.decode(bytes);
  if (value === void 0)
    throw new Error('Missing required argument, must either provide "value" or "codec"');
  return new Block({
    cid,
    bytes,
    value
  });
};
const create = async ({ bytes, cid, hasher, codec }) => {
  if (!bytes)
    throw new Error('Missing required argument "bytes"');
  if (!hasher)
    throw new Error('Missing required argument "hasher"');
  const value = codec.decode(bytes);
  const hash = await hasher.digest(bytes);
  if (!equals$1(cid.multihash.bytes, hash.bytes)) {
    throw new Error("CID hash does not match bytes");
  }
  return createUnsafe({
    bytes,
    cid,
    value,
    codec
  });
};
const { isBinary } = byteslib;
const encode$3 = (value) => {
  if (isBinary(value)) {
    return encode$4({ value, hasher: sha256, codec: raw });
  }
  return encode$4({ value, hasher: sha256, codec: dagCBOR });
};
const decode$2 = ({ bytes, cid }) => {
  let hasher, codec;
  const { code: code2 } = cid;
  const hashcode = cid.multihash.code || decode$5(cid.multihash).code;
  if (hashcode === 18) {
    hasher = sha256;
  } else {
    throw new Error("Unsupported hash function: " + hashcode);
  }
  if (code2 === 113) {
    codec = dagCBOR;
  } else if (code2 === 85) {
    codec = raw;
  } else {
    throw new Error("Unsupported codec: " + code2);
  }
  return create({ bytes, cid, codec, hasher });
};
class Transaction {
  constructor() {
    Object.assign(this, mitt());
    this.blocks = [];
  }
  static create() {
    return new this();
  }
  static async load(buffer) {
    const reader = await CarReader.fromBytes(buffer);
    const [root] = await reader.getRoots();
    const get2 = (cid) => reader.get(cid).then((block) => decode$2(block)).then(({ value }) => value);
    return { root, get: get2 };
  }
  async add(obj) {
    const block = await encode$3(obj);
    this.last = block;
    this.blocks.push(block);
    this.emit("size", this.size);
    return block.cid;
  }
  async get(block) {
    const { cid, bytes, value } = await decode$2(block);
    return { cid, bytes, value };
  }
  undo() {
    return this.blocks.pop();
  }
  async commit() {
    const cid = this.last.cid;
    let size = 0;
    let headerSize = headerLength({ roots: [cid] });
    size += headerSize;
    for (const block of this.blocks) {
      size += blockLength(block);
    }
    const buffer = new Uint8Array(size);
    const writer = await createWriter(buffer, { headerSize });
    writer.addRoot(cid);
    for (const block of this.blocks) {
      writer.write(block);
    }
    await writer.close();
    return writer.bytes;
  }
  get size() {
    if (!(this == null ? void 0 : this.last))
      return 0;
    const cid = this.last.cid;
    let size = 0;
    let headerSize = headerLength({ roots: [cid] });
    size += headerSize;
    for (const block of this.blocks) {
      size += blockLength(block);
    }
    return size;
  }
}
var Tc = Object.create;
var nr = Object.defineProperty;
var Ic = Object.getOwnPropertyDescriptor;
var Sc = Object.getOwnPropertyNames;
var Uc = Object.getPrototypeOf, Fc = Object.prototype.hasOwnProperty;
var F = (t, e) => () => (t && (e = t(t = 0)), e);
var S = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports), M = (t, e) => {
  for (var r in e)
    nr(t, r, { get: e[r], enumerable: true });
}, No = (t, e, r, n) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let o of Sc(e))
      !Fc.call(t, o) && o !== r && nr(t, o, { get: () => e[o], enumerable: !(n = Ic(e, o)) || n.enumerable });
  return t;
};
var J = (t, e, r) => (r = t != null ? Tc(Uc(t)) : {}, No(e || !t || !t.__esModule ? nr(r, "default", { value: t, enumerable: true }) : r, t)), R = (t) => No(nr({}, "__esModule", { value: true }), t);
var Po = S((or2) => {
  a();
  or2.byteLength = kc;
  or2.toByteArray = Nc;
  or2.fromByteArray = Pc;
  var De = [], ue = [], vc = typeof Uint8Array < "u" ? Uint8Array : Array, Xr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (Ge = 0, $o = Xr.length; Ge < $o; ++Ge)
    De[Ge] = Xr[Ge], ue[Xr.charCodeAt(Ge)] = Ge;
  var Ge, $o;
  ue["-".charCodeAt(0)] = 62;
  ue["_".charCodeAt(0)] = 63;
  function Lo(t) {
    var e = t.length;
    if (e % 4 > 0)
      throw new Error("Invalid string. Length must be a multiple of 4");
    var r = t.indexOf("=");
    r === -1 && (r = e);
    var n = r === e ? 0 : 4 - r % 4;
    return [r, n];
  }
  function kc(t) {
    var e = Lo(t), r = e[0], n = e[1];
    return (r + n) * 3 / 4 - n;
  }
  function _c(t, e, r) {
    return (e + r) * 3 / 4 - r;
  }
  function Nc(t) {
    var e, r = Lo(t), n = r[0], o = r[1], i = new vc(_c(t, n, o)), s = 0, u = o > 0 ? n - 4 : n, h;
    for (h = 0; h < u; h += 4)
      e = ue[t.charCodeAt(h)] << 18 | ue[t.charCodeAt(h + 1)] << 12 | ue[t.charCodeAt(h + 2)] << 6 | ue[t.charCodeAt(h + 3)], i[s++] = e >> 16 & 255, i[s++] = e >> 8 & 255, i[s++] = e & 255;
    return o === 2 && (e = ue[t.charCodeAt(h)] << 2 | ue[t.charCodeAt(h + 1)] >> 4, i[s++] = e & 255), o === 1 && (e = ue[t.charCodeAt(h)] << 10 | ue[t.charCodeAt(h + 1)] << 4 | ue[t.charCodeAt(h + 2)] >> 2, i[s++] = e >> 8 & 255, i[s++] = e & 255), i;
  }
  function $c(t) {
    return De[t >> 18 & 63] + De[t >> 12 & 63] + De[t >> 6 & 63] + De[t & 63];
  }
  function Lc(t, e, r) {
    for (var n, o = [], i = e; i < r; i += 3)
      n = (t[i] << 16 & 16711680) + (t[i + 1] << 8 & 65280) + (t[i + 2] & 255), o.push($c(n));
    return o.join("");
  }
  function Pc(t) {
    for (var e, r = t.length, n = r % 3, o = [], i = 16383, s = 0, u = r - n; s < u; s += i)
      o.push(Lc(t, s, s + i > u ? u : s + i));
    return n === 1 ? (e = t[r - 1], o.push(De[e >> 2] + De[e << 4 & 63] + "==")) : n === 2 && (e = (t[r - 2] << 8) + t[r - 1], o.push(De[e >> 10] + De[e >> 4 & 63] + De[e << 2 & 63] + "=")), o.join("");
  }
});
var Ro = S((Yr) => {
  a();
  Yr.read = function(t, e, r, n, o) {
    var i, s, u = o * 8 - n - 1, h = (1 << u) - 1, w = h >> 1, c = -7, g = r ? o - 1 : 0, B = r ? -1 : 1, k = t[e + g];
    for (g += B, i = k & (1 << -c) - 1, k >>= -c, c += u; c > 0; i = i * 256 + t[e + g], g += B, c -= 8)
      ;
    for (s = i & (1 << -c) - 1, i >>= -c, c += n; c > 0; s = s * 256 + t[e + g], g += B, c -= 8)
      ;
    if (i === 0)
      i = 1 - w;
    else {
      if (i === h)
        return s ? NaN : (k ? -1 : 1) * (1 / 0);
      s = s + Math.pow(2, n), i = i - w;
    }
    return (k ? -1 : 1) * s * Math.pow(2, i - n);
  };
  Yr.write = function(t, e, r, n, o, i) {
    var s, u, h, w = i * 8 - o - 1, c = (1 << w) - 1, g = c >> 1, B = o === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, k = n ? 0 : i - 1, I = n ? 1 : -1, v = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
    for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (u = isNaN(e) ? 1 : 0, s = c) : (s = Math.floor(Math.log(e) / Math.LN2), e * (h = Math.pow(2, -s)) < 1 && (s--, h *= 2), s + g >= 1 ? e += B / h : e += B * Math.pow(2, 1 - g), e * h >= 2 && (s++, h /= 2), s + g >= c ? (u = 0, s = c) : s + g >= 1 ? (u = (e * h - 1) * Math.pow(2, o), s = s + g) : (u = e * Math.pow(2, g - 1) * Math.pow(2, o), s = 0)); o >= 8; t[r + k] = u & 255, k += I, u /= 256, o -= 8)
      ;
    for (s = s << o | u, w += o; w > 0; t[r + k] = s & 255, k += I, s /= 256, w -= 8)
      ;
    t[r + k - I] |= v * 128;
  };
});
var ti = S((st) => {
  a();
  var Qr = Po(), ot = Ro(), Mo = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  st.Buffer = f;
  st.SlowBuffer = Hc;
  st.INSPECT_MAX_BYTES = 50;
  var ir = 2147483647;
  st.kMaxLength = ir;
  f.TYPED_ARRAY_SUPPORT = Rc();
  !f.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
  function Rc() {
    try {
      let t = new Uint8Array(1), e = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(e, Uint8Array.prototype), Object.setPrototypeOf(t, e), t.foo() === 42;
    } catch {
      return false;
    }
  }
  Object.defineProperty(f.prototype, "parent", { enumerable: true, get: function() {
    if (!!f.isBuffer(this))
      return this.buffer;
  } });
  Object.defineProperty(f.prototype, "offset", { enumerable: true, get: function() {
    if (!!f.isBuffer(this))
      return this.byteOffset;
  } });
  function Ae(t) {
    if (t > ir)
      throw new RangeError('The value "' + t + '" is invalid for option "size"');
    let e = new Uint8Array(t);
    return Object.setPrototypeOf(e, f.prototype), e;
  }
  function f(t, e, r) {
    if (typeof t == "number") {
      if (typeof e == "string")
        throw new TypeError('The "string" argument must be of type string. Received type number');
      return tn(t);
    }
    return Ho(t, e, r);
  }
  f.poolSize = 8192;
  function Ho(t, e, r) {
    if (typeof t == "string")
      return Oc(t, e);
    if (ArrayBuffer.isView(t))
      return zc(t);
    if (t == null)
      throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t);
    if (be(t, ArrayBuffer) || t && be(t.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (be(t, SharedArrayBuffer) || t && be(t.buffer, SharedArrayBuffer)))
      return Kr(t, e, r);
    if (typeof t == "number")
      throw new TypeError('The "value" argument must not be of type number. Received type number');
    let n = t.valueOf && t.valueOf();
    if (n != null && n !== t)
      return f.from(n, e, r);
    let o = qc(t);
    if (o)
      return o;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof t[Symbol.toPrimitive] == "function")
      return f.from(t[Symbol.toPrimitive]("string"), e, r);
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t);
  }
  f.from = function(t, e, r) {
    return Ho(t, e, r);
  };
  Object.setPrototypeOf(f.prototype, Uint8Array.prototype);
  Object.setPrototypeOf(f, Uint8Array);
  function jo(t) {
    if (typeof t != "number")
      throw new TypeError('"size" argument must be of type number');
    if (t < 0)
      throw new RangeError('The value "' + t + '" is invalid for option "size"');
  }
  function Mc(t, e, r) {
    return jo(t), t <= 0 ? Ae(t) : e !== void 0 ? typeof r == "string" ? Ae(t).fill(e, r) : Ae(t).fill(e) : Ae(t);
  }
  f.alloc = function(t, e, r) {
    return Mc(t, e, r);
  };
  function tn(t) {
    return jo(t), Ae(t < 0 ? 0 : rn(t) | 0);
  }
  f.allocUnsafe = function(t) {
    return tn(t);
  };
  f.allocUnsafeSlow = function(t) {
    return tn(t);
  };
  function Oc(t, e) {
    if ((typeof e != "string" || e === "") && (e = "utf8"), !f.isEncoding(e))
      throw new TypeError("Unknown encoding: " + e);
    let r = Vo(t, e) | 0, n = Ae(r), o = n.write(t, e);
    return o !== r && (n = n.slice(0, o)), n;
  }
  function Zr(t) {
    let e = t.length < 0 ? 0 : rn(t.length) | 0, r = Ae(e);
    for (let n = 0; n < e; n += 1)
      r[n] = t[n] & 255;
    return r;
  }
  function zc(t) {
    if (be(t, Uint8Array)) {
      let e = new Uint8Array(t);
      return Kr(e.buffer, e.byteOffset, e.byteLength);
    }
    return Zr(t);
  }
  function Kr(t, e, r) {
    if (e < 0 || t.byteLength < e)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (t.byteLength < e + (r || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    let n;
    return e === void 0 && r === void 0 ? n = new Uint8Array(t) : r === void 0 ? n = new Uint8Array(t, e) : n = new Uint8Array(t, e, r), Object.setPrototypeOf(n, f.prototype), n;
  }
  function qc(t) {
    if (f.isBuffer(t)) {
      let e = rn(t.length) | 0, r = Ae(e);
      return r.length === 0 || t.copy(r, 0, 0, e), r;
    }
    if (t.length !== void 0)
      return typeof t.length != "number" || on(t.length) ? Ae(0) : Zr(t);
    if (t.type === "Buffer" && Array.isArray(t.data))
      return Zr(t.data);
  }
  function rn(t) {
    if (t >= ir)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + ir.toString(16) + " bytes");
    return t | 0;
  }
  function Hc(t) {
    return +t != t && (t = 0), f.alloc(+t);
  }
  f.isBuffer = function(e) {
    return e != null && e._isBuffer === true && e !== f.prototype;
  };
  f.compare = function(e, r) {
    if (be(e, Uint8Array) && (e = f.from(e, e.offset, e.byteLength)), be(r, Uint8Array) && (r = f.from(r, r.offset, r.byteLength)), !f.isBuffer(e) || !f.isBuffer(r))
      throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    if (e === r)
      return 0;
    let n = e.length, o = r.length;
    for (let i = 0, s = Math.min(n, o); i < s; ++i)
      if (e[i] !== r[i]) {
        n = e[i], o = r[i];
        break;
      }
    return n < o ? -1 : o < n ? 1 : 0;
  };
  f.isEncoding = function(e) {
    switch (String(e).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return true;
      default:
        return false;
    }
  };
  f.concat = function(e, r) {
    if (!Array.isArray(e))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (e.length === 0)
      return f.alloc(0);
    let n;
    if (r === void 0)
      for (r = 0, n = 0; n < e.length; ++n)
        r += e[n].length;
    let o = f.allocUnsafe(r), i = 0;
    for (n = 0; n < e.length; ++n) {
      let s = e[n];
      if (be(s, Uint8Array))
        i + s.length > o.length ? (f.isBuffer(s) || (s = f.from(s)), s.copy(o, i)) : Uint8Array.prototype.set.call(o, s, i);
      else if (f.isBuffer(s))
        s.copy(o, i);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      i += s.length;
    }
    return o;
  };
  function Vo(t, e) {
    if (f.isBuffer(t))
      return t.length;
    if (ArrayBuffer.isView(t) || be(t, ArrayBuffer))
      return t.byteLength;
    if (typeof t != "string")
      throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof t);
    let r = t.length, n = arguments.length > 2 && arguments[2] === true;
    if (!n && r === 0)
      return 0;
    let o = false;
    for (; ; )
      switch (e) {
        case "ascii":
        case "latin1":
        case "binary":
          return r;
        case "utf8":
        case "utf-8":
          return en(t).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return r * 2;
        case "hex":
          return r >>> 1;
        case "base64":
          return ei(t).length;
        default:
          if (o)
            return n ? -1 : en(t).length;
          e = ("" + e).toLowerCase(), o = true;
      }
  }
  f.byteLength = Vo;
  function jc(t, e, r) {
    let n = false;
    if ((e === void 0 || e < 0) && (e = 0), e > this.length || ((r === void 0 || r > this.length) && (r = this.length), r <= 0) || (r >>>= 0, e >>>= 0, r <= e))
      return "";
    for (t || (t = "utf8"); ; )
      switch (t) {
        case "hex":
          return ef(this, e, r);
        case "utf8":
        case "utf-8":
          return Wo(this, e, r);
        case "ascii":
          return Zc(this, e, r);
        case "latin1":
        case "binary":
          return Kc(this, e, r);
        case "base64":
          return Yc(this, e, r);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return tf(this, e, r);
        default:
          if (n)
            throw new TypeError("Unknown encoding: " + t);
          t = (t + "").toLowerCase(), n = true;
      }
  }
  f.prototype._isBuffer = true;
  function We(t, e, r) {
    let n = t[e];
    t[e] = t[r], t[r] = n;
  }
  f.prototype.swap16 = function() {
    let e = this.length;
    if (e % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let r = 0; r < e; r += 2)
      We(this, r, r + 1);
    return this;
  };
  f.prototype.swap32 = function() {
    let e = this.length;
    if (e % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let r = 0; r < e; r += 4)
      We(this, r, r + 3), We(this, r + 1, r + 2);
    return this;
  };
  f.prototype.swap64 = function() {
    let e = this.length;
    if (e % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (let r = 0; r < e; r += 8)
      We(this, r, r + 7), We(this, r + 1, r + 6), We(this, r + 2, r + 5), We(this, r + 3, r + 4);
    return this;
  };
  f.prototype.toString = function() {
    let e = this.length;
    return e === 0 ? "" : arguments.length === 0 ? Wo(this, 0, e) : jc.apply(this, arguments);
  };
  f.prototype.toLocaleString = f.prototype.toString;
  f.prototype.equals = function(e) {
    if (!f.isBuffer(e))
      throw new TypeError("Argument must be a Buffer");
    return this === e ? true : f.compare(this, e) === 0;
  };
  f.prototype.inspect = function() {
    let e = "", r = st.INSPECT_MAX_BYTES;
    return e = this.toString("hex", 0, r).replace(/(.{2})/g, "$1 ").trim(), this.length > r && (e += " ... "), "<Buffer " + e + ">";
  };
  Mo && (f.prototype[Mo] = f.prototype.inspect);
  f.prototype.compare = function(e, r, n, o, i) {
    if (be(e, Uint8Array) && (e = f.from(e, e.offset, e.byteLength)), !f.isBuffer(e))
      throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e);
    if (r === void 0 && (r = 0), n === void 0 && (n = e ? e.length : 0), o === void 0 && (o = 0), i === void 0 && (i = this.length), r < 0 || n > e.length || o < 0 || i > this.length)
      throw new RangeError("out of range index");
    if (o >= i && r >= n)
      return 0;
    if (o >= i)
      return -1;
    if (r >= n)
      return 1;
    if (r >>>= 0, n >>>= 0, o >>>= 0, i >>>= 0, this === e)
      return 0;
    let s = i - o, u = n - r, h = Math.min(s, u), w = this.slice(o, i), c = e.slice(r, n);
    for (let g = 0; g < h; ++g)
      if (w[g] !== c[g]) {
        s = w[g], u = c[g];
        break;
      }
    return s < u ? -1 : u < s ? 1 : 0;
  };
  function Go(t, e, r, n, o) {
    if (t.length === 0)
      return -1;
    if (typeof r == "string" ? (n = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), r = +r, on(r) && (r = o ? 0 : t.length - 1), r < 0 && (r = t.length + r), r >= t.length) {
      if (o)
        return -1;
      r = t.length - 1;
    } else if (r < 0)
      if (o)
        r = 0;
      else
        return -1;
    if (typeof e == "string" && (e = f.from(e, n)), f.isBuffer(e))
      return e.length === 0 ? -1 : Oo(t, e, r, n, o);
    if (typeof e == "number")
      return e = e & 255, typeof Uint8Array.prototype.indexOf == "function" ? o ? Uint8Array.prototype.indexOf.call(t, e, r) : Uint8Array.prototype.lastIndexOf.call(t, e, r) : Oo(t, [e], r, n, o);
    throw new TypeError("val must be string, number or Buffer");
  }
  function Oo(t, e, r, n, o) {
    let i = 1, s = t.length, u = e.length;
    if (n !== void 0 && (n = String(n).toLowerCase(), n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")) {
      if (t.length < 2 || e.length < 2)
        return -1;
      i = 2, s /= 2, u /= 2, r /= 2;
    }
    function h(c, g) {
      return i === 1 ? c[g] : c.readUInt16BE(g * i);
    }
    let w;
    if (o) {
      let c = -1;
      for (w = r; w < s; w++)
        if (h(t, w) === h(e, c === -1 ? 0 : w - c)) {
          if (c === -1 && (c = w), w - c + 1 === u)
            return c * i;
        } else
          c !== -1 && (w -= w - c), c = -1;
    } else
      for (r + u > s && (r = s - u), w = r; w >= 0; w--) {
        let c = true;
        for (let g = 0; g < u; g++)
          if (h(t, w + g) !== h(e, g)) {
            c = false;
            break;
          }
        if (c)
          return w;
      }
    return -1;
  }
  f.prototype.includes = function(e, r, n) {
    return this.indexOf(e, r, n) !== -1;
  };
  f.prototype.indexOf = function(e, r, n) {
    return Go(this, e, r, n, true);
  };
  f.prototype.lastIndexOf = function(e, r, n) {
    return Go(this, e, r, n, false);
  };
  function Vc(t, e, r, n) {
    r = Number(r) || 0;
    let o = t.length - r;
    n ? (n = Number(n), n > o && (n = o)) : n = o;
    let i = e.length;
    n > i / 2 && (n = i / 2);
    let s;
    for (s = 0; s < n; ++s) {
      let u = parseInt(e.substr(s * 2, 2), 16);
      if (on(u))
        return s;
      t[r + s] = u;
    }
    return s;
  }
  function Gc(t, e, r, n) {
    return sr(en(e, t.length - r), t, r, n);
  }
  function Wc(t, e, r, n) {
    return sr(sf(e), t, r, n);
  }
  function Jc(t, e, r, n) {
    return sr(ei(e), t, r, n);
  }
  function Xc(t, e, r, n) {
    return sr(af(e, t.length - r), t, r, n);
  }
  f.prototype.write = function(e, r, n, o) {
    if (r === void 0)
      o = "utf8", n = this.length, r = 0;
    else if (n === void 0 && typeof r == "string")
      o = r, n = this.length, r = 0;
    else if (isFinite(r))
      r = r >>> 0, isFinite(n) ? (n = n >>> 0, o === void 0 && (o = "utf8")) : (o = n, n = void 0);
    else
      throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    let i = this.length - r;
    if ((n === void 0 || n > i) && (n = i), e.length > 0 && (n < 0 || r < 0) || r > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    o || (o = "utf8");
    let s = false;
    for (; ; )
      switch (o) {
        case "hex":
          return Vc(this, e, r, n);
        case "utf8":
        case "utf-8":
          return Gc(this, e, r, n);
        case "ascii":
        case "latin1":
        case "binary":
          return Wc(this, e, r, n);
        case "base64":
          return Jc(this, e, r, n);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Xc(this, e, r, n);
        default:
          if (s)
            throw new TypeError("Unknown encoding: " + o);
          o = ("" + o).toLowerCase(), s = true;
      }
  };
  f.prototype.toJSON = function() {
    return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
  };
  function Yc(t, e, r) {
    return e === 0 && r === t.length ? Qr.fromByteArray(t) : Qr.fromByteArray(t.slice(e, r));
  }
  function Wo(t, e, r) {
    r = Math.min(t.length, r);
    let n = [], o = e;
    for (; o < r; ) {
      let i = t[o], s = null, u = i > 239 ? 4 : i > 223 ? 3 : i > 191 ? 2 : 1;
      if (o + u <= r) {
        let h, w, c, g;
        switch (u) {
          case 1:
            i < 128 && (s = i);
            break;
          case 2:
            h = t[o + 1], (h & 192) === 128 && (g = (i & 31) << 6 | h & 63, g > 127 && (s = g));
            break;
          case 3:
            h = t[o + 1], w = t[o + 2], (h & 192) === 128 && (w & 192) === 128 && (g = (i & 15) << 12 | (h & 63) << 6 | w & 63, g > 2047 && (g < 55296 || g > 57343) && (s = g));
            break;
          case 4:
            h = t[o + 1], w = t[o + 2], c = t[o + 3], (h & 192) === 128 && (w & 192) === 128 && (c & 192) === 128 && (g = (i & 15) << 18 | (h & 63) << 12 | (w & 63) << 6 | c & 63, g > 65535 && g < 1114112 && (s = g));
        }
      }
      s === null ? (s = 65533, u = 1) : s > 65535 && (s -= 65536, n.push(s >>> 10 & 1023 | 55296), s = 56320 | s & 1023), n.push(s), o += u;
    }
    return Qc(n);
  }
  var zo = 4096;
  function Qc(t) {
    let e = t.length;
    if (e <= zo)
      return String.fromCharCode.apply(String, t);
    let r = "", n = 0;
    for (; n < e; )
      r += String.fromCharCode.apply(String, t.slice(n, n += zo));
    return r;
  }
  function Zc(t, e, r) {
    let n = "";
    r = Math.min(t.length, r);
    for (let o = e; o < r; ++o)
      n += String.fromCharCode(t[o] & 127);
    return n;
  }
  function Kc(t, e, r) {
    let n = "";
    r = Math.min(t.length, r);
    for (let o = e; o < r; ++o)
      n += String.fromCharCode(t[o]);
    return n;
  }
  function ef(t, e, r) {
    let n = t.length;
    (!e || e < 0) && (e = 0), (!r || r < 0 || r > n) && (r = n);
    let o = "";
    for (let i = e; i < r; ++i)
      o += uf[t[i]];
    return o;
  }
  function tf(t, e, r) {
    let n = t.slice(e, r), o = "";
    for (let i = 0; i < n.length - 1; i += 2)
      o += String.fromCharCode(n[i] + n[i + 1] * 256);
    return o;
  }
  f.prototype.slice = function(e, r) {
    let n = this.length;
    e = ~~e, r = r === void 0 ? n : ~~r, e < 0 ? (e += n, e < 0 && (e = 0)) : e > n && (e = n), r < 0 ? (r += n, r < 0 && (r = 0)) : r > n && (r = n), r < e && (r = e);
    let o = this.subarray(e, r);
    return Object.setPrototypeOf(o, f.prototype), o;
  };
  function O(t, e, r) {
    if (t % 1 !== 0 || t < 0)
      throw new RangeError("offset is not uint");
    if (t + e > r)
      throw new RangeError("Trying to access beyond buffer length");
  }
  f.prototype.readUintLE = f.prototype.readUIntLE = function(e, r, n) {
    e = e >>> 0, r = r >>> 0, n || O(e, r, this.length);
    let o = this[e], i = 1, s = 0;
    for (; ++s < r && (i *= 256); )
      o += this[e + s] * i;
    return o;
  };
  f.prototype.readUintBE = f.prototype.readUIntBE = function(e, r, n) {
    e = e >>> 0, r = r >>> 0, n || O(e, r, this.length);
    let o = this[e + --r], i = 1;
    for (; r > 0 && (i *= 256); )
      o += this[e + --r] * i;
    return o;
  };
  f.prototype.readUint8 = f.prototype.readUInt8 = function(e, r) {
    return e = e >>> 0, r || O(e, 1, this.length), this[e];
  };
  f.prototype.readUint16LE = f.prototype.readUInt16LE = function(e, r) {
    return e = e >>> 0, r || O(e, 2, this.length), this[e] | this[e + 1] << 8;
  };
  f.prototype.readUint16BE = f.prototype.readUInt16BE = function(e, r) {
    return e = e >>> 0, r || O(e, 2, this.length), this[e] << 8 | this[e + 1];
  };
  f.prototype.readUint32LE = f.prototype.readUInt32LE = function(e, r) {
    return e = e >>> 0, r || O(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + this[e + 3] * 16777216;
  };
  f.prototype.readUint32BE = f.prototype.readUInt32BE = function(e, r) {
    return e = e >>> 0, r || O(e, 4, this.length), this[e] * 16777216 + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
  };
  f.prototype.readBigUInt64LE = _e(function(e) {
    e = e >>> 0, it(e, "offset");
    let r = this[e], n = this[e + 7];
    (r === void 0 || n === void 0) && $t(e, this.length - 8);
    let o = r + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24, i = this[++e] + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + n * 2 ** 24;
    return BigInt(o) + (BigInt(i) << BigInt(32));
  });
  f.prototype.readBigUInt64BE = _e(function(e) {
    e = e >>> 0, it(e, "offset");
    let r = this[e], n = this[e + 7];
    (r === void 0 || n === void 0) && $t(e, this.length - 8);
    let o = r * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e], i = this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + n;
    return (BigInt(o) << BigInt(32)) + BigInt(i);
  });
  f.prototype.readIntLE = function(e, r, n) {
    e = e >>> 0, r = r >>> 0, n || O(e, r, this.length);
    let o = this[e], i = 1, s = 0;
    for (; ++s < r && (i *= 256); )
      o += this[e + s] * i;
    return i *= 128, o >= i && (o -= Math.pow(2, 8 * r)), o;
  };
  f.prototype.readIntBE = function(e, r, n) {
    e = e >>> 0, r = r >>> 0, n || O(e, r, this.length);
    let o = r, i = 1, s = this[e + --o];
    for (; o > 0 && (i *= 256); )
      s += this[e + --o] * i;
    return i *= 128, s >= i && (s -= Math.pow(2, 8 * r)), s;
  };
  f.prototype.readInt8 = function(e, r) {
    return e = e >>> 0, r || O(e, 1, this.length), this[e] & 128 ? (255 - this[e] + 1) * -1 : this[e];
  };
  f.prototype.readInt16LE = function(e, r) {
    e = e >>> 0, r || O(e, 2, this.length);
    let n = this[e] | this[e + 1] << 8;
    return n & 32768 ? n | 4294901760 : n;
  };
  f.prototype.readInt16BE = function(e, r) {
    e = e >>> 0, r || O(e, 2, this.length);
    let n = this[e + 1] | this[e] << 8;
    return n & 32768 ? n | 4294901760 : n;
  };
  f.prototype.readInt32LE = function(e, r) {
    return e = e >>> 0, r || O(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
  };
  f.prototype.readInt32BE = function(e, r) {
    return e = e >>> 0, r || O(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
  };
  f.prototype.readBigInt64LE = _e(function(e) {
    e = e >>> 0, it(e, "offset");
    let r = this[e], n = this[e + 7];
    (r === void 0 || n === void 0) && $t(e, this.length - 8);
    let o = this[e + 4] + this[e + 5] * 2 ** 8 + this[e + 6] * 2 ** 16 + (n << 24);
    return (BigInt(o) << BigInt(32)) + BigInt(r + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24);
  });
  f.prototype.readBigInt64BE = _e(function(e) {
    e = e >>> 0, it(e, "offset");
    let r = this[e], n = this[e + 7];
    (r === void 0 || n === void 0) && $t(e, this.length - 8);
    let o = (r << 24) + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e];
    return (BigInt(o) << BigInt(32)) + BigInt(this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + n);
  });
  f.prototype.readFloatLE = function(e, r) {
    return e = e >>> 0, r || O(e, 4, this.length), ot.read(this, e, true, 23, 4);
  };
  f.prototype.readFloatBE = function(e, r) {
    return e = e >>> 0, r || O(e, 4, this.length), ot.read(this, e, false, 23, 4);
  };
  f.prototype.readDoubleLE = function(e, r) {
    return e = e >>> 0, r || O(e, 8, this.length), ot.read(this, e, true, 52, 8);
  };
  f.prototype.readDoubleBE = function(e, r) {
    return e = e >>> 0, r || O(e, 8, this.length), ot.read(this, e, false, 52, 8);
  };
  function X(t, e, r, n, o, i) {
    if (!f.isBuffer(t))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (e > o || e < i)
      throw new RangeError('"value" argument is out of bounds');
    if (r + n > t.length)
      throw new RangeError("Index out of range");
  }
  f.prototype.writeUintLE = f.prototype.writeUIntLE = function(e, r, n, o) {
    if (e = +e, r = r >>> 0, n = n >>> 0, !o) {
      let u = Math.pow(2, 8 * n) - 1;
      X(this, e, r, n, u, 0);
    }
    let i = 1, s = 0;
    for (this[r] = e & 255; ++s < n && (i *= 256); )
      this[r + s] = e / i & 255;
    return r + n;
  };
  f.prototype.writeUintBE = f.prototype.writeUIntBE = function(e, r, n, o) {
    if (e = +e, r = r >>> 0, n = n >>> 0, !o) {
      let u = Math.pow(2, 8 * n) - 1;
      X(this, e, r, n, u, 0);
    }
    let i = n - 1, s = 1;
    for (this[r + i] = e & 255; --i >= 0 && (s *= 256); )
      this[r + i] = e / s & 255;
    return r + n;
  };
  f.prototype.writeUint8 = f.prototype.writeUInt8 = function(e, r, n) {
    return e = +e, r = r >>> 0, n || X(this, e, r, 1, 255, 0), this[r] = e & 255, r + 1;
  };
  f.prototype.writeUint16LE = f.prototype.writeUInt16LE = function(e, r, n) {
    return e = +e, r = r >>> 0, n || X(this, e, r, 2, 65535, 0), this[r] = e & 255, this[r + 1] = e >>> 8, r + 2;
  };
  f.prototype.writeUint16BE = f.prototype.writeUInt16BE = function(e, r, n) {
    return e = +e, r = r >>> 0, n || X(this, e, r, 2, 65535, 0), this[r] = e >>> 8, this[r + 1] = e & 255, r + 2;
  };
  f.prototype.writeUint32LE = f.prototype.writeUInt32LE = function(e, r, n) {
    return e = +e, r = r >>> 0, n || X(this, e, r, 4, 4294967295, 0), this[r + 3] = e >>> 24, this[r + 2] = e >>> 16, this[r + 1] = e >>> 8, this[r] = e & 255, r + 4;
  };
  f.prototype.writeUint32BE = f.prototype.writeUInt32BE = function(e, r, n) {
    return e = +e, r = r >>> 0, n || X(this, e, r, 4, 4294967295, 0), this[r] = e >>> 24, this[r + 1] = e >>> 16, this[r + 2] = e >>> 8, this[r + 3] = e & 255, r + 4;
  };
  function Jo(t, e, r, n, o) {
    Ko(e, n, o, t, r, 7);
    let i = Number(e & BigInt(4294967295));
    t[r++] = i, i = i >> 8, t[r++] = i, i = i >> 8, t[r++] = i, i = i >> 8, t[r++] = i;
    let s = Number(e >> BigInt(32) & BigInt(4294967295));
    return t[r++] = s, s = s >> 8, t[r++] = s, s = s >> 8, t[r++] = s, s = s >> 8, t[r++] = s, r;
  }
  function Xo(t, e, r, n, o) {
    Ko(e, n, o, t, r, 7);
    let i = Number(e & BigInt(4294967295));
    t[r + 7] = i, i = i >> 8, t[r + 6] = i, i = i >> 8, t[r + 5] = i, i = i >> 8, t[r + 4] = i;
    let s = Number(e >> BigInt(32) & BigInt(4294967295));
    return t[r + 3] = s, s = s >> 8, t[r + 2] = s, s = s >> 8, t[r + 1] = s, s = s >> 8, t[r] = s, r + 8;
  }
  f.prototype.writeBigUInt64LE = _e(function(e, r = 0) {
    return Jo(this, e, r, BigInt(0), BigInt("0xffffffffffffffff"));
  });
  f.prototype.writeBigUInt64BE = _e(function(e, r = 0) {
    return Xo(this, e, r, BigInt(0), BigInt("0xffffffffffffffff"));
  });
  f.prototype.writeIntLE = function(e, r, n, o) {
    if (e = +e, r = r >>> 0, !o) {
      let h = Math.pow(2, 8 * n - 1);
      X(this, e, r, n, h - 1, -h);
    }
    let i = 0, s = 1, u = 0;
    for (this[r] = e & 255; ++i < n && (s *= 256); )
      e < 0 && u === 0 && this[r + i - 1] !== 0 && (u = 1), this[r + i] = (e / s >> 0) - u & 255;
    return r + n;
  };
  f.prototype.writeIntBE = function(e, r, n, o) {
    if (e = +e, r = r >>> 0, !o) {
      let h = Math.pow(2, 8 * n - 1);
      X(this, e, r, n, h - 1, -h);
    }
    let i = n - 1, s = 1, u = 0;
    for (this[r + i] = e & 255; --i >= 0 && (s *= 256); )
      e < 0 && u === 0 && this[r + i + 1] !== 0 && (u = 1), this[r + i] = (e / s >> 0) - u & 255;
    return r + n;
  };
  f.prototype.writeInt8 = function(e, r, n) {
    return e = +e, r = r >>> 0, n || X(this, e, r, 1, 127, -128), e < 0 && (e = 255 + e + 1), this[r] = e & 255, r + 1;
  };
  f.prototype.writeInt16LE = function(e, r, n) {
    return e = +e, r = r >>> 0, n || X(this, e, r, 2, 32767, -32768), this[r] = e & 255, this[r + 1] = e >>> 8, r + 2;
  };
  f.prototype.writeInt16BE = function(e, r, n) {
    return e = +e, r = r >>> 0, n || X(this, e, r, 2, 32767, -32768), this[r] = e >>> 8, this[r + 1] = e & 255, r + 2;
  };
  f.prototype.writeInt32LE = function(e, r, n) {
    return e = +e, r = r >>> 0, n || X(this, e, r, 4, 2147483647, -2147483648), this[r] = e & 255, this[r + 1] = e >>> 8, this[r + 2] = e >>> 16, this[r + 3] = e >>> 24, r + 4;
  };
  f.prototype.writeInt32BE = function(e, r, n) {
    return e = +e, r = r >>> 0, n || X(this, e, r, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), this[r] = e >>> 24, this[r + 1] = e >>> 16, this[r + 2] = e >>> 8, this[r + 3] = e & 255, r + 4;
  };
  f.prototype.writeBigInt64LE = _e(function(e, r = 0) {
    return Jo(this, e, r, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  f.prototype.writeBigInt64BE = _e(function(e, r = 0) {
    return Xo(this, e, r, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  function Yo(t, e, r, n, o, i) {
    if (r + n > t.length)
      throw new RangeError("Index out of range");
    if (r < 0)
      throw new RangeError("Index out of range");
  }
  function Qo(t, e, r, n, o) {
    return e = +e, r = r >>> 0, o || Yo(t, e, r, 4), ot.write(t, e, r, n, 23, 4), r + 4;
  }
  f.prototype.writeFloatLE = function(e, r, n) {
    return Qo(this, e, r, true, n);
  };
  f.prototype.writeFloatBE = function(e, r, n) {
    return Qo(this, e, r, false, n);
  };
  function Zo(t, e, r, n, o) {
    return e = +e, r = r >>> 0, o || Yo(t, e, r, 8), ot.write(t, e, r, n, 52, 8), r + 8;
  }
  f.prototype.writeDoubleLE = function(e, r, n) {
    return Zo(this, e, r, true, n);
  };
  f.prototype.writeDoubleBE = function(e, r, n) {
    return Zo(this, e, r, false, n);
  };
  f.prototype.copy = function(e, r, n, o) {
    if (!f.isBuffer(e))
      throw new TypeError("argument should be a Buffer");
    if (n || (n = 0), !o && o !== 0 && (o = this.length), r >= e.length && (r = e.length), r || (r = 0), o > 0 && o < n && (o = n), o === n || e.length === 0 || this.length === 0)
      return 0;
    if (r < 0)
      throw new RangeError("targetStart out of bounds");
    if (n < 0 || n >= this.length)
      throw new RangeError("Index out of range");
    if (o < 0)
      throw new RangeError("sourceEnd out of bounds");
    o > this.length && (o = this.length), e.length - r < o - n && (o = e.length - r + n);
    let i = o - n;
    return this === e && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(r, n, o) : Uint8Array.prototype.set.call(e, this.subarray(n, o), r), i;
  };
  f.prototype.fill = function(e, r, n, o) {
    if (typeof e == "string") {
      if (typeof r == "string" ? (o = r, r = 0, n = this.length) : typeof n == "string" && (o = n, n = this.length), o !== void 0 && typeof o != "string")
        throw new TypeError("encoding must be a string");
      if (typeof o == "string" && !f.isEncoding(o))
        throw new TypeError("Unknown encoding: " + o);
      if (e.length === 1) {
        let s = e.charCodeAt(0);
        (o === "utf8" && s < 128 || o === "latin1") && (e = s);
      }
    } else
      typeof e == "number" ? e = e & 255 : typeof e == "boolean" && (e = Number(e));
    if (r < 0 || this.length < r || this.length < n)
      throw new RangeError("Out of range index");
    if (n <= r)
      return this;
    r = r >>> 0, n = n === void 0 ? this.length : n >>> 0, e || (e = 0);
    let i;
    if (typeof e == "number")
      for (i = r; i < n; ++i)
        this[i] = e;
    else {
      let s = f.isBuffer(e) ? e : f.from(e, o), u = s.length;
      if (u === 0)
        throw new TypeError('The value "' + e + '" is invalid for argument "value"');
      for (i = 0; i < n - r; ++i)
        this[i + r] = s[i % u];
    }
    return this;
  };
  var nt = {};
  function nn(t, e, r) {
    nt[t] = class extends r {
      constructor() {
        super(), Object.defineProperty(this, "message", { value: e.apply(this, arguments), writable: true, configurable: true }), this.name = `${this.name} [${t}]`, this.stack, delete this.name;
      }
      get code() {
        return t;
      }
      set code(o) {
        Object.defineProperty(this, "code", { configurable: true, enumerable: true, value: o, writable: true });
      }
      toString() {
        return `${this.name} [${t}]: ${this.message}`;
      }
    };
  }
  nn("ERR_BUFFER_OUT_OF_BOUNDS", function(t) {
    return t ? `${t} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
  }, RangeError);
  nn("ERR_INVALID_ARG_TYPE", function(t, e) {
    return `The "${t}" argument must be of type number. Received type ${typeof e}`;
  }, TypeError);
  nn("ERR_OUT_OF_RANGE", function(t, e, r) {
    let n = `The value of "${t}" is out of range.`, o = r;
    return Number.isInteger(r) && Math.abs(r) > 2 ** 32 ? o = qo(String(r)) : typeof r == "bigint" && (o = String(r), (r > BigInt(2) ** BigInt(32) || r < -(BigInt(2) ** BigInt(32))) && (o = qo(o)), o += "n"), n += ` It must be ${e}. Received ${o}`, n;
  }, RangeError);
  function qo(t) {
    let e = "", r = t.length, n = t[0] === "-" ? 1 : 0;
    for (; r >= n + 4; r -= 3)
      e = `_${t.slice(r - 3, r)}${e}`;
    return `${t.slice(0, r)}${e}`;
  }
  function rf(t, e, r) {
    it(e, "offset"), (t[e] === void 0 || t[e + r] === void 0) && $t(e, t.length - (r + 1));
  }
  function Ko(t, e, r, n, o, i) {
    if (t > r || t < e) {
      let s = typeof e == "bigint" ? "n" : "", u;
      throw i > 3 ? e === 0 || e === BigInt(0) ? u = `>= 0${s} and < 2${s} ** ${(i + 1) * 8}${s}` : u = `>= -(2${s} ** ${(i + 1) * 8 - 1}${s}) and < 2 ** ${(i + 1) * 8 - 1}${s}` : u = `>= ${e}${s} and <= ${r}${s}`, new nt.ERR_OUT_OF_RANGE("value", u, t);
    }
    rf(n, o, i);
  }
  function it(t, e) {
    if (typeof t != "number")
      throw new nt.ERR_INVALID_ARG_TYPE(e, "number", t);
  }
  function $t(t, e, r) {
    throw Math.floor(t) !== t ? (it(t, r), new nt.ERR_OUT_OF_RANGE(r || "offset", "an integer", t)) : e < 0 ? new nt.ERR_BUFFER_OUT_OF_BOUNDS() : new nt.ERR_OUT_OF_RANGE(r || "offset", `>= ${r ? 1 : 0} and <= ${e}`, t);
  }
  var nf = /[^+/0-9A-Za-z-_]/g;
  function of(t) {
    if (t = t.split("=")[0], t = t.trim().replace(nf, ""), t.length < 2)
      return "";
    for (; t.length % 4 !== 0; )
      t = t + "=";
    return t;
  }
  function en(t, e) {
    e = e || 1 / 0;
    let r, n = t.length, o = null, i = [];
    for (let s = 0; s < n; ++s) {
      if (r = t.charCodeAt(s), r > 55295 && r < 57344) {
        if (!o) {
          if (r > 56319) {
            (e -= 3) > -1 && i.push(239, 191, 189);
            continue;
          } else if (s + 1 === n) {
            (e -= 3) > -1 && i.push(239, 191, 189);
            continue;
          }
          o = r;
          continue;
        }
        if (r < 56320) {
          (e -= 3) > -1 && i.push(239, 191, 189), o = r;
          continue;
        }
        r = (o - 55296 << 10 | r - 56320) + 65536;
      } else
        o && (e -= 3) > -1 && i.push(239, 191, 189);
      if (o = null, r < 128) {
        if ((e -= 1) < 0)
          break;
        i.push(r);
      } else if (r < 2048) {
        if ((e -= 2) < 0)
          break;
        i.push(r >> 6 | 192, r & 63 | 128);
      } else if (r < 65536) {
        if ((e -= 3) < 0)
          break;
        i.push(r >> 12 | 224, r >> 6 & 63 | 128, r & 63 | 128);
      } else if (r < 1114112) {
        if ((e -= 4) < 0)
          break;
        i.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, r & 63 | 128);
      } else
        throw new Error("Invalid code point");
    }
    return i;
  }
  function sf(t) {
    let e = [];
    for (let r = 0; r < t.length; ++r)
      e.push(t.charCodeAt(r) & 255);
    return e;
  }
  function af(t, e) {
    let r, n, o, i = [];
    for (let s = 0; s < t.length && !((e -= 2) < 0); ++s)
      r = t.charCodeAt(s), n = r >> 8, o = r % 256, i.push(o), i.push(n);
    return i;
  }
  function ei(t) {
    return Qr.toByteArray(of(t));
  }
  function sr(t, e, r, n) {
    let o;
    for (o = 0; o < n && !(o + r >= e.length || o >= t.length); ++o)
      e[o + r] = t[o];
    return o;
  }
  function be(t, e) {
    return t instanceof e || t != null && t.constructor != null && t.constructor.name != null && t.constructor.name === e.name;
  }
  function on(t) {
    return t !== t;
  }
  var uf = function() {
    let t = "0123456789abcdef", e = new Array(256);
    for (let r = 0; r < 16; ++r) {
      let n = r * 16;
      for (let o = 0; o < 16; ++o)
        e[n + o] = t[r] + t[o];
    }
    return e;
  }();
  function _e(t) {
    return typeof BigInt > "u" ? cf : t;
  }
  function cf() {
    throw new Error("BigInt not supported");
  }
});
var si = S((Yh, ii) => {
  a();
  var N = ii.exports = {}, Ee, xe;
  function sn() {
    throw new Error("setTimeout has not been defined");
  }
  function an() {
    throw new Error("clearTimeout has not been defined");
  }
  (function() {
    try {
      typeof setTimeout == "function" ? Ee = setTimeout : Ee = sn;
    } catch {
      Ee = sn;
    }
    try {
      typeof clearTimeout == "function" ? xe = clearTimeout : xe = an;
    } catch {
      xe = an;
    }
  })();
  function ri(t) {
    if (Ee === setTimeout)
      return setTimeout(t, 0);
    if ((Ee === sn || !Ee) && setTimeout)
      return Ee = setTimeout, setTimeout(t, 0);
    try {
      return Ee(t, 0);
    } catch {
      try {
        return Ee.call(null, t, 0);
      } catch {
        return Ee.call(this, t, 0);
      }
    }
  }
  function ff(t) {
    if (xe === clearTimeout)
      return clearTimeout(t);
    if ((xe === an || !xe) && clearTimeout)
      return xe = clearTimeout, clearTimeout(t);
    try {
      return xe(t);
    } catch {
      try {
        return xe.call(null, t);
      } catch {
        return xe.call(this, t);
      }
    }
  }
  var Te = [], at = false, Je, ar = -1;
  function lf() {
    !at || !Je || (at = false, Je.length ? Te = Je.concat(Te) : ar = -1, Te.length && ni());
  }
  function ni() {
    if (!at) {
      var t = ri(lf);
      at = true;
      for (var e = Te.length; e; ) {
        for (Je = Te, Te = []; ++ar < e; )
          Je && Je[ar].run();
        ar = -1, e = Te.length;
      }
      Je = null, at = false, ff(t);
    }
  }
  N.nextTick = function(t) {
    var e = new Array(arguments.length - 1);
    if (arguments.length > 1)
      for (var r = 1; r < arguments.length; r++)
        e[r - 1] = arguments[r];
    Te.push(new oi(t, e)), Te.length === 1 && !at && ri(ni);
  };
  function oi(t, e) {
    this.fun = t, this.array = e;
  }
  oi.prototype.run = function() {
    this.fun.apply(null, this.array);
  };
  N.title = "browser";
  N.browser = true;
  N.env = {};
  N.argv = [];
  N.version = "";
  N.versions = {};
  function Ie() {
  }
  N.on = Ie;
  N.addListener = Ie;
  N.once = Ie;
  N.off = Ie;
  N.removeListener = Ie;
  N.removeAllListeners = Ie;
  N.emit = Ie;
  N.prependListener = Ie;
  N.prependOnceListener = Ie;
  N.listeners = function(t) {
    return [];
  };
  N.binding = function(t) {
    throw new Error("process.binding is not supported");
  };
  N.cwd = function() {
    return "/";
  };
  N.chdir = function(t) {
    throw new Error("process.chdir is not supported");
  };
  N.umask = function() {
    return 0;
  };
});
var p, d, a = F(() => {
  ti().Buffer, p = si(), d = globalThis;
  globalThis && globalThis.process && globalThis.process.env && (globalThis.process.env.LIBP2P_FORCE_PNET = false);
});
function ci(t, e, r) {
  e = e || [], r = r || 0;
  for (var n = r; t >= mf; )
    e[r++] = t & 255 | ai, t /= 128;
  for (; t & pf; )
    e[r++] = t & 255 | ai, t >>>= 7;
  return e[r] = t | 0, ci.bytes = r - n + 1, e;
}
function un(t, n) {
  var r = 0, n = n || 0, o = 0, i = n, s, u = t.length;
  do {
    if (i >= u)
      throw un.bytes = 0, new RangeError("Could not decode varint");
    s = t[i++], r += o < 28 ? (s & ui) << o : (s & ui) * Math.pow(2, o), o += 7;
  } while (s >= wf);
  return un.bytes = i - n, r;
}
var df, ai, hf, pf, mf, yf, wf, ui, gf, Df, bf, Ef, xf, Cf, Bf, Af, Tf, If, Sf, Uf, Lt, fi = F(() => {
  a();
  df = ci, ai = 128, hf = 127, pf = ~hf, mf = Math.pow(2, 31);
  yf = un, wf = 128, ui = 127;
  gf = Math.pow(2, 7), Df = Math.pow(2, 14), bf = Math.pow(2, 21), Ef = Math.pow(2, 28), xf = Math.pow(2, 35), Cf = Math.pow(2, 42), Bf = Math.pow(2, 49), Af = Math.pow(2, 56), Tf = Math.pow(2, 63), If = function(t) {
    return t < gf ? 1 : t < Df ? 2 : t < bf ? 3 : t < Ef ? 4 : t < xf ? 5 : t < Cf ? 6 : t < Bf ? 7 : t < Af ? 8 : t < Tf ? 9 : 10;
  }, Sf = { encode: df, decode: yf, encodingLength: If }, Uf = Sf, Lt = Uf;
});
var Pt, ut, ct, cr = F(() => {
  a();
  fi();
  Pt = (t) => [Lt.decode(t), Lt.decode.bytes], ut = (t, e, r = 0) => (Lt.encode(t, e, r), e), ct = (t) => Lt.encodingLength(t);
});
var li, Se, di, hi, Ne = F(() => {
  a();
  li = (t, e) => {
    if (t === e)
      return true;
    if (t.byteLength !== e.byteLength)
      return false;
    for (let r = 0; r < t.byteLength; r++)
      if (t[r] !== e[r])
        return false;
    return true;
  }, Se = (t) => {
    if (t instanceof Uint8Array && t.constructor.name === "Uint8Array")
      return t;
    if (t instanceof ArrayBuffer)
      return new Uint8Array(t);
    if (ArrayBuffer.isView(t))
      return new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
    throw new Error("Unknown type, must be binary type");
  }, di = (t) => new TextEncoder().encode(t), hi = (t) => new TextDecoder().decode(t);
});
var Ue = {};
M(Ue, { Digest: () => Xe, create: () => $e, decode: () => ft, equals: () => fn });
var $e, ft, fn, Xe, Le = F(() => {
  a();
  Ne();
  cr();
  $e = (t, e) => {
    let r = e.byteLength, n = ct(t), o = n + ct(r), i = new Uint8Array(o + r);
    return ut(t, i, 0), ut(r, i, n), i.set(e, o), new Xe(t, r, e, i);
  }, ft = (t) => {
    let e = Se(t), [r, n] = Pt(e), [o, i] = Pt(e.subarray(n)), s = e.subarray(n + i);
    if (s.byteLength !== o)
      throw new Error("Incorrect length");
    return new Xe(r, o, s, e);
  }, fn = (t, e) => t === e ? true : t.code === e.code && t.size === e.size && li(t.bytes, e.bytes), Xe = class {
    constructor(e, r, n, o) {
      this.code = e, this.size = r, this.digest = n, this.bytes = o;
    }
  };
});
function Ff(t, e) {
  if (t.length >= 255)
    throw new TypeError("Alphabet too long");
  for (var r = new Uint8Array(256), n = 0; n < r.length; n++)
    r[n] = 255;
  for (var o = 0; o < t.length; o++) {
    var i = t.charAt(o), s = i.charCodeAt(0);
    if (r[s] !== 255)
      throw new TypeError(i + " is ambiguous");
    r[s] = o;
  }
  var u = t.length, h = t.charAt(0), w = Math.log(u) / Math.log(256), c = Math.log(256) / Math.log(u);
  function g(I) {
    if (I instanceof Uint8Array || (ArrayBuffer.isView(I) ? I = new Uint8Array(I.buffer, I.byteOffset, I.byteLength) : Array.isArray(I) && (I = Uint8Array.from(I))), !(I instanceof Uint8Array))
      throw new TypeError("Expected Uint8Array");
    if (I.length === 0)
      return "";
    for (var v = 0, $ = 0, P = 0, W = I.length; P !== W && I[P] === 0; )
      P++, v++;
    for (var ie = (W - P) * c + 1 >>> 0, q = new Uint8Array(ie); P !== W; ) {
      for (var he = I[P], se = 0, K = ie - 1; (he !== 0 || se < $) && K !== -1; K--, se++)
        he += 256 * q[K] >>> 0, q[K] = he % u >>> 0, he = he / u >>> 0;
      if (he !== 0)
        throw new Error("Non-zero carry");
      $ = se, P++;
    }
    for (var ae = ie - $; ae !== ie && q[ae] === 0; )
      ae++;
    for (var rt = h.repeat(v); ae < ie; ++ae)
      rt += t.charAt(q[ae]);
    return rt;
  }
  function B(I) {
    if (typeof I != "string")
      throw new TypeError("Expected String");
    if (I.length === 0)
      return new Uint8Array();
    var v = 0;
    if (I[v] !== " ") {
      for (var $ = 0, P = 0; I[v] === h; )
        $++, v++;
      for (var W = (I.length - v) * w + 1 >>> 0, ie = new Uint8Array(W); I[v]; ) {
        var q = r[I.charCodeAt(v)];
        if (q === 255)
          return;
        for (var he = 0, se = W - 1; (q !== 0 || he < P) && se !== -1; se--, he++)
          q += u * ie[se] >>> 0, ie[se] = q % 256 >>> 0, q = q / 256 >>> 0;
        if (q !== 0)
          throw new Error("Non-zero carry");
        P = he, v++;
      }
      if (I[v] !== " ") {
        for (var K = W - P; K !== W && ie[K] === 0; )
          K++;
        for (var ae = new Uint8Array($ + (W - K)), rt = $; K !== W; )
          ae[rt++] = ie[K++];
        return ae;
      }
    }
  }
  function k(I) {
    var v = B(I);
    if (v)
      return v;
    throw new Error(`Non-${e} character`);
  }
  return { encode: g, decodeUnsafe: B, decode: k };
}
var vf, kf, pi, mi = F(() => {
  a();
  vf = Ff, kf = vf, pi = kf;
});
var ln, dn, hn, yi, pn, lt, Pe, _f, Nf, _, pe = F(() => {
  a();
  mi();
  Ne();
  ln = class {
    constructor(e, r, n) {
      this.name = e, this.prefix = r, this.baseEncode = n;
    }
    encode(e) {
      if (e instanceof Uint8Array)
        return `${this.prefix}${this.baseEncode(e)}`;
      throw Error("Unknown type, must be binary type");
    }
  }, dn = class {
    constructor(e, r, n) {
      if (this.name = e, this.prefix = r, r.codePointAt(0) === void 0)
        throw new Error("Invalid prefix character");
      this.prefixCodePoint = r.codePointAt(0), this.baseDecode = n;
    }
    decode(e) {
      if (typeof e == "string") {
        if (e.codePointAt(0) !== this.prefixCodePoint)
          throw Error(`Unable to decode multibase string ${JSON.stringify(e)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
        return this.baseDecode(e.slice(this.prefix.length));
      } else
        throw Error("Can only multibase decode strings");
    }
    or(e) {
      return yi(this, e);
    }
  }, hn = class {
    constructor(e) {
      this.decoders = e;
    }
    or(e) {
      return yi(this, e);
    }
    decode(e) {
      let r = e[0], n = this.decoders[r];
      if (n)
        return n.decode(e);
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(e)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }, yi = (t, e) => new hn({ ...t.decoders || { [t.prefix]: t }, ...e.decoders || { [e.prefix]: e } }), pn = class {
    constructor(e, r, n, o) {
      this.name = e, this.prefix = r, this.baseEncode = n, this.baseDecode = o, this.encoder = new ln(e, r, n), this.decoder = new dn(e, r, o);
    }
    encode(e) {
      return this.encoder.encode(e);
    }
    decode(e) {
      return this.decoder.decode(e);
    }
  }, lt = ({ name: t, prefix: e, encode: r, decode: n }) => new pn(t, e, r, n), Pe = ({ prefix: t, name: e, alphabet: r }) => {
    let { encode: n, decode: o } = pi(r, e);
    return lt({ prefix: t, name: e, encode: n, decode: (i) => Se(o(i)) });
  }, _f = (t, e, r, n) => {
    let o = {};
    for (let c = 0; c < e.length; ++c)
      o[e[c]] = c;
    let i = t.length;
    for (; t[i - 1] === "="; )
      --i;
    let s = new Uint8Array(i * r / 8 | 0), u = 0, h = 0, w = 0;
    for (let c = 0; c < i; ++c) {
      let g = o[t[c]];
      if (g === void 0)
        throw new SyntaxError(`Non-${n} character`);
      h = h << r | g, u += r, u >= 8 && (u -= 8, s[w++] = 255 & h >> u);
    }
    if (u >= r || 255 & h << 8 - u)
      throw new SyntaxError("Unexpected end of data");
    return s;
  }, Nf = (t, e, r) => {
    let n = e[e.length - 1] === "=", o = (1 << r) - 1, i = "", s = 0, u = 0;
    for (let h = 0; h < t.length; ++h)
      for (u = u << 8 | t[h], s += 8; s > r; )
        s -= r, i += e[o & u >> s];
    if (s && (i += e[o & u << r - s]), n)
      for (; i.length * r & 7; )
        i += "=";
    return i;
  }, _ = ({ name: t, prefix: e, bitsPerChar: r, alphabet: n }) => lt({ prefix: e, name: t, encode(o) {
    return Nf(o, n, r);
  }, decode(o) {
    return _f(o, n, r, t);
  } });
});
var dt = {};
M(dt, { base58btc: () => Y, base58flickr: () => $f });
var Y, $f, Re = F(() => {
  a();
  pe();
  Y = Pe({ name: "base58btc", prefix: "z", alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz" }), $f = Pe({ name: "base58flickr", prefix: "Z", alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ" });
});
var Rt = {};
M(Rt, { base32: () => Me, base32hex: () => Mf, base32hexpad: () => zf, base32hexpadupper: () => qf, base32hexupper: () => Of, base32pad: () => Pf, base32padupper: () => Rf, base32upper: () => Lf, base32z: () => Hf });
var Me, Lf, Pf, Rf, Mf, Of, zf, qf, Hf, ht = F(() => {
  a();
  pe();
  Me = _({ prefix: "b", name: "base32", alphabet: "abcdefghijklmnopqrstuvwxyz234567", bitsPerChar: 5 }), Lf = _({ prefix: "B", name: "base32upper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", bitsPerChar: 5 }), Pf = _({ prefix: "c", name: "base32pad", alphabet: "abcdefghijklmnopqrstuvwxyz234567=", bitsPerChar: 5 }), Rf = _({ prefix: "C", name: "base32padupper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=", bitsPerChar: 5 }), Mf = _({ prefix: "v", name: "base32hex", alphabet: "0123456789abcdefghijklmnopqrstuv", bitsPerChar: 5 }), Of = _({ prefix: "V", name: "base32hexupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV", bitsPerChar: 5 }), zf = _({ prefix: "t", name: "base32hexpad", alphabet: "0123456789abcdefghijklmnopqrstuv=", bitsPerChar: 5 }), qf = _({ prefix: "T", name: "base32hexpadupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=", bitsPerChar: 5 }), Hf = _({ prefix: "h", name: "base32z", alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769", bitsPerChar: 5 });
});
var dr = {};
M(dr, { CID: () => x });
var x, jf, Vf, Gf, Mt, Wf, wi, gi, fr, lr, Jf, Xf, Yf, Q = F(() => {
  a();
  cr();
  Le();
  Re();
  ht();
  Ne();
  x = class {
    constructor(e, r, n, o) {
      this.code = r, this.version = e, this.multihash = n, this.bytes = o, this.byteOffset = o.byteOffset, this.byteLength = o.byteLength, this.asCID = this, this._baseCache = /* @__PURE__ */ new Map(), Object.defineProperties(this, { byteOffset: lr, byteLength: lr, code: fr, version: fr, multihash: fr, bytes: fr, _baseCache: lr, asCID: lr });
    }
    toV0() {
      switch (this.version) {
        case 0:
          return this;
        default: {
          let { code: e, multihash: r } = this;
          if (e !== Mt)
            throw new Error("Cannot convert a non dag-pb CID to CIDv0");
          if (r.code !== Wf)
            throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
          return x.createV0(r);
        }
      }
    }
    toV1() {
      switch (this.version) {
        case 0: {
          let { code: e, digest: r } = this.multihash, n = $e(e, r);
          return x.createV1(this.code, n);
        }
        case 1:
          return this;
        default:
          throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
      }
    }
    equals(e) {
      return e && this.code === e.code && this.version === e.version && fn(this.multihash, e.multihash);
    }
    toString(e) {
      let { bytes: r, version: n, _baseCache: o } = this;
      switch (n) {
        case 0:
          return Vf(r, o, e || Y.encoder);
        default:
          return Gf(r, o, e || Me.encoder);
      }
    }
    toJSON() {
      return { code: this.code, version: this.version, hash: this.multihash.bytes };
    }
    get [Symbol.toStringTag]() {
      return "CID";
    }
    [Symbol.for("nodejs.util.inspect.custom")]() {
      return "CID(" + this.toString() + ")";
    }
    static isCID(e) {
      return Xf(/^0\.0/, Yf), !!(e && (e[gi] || e.asCID === e));
    }
    get toBaseEncodedString() {
      throw new Error("Deprecated, use .toString()");
    }
    get codec() {
      throw new Error('"codec" property is deprecated, use integer "code" property instead');
    }
    get buffer() {
      throw new Error("Deprecated .buffer property, use .bytes to get Uint8Array instead");
    }
    get multibaseName() {
      throw new Error('"multibaseName" property is deprecated');
    }
    get prefix() {
      throw new Error('"prefix" property is deprecated');
    }
    static asCID(e) {
      if (e instanceof x)
        return e;
      if (e != null && e.asCID === e) {
        let { version: r, code: n, multihash: o, bytes: i } = e;
        return new x(r, n, o, i || wi(r, n, o.bytes));
      } else if (e != null && e[gi] === true) {
        let { version: r, multihash: n, code: o } = e, i = ft(n);
        return x.create(r, o, i);
      } else
        return null;
    }
    static create(e, r, n) {
      if (typeof r != "number")
        throw new Error("String codecs are no longer supported");
      switch (e) {
        case 0: {
          if (r !== Mt)
            throw new Error(`Version 0 CID must use dag-pb (code: ${Mt}) block encoding`);
          return new x(e, r, n, n.bytes);
        }
        case 1: {
          let o = wi(e, r, n.bytes);
          return new x(e, r, n, o);
        }
        default:
          throw new Error("Invalid version");
      }
    }
    static createV0(e) {
      return x.create(0, Mt, e);
    }
    static createV1(e, r) {
      return x.create(1, e, r);
    }
    static decode(e) {
      let [r, n] = x.decodeFirst(e);
      if (n.length)
        throw new Error("Incorrect length");
      return r;
    }
    static decodeFirst(e) {
      let r = x.inspectBytes(e), n = r.size - r.multihashSize, o = Se(e.subarray(n, n + r.multihashSize));
      if (o.byteLength !== r.multihashSize)
        throw new Error("Incorrect length");
      let i = o.subarray(r.multihashSize - r.digestSize), s = new Xe(r.multihashCode, r.digestSize, i, o);
      return [r.version === 0 ? x.createV0(s) : x.createV1(r.codec, s), e.subarray(r.size)];
    }
    static inspectBytes(e) {
      let r = 0, n = () => {
        let [g, B] = Pt(e.subarray(r));
        return r += B, g;
      }, o = n(), i = Mt;
      if (o === 18 ? (o = 0, r = 0) : o === 1 && (i = n()), o !== 0 && o !== 1)
        throw new RangeError(`Invalid CID version ${o}`);
      let s = r, u = n(), h = n(), w = r + h, c = w - s;
      return { version: o, codec: i, multihashCode: u, digestSize: h, multihashSize: c, size: w };
    }
    static parse(e, r) {
      let [n, o] = jf(e, r), i = x.decode(o);
      return i._baseCache.set(n, e), i;
    }
  }, jf = (t, e) => {
    switch (t[0]) {
      case "Q": {
        let r = e || Y;
        return [Y.prefix, r.decode(`${Y.prefix}${t}`)];
      }
      case Y.prefix: {
        let r = e || Y;
        return [Y.prefix, r.decode(t)];
      }
      case Me.prefix: {
        let r = e || Me;
        return [Me.prefix, r.decode(t)];
      }
      default: {
        if (e == null)
          throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
        return [t[0], e.decode(t)];
      }
    }
  }, Vf = (t, e, r) => {
    let { prefix: n } = r;
    if (n !== Y.prefix)
      throw Error(`Cannot string encode V0 in ${r.name} encoding`);
    let o = e.get(n);
    if (o == null) {
      let i = r.encode(t).slice(1);
      return e.set(n, i), i;
    } else
      return o;
  }, Gf = (t, e, r) => {
    let { prefix: n } = r, o = e.get(n);
    if (o == null) {
      let i = r.encode(t);
      return e.set(n, i), i;
    } else
      return o;
  }, Mt = 112, Wf = 18, wi = (t, e, r) => {
    let n = ct(t), o = n + ct(e), i = new Uint8Array(o + r.byteLength);
    return ut(t, i, 0), ut(e, i, n), i.set(r, o), i;
  }, gi = Symbol.for("@ipld/js-cid/CID"), fr = { writable: false, configurable: false, enumerable: true }, lr = { writable: false, enumerable: false, configurable: false }, Jf = "0.0.0-dev", Xf = (t, e) => {
    if (t.test(Jf))
      console.warn(e);
    else
      throw new Error(e);
  }, Yf = `CID.isCID(v) is deprecated and will be removed in the next major release.
Following code pattern:

if (CID.isCID(value)) {
  doSomethingWithCID(value)
}

Is replaced with:

const cid = CID.asCID(value)
if (cid) {
  // Make sure to use cid instead of value
  doSomethingWithCID(cid)
}
`;
});
var yn, mn, wn = F(() => {
  a();
  Le();
  yn = ({ name: t, code: e, encode: r }) => new mn(t, e, r), mn = class {
    constructor(e, r, n) {
      this.name = e, this.code = r, this.encode = n;
    }
    digest(e) {
      if (e instanceof Uint8Array) {
        let r = this.encode(e);
        return r instanceof Uint8Array ? $e(this.code, r) : r.then((n) => $e(this.code, n));
      } else
        throw Error("Unknown type, must be binary type");
    }
  };
});
var gn = F(() => {
  a();
  Q();
  cr();
  Ne();
  wn();
  Le();
});
var Ci = S((mp, xi) => {
  a();
  xi.exports = xn;
  var Ei = 128, Zf = 127, Kf = ~Zf, el = Math.pow(2, 31);
  function xn(t, e, r) {
    if (Number.MAX_SAFE_INTEGER && t > Number.MAX_SAFE_INTEGER)
      throw xn.bytes = 0, new RangeError("Could not encode varint");
    e = e || [], r = r || 0;
    for (var n = r; t >= el; )
      e[r++] = t & 255 | Ei, t /= 128;
    for (; t & Kf; )
      e[r++] = t & 255 | Ei, t >>>= 7;
    return e[r] = t | 0, xn.bytes = r - n + 1, e;
  }
});
var Ti = S((yp, Ai) => {
  a();
  Ai.exports = Cn;
  var tl = 128, Bi = 127;
  function Cn(t, n) {
    var r = 0, n = n || 0, o = 0, i = n, s, u = t.length;
    do {
      if (i >= u || o > 49)
        throw Cn.bytes = 0, new RangeError("Could not decode varint");
      s = t[i++], r += o < 28 ? (s & Bi) << o : (s & Bi) * Math.pow(2, o), o += 7;
    } while (s >= tl);
    return Cn.bytes = i - n, r;
  }
});
var Si = S((wp, Ii) => {
  a();
  var rl = Math.pow(2, 7), nl = Math.pow(2, 14), ol = Math.pow(2, 21), il = Math.pow(2, 28), sl = Math.pow(2, 35), al = Math.pow(2, 42), ul = Math.pow(2, 49), cl = Math.pow(2, 56), fl = Math.pow(2, 63);
  Ii.exports = function(t) {
    return t < rl ? 1 : t < nl ? 2 : t < ol ? 3 : t < il ? 4 : t < sl ? 5 : t < al ? 6 : t < ul ? 7 : t < cl ? 8 : t < fl ? 9 : 10;
  };
});
var pt = S((gp, Ui) => {
  a();
  Ui.exports = { encode: Ci(), decode: Ti(), encodingLength: Si() };
});
var Ws = S((vm, Gs) => {
  a();
  Gs.exports = function() {
    return Date.now();
  };
});
var Xs = S((km, Js) => {
  a();
  var Ur = Ws(), Pn = class {
    constructor(e, r, n) {
      let o = this;
      this._started = Ur(), this._rescheduled = 0, this._scheduled = r, this._args = n, this._triggered = false, this._timerWrapper = () => {
        o._rescheduled > 0 ? (o._scheduled = o._rescheduled - (Ur() - o._started), o._schedule(o._scheduled)) : (o._triggered = true, e.apply(null, o._args));
      }, this._timer = setTimeout(this._timerWrapper, r);
    }
    reschedule(e) {
      e || (e = this._scheduled);
      let r = Ur();
      r + e - (this._started + this._scheduled) < 0 ? (clearTimeout(this._timer), this._schedule(e)) : this._triggered ? this._schedule(e) : (this._started = r, this._rescheduled = e);
    }
    _schedule(e) {
      this._triggered = false, this._started = Ur(), this._rescheduled = 0, this._scheduled = e, this._timer = setTimeout(this._timerWrapper, e);
    }
    clear() {
      clearTimeout(this._timer);
    }
  };
  function ed() {
    if (typeof arguments[0] != "function")
      throw new Error("callback needed");
    if (typeof arguments[1] != "number")
      throw new Error("timeout needed");
    let t;
    if (arguments.length > 0) {
      t = new Array(arguments.length - 2);
      for (var e = 0; e < t.length; e++)
        t[e] = arguments[e + 2];
    }
    return new Pn(arguments[0], arguments[1], t);
  }
  Js.exports = ed;
});
var Zs = S((_m, Qs) => {
  a();
  var { AbortController: td } = globalThis, Ys = Xs(), Gt = class extends td {
    constructor(e) {
      super(), this._ms = e, this._timer = Ys(() => this.abort(), e), Object.setPrototypeOf(this, Gt.prototype);
    }
    abort() {
      return this._timer.clear(), super.abort();
    }
    clear() {
      this._timer.clear();
    }
    reset() {
      this._timer.clear(), this._timer = Ys(() => this.abort(), this._ms);
    }
  };
  Qs.exports = { TimeoutController: Gt };
});
var ea = S((Nm, Rn) => {
  a();
  function Ks(t) {
    let e = new globalThis.AbortController();
    function r() {
      e.abort();
      for (let n of t)
        !n || !n.removeEventListener || n.removeEventListener("abort", r);
    }
    for (let n of t)
      if (!(!n || !n.addEventListener)) {
        if (n.aborted) {
          r();
          break;
        }
        n.addEventListener("abort", r);
      }
    return e.signal;
  }
  Rn.exports = Ks;
  Rn.exports.anySignal = Ks;
});
var sa = S((Om, ia) => {
  a();
  var xt = 1e3, Ct = xt * 60, Bt = Ct * 60, Ze = Bt * 24, nd = Ze * 7, od = Ze * 365.25;
  ia.exports = function(t, e) {
    e = e || {};
    var r = typeof t;
    if (r === "string" && t.length > 0)
      return id(t);
    if (r === "number" && isFinite(t))
      return e.long ? ad(t) : sd(t);
    throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(t));
  };
  function id(t) {
    if (t = String(t), !(t.length > 100)) {
      var e = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);
      if (!!e) {
        var r = parseFloat(e[1]), n = (e[2] || "ms").toLowerCase();
        switch (n) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return r * od;
          case "weeks":
          case "week":
          case "w":
            return r * nd;
          case "days":
          case "day":
          case "d":
            return r * Ze;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return r * Bt;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return r * Ct;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return r * xt;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return r;
          default:
            return;
        }
      }
    }
  }
  function sd(t) {
    var e = Math.abs(t);
    return e >= Ze ? Math.round(t / Ze) + "d" : e >= Bt ? Math.round(t / Bt) + "h" : e >= Ct ? Math.round(t / Ct) + "m" : e >= xt ? Math.round(t / xt) + "s" : t + "ms";
  }
  function ad(t) {
    var e = Math.abs(t);
    return e >= Ze ? Fr(t, e, Ze, "day") : e >= Bt ? Fr(t, e, Bt, "hour") : e >= Ct ? Fr(t, e, Ct, "minute") : e >= xt ? Fr(t, e, xt, "second") : t + " ms";
  }
  function Fr(t, e, r, n) {
    var o = e >= r * 1.5;
    return Math.round(t / r) + " " + n + (o ? "s" : "");
  }
});
var ua = S((zm, aa) => {
  a();
  function ud(t) {
    r.debug = r, r.default = r, r.coerce = h, r.disable = i, r.enable = o, r.enabled = s, r.humanize = sa(), r.destroy = w, Object.keys(t).forEach((c) => {
      r[c] = t[c];
    }), r.names = [], r.skips = [], r.formatters = {};
    function e(c) {
      let g = 0;
      for (let B = 0; B < c.length; B++)
        g = (g << 5) - g + c.charCodeAt(B), g |= 0;
      return r.colors[Math.abs(g) % r.colors.length];
    }
    r.selectColor = e;
    function r(c) {
      let g, B = null, k, I;
      function v(...$) {
        if (!v.enabled)
          return;
        let P = v, W = Number(new Date()), ie = W - (g || W);
        P.diff = ie, P.prev = g, P.curr = W, g = W, $[0] = r.coerce($[0]), typeof $[0] != "string" && $.unshift("%O");
        let q = 0;
        $[0] = $[0].replace(/%([a-zA-Z%])/g, (se, K) => {
          if (se === "%%")
            return "%";
          q++;
          let ae = r.formatters[K];
          if (typeof ae == "function") {
            let rt = $[q];
            se = ae.call(P, rt), $.splice(q, 1), q--;
          }
          return se;
        }), r.formatArgs.call(P, $), (P.log || r.log).apply(P, $);
      }
      return v.namespace = c, v.useColors = r.useColors(), v.color = r.selectColor(c), v.extend = n, v.destroy = r.destroy, Object.defineProperty(v, "enabled", { enumerable: true, configurable: false, get: () => B !== null ? B : (k !== r.namespaces && (k = r.namespaces, I = r.enabled(c)), I), set: ($) => {
        B = $;
      } }), typeof r.init == "function" && r.init(v), v;
    }
    function n(c, g) {
      let B = r(this.namespace + (typeof g > "u" ? ":" : g) + c);
      return B.log = this.log, B;
    }
    function o(c) {
      r.save(c), r.namespaces = c, r.names = [], r.skips = [];
      let g, B = (typeof c == "string" ? c : "").split(/[\s,]+/), k = B.length;
      for (g = 0; g < k; g++)
        !B[g] || (c = B[g].replace(/\*/g, ".*?"), c[0] === "-" ? r.skips.push(new RegExp("^" + c.slice(1) + "$")) : r.names.push(new RegExp("^" + c + "$")));
    }
    function i() {
      let c = [...r.names.map(u), ...r.skips.map(u).map((g) => "-" + g)].join(",");
      return r.enable(""), c;
    }
    function s(c) {
      if (c[c.length - 1] === "*")
        return true;
      let g, B;
      for (g = 0, B = r.skips.length; g < B; g++)
        if (r.skips[g].test(c))
          return false;
      for (g = 0, B = r.names.length; g < B; g++)
        if (r.names[g].test(c))
          return true;
      return false;
    }
    function u(c) {
      return c.toString().substring(2, c.toString().length - 2).replace(/\.\*\?$/, "*");
    }
    function h(c) {
      return c instanceof Error ? c.stack || c.message : c;
    }
    function w() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return r.enable(r.load()), r;
  }
  aa.exports = ud;
});
var ca = S((oe, vr) => {
  a();
  oe.formatArgs = fd;
  oe.save = ld;
  oe.load = dd;
  oe.useColors = cd;
  oe.storage = hd();
  oe.destroy = (() => {
    let t = false;
    return () => {
      t || (t = true, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
    };
  })();
  oe.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"];
  function cd() {
    return typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs) ? true : typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/) ? false : typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function fd(t) {
    if (t[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + t[0] + (this.useColors ? "%c " : " ") + "+" + vr.exports.humanize(this.diff), !this.useColors)
      return;
    let e = "color: " + this.color;
    t.splice(1, 0, e, "color: inherit");
    let r = 0, n = 0;
    t[0].replace(/%[a-zA-Z%]/g, (o) => {
      o !== "%%" && (r++, o === "%c" && (n = r));
    }), t.splice(n, 0, e);
  }
  oe.log = console.debug || console.log || (() => {
  });
  function ld(t) {
    try {
      t ? oe.storage.setItem("debug", t) : oe.storage.removeItem("debug");
    } catch {
    }
  }
  function dd() {
    let t;
    try {
      t = oe.storage.getItem("debug");
    } catch {
    }
    return !t && typeof p < "u" && "env" in p && (t = p.env.DEBUG), t;
  }
  function hd() {
    try {
      return localStorage;
    } catch {
    }
  }
  vr.exports = ua()(oe);
  var { formatters: pd } = vr.exports;
  pd.j = function(t) {
    try {
      return JSON.stringify(t);
    } catch (e) {
      return "[UnexpectedJSONParseError]: " + e.message;
    }
  };
});
var On = {};
M(On, { base64: () => Mn, base64pad: () => md, base64url: () => yd, base64urlpad: () => wd });
var Mn, md, yd, wd, zn = F(() => {
  a();
  pe();
  Mn = _({ prefix: "m", name: "base64", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", bitsPerChar: 6 }), md = _({ prefix: "M", name: "base64pad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", bitsPerChar: 6 }), yd = _({ prefix: "u", name: "base64url", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", bitsPerChar: 6 }), wd = _({ prefix: "U", name: "base64urlpad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=", bitsPerChar: 6 });
});
var fa, qn = F(() => {
  a();
  Ne();
  fa = 85;
});
var da, Hn = F(() => {
  a();
  new TextEncoder(), new TextDecoder(), da = 512;
});
var wa = S((i0, ya) => {
  a();
  var bd = async (t) => {
    for await (let e of t)
      return e;
  };
  ya.exports = bd;
});
var Da = S((s0, ga) => {
  a();
  var Ed = async (t) => {
    let e;
    for await (let r of t)
      e = r;
    return e;
  };
  ga.exports = Ed;
});
var xa = S((a0, Ea) => {
  a();
  var ba = "[a-fA-F\\d:]", je = (t) => t && t.includeBoundaries ? `(?:(?<=\\s|^)(?=${ba})|(?<=${ba})(?=\\s|$))` : "", we = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}", L = "[a-fA-F\\d]{1,4}", _r = `
(?:
(?:${L}:){7}(?:${L}|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8
(?:${L}:){6}(?:${we}|:${L}|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4
(?:${L}:){5}(?::${we}|(?::${L}){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4
(?:${L}:){4}(?:(?::${L}){0,1}:${we}|(?::${L}){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4
(?:${L}:){3}(?:(?::${L}){0,2}:${we}|(?::${L}){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4
(?:${L}:){2}(?:(?::${L}){0,3}:${we}|(?::${L}){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4
(?:${L}:){1}(?:(?::${L}){0,4}:${we}|(?::${L}){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4
(?::(?:(?::${L}){0,5}:${we}|(?::${L}){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4
)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1
`.replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim(), xd = new RegExp(`(?:^${we}$)|(?:^${_r}$)`), Cd = new RegExp(`^${we}$`), Bd = new RegExp(`^${_r}$`), Vn = (t) => t && t.exact ? xd : new RegExp(`(?:${je(t)}${we}${je(t)})|(?:${je(t)}${_r}${je(t)})`, "g");
  Vn.v4 = (t) => t && t.exact ? Cd : new RegExp(`${je(t)}${we}${je(t)}`, "g");
  Vn.v6 = (t) => t && t.exact ? Bd : new RegExp(`${je(t)}${_r}${je(t)}`, "g");
  Ea.exports = Vn;
});
var Ba = S((u0, Ca) => {
  a();
  var Gn = xa(), At = (t) => Gn({ exact: true }).test(t);
  At.v4 = (t) => Gn.v4({ exact: true }).test(t);
  At.v6 = (t) => Gn.v6({ exact: true }).test(t);
  At.version = (t) => At(t) ? At.v4(t) ? 4 : 6 : void 0;
  Ca.exports = At;
});
var Wn = {};
M(Wn, { identity: () => Ad });
var Ad, Aa = F(() => {
  a();
  pe();
  Ne();
  Ad = lt({ prefix: "\0", name: "identity", encode: (t) => hi(t), decode: (t) => di(t) });
});
var Jn = {};
M(Jn, { base2: () => Td });
var Td, Ta = F(() => {
  a();
  pe();
  Td = _({ prefix: "0", name: "base2", alphabet: "01", bitsPerChar: 1 });
});
var Xn = {};
M(Xn, { base8: () => Id });
var Id, Ia = F(() => {
  a();
  pe();
  Id = _({ prefix: "7", name: "base8", alphabet: "01234567", bitsPerChar: 3 });
});
var Yn = {};
M(Yn, { base10: () => Sd });
var Sd, Sa = F(() => {
  a();
  pe();
  Sd = Pe({ prefix: "9", name: "base10", alphabet: "0123456789" });
});
var Qn = {};
M(Qn, { base16: () => Ud, base16upper: () => Fd });
var Ud, Fd, Ua = F(() => {
  a();
  pe();
  Ud = _({ prefix: "f", name: "base16", alphabet: "0123456789abcdef", bitsPerChar: 4 }), Fd = _({ prefix: "F", name: "base16upper", alphabet: "0123456789ABCDEF", bitsPerChar: 4 });
});
var Zn = {};
M(Zn, { base36: () => vd, base36upper: () => kd });
var vd, kd, Fa = F(() => {
  a();
  pe();
  vd = Pe({ prefix: "k", name: "base36", alphabet: "0123456789abcdefghijklmnopqrstuvwxyz" }), kd = Pe({ prefix: "K", name: "base36upper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" });
});
var Kn = {};
M(Kn, { base256emoji: () => Pd });
function $d(t) {
  return t.reduce((e, r) => (e += _d[r], e), "");
}
function Ld(t) {
  let e = [];
  for (let r of t) {
    let n = Nd[r.codePointAt(0)];
    if (n === void 0)
      throw new Error(`Non-base256emoji character: ${r}`);
    e.push(n);
  }
  return new Uint8Array(e);
}
var va, _d, Nd, Pd, ka = F(() => {
  a();
  pe();
  va = Array.from("\u{1F680}\u{1FA90}\u2604\u{1F6F0}\u{1F30C}\u{1F311}\u{1F312}\u{1F313}\u{1F314}\u{1F315}\u{1F316}\u{1F317}\u{1F318}\u{1F30D}\u{1F30F}\u{1F30E}\u{1F409}\u2600\u{1F4BB}\u{1F5A5}\u{1F4BE}\u{1F4BF}\u{1F602}\u2764\u{1F60D}\u{1F923}\u{1F60A}\u{1F64F}\u{1F495}\u{1F62D}\u{1F618}\u{1F44D}\u{1F605}\u{1F44F}\u{1F601}\u{1F525}\u{1F970}\u{1F494}\u{1F496}\u{1F499}\u{1F622}\u{1F914}\u{1F606}\u{1F644}\u{1F4AA}\u{1F609}\u263A\u{1F44C}\u{1F917}\u{1F49C}\u{1F614}\u{1F60E}\u{1F607}\u{1F339}\u{1F926}\u{1F389}\u{1F49E}\u270C\u2728\u{1F937}\u{1F631}\u{1F60C}\u{1F338}\u{1F64C}\u{1F60B}\u{1F497}\u{1F49A}\u{1F60F}\u{1F49B}\u{1F642}\u{1F493}\u{1F929}\u{1F604}\u{1F600}\u{1F5A4}\u{1F603}\u{1F4AF}\u{1F648}\u{1F447}\u{1F3B6}\u{1F612}\u{1F92D}\u2763\u{1F61C}\u{1F48B}\u{1F440}\u{1F62A}\u{1F611}\u{1F4A5}\u{1F64B}\u{1F61E}\u{1F629}\u{1F621}\u{1F92A}\u{1F44A}\u{1F973}\u{1F625}\u{1F924}\u{1F449}\u{1F483}\u{1F633}\u270B\u{1F61A}\u{1F61D}\u{1F634}\u{1F31F}\u{1F62C}\u{1F643}\u{1F340}\u{1F337}\u{1F63B}\u{1F613}\u2B50\u2705\u{1F97A}\u{1F308}\u{1F608}\u{1F918}\u{1F4A6}\u2714\u{1F623}\u{1F3C3}\u{1F490}\u2639\u{1F38A}\u{1F498}\u{1F620}\u261D\u{1F615}\u{1F33A}\u{1F382}\u{1F33B}\u{1F610}\u{1F595}\u{1F49D}\u{1F64A}\u{1F639}\u{1F5E3}\u{1F4AB}\u{1F480}\u{1F451}\u{1F3B5}\u{1F91E}\u{1F61B}\u{1F534}\u{1F624}\u{1F33C}\u{1F62B}\u26BD\u{1F919}\u2615\u{1F3C6}\u{1F92B}\u{1F448}\u{1F62E}\u{1F646}\u{1F37B}\u{1F343}\u{1F436}\u{1F481}\u{1F632}\u{1F33F}\u{1F9E1}\u{1F381}\u26A1\u{1F31E}\u{1F388}\u274C\u270A\u{1F44B}\u{1F630}\u{1F928}\u{1F636}\u{1F91D}\u{1F6B6}\u{1F4B0}\u{1F353}\u{1F4A2}\u{1F91F}\u{1F641}\u{1F6A8}\u{1F4A8}\u{1F92C}\u2708\u{1F380}\u{1F37A}\u{1F913}\u{1F619}\u{1F49F}\u{1F331}\u{1F616}\u{1F476}\u{1F974}\u25B6\u27A1\u2753\u{1F48E}\u{1F4B8}\u2B07\u{1F628}\u{1F31A}\u{1F98B}\u{1F637}\u{1F57A}\u26A0\u{1F645}\u{1F61F}\u{1F635}\u{1F44E}\u{1F932}\u{1F920}\u{1F927}\u{1F4CC}\u{1F535}\u{1F485}\u{1F9D0}\u{1F43E}\u{1F352}\u{1F617}\u{1F911}\u{1F30A}\u{1F92F}\u{1F437}\u260E\u{1F4A7}\u{1F62F}\u{1F486}\u{1F446}\u{1F3A4}\u{1F647}\u{1F351}\u2744\u{1F334}\u{1F4A3}\u{1F438}\u{1F48C}\u{1F4CD}\u{1F940}\u{1F922}\u{1F445}\u{1F4A1}\u{1F4A9}\u{1F450}\u{1F4F8}\u{1F47B}\u{1F910}\u{1F92E}\u{1F3BC}\u{1F975}\u{1F6A9}\u{1F34E}\u{1F34A}\u{1F47C}\u{1F48D}\u{1F4E3}\u{1F942}"), _d = va.reduce((t, e, r) => (t[r] = e, t), []), Nd = va.reduce((t, e, r) => (t[e.codePointAt(0)] = r, t), []);
  Pd = lt({ prefix: "\u{1F680}", name: "base256emoji", encode: $d, decode: Ld });
});
var eo = {};
M(eo, { sha256: () => Rd, sha512: () => Md });
var _a, Rd, Md, Na = F(() => {
  a();
  wn();
  _a = (t) => async (e) => new Uint8Array(await crypto.subtle.digest(t, e)), Rd = yn({ name: "sha2-256", code: 18, encode: _a("SHA-256") }), Md = yn({ name: "sha2-512", code: 19, encode: _a("SHA-512") });
});
var to = {};
M(to, { identity: () => qd });
var $a, Od, La, zd, qd, Pa = F(() => {
  a();
  Ne();
  Le();
  $a = 0, Od = "identity", La = Se, zd = (t) => $e($a, La(t)), qd = { code: $a, name: Od, encode: La, digest: zd };
});
var ro, Ra = F(() => {
  a();
  Aa();
  Ta();
  Ia();
  Sa();
  Ua();
  ht();
  Fa();
  Re();
  zn();
  ka();
  Na();
  Pa();
  qn();
  Hn();
  gn();
  ro = { ...Wn, ...Jn, ...Xn, ...Yn, ...Qn, ...Rt, ...Zn, ...dt, ...On, ...Kn }, { ...eo, ...to };
});
function Nr(t = 0) {
  return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? globalThis.Buffer.allocUnsafe(t) : new Uint8Array(t);
}
var no = F(() => {
  a();
});
function Oa(t, e, r, n) {
  return { name: t, prefix: e, encoder: { name: t, prefix: e, encode: r }, decoder: { decode: n } };
}
var Ma, oo, Hd, $r, io = F(() => {
  a();
  Ra();
  no();
  Ma = Oa("utf8", "u", (t) => {
    let e = new TextDecoder("utf8");
    return "u" + e.decode(t);
  }, (t) => new TextEncoder().encode(t.substring(1))), oo = Oa("ascii", "a", (t) => {
    let e = "a";
    for (let r = 0; r < t.length; r++)
      e += String.fromCharCode(t[r]);
    return e;
  }, (t) => {
    t = t.substring(1);
    let e = Nr(t.length);
    for (let r = 0; r < t.length; r++)
      e[r] = t.charCodeAt(r);
    return e;
  }), Hd = { utf8: Ma, "utf-8": Ma, hex: ro.base16, latin1: oo, ascii: oo, binary: oo, ...ro }, $r = Hd;
});
var Tt = {};
M(Tt, { toString: () => so });
function so(t, e = "utf8") {
  let r = $r[e];
  if (!r)
    throw new Error(`Unsupported encoding "${e}"`);
  return (e === "utf8" || e === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(t.buffer, t.byteOffset, t.byteLength).toString("utf8") : r.encoder.encode(t).substring(1);
}
var Ke = F(() => {
  a();
  io();
});
var Va = S((I0, ja) => {
  a();
  var uo = Ba(), { toString: za } = (Ke(), R(Tt)), jd = uo, ao = uo.v4, qa = uo.v6, Ha = function(t, e, r) {
    r = ~~r;
    let n;
    if (ao(t))
      n = e || new Uint8Array(r + 4), t.split(/\./g).map(function(o) {
        n[r++] = parseInt(o, 10) & 255;
      });
    else if (qa(t)) {
      let o = t.split(":", 8), i;
      for (i = 0; i < o.length; i++) {
        let s = ao(o[i]), u;
        s && (u = Ha(o[i]), o[i] = za(u.slice(0, 2), "base16")), u && ++i < 8 && o.splice(i, 0, za(u.slice(2, 4), "base16"));
      }
      if (o[0] === "")
        for (; o.length < 8; )
          o.unshift("0");
      else if (o[o.length - 1] === "")
        for (; o.length < 8; )
          o.push("0");
      else if (o.length < 8) {
        for (i = 0; i < o.length && o[i] !== ""; i++)
          ;
        let s = [i, "1"];
        for (i = 9 - o.length; i > 0; i--)
          s.push("0");
        o.splice.apply(o, s);
      }
      for (n = e || new Uint8Array(r + 16), i = 0; i < o.length; i++) {
        let s = parseInt(o[i], 16);
        n[r++] = s >> 8 & 255, n[r++] = s & 255;
      }
    }
    if (!n)
      throw Error("Invalid ip address: " + t);
    return n;
  }, Vd = function(t, e, r) {
    e = ~~e, r = r || t.length - e;
    let n = [], o, i = new DataView(t.buffer);
    if (r === 4) {
      for (let s = 0; s < r; s++)
        n.push(t[e + s]);
      o = n.join(".");
    } else if (r === 16) {
      for (let s = 0; s < r; s += 2)
        n.push(i.getUint16(e + s).toString(16));
      o = n.join(":"), o = o.replace(/(^|:)0(:0)*:0(:|$)/, "$1::$3"), o = o.replace(/:{3,4}/, "::");
    }
    return o;
  };
  ja.exports = { isIP: jd, isV4: ao, isV6: qa, toBytes: Ha, toString: Vd };
});
var Lr = S((S0, Wa) => {
  a();
  function Z(t) {
    if (typeof t == "number") {
      if (Z.codes[t])
        return Z.codes[t];
      throw new Error("no protocol with code: " + t);
    } else if (typeof t == "string") {
      if (Z.names[t])
        return Z.names[t];
      throw new Error("no protocol with name: " + t);
    }
    throw new Error("invalid protocol id type: " + t);
  }
  var de = -1;
  Z.lengthPrefixedVarSize = de;
  Z.V = de;
  Z.table = [[4, 32, "ip4"], [6, 16, "tcp"], [33, 16, "dccp"], [41, 128, "ip6"], [42, de, "ip6zone"], [53, de, "dns", "resolvable"], [54, de, "dns4", "resolvable"], [55, de, "dns6", "resolvable"], [56, de, "dnsaddr", "resolvable"], [132, 16, "sctp"], [273, 16, "udp"], [275, 0, "p2p-webrtc-star"], [276, 0, "p2p-webrtc-direct"], [277, 0, "p2p-stardust"], [290, 0, "p2p-circuit"], [301, 0, "udt"], [302, 0, "utp"], [400, de, "unix", false, "path"], [421, de, "ipfs"], [421, de, "p2p"], [443, 0, "https"], [444, 96, "onion"], [445, 296, "onion3"], [446, de, "garlic64"], [460, 0, "quic"], [477, 0, "ws"], [478, 0, "wss"], [479, 0, "p2p-websocket-star"], [480, 0, "http"], [777, de, "memory"]];
  Z.names = {};
  Z.codes = {};
  Z.table.map((t) => {
    let e = Ga.apply(null, t);
    return Z.codes[e.code] = e, Z.names[e.name] = e, null;
  });
  Z.object = Ga;
  function Ga(t, e, r, n, o) {
    return { code: t, size: e, name: r, resolvable: Boolean(n), path: Boolean(o) };
  }
  Wa.exports = Z;
});
var Ja = {};
M(Ja, { fromString: () => co });
function co(t, e = "utf8") {
  let r = $r[e];
  if (!r)
    throw new Error(`Unsupported encoding "${e}"`);
  return (e === "utf8" || e === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(t, "utf8") : r.decoder.decode(`${r.prefix}${t}`);
}
var fo = F(() => {
  a();
  io();
});
var lo = {};
M(lo, { concat: () => Gd });
function Gd(t, e) {
  e || (e = t.reduce((o, i) => o + i.length, 0));
  let r = Nr(e), n = 0;
  for (let o of t)
    r.set(o, n), n += o.length;
  return r;
}
var ho = F(() => {
  a();
  no();
});
var ru = S((v0, tu) => {
  a();
  var Pr = Va(), Qa = Lr(), { CID: Wd } = (Q(), R(dr)), { base32: Za } = (ht(), R(Rt)), { base58btc: Jd } = (Re(), R(dt)), Xd = (Le(), R(Ue)), It = pt(), { toString: Rr } = (Ke(), R(Tt)), { fromString: Ka } = (fo(), R(Ja)), { concat: Mr } = (ho(), R(lo));
  tu.exports = Wt;
  function Wt(t, e) {
    return e instanceof Uint8Array ? Wt.toString(t, e) : Wt.toBytes(t, e);
  }
  Wt.toString = function(e, r) {
    switch (Qa(e).code) {
      case 4:
      case 41:
        return Yd(r);
      case 6:
      case 273:
      case 33:
      case 132:
        return eu(r).toString();
      case 53:
      case 54:
      case 55:
      case 56:
      case 400:
      case 777:
        return Zd(r);
      case 421:
        return eh(r);
      case 444:
        return Ya(r);
      case 445:
        return Ya(r);
      default:
        return Rr(r, "base16");
    }
  };
  Wt.toBytes = function(e, r) {
    switch (Qa(e).code) {
      case 4:
        return Xa(r);
      case 41:
        return Xa(r);
      case 6:
      case 273:
      case 33:
      case 132:
        return po(parseInt(r, 10));
      case 53:
      case 54:
      case 55:
      case 56:
      case 400:
      case 777:
        return Qd(r);
      case 421:
        return Kd(r);
      case 444:
        return th(r);
      case 445:
        return rh(r);
      default:
        return Ka(r, "base16");
    }
  };
  function Xa(t) {
    if (!Pr.isIP(t))
      throw new Error("invalid ip address");
    return Pr.toBytes(t);
  }
  function Yd(t) {
    let e = Pr.toString(t);
    if (!e || !Pr.isIP(e))
      throw new Error("invalid ip address");
    return e;
  }
  function po(t) {
    let e = new ArrayBuffer(2);
    return new DataView(e).setUint16(0, t), new Uint8Array(e);
  }
  function eu(t) {
    return new DataView(t.buffer).getUint16(t.byteOffset);
  }
  function Qd(t) {
    let e = Ka(t), r = Uint8Array.from(It.encode(e.length));
    return Mr([r, e], r.length + e.length);
  }
  function Zd(t) {
    let e = It.decode(t);
    if (t = t.slice(It.decode.bytes), t.length !== e)
      throw new Error("inconsistent lengths");
    return Rr(t);
  }
  function Kd(t) {
    let e;
    t[0] === "Q" || t[0] === "1" ? e = Xd.decode(Jd.decode(`z${t}`)).bytes : e = Wd.parse(t).multihash.bytes;
    let r = Uint8Array.from(It.encode(e.length));
    return Mr([r, e], r.length + e.length);
  }
  function eh(t) {
    let e = It.decode(t), r = t.slice(It.decode.bytes);
    if (r.length !== e)
      throw new Error("inconsistent lengths");
    return Rr(r, "base58btc");
  }
  function th(t) {
    let e = t.split(":");
    if (e.length !== 2)
      throw new Error("failed to parse onion addr: " + e + " does not contain a port number");
    if (e[0].length !== 16)
      throw new Error("failed to parse onion addr: " + e[0] + " not a Tor onion address.");
    let r = Za.decode("b" + e[0]), n = parseInt(e[1], 10);
    if (n < 1 || n > 65536)
      throw new Error("Port number is not in range(1, 65536)");
    let o = po(n);
    return Mr([r, o], r.length + o.length);
  }
  function rh(t) {
    let e = t.split(":");
    if (e.length !== 2)
      throw new Error("failed to parse onion addr: " + e + " does not contain a port number");
    if (e[0].length !== 56)
      throw new Error("failed to parse onion addr: " + e[0] + " not a Tor onion3 address.");
    let r = Za.decode("b" + e[0]), n = parseInt(e[1], 10);
    if (n < 1 || n > 65536)
      throw new Error("Port number is not in range(1, 65536)");
    let o = po(n);
    return Mr([r, o], r.length + o.length);
  }
  function Ya(t) {
    let e = t.slice(0, t.length - 2), r = t.slice(t.length - 2), n = Rr(e, "base32"), o = eu(r);
    return n + ":" + o;
  }
});
var pu = S((k0, hu) => {
  a();
  var ou = ru(), mo = Lr(), Jt = pt(), { concat: nu } = (ho(), R(lo)), { toString: nh } = (Ke(), R(Tt));
  hu.exports = { stringToStringTuples: iu, stringTuplesToString: su, tuplesToStringTuples: uu, stringTuplesToTuples: au, bytesToTuples: yo, tuplesToBytes: cu, bytesToString: oh, stringToBytes: lu, fromString: ih, fromBytes: du, validateBytes: wo, isValidBytes: sh, cleanPath: Or, ParseError: go, protoFromTuple: Xt, sizeForAddr: fu };
  function iu(t) {
    let e = [], r = t.split("/").slice(1);
    if (r.length === 1 && r[0] === "")
      return [];
    for (let n = 0; n < r.length; n++) {
      let o = r[n], i = mo(o);
      if (i.size === 0) {
        e.push([o]);
        continue;
      }
      if (n++, n >= r.length)
        throw go("invalid address: " + t);
      if (i.path) {
        e.push([o, Or(r.slice(n).join("/"))]);
        break;
      }
      e.push([o, r[n]]);
    }
    return e;
  }
  function su(t) {
    let e = [];
    return t.map((r) => {
      let n = Xt(r);
      return e.push(n.name), r.length > 1 && e.push(r[1]), null;
    }), Or(e.join("/"));
  }
  function au(t) {
    return t.map((e) => {
      Array.isArray(e) || (e = [e]);
      let r = Xt(e);
      return e.length > 1 ? [r.code, ou.toBytes(r.code, e[1])] : [r.code];
    });
  }
  function uu(t) {
    return t.map((e) => {
      let r = Xt(e);
      return e[1] ? [r.code, ou.toString(r.code, e[1])] : [r.code];
    });
  }
  function cu(t) {
    return du(nu(t.map((e) => {
      let r = Xt(e), n = Uint8Array.from(Jt.encode(r.code));
      return e.length > 1 && (n = nu([n, e[1]])), n;
    })));
  }
  function fu(t, e) {
    return t.size > 0 ? t.size / 8 : t.size === 0 ? 0 : Jt.decode(e) + Jt.decode.bytes;
  }
  function yo(t) {
    let e = [], r = 0;
    for (; r < t.length; ) {
      let n = Jt.decode(t, r), o = Jt.decode.bytes, i = mo(n), s = fu(i, t.slice(r + o));
      if (s === 0) {
        e.push([n]), r += o;
        continue;
      }
      let u = t.slice(r + o, r + o + s);
      if (r += s + o, r > t.length)
        throw go("Invalid address Uint8Array: " + nh(t, "base16"));
      e.push([n, u]);
    }
    return e;
  }
  function oh(t) {
    let e = yo(t), r = uu(e);
    return su(r);
  }
  function lu(t) {
    t = Or(t);
    let e = iu(t), r = au(e);
    return cu(r);
  }
  function ih(t) {
    return lu(t);
  }
  function du(t) {
    let e = wo(t);
    if (e)
      throw e;
    return Uint8Array.from(t);
  }
  function wo(t) {
    try {
      yo(t);
    } catch (e) {
      return e;
    }
  }
  function sh(t) {
    return wo(t) === void 0;
  }
  function Or(t) {
    return "/" + t.trim().split("/").filter((e) => e).join("/");
  }
  function go(t) {
    return new Error("Error parsing address: " + t);
  }
  function Xt(t) {
    return mo(t[0]);
  }
});
var Yt = S((_0, yu) => {
  a();
  function mu(t, e) {
    for (let r in e)
      Object.defineProperty(t, r, { value: e[r], enumerable: true, configurable: true });
    return t;
  }
  function ah(t, e, r) {
    if (!t || typeof t == "string")
      throw new TypeError("Please pass an Error to err-code");
    r || (r = {}), typeof e == "object" && (r = e, e = ""), e && (r.code = e);
    try {
      return mu(t, r);
    } catch {
      r.message = t.message, r.stack = t.stack;
      let o = function() {
      };
      return o.prototype = Object.create(Object.getPrototypeOf(t)), mu(new o(), r);
    }
  }
  yu.exports = ah;
});
var wu = {};
M(wu, { equals: () => uh });
function uh(t, e) {
  if (t === e)
    return true;
  if (t.byteLength !== e.byteLength)
    return false;
  for (let r = 0; r < t.byteLength; r++)
    if (t[r] !== e[r])
      return false;
  return true;
}
var gu = F(() => {
  a();
});
var bo = S((N0, Eu) => {
  a();
  var ge = pu(), St = Lr(), Du = pt(), { CID: ch } = (Q(), R(dr)), { base58btc: fh } = (Re(), R(dt)), lh = Yt(), dh = Symbol.for("nodejs.util.inspect.custom"), { toString: zr } = (Ke(), R(Tt)), { equals: hh } = (gu(), R(wu)), Do = /* @__PURE__ */ new Map(), bu = Symbol.for("@multiformats/js-multiaddr/multiaddr"), j = class {
    constructor(e) {
      if (e == null && (e = ""), Object.defineProperty(this, bu, { value: true }), e instanceof Uint8Array)
        this.bytes = ge.fromBytes(e);
      else if (typeof e == "string") {
        if (e.length > 0 && e.charAt(0) !== "/")
          throw new Error(`multiaddr "${e}" must start with a "/"`);
        this.bytes = ge.fromString(e);
      } else if (j.isMultiaddr(e))
        this.bytes = ge.fromBytes(e.bytes);
      else
        throw new Error("addr must be a string, Buffer, or another Multiaddr");
    }
    toString() {
      return ge.bytesToString(this.bytes);
    }
    toJSON() {
      return this.toString();
    }
    toOptions() {
      let e = {}, r = this.toString().split("/");
      return e.family = r[1] === "ip4" ? 4 : 6, e.host = r[2], e.transport = r[3], e.port = parseInt(r[4]), e;
    }
    protos() {
      return this.protoCodes().map((e) => Object.assign({}, St(e)));
    }
    protoCodes() {
      let e = [], r = this.bytes, n = 0;
      for (; n < r.length; ) {
        let o = Du.decode(r, n), i = Du.decode.bytes, s = St(o);
        n += ge.sizeForAddr(s, r.slice(n + i)) + i, e.push(o);
      }
      return e;
    }
    protoNames() {
      return this.protos().map((e) => e.name);
    }
    tuples() {
      return ge.bytesToTuples(this.bytes);
    }
    stringTuples() {
      let e = ge.bytesToTuples(this.bytes);
      return ge.tuplesToStringTuples(e);
    }
    encapsulate(e) {
      return e = new j(e), new j(this.toString() + e.toString());
    }
    decapsulate(e) {
      let r = e.toString(), n = this.toString(), o = n.lastIndexOf(r);
      if (o < 0)
        throw new Error("Address " + this + " does not contain subaddress: " + e);
      return new j(n.slice(0, o));
    }
    decapsulateCode(e) {
      let r = this.tuples();
      for (let n = r.length - 1; n >= 0; n--)
        if (r[n][0] === e)
          return new j(ge.tuplesToBytes(r.slice(0, n)));
      return this;
    }
    getPeerId() {
      try {
        let r = this.stringTuples().filter((n) => n[0] === St.names.ipfs.code).pop();
        if (r && r[1]) {
          let n = r[1];
          return n[0] === "Q" || n[0] === "1" ? zr(fh.decode(`z${n}`), "base58btc") : zr(ch.parse(n).multihash.bytes, "base58btc");
        }
        return null;
      } catch {
        return null;
      }
    }
    getPath() {
      let e = null;
      try {
        e = this.stringTuples().filter((r) => !!St(r[0]).path)[0][1], e || (e = null);
      } catch {
        e = null;
      }
      return e;
    }
    equals(e) {
      return hh(this.bytes, e.bytes);
    }
    async resolve() {
      let e = this.protos().find((o) => o.resolvable);
      if (!e)
        return [this];
      let r = Do.get(e.name);
      if (!r)
        throw lh(new Error(`no available resolver for ${e.name}`), "ERR_NO_AVAILABLE_RESOLVER");
      return (await r(this)).map((o) => new j(o));
    }
    nodeAddress() {
      let e = this.protoCodes(), r = this.protoNames(), n = this.toString().split("/").slice(1);
      if (n.length < 4)
        throw new Error('multiaddr must have a valid format: "/{ip4, ip6, dns4, dns6}/{address}/{tcp, udp}/{port}".');
      if (e[0] !== 4 && e[0] !== 41 && e[0] !== 54 && e[0] !== 55)
        throw new Error(`no protocol with name: "'${r[0]}'". Must have a valid family name: "{ip4, ip6, dns4, dns6}".`);
      if (n[2] !== "tcp" && n[2] !== "udp")
        throw new Error(`no protocol with name: "'${r[1]}'". Must have a valid transport protocol: "{tcp, udp}".`);
      return { family: e[0] === 41 || e[0] === 55 ? 6 : 4, address: n[1], port: parseInt(n[3]) };
    }
    isThinWaistAddress(e) {
      let r = (e || this).protos();
      return !(r.length !== 2 || r[0].code !== 4 && r[0].code !== 41 || r[1].code !== 6 && r[1].code !== 273);
    }
    static fromNodeAddress(e, r) {
      if (!e)
        throw new Error("requires node address object");
      if (!r)
        throw new Error("requires transport protocol");
      let n;
      switch (e.family) {
        case 4:
          n = "ip4";
          break;
        case 6:
          n = "ip6";
          break;
        default:
          throw Error(`Invalid addr family. Got '${e.family}' instead of 4 or 6`);
      }
      return new j("/" + [n, e.address, r, e.port].join("/"));
    }
    static isName(e) {
      return j.isMultiaddr(e) ? e.protos().some((r) => r.resolvable) : false;
    }
    static isMultiaddr(e) {
      return e instanceof j || Boolean(e && e[bu]);
    }
    [dh]() {
      return "<Multiaddr " + zr(this.bytes, "base16") + " - " + ge.bytesToString(this.bytes) + ">";
    }
    inspect() {
      return "<Multiaddr " + zr(this.bytes, "base16") + " - " + ge.bytesToString(this.bytes) + ">";
    }
  };
  j.protocols = St;
  j.resolvers = Do;
  function ph(t) {
    return new j(t);
  }
  Eu.exports = { Multiaddr: j, multiaddr: ph, protocols: St, resolvers: Do };
});
var ku = S(($0, vu) => {
  a();
  var { Multiaddr: Eo } = bo(), Bu = E("dns4"), Au = E("dns6"), Tu = E("dnsaddr"), et = V(E("dns"), Tu, Bu, Au), Qt = V(E("ip4"), E("ip6")), _t = V(A(Qt, E("tcp")), A(et, E("tcp"))), xo = A(Qt, E("udp")), Iu = A(xo, E("utp")), Su = A(xo, E("quic")), Ft = V(A(_t, E("ws")), A(et, E("ws"))), vt = V(A(_t, E("wss")), A(et, E("wss"))), qr = V(A(_t, E("http")), A(Qt, E("http")), A(et, E("http"))), Hr = V(A(_t, E("https")), A(Qt, E("https")), A(et, E("https"))), Co = V(A(Ft, E("p2p-webrtc-star"), E("p2p")), A(vt, E("p2p-webrtc-star"), E("p2p")), A(Ft, E("p2p-webrtc-star")), A(vt, E("p2p-webrtc-star"))), mh = V(A(Ft, E("p2p-websocket-star"), E("p2p")), A(vt, E("p2p-websocket-star"), E("p2p")), A(Ft, E("p2p-websocket-star")), A(vt, E("p2p-websocket-star"))), Bo = V(A(qr, E("p2p-webrtc-direct"), E("p2p")), A(Hr, E("p2p-webrtc-direct"), E("p2p")), A(qr, E("p2p-webrtc-direct")), A(Hr, E("p2p-webrtc-direct"))), kt = V(Ft, vt, qr, Hr, Co, Bo, _t, Iu, Su, et), yh = V(A(kt, E("p2p-stardust"), E("p2p")), A(kt, E("p2p-stardust"))), Ve = V(A(kt, E("p2p")), Co, Bo, E("p2p")), xu = V(A(Ve, E("p2p-circuit"), Ve), A(Ve, E("p2p-circuit")), A(E("p2p-circuit"), Ve), A(kt, E("p2p-circuit")), A(E("p2p-circuit"), kt), E("p2p-circuit")), Uu = () => V(A(xu, Uu), xu), Ut = Uu(), Cu = V(A(Ut, Ve, Ut), A(Ve, Ut), A(Ut, Ve), Ut, Ve);
  vu.exports = { DNS: et, DNS4: Bu, DNS6: Au, DNSADDR: Tu, IP: Qt, TCP: _t, UDP: xo, QUIC: Su, UTP: Iu, HTTP: qr, HTTPS: Hr, WebSockets: Ft, WebSocketsSecure: vt, WebSocketStar: mh, WebRTCStar: Co, WebRTCDirect: Bo, Reliable: kt, Stardust: yh, Circuit: Ut, P2P: Cu, IPFS: Cu };
  function Fu(t) {
    function e(r) {
      if (!Eo.isMultiaddr(r))
        try {
          r = new Eo(r);
        } catch {
          return false;
        }
      let n = t(r.protoNames());
      return n === null ? false : n === true || n === false ? n : n.length === 0;
    }
    return e;
  }
  function A(...t) {
    function e(r) {
      if (r.length < t.length)
        return null;
      let n = r;
      return t.some((o) => (n = typeof o == "function" ? o().partialMatch(r) : o.partialMatch(r), Array.isArray(n) && (r = n), n === null)), n;
    }
    return { toString: function() {
      return "{ " + t.join(" ") + " }";
    }, input: t, matches: Fu(e), partialMatch: e };
  }
  function V(...t) {
    function e(n) {
      let o = null;
      return t.some((i) => {
        let s = typeof i == "function" ? i().partialMatch(n) : i.partialMatch(n);
        return s ? (o = s, true) : false;
      }), o;
    }
    return { toString: function() {
      return "{ " + t.join(" ") + " }";
    }, input: t, matches: Fu(e), partialMatch: e };
  }
  function E(t) {
    let e = t;
    function r(o) {
      let i;
      if (typeof o == "string" || o instanceof Uint8Array)
        try {
          i = new Eo(o);
        } catch {
          return false;
        }
      else
        i = o;
      let s = i.protoNames();
      return s.length === 1 && s[0] === e;
    }
    function n(o) {
      return o.length === 0 ? null : o[0] === e ? o.slice(1) : null;
    }
    return { toString: function() {
      return e;
    }, matches: r, partialMatch: n };
  }
});
var To = S((L0, Nu) => {
  a();
  var wh = typeof navigator < "u" && navigator.product === "ReactNative";
  function gh() {
    return wh ? "http://localhost" : d.location ? d.location.protocol + "//" + d.location.host : "";
  }
  var Zt = d.URL, _u = gh(), Ao = class {
    constructor(e = "", r = _u) {
      this.super = new Zt(e, r), this.path = this.pathname + this.search, this.auth = this.username && this.password ? this.username + ":" + this.password : null, this.query = this.search && this.search.startsWith("?") ? this.search.slice(1) : null;
    }
    get hash() {
      return this.super.hash;
    }
    get host() {
      return this.super.host;
    }
    get hostname() {
      return this.super.hostname;
    }
    get href() {
      return this.super.href;
    }
    get origin() {
      return this.super.origin;
    }
    get password() {
      return this.super.password;
    }
    get pathname() {
      return this.super.pathname;
    }
    get port() {
      return this.super.port;
    }
    get protocol() {
      return this.super.protocol;
    }
    get search() {
      return this.super.search;
    }
    get searchParams() {
      return this.super.searchParams;
    }
    get username() {
      return this.super.username;
    }
    set hash(e) {
      this.super.hash = e;
    }
    set host(e) {
      this.super.host = e;
    }
    set hostname(e) {
      this.super.hostname = e;
    }
    set href(e) {
      this.super.href = e;
    }
    set password(e) {
      this.super.password = e;
    }
    set pathname(e) {
      this.super.pathname = e;
    }
    set port(e) {
      this.super.port = e;
    }
    set protocol(e) {
      this.super.protocol = e;
    }
    set search(e) {
      this.super.search = e;
    }
    set username(e) {
      this.super.username = e;
    }
    static createObjectURL(e) {
      return Zt.createObjectURL(e);
    }
    static revokeObjectURL(e) {
      Zt.revokeObjectURL(e);
    }
    toJSON() {
      return this.super.toJSON();
    }
    toString() {
      return this.super.toString();
    }
    format() {
      return this.toString();
    }
  };
  function Dh(t) {
    if (typeof t == "string")
      return new Zt(t).toString();
    if (!(t instanceof Zt)) {
      let e = t.username && t.password ? `${t.username}:${t.password}@` : "", r = t.auth ? t.auth + "@" : "", n = t.port ? ":" + t.port : "", o = t.protocol ? t.protocol + "//" : "", i = t.host || "", s = t.hostname || "", u = t.search || (t.query ? "?" + t.query : ""), h = t.hash || "", w = t.pathname || "", c = t.path || w + u;
      return `${o}${e || r}${i || s + n}${c}${h}`;
    }
  }
  Nu.exports = { URLWithLegacySupport: Ao, URLSearchParams: d.URLSearchParams, defaultBase: _u, format: Dh };
});
var Pu = S((P0, Lu) => {
  a();
  var { URLWithLegacySupport: $u, format: bh } = To();
  Lu.exports = (t, e = {}, r = {}, n) => {
    let o = e.protocol ? e.protocol.replace(":", "") : "http";
    o = (r[o] || n || o) + ":";
    let i;
    try {
      i = new $u(t);
    } catch {
      i = {};
    }
    let s = Object.assign({}, e, { protocol: o || i.protocol, host: e.host || i.host });
    return new $u(t, bh(s)).toString();
  };
});
var Mu = S((R0, Ru) => {
  a();
  var { URLWithLegacySupport: Eh, format: xh, URLSearchParams: Ch, defaultBase: Bh } = To(), Ah = Pu();
  Ru.exports = { URL: Eh, URLSearchParams: Ch, format: xh, relative: Ah, defaultBase: Bh };
});
var Ku = S((M0, Zu) => {
  a();
  var { base58btc: Th } = (Re(), R(dt)), { base32: Ih } = (ht(), R(Rt)), Sh = (Le(), R(Ue)), { Multiaddr: Ou } = bo(), Uh = ku(), { CID: Io } = (Q(), R(dr)), { URL: Fh } = Mu(), { toString: vh } = (Ke(), R(Tt)), So = /^https?:\/\/[^/]+\/(ip[fn]s)\/([^/?#]+)/, Nt = /^\/(ip[fn]s)\/([^/?#]+)/, Hu = 1, ju = 2, tr = /^https?:\/\/([^/]+)\.(ip[fn]s)\.[^/?]+/, Vu = 1, Gu = 2, kh = /^(([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9])\.)+([a-z0-9]|[a-z0-9][a-z0-9-]*[a-z0-9])$/;
  function _h(t) {
    let e = Uo(t);
    try {
      Sh.decode(Th.decode("z" + e));
    } catch {
      return false;
    }
    return true;
  }
  function Nh(t) {
    try {
      Ih.decode(t);
    } catch {
      return false;
    }
    return true;
  }
  function Kt(t) {
    try {
      return typeof t == "string" ? Boolean(Io.parse(t)) : t instanceof Uint8Array ? Boolean(Io.decode(t)) : Boolean(Io.asCID(t));
    } catch {
      return false;
    }
  }
  function Wu(t) {
    if (!t)
      return false;
    if (Ou.isMultiaddr(t))
      return true;
    try {
      return new Ou(t), true;
    } catch {
      return false;
    }
  }
  function $h(t) {
    return Wu(t) && Uh.P2P.matches(t);
  }
  function er(t, e, r = Hu, n = ju) {
    let o = Uo(t);
    if (!o)
      return false;
    let i = o.match(e);
    if (!i || i[r] !== "ipfs")
      return false;
    let s = i[n];
    return s && e === tr && (s = s.toLowerCase()), Kt(s);
  }
  function jr(t, e, r = Hu, n = ju) {
    let o = Uo(t);
    if (!o)
      return false;
    let i = o.match(e);
    if (!i || i[r] !== "ipns")
      return false;
    let s = i[n];
    if (s && e === tr) {
      if (s = s.toLowerCase(), Kt(s))
        return true;
      try {
        !s.includes(".") && s.includes("-") && (s = s.replace(/--/g, "@").replace(/-/g, ".").replace(/@/g, "-"));
        let { hostname: u } = new Fh(`http://${s}`);
        return kh.test(u);
      } catch {
        return false;
      }
    }
    return true;
  }
  function Ju(t) {
    return typeof t == "string";
  }
  function Uo(t) {
    return t instanceof Uint8Array ? vh(t, "base58btc") : Ju(t) ? t : false;
  }
  var Fo = (t) => er(t, tr, Gu, Vu), vo = (t) => jr(t, tr, Gu, Vu), Xu = (t) => Fo(t) || vo(t), Yu = (t) => er(t, So) || Fo(t), Qu = (t) => jr(t, So) || vo(t), zu = (t) => Yu(t) || Qu(t) || Xu(t), qu = (t) => er(t, Nt) || jr(t, Nt);
  Zu.exports = { multihash: _h, multiaddr: Wu, peerMultiaddr: $h, cid: Kt, base32cid: (t) => Nh(t) && Kt(t), ipfsSubdomain: Fo, ipnsSubdomain: vo, subdomain: Xu, subdomainGatewayPattern: tr, ipfsUrl: Yu, ipnsUrl: Qu, url: zu, pathGatewayPattern: So, ipfsPath: (t) => er(t, Nt), ipnsPath: (t) => jr(t, Nt), path: qu, pathPattern: Nt, urlOrPath: (t) => zu(t) || qu(t), cidPath: (t) => Ju(t) && !Kt(t) && er(`/ipfs/${t}`, Nt) };
});
var hc = S((Iy, dc) => {
  a();
  function zh(t) {
    let [e, r] = t[Symbol.asyncIterator] ? [t[Symbol.asyncIterator](), Symbol.asyncIterator] : [t[Symbol.iterator](), Symbol.iterator], n = [];
    return { peek: () => e.next(), push: (o) => {
      n.push(o);
    }, next: () => n.length ? { done: false, value: n.shift() } : e.next(), [r]() {
      return this;
    } };
  }
  dc.exports = zh;
});
var mc = S((Sy, pc) => {
  a();
  var qh = async (t) => {
    for await (let e of t)
      ;
  };
  pc.exports = qh;
});
var wc = S((Uy, yc) => {
  a();
  var Hh = async function* (t, e) {
    for await (let r of t)
      yield e(r);
  };
  yc.exports = Hh;
});
a();
a();
Q();
a();
gn();
var hr = ({ enumerable: t = true, configurable: e = false } = {}) => ({ enumerable: t, configurable: e, writable: false }), Dn = function* (t, e) {
  if (t != null && !(t instanceof Uint8Array))
    for (let [r, n] of Object.entries(t)) {
      let o = [...e, r];
      if (n != null && typeof n == "object")
        if (Array.isArray(n))
          for (let [i, s] of n.entries()) {
            let u = [...o, i], h = x.asCID(s);
            h ? yield [u.join("/"), h] : typeof s == "object" && (yield* Dn(s, u));
          }
        else {
          let i = x.asCID(n);
          i ? yield [o.join("/"), i] : yield* Dn(n, o);
        }
    }
}, bn = function* (t, e) {
  if (t != null)
    for (let [r, n] of Object.entries(t)) {
      let o = [...e, r];
      if (yield o.join("/"), n != null && !(n instanceof Uint8Array) && typeof n == "object" && !x.asCID(n))
        if (Array.isArray(n))
          for (let [i, s] of n.entries()) {
            let u = [...o, i];
            yield u.join("/"), typeof s == "object" && !x.asCID(s) && (yield* bn(s, u));
          }
        else
          yield* bn(n, o);
    }
}, Qf = (t, e) => {
  let r = t;
  for (let [n, o] of e.entries()) {
    if (r = r[o], r == null)
      throw new Error(`Object has no property at ${e.slice(0, n + 1).map((s) => `[${JSON.stringify(s)}]`).join("")}`);
    let i = x.asCID(r);
    if (i)
      return { value: i, remaining: e.slice(n + 1).join("/") };
  }
  return { value: r };
}, En = class {
  constructor({ cid: e, bytes: r, value: n }) {
    if (!e || !r || typeof n > "u")
      throw new Error("Missing required argument");
    this.cid = e, this.bytes = r, this.value = n, this.asBlock = this, Object.defineProperties(this, { cid: hr(), bytes: hr(), value: hr(), asBlock: hr() });
  }
  links() {
    return Dn(this.value, []);
  }
  tree() {
    return bn(this.value, []);
  }
  get(e = "/") {
    return Qf(this.value, e.split("/").filter(Boolean));
  }
};
var bi = ({ bytes: t, cid: e, value: r, codec: n }) => {
  let o = r !== void 0 ? r : n && n.decode(t);
  if (o === void 0)
    throw new Error('Missing required argument, must either provide "value" or "codec"');
  return new En({ cid: e, bytes: t, value: o });
};
a();
Q();
a();
var Nn = J(pt(), 1);
a();
a();
a();
a();
var ll = ["string", "number", "bigint", "symbol"], dl = ["Function", "Generator", "AsyncGenerator", "GeneratorFunction", "AsyncGeneratorFunction", "AsyncFunction", "Observable", "Array", "Buffer", "Object", "RegExp", "Date", "Error", "Map", "Set", "WeakMap", "WeakSet", "ArrayBuffer", "SharedArrayBuffer", "DataView", "Promise", "URL", "HTMLElement", "Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Uint16Array", "Int32Array", "Uint32Array", "Float32Array", "Float64Array", "BigInt64Array", "BigUint64Array"];
function Fi(t) {
  if (t === null)
    return "null";
  if (t === void 0)
    return "undefined";
  if (t === true || t === false)
    return "boolean";
  let e = typeof t;
  if (ll.includes(e))
    return e;
  if (e === "function")
    return "Function";
  if (Array.isArray(t))
    return "Array";
  if (hl(t))
    return "Buffer";
  let r = pl(t);
  return r || "Object";
}
function hl(t) {
  return t && t.constructor && t.constructor.isBuffer && t.constructor.isBuffer.call(null, t);
}
function pl(t) {
  let e = Object.prototype.toString.call(t).slice(8, -1);
  if (dl.includes(e))
    return e;
}
a();
var l = class {
  constructor(e, r, n) {
    this.major = e, this.majorEncoded = e << 5, this.name = r, this.terminal = n;
  }
  toString() {
    return `Type[${this.major}].${this.name}`;
  }
  compare(e) {
    return this.major < e.major ? -1 : this.major > e.major ? 1 : 0;
  }
};
l.uint = new l(0, "uint", true);
l.negint = new l(1, "negint", true);
l.bytes = new l(2, "bytes", true);
l.string = new l(3, "string", true);
l.array = new l(4, "array", false);
l.map = new l(5, "map", false);
l.tag = new l(6, "tag", false);
l.float = new l(7, "float", true);
l.false = new l(7, "false", true);
l.true = new l(7, "true", true);
l.null = new l(7, "null", true);
l.undefined = new l(7, "undefined", true);
l.break = new l(7, "break", true);
var b = class {
  constructor(e, r, n) {
    this.type = e, this.value = r, this.encodedLength = n, this.encodedBytes = void 0, this.byteValue = void 0;
  }
  toString() {
    return `Token[${this.type}].${this.value}`;
  }
};
a();
a();
var mt = globalThis.process && !globalThis.process.browser && globalThis.Buffer && typeof globalThis.Buffer.isBuffer == "function", ml = new TextDecoder(), yl = new TextEncoder();
function pr(t) {
  return mt && globalThis.Buffer.isBuffer(t);
}
function Bn(t) {
  return t instanceof Uint8Array ? pr(t) ? new Uint8Array(t.buffer, t.byteOffset, t.byteLength) : t : Uint8Array.from(t);
}
var Ni = mt ? (t, e, r) => r - e > 64 ? globalThis.Buffer.from(t.subarray(e, r)).toString("utf8") : ki(t, e, r) : (t, e, r) => r - e > 64 ? ml.decode(t.subarray(e, r)) : ki(t, e, r), $i = mt ? (t) => t.length > 64 ? globalThis.Buffer.from(t) : vi(t) : (t) => t.length > 64 ? yl.encode(t) : vi(t), Ce = (t) => Uint8Array.from(t), yt = mt ? (t, e, r) => pr(t) ? new Uint8Array(t.subarray(e, r)) : t.slice(e, r) : (t, e, r) => t.slice(e, r), Li = mt ? (t, e) => (t = t.map((r) => r instanceof Uint8Array ? r : globalThis.Buffer.from(r)), Bn(globalThis.Buffer.concat(t, e))) : (t, e) => {
  let r = new Uint8Array(e), n = 0;
  for (let o of t)
    n + o.length > r.length && (o = o.subarray(0, r.length - n)), r.set(o, n), n += o.length;
  return r;
}, Pi = mt ? (t) => globalThis.Buffer.allocUnsafe(t) : (t) => new Uint8Array(t);
function Ri(t, e) {
  if (pr(t) && pr(e))
    return t.compare(e);
  for (let r = 0; r < t.length; r++)
    if (t[r] !== e[r])
      return t[r] < e[r] ? -1 : 1;
  return 0;
}
function vi(t, e = 1 / 0) {
  let r, n = t.length, o = null, i = [];
  for (let s = 0; s < n; ++s) {
    if (r = t.charCodeAt(s), r > 55295 && r < 57344) {
      if (!o) {
        if (r > 56319) {
          (e -= 3) > -1 && i.push(239, 191, 189);
          continue;
        } else if (s + 1 === n) {
          (e -= 3) > -1 && i.push(239, 191, 189);
          continue;
        }
        o = r;
        continue;
      }
      if (r < 56320) {
        (e -= 3) > -1 && i.push(239, 191, 189), o = r;
        continue;
      }
      r = (o - 55296 << 10 | r - 56320) + 65536;
    } else
      o && (e -= 3) > -1 && i.push(239, 191, 189);
    if (o = null, r < 128) {
      if ((e -= 1) < 0)
        break;
      i.push(r);
    } else if (r < 2048) {
      if ((e -= 2) < 0)
        break;
      i.push(r >> 6 | 192, r & 63 | 128);
    } else if (r < 65536) {
      if ((e -= 3) < 0)
        break;
      i.push(r >> 12 | 224, r >> 6 & 63 | 128, r & 63 | 128);
    } else if (r < 1114112) {
      if ((e -= 4) < 0)
        break;
      i.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, r & 63 | 128);
    } else
      throw new Error("Invalid code point");
  }
  return i;
}
function ki(t, e, r) {
  let n = [];
  for (; e < r; ) {
    let o = t[e], i = null, s = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
    if (e + s <= r) {
      let u, h, w, c;
      switch (s) {
        case 1:
          o < 128 && (i = o);
          break;
        case 2:
          u = t[e + 1], (u & 192) === 128 && (c = (o & 31) << 6 | u & 63, c > 127 && (i = c));
          break;
        case 3:
          u = t[e + 1], h = t[e + 2], (u & 192) === 128 && (h & 192) === 128 && (c = (o & 15) << 12 | (u & 63) << 6 | h & 63, c > 2047 && (c < 55296 || c > 57343) && (i = c));
          break;
        case 4:
          u = t[e + 1], h = t[e + 2], w = t[e + 3], (u & 192) === 128 && (h & 192) === 128 && (w & 192) === 128 && (c = (o & 15) << 18 | (u & 63) << 12 | (h & 63) << 6 | w & 63, c > 65535 && c < 1114112 && (i = c));
      }
    }
    i === null ? (i = 65533, s = 1) : i > 65535 && (i -= 65536, n.push(i >>> 10 & 1023 | 55296), i = 56320 | i & 1023), n.push(i), e += s;
  }
  return wl(n);
}
var _i = 4096;
function wl(t) {
  let e = t.length;
  if (e <= _i)
    return String.fromCharCode.apply(String, t);
  let r = "", n = 0;
  for (; n < e; )
    r += String.fromCharCode.apply(String, t.slice(n, n += _i));
  return r;
}
var gl = 256, Ot = class {
  constructor(e = gl) {
    this.chunkSize = e, this.cursor = 0, this.maxCursor = -1, this.chunks = [], this._initReuseChunk = null;
  }
  reset() {
    this.cursor = 0, this.maxCursor = -1, this.chunks.length && (this.chunks = []), this._initReuseChunk !== null && (this.chunks.push(this._initReuseChunk), this.maxCursor = this._initReuseChunk.length - 1);
  }
  push(e) {
    let r = this.chunks[this.chunks.length - 1];
    if (this.cursor + e.length <= this.maxCursor + 1) {
      let o = r.length - (this.maxCursor - this.cursor) - 1;
      r.set(e, o);
    } else {
      if (r) {
        let o = r.length - (this.maxCursor - this.cursor) - 1;
        o < r.length && (this.chunks[this.chunks.length - 1] = r.subarray(0, o), this.maxCursor = this.cursor - 1);
      }
      e.length < 64 && e.length < this.chunkSize ? (r = Pi(this.chunkSize), this.chunks.push(r), this.maxCursor += r.length, this._initReuseChunk === null && (this._initReuseChunk = r), r.set(e, 0)) : (this.chunks.push(e), this.maxCursor += e.length);
    }
    this.cursor += e.length;
  }
  toBytes(e = false) {
    let r;
    if (this.chunks.length === 1) {
      let n = this.chunks[0];
      e && this.cursor > n.length / 2 ? (r = this.cursor === n.length ? n : n.subarray(0, this.cursor), this._initReuseChunk = null, this.chunks = []) : r = yt(n, 0, this.cursor);
    } else
      r = Li(this.chunks, this.cursor);
    return e && this.reset(), r;
  }
};
a();
var C = "CBOR decode error:", An = "CBOR encode error:";
function Fe(t, e, r) {
  if (t.length - e < r)
    throw new Error(`${C} not enough data for type`);
}
a();
a();
var z = [24, 256, 65536, 4294967296, BigInt("18446744073709551616")];
function ee(t, e, r) {
  Fe(t, e, 1);
  let n = t[e];
  if (r.strict === true && n < z[0])
    throw new Error(`${C} integer encoded in more bytes than necessary (strict decode)`);
  return n;
}
function te(t, e, r) {
  Fe(t, e, 2);
  let n = t[e] << 8 | t[e + 1];
  if (r.strict === true && n < z[1])
    throw new Error(`${C} integer encoded in more bytes than necessary (strict decode)`);
  return n;
}
function re(t, e, r) {
  Fe(t, e, 4);
  let n = t[e] * 16777216 + (t[e + 1] << 16) + (t[e + 2] << 8) + t[e + 3];
  if (r.strict === true && n < z[2])
    throw new Error(`${C} integer encoded in more bytes than necessary (strict decode)`);
  return n;
}
function ne(t, e, r) {
  Fe(t, e, 8);
  let n = t[e] * 16777216 + (t[e + 1] << 16) + (t[e + 2] << 8) + t[e + 3], o = t[e + 4] * 16777216 + (t[e + 5] << 16) + (t[e + 6] << 8) + t[e + 7], i = (BigInt(n) << BigInt(32)) + BigInt(o);
  if (r.strict === true && i < z[3])
    throw new Error(`${C} integer encoded in more bytes than necessary (strict decode)`);
  if (i <= Number.MAX_SAFE_INTEGER)
    return Number(i);
  if (r.allowBigInt === true)
    return i;
  throw new Error(`${C} integers outside of the safe integer range are not supported`);
}
function Mi(t, e, r, n) {
  return new b(l.uint, ee(t, e + 1, n), 2);
}
function Oi(t, e, r, n) {
  return new b(l.uint, te(t, e + 1, n), 3);
}
function zi(t, e, r, n) {
  return new b(l.uint, re(t, e + 1, n), 5);
}
function qi(t, e, r, n) {
  return new b(l.uint, ne(t, e + 1, n), 9);
}
function ce(t, e) {
  return H(t, 0, e.value);
}
function H(t, e, r) {
  if (r < z[0]) {
    let n = Number(r);
    t.push([e | n]);
  } else if (r < z[1]) {
    let n = Number(r);
    t.push([e | 24, n]);
  } else if (r < z[2]) {
    let n = Number(r);
    t.push([e | 25, n >>> 8, n & 255]);
  } else if (r < z[3]) {
    let n = Number(r);
    t.push([e | 26, n >>> 24 & 255, n >>> 16 & 255, n >>> 8 & 255, n & 255]);
  } else {
    let n = BigInt(r);
    if (n < z[4]) {
      let o = [e | 27, 0, 0, 0, 0, 0, 0, 0], i = Number(n & BigInt(4294967295)), s = Number(n >> BigInt(32) & BigInt(4294967295));
      o[8] = i & 255, i = i >> 8, o[7] = i & 255, i = i >> 8, o[6] = i & 255, i = i >> 8, o[5] = i & 255, o[4] = s & 255, s = s >> 8, o[3] = s & 255, s = s >> 8, o[2] = s & 255, s = s >> 8, o[1] = s & 255, t.push(o);
    } else
      throw new Error(`${C} encountered BigInt larger than allowable range`);
  }
}
ce.encodedSize = function(e) {
  return H.encodedSize(e.value);
};
H.encodedSize = function(e) {
  return e < z[0] ? 1 : e < z[1] ? 2 : e < z[2] ? 3 : e < z[3] ? 5 : 9;
};
ce.compareTokens = function(e, r) {
  return e.value < r.value ? -1 : e.value > r.value ? 1 : 0;
};
a();
function Hi(t, e, r, n) {
  return new b(l.negint, -1 - ee(t, e + 1, n), 2);
}
function ji(t, e, r, n) {
  return new b(l.negint, -1 - te(t, e + 1, n), 3);
}
function Vi(t, e, r, n) {
  return new b(l.negint, -1 - re(t, e + 1, n), 5);
}
var Tn = BigInt(-1), Gi = BigInt(1);
function Wi(t, e, r, n) {
  let o = ne(t, e + 1, n);
  if (typeof o != "bigint") {
    let i = -1 - o;
    if (i >= Number.MIN_SAFE_INTEGER)
      return new b(l.negint, i, 9);
  }
  if (n.allowBigInt !== true)
    throw new Error(`${C} integers outside of the safe integer range are not supported`);
  return new b(l.negint, Tn - BigInt(o), 9);
}
function mr(t, e) {
  let r = e.value, n = typeof r == "bigint" ? r * Tn - Gi : r * -1 - 1;
  H(t, e.type.majorEncoded, n);
}
mr.encodedSize = function(e) {
  let r = e.value, n = typeof r == "bigint" ? r * Tn - Gi : r * -1 - 1;
  return n < z[0] ? 1 : n < z[1] ? 2 : n < z[2] ? 3 : n < z[3] ? 5 : 9;
};
mr.compareTokens = function(e, r) {
  return e.value < r.value ? 1 : e.value > r.value ? -1 : 0;
};
a();
function qt(t, e, r, n) {
  Fe(t, e, r + n);
  let o = yt(t, e + r, e + r + n);
  return new b(l.bytes, o, r + n);
}
function Ji(t, e, r, n) {
  return qt(t, e, 1, r);
}
function Xi(t, e, r, n) {
  return qt(t, e, 2, ee(t, e + 1, n));
}
function Yi(t, e, r, n) {
  return qt(t, e, 3, te(t, e + 1, n));
}
function Qi(t, e, r, n) {
  return qt(t, e, 5, re(t, e + 1, n));
}
function Zi(t, e, r, n) {
  let o = ne(t, e + 1, n);
  if (typeof o == "bigint")
    throw new Error(`${C} 64-bit integer bytes lengths not supported`);
  return qt(t, e, 9, o);
}
function yr(t) {
  return t.encodedBytes === void 0 && (t.encodedBytes = t.type === l.string ? $i(t.value) : t.value), t.encodedBytes;
}
function wt(t, e) {
  let r = yr(e);
  H(t, e.type.majorEncoded, r.length), t.push(r);
}
wt.encodedSize = function(e) {
  let r = yr(e);
  return H.encodedSize(r.length) + r.length;
};
wt.compareTokens = function(e, r) {
  return bl(yr(e), yr(r));
};
function bl(t, e) {
  return t.length < e.length ? -1 : t.length > e.length ? 1 : Ri(t, e);
}
a();
function Ht(t, e, r, n, o) {
  let i = r + n;
  Fe(t, e, i);
  let s = new b(l.string, Ni(t, e + r, e + i), i);
  return o.retainStringBytes === true && (s.byteValue = yt(t, e + r, e + i)), s;
}
function Ki(t, e, r, n) {
  return Ht(t, e, 1, r, n);
}
function es(t, e, r, n) {
  return Ht(t, e, 2, ee(t, e + 1, n), n);
}
function ts(t, e, r, n) {
  return Ht(t, e, 3, te(t, e + 1, n), n);
}
function rs(t, e, r, n) {
  return Ht(t, e, 5, re(t, e + 1, n), n);
}
function ns(t, e, r, n) {
  let o = ne(t, e + 1, n);
  if (typeof o == "bigint")
    throw new Error(`${C} 64-bit integer string lengths not supported`);
  return Ht(t, e, 9, o, n);
}
var os = wt;
a();
function gt(t, e, r, n) {
  return new b(l.array, n, r);
}
function is(t, e, r, n) {
  return gt(t, e, 1, r);
}
function ss(t, e, r, n) {
  return gt(t, e, 2, ee(t, e + 1, n));
}
function as(t, e, r, n) {
  return gt(t, e, 3, te(t, e + 1, n));
}
function us(t, e, r, n) {
  return gt(t, e, 5, re(t, e + 1, n));
}
function cs(t, e, r, n) {
  let o = ne(t, e + 1, n);
  if (typeof o == "bigint")
    throw new Error(`${C} 64-bit integer array lengths not supported`);
  return gt(t, e, 9, o);
}
function fs(t, e, r, n) {
  if (n.allowIndefinite === false)
    throw new Error(`${C} indefinite length items not allowed`);
  return gt(t, e, 1, 1 / 0);
}
function wr(t, e) {
  H(t, l.array.majorEncoded, e.value);
}
wr.compareTokens = ce.compareTokens;
wr.encodedSize = function(e) {
  return H.encodedSize(e.value);
};
a();
function Dt(t, e, r, n) {
  return new b(l.map, n, r);
}
function ls(t, e, r, n) {
  return Dt(t, e, 1, r);
}
function ds(t, e, r, n) {
  return Dt(t, e, 2, ee(t, e + 1, n));
}
function hs(t, e, r, n) {
  return Dt(t, e, 3, te(t, e + 1, n));
}
function ps(t, e, r, n) {
  return Dt(t, e, 5, re(t, e + 1, n));
}
function ms(t, e, r, n) {
  let o = ne(t, e + 1, n);
  if (typeof o == "bigint")
    throw new Error(`${C} 64-bit integer map lengths not supported`);
  return Dt(t, e, 9, o);
}
function ys(t, e, r, n) {
  if (n.allowIndefinite === false)
    throw new Error(`${C} indefinite length items not allowed`);
  return Dt(t, e, 1, 1 / 0);
}
function gr(t, e) {
  H(t, l.map.majorEncoded, e.value);
}
gr.compareTokens = ce.compareTokens;
gr.encodedSize = function(e) {
  return H.encodedSize(e.value);
};
a();
function ws(t, e, r, n) {
  return new b(l.tag, r, 1);
}
function gs(t, e, r, n) {
  return new b(l.tag, ee(t, e + 1, n), 2);
}
function Ds(t, e, r, n) {
  return new b(l.tag, te(t, e + 1, n), 3);
}
function bs(t, e, r, n) {
  return new b(l.tag, re(t, e + 1, n), 5);
}
function Es(t, e, r, n) {
  return new b(l.tag, ne(t, e + 1, n), 9);
}
function Dr(t, e) {
  H(t, l.tag.majorEncoded, e.value);
}
Dr.compareTokens = ce.compareTokens;
Dr.encodedSize = function(e) {
  return H.encodedSize(e.value);
};
a();
var Tl = 20, Il = 21, Sl = 22, Ul = 23;
function xs(t, e, r, n) {
  if (n.allowUndefined === false)
    throw new Error(`${C} undefined values are not supported`);
  return n.coerceUndefinedToNull === true ? new b(l.null, null, 1) : new b(l.undefined, void 0, 1);
}
function Cs(t, e, r, n) {
  if (n.allowIndefinite === false)
    throw new Error(`${C} indefinite length items not allowed`);
  return new b(l.break, void 0, 1);
}
function In(t, e, r) {
  if (r) {
    if (r.allowNaN === false && Number.isNaN(t))
      throw new Error(`${C} NaN values are not supported`);
    if (r.allowInfinity === false && (t === 1 / 0 || t === -1 / 0))
      throw new Error(`${C} Infinity values are not supported`);
  }
  return new b(l.float, t, e);
}
function Bs(t, e, r, n) {
  return In(Sn(t, e + 1), 3, n);
}
function As(t, e, r, n) {
  return In(Un(t, e + 1), 5, n);
}
function Ts(t, e, r, n) {
  return In(Fs(t, e + 1), 9, n);
}
function br(t, e, r) {
  let n = e.value;
  if (n === false)
    t.push([l.float.majorEncoded | Tl]);
  else if (n === true)
    t.push([l.float.majorEncoded | Il]);
  else if (n === null)
    t.push([l.float.majorEncoded | Sl]);
  else if (n === void 0)
    t.push([l.float.majorEncoded | Ul]);
  else {
    let o, i = false;
    (!r || r.float64 !== true) && (Ss(n), o = Sn(me, 1), n === o || Number.isNaN(n) ? (me[0] = 249, t.push(me.slice(0, 3)), i = true) : (Us(n), o = Un(me, 1), n === o && (me[0] = 250, t.push(me.slice(0, 5)), i = true))), i || (Fl(n), o = Fs(me, 1), me[0] = 251, t.push(me.slice(0, 9)));
  }
}
br.encodedSize = function(e, r) {
  let n = e.value;
  if (n === false || n === true || n === null || n === void 0)
    return 1;
  if (!r || r.float64 !== true) {
    Ss(n);
    let o = Sn(me, 1);
    if (n === o || Number.isNaN(n))
      return 3;
    if (Us(n), o = Un(me, 1), n === o)
      return 5;
  }
  return 9;
};
var Is = new ArrayBuffer(9), fe = new DataView(Is, 1), me = new Uint8Array(Is, 0);
function Ss(t) {
  if (t === 1 / 0)
    fe.setUint16(0, 31744, false);
  else if (t === -1 / 0)
    fe.setUint16(0, 64512, false);
  else if (Number.isNaN(t))
    fe.setUint16(0, 32256, false);
  else {
    fe.setFloat32(0, t);
    let e = fe.getUint32(0), r = (e & 2139095040) >> 23, n = e & 8388607;
    if (r === 255)
      fe.setUint16(0, 31744, false);
    else if (r === 0)
      fe.setUint16(0, (t & 2147483648) >> 16 | n >> 13, false);
    else {
      let o = r - 127;
      o < -24 ? fe.setUint16(0, 0) : o < -14 ? fe.setUint16(0, (e & 2147483648) >> 16 | 1 << 24 + o, false) : fe.setUint16(0, (e & 2147483648) >> 16 | o + 15 << 10 | n >> 13, false);
    }
  }
}
function Sn(t, e) {
  if (t.length - e < 2)
    throw new Error(`${C} not enough data for float16`);
  let r = (t[e] << 8) + t[e + 1];
  if (r === 31744)
    return 1 / 0;
  if (r === 64512)
    return -1 / 0;
  if (r === 32256)
    return NaN;
  let n = r >> 10 & 31, o = r & 1023, i;
  return n === 0 ? i = o * 2 ** -24 : n !== 31 ? i = (o + 1024) * 2 ** (n - 25) : i = o === 0 ? 1 / 0 : NaN, r & 32768 ? -i : i;
}
function Us(t) {
  fe.setFloat32(0, t, false);
}
function Un(t, e) {
  if (t.length - e < 4)
    throw new Error(`${C} not enough data for float32`);
  let r = (t.byteOffset || 0) + e;
  return new DataView(t.buffer, r, 4).getFloat32(0, false);
}
function Fl(t) {
  fe.setFloat64(0, t, false);
}
function Fs(t, e) {
  if (t.length - e < 8)
    throw new Error(`${C} not enough data for float64`);
  let r = (t.byteOffset || 0) + e;
  return new DataView(t.buffer, r, 8).getFloat64(0, false);
}
br.compareTokens = ce.compareTokens;
function U(t, e, r) {
  throw new Error(`${C} encountered invalid minor (${r}) for major ${t[e] >>> 5}`);
}
function Er(t) {
  return () => {
    throw new Error(`${C} ${t}`);
  };
}
var D = [];
for (let t = 0; t <= 23; t++)
  D[t] = U;
D[24] = Mi;
D[25] = Oi;
D[26] = zi;
D[27] = qi;
D[28] = U;
D[29] = U;
D[30] = U;
D[31] = U;
for (let t = 32; t <= 55; t++)
  D[t] = U;
D[56] = Hi;
D[57] = ji;
D[58] = Vi;
D[59] = Wi;
D[60] = U;
D[61] = U;
D[62] = U;
D[63] = U;
for (let t = 64; t <= 87; t++)
  D[t] = Ji;
D[88] = Xi;
D[89] = Yi;
D[90] = Qi;
D[91] = Zi;
D[92] = U;
D[93] = U;
D[94] = U;
D[95] = Er("indefinite length bytes/strings are not supported");
for (let t = 96; t <= 119; t++)
  D[t] = Ki;
D[120] = es;
D[121] = ts;
D[122] = rs;
D[123] = ns;
D[124] = U;
D[125] = U;
D[126] = U;
D[127] = Er("indefinite length bytes/strings are not supported");
for (let t = 128; t <= 151; t++)
  D[t] = is;
D[152] = ss;
D[153] = as;
D[154] = us;
D[155] = cs;
D[156] = U;
D[157] = U;
D[158] = U;
D[159] = fs;
for (let t = 160; t <= 183; t++)
  D[t] = ls;
D[184] = ds;
D[185] = hs;
D[186] = ps;
D[187] = ms;
D[188] = U;
D[189] = U;
D[190] = U;
D[191] = ys;
for (let t = 192; t <= 215; t++)
  D[t] = ws;
D[216] = gs;
D[217] = Ds;
D[218] = bs;
D[219] = Es;
D[220] = U;
D[221] = U;
D[222] = U;
D[223] = U;
for (let t = 224; t <= 243; t++)
  D[t] = Er("simple values are not supported");
D[244] = U;
D[245] = U;
D[246] = U;
D[247] = xs;
D[248] = Er("simple values are not supported");
D[249] = Bs;
D[250] = As;
D[251] = Ts;
D[252] = U;
D[253] = U;
D[254] = U;
D[255] = Cs;
var ye = [];
for (let t = 0; t < 24; t++)
  ye[t] = new b(l.uint, t, 1);
for (let t = -1; t >= -24; t--)
  ye[31 - t] = new b(l.negint, t, 1);
ye[64] = new b(l.bytes, new Uint8Array(0), 1);
ye[96] = new b(l.string, "", 1);
ye[128] = new b(l.array, 0, 1);
ye[160] = new b(l.map, 0, 1);
ye[244] = new b(l.false, false, 1);
ye[245] = new b(l.true, true, 1);
ye[246] = new b(l.null, null, 1);
function vs(t) {
  switch (t.type) {
    case l.false:
      return Ce([244]);
    case l.true:
      return Ce([245]);
    case l.null:
      return Ce([246]);
    case l.bytes:
      return t.value.length ? void 0 : Ce([64]);
    case l.string:
      return t.value === "" ? Ce([96]) : void 0;
    case l.array:
      return t.value === 0 ? Ce([128]) : void 0;
    case l.map:
      return t.value === 0 ? Ce([160]) : void 0;
    case l.uint:
      return t.value < 24 ? Ce([Number(t.value)]) : void 0;
    case l.negint:
      if (t.value >= -24)
        return Ce([31 - Number(t.value)]);
  }
}
var kl = { float64: false, mapSorter: $l, quickEncodeToken: vs };
function _l() {
  let t = [];
  return t[l.uint.major] = ce, t[l.negint.major] = mr, t[l.bytes.major] = wt, t[l.string.major] = os, t[l.array.major] = wr, t[l.map.major] = gr, t[l.tag.major] = Dr, t[l.float.major] = br, t;
}
var ks = _l(), Fn = new Ot(), bt = class {
  constructor(e, r) {
    this.obj = e, this.parent = r;
  }
  includes(e) {
    let r = this;
    do
      if (r.obj === e)
        return true;
    while (r = r.parent);
    return false;
  }
  static createCheck(e, r) {
    if (e && e.includes(r))
      throw new Error(`${An} object contains circular references`);
    return new bt(r, e);
  }
}, Oe = { null: new b(l.null, null), undefined: new b(l.undefined, void 0), true: new b(l.true, true), false: new b(l.false, false), emptyArray: new b(l.array, 0), emptyMap: new b(l.map, 0) }, ze = { number(t, e, r, n) {
  return !Number.isInteger(t) || !Number.isSafeInteger(t) ? new b(l.float, t) : t >= 0 ? new b(l.uint, t) : new b(l.negint, t);
}, bigint(t, e, r, n) {
  return t >= BigInt(0) ? new b(l.uint, t) : new b(l.negint, t);
}, Uint8Array(t, e, r, n) {
  return new b(l.bytes, t);
}, string(t, e, r, n) {
  return new b(l.string, t);
}, boolean(t, e, r, n) {
  return t ? Oe.true : Oe.false;
}, null(t, e, r, n) {
  return Oe.null;
}, undefined(t, e, r, n) {
  return Oe.undefined;
}, ArrayBuffer(t, e, r, n) {
  return new b(l.bytes, new Uint8Array(t));
}, DataView(t, e, r, n) {
  return new b(l.bytes, new Uint8Array(t.buffer, t.byteOffset, t.byteLength));
}, Array(t, e, r, n) {
  if (!t.length)
    return r.addBreakTokens === true ? [Oe.emptyArray, new b(l.break)] : Oe.emptyArray;
  n = bt.createCheck(n, t);
  let o = [], i = 0;
  for (let s of t)
    o[i++] = xr(s, r, n);
  return r.addBreakTokens ? [new b(l.array, t.length), o, new b(l.break)] : [new b(l.array, t.length), o];
}, Object(t, e, r, n) {
  let o = e !== "Object", i = o ? t.keys() : Object.keys(t), s = o ? t.size : i.length;
  if (!s)
    return r.addBreakTokens === true ? [Oe.emptyMap, new b(l.break)] : Oe.emptyMap;
  n = bt.createCheck(n, t);
  let u = [], h = 0;
  for (let w of i)
    u[h++] = [xr(w, r, n), xr(o ? t.get(w) : t[w], r, n)];
  return Nl(u, r), r.addBreakTokens ? [new b(l.map, s), u, new b(l.break)] : [new b(l.map, s), u];
} };
ze.Map = ze.Object;
ze.Buffer = ze.Uint8Array;
for (let t of "Uint8Clamped Uint16 Uint32 Int8 Int16 Int32 BigUint64 BigInt64 Float32 Float64".split(" "))
  ze[`${t}Array`] = ze.DataView;
function xr(t, e = {}, r) {
  let n = Fi(t), o = e && e.typeEncoders && e.typeEncoders[n] || ze[n];
  if (typeof o == "function") {
    let s = o(t, n, e, r);
    if (s != null)
      return s;
  }
  let i = ze[n];
  if (!i)
    throw new Error(`${An} unsupported type: ${n}`);
  return i(t, n, e, r);
}
function Nl(t, e) {
  e.mapSorter && t.sort(e.mapSorter);
}
function $l(t, e) {
  let r = Array.isArray(t[0]) ? t[0][0] : t[0], n = Array.isArray(e[0]) ? e[0][0] : e[0];
  if (r.type !== n.type)
    return r.type.compare(n.type);
  let o = r.type.major, i = ks[o].compareTokens(r, n);
  return i === 0 && console.warn("WARNING: complex key types used, CBOR key sorting guarantees are gone"), i;
}
function _s(t, e, r, n) {
  if (Array.isArray(e))
    for (let o of e)
      _s(t, o, r, n);
  else
    r[e.type.major](t, e, n);
}
function Ll(t, e, r) {
  let n = xr(t, r);
  if (!Array.isArray(n) && r.quickEncodeToken) {
    let o = r.quickEncodeToken(n);
    if (o)
      return o;
    let i = e[n.type.major];
    if (i.encodedSize) {
      let s = i.encodedSize(n, r), u = new Ot(s);
      if (i(u, n, r), u.chunks.length !== 1)
        throw new Error(`Unexpected error: pre-calculated length for ${n} was wrong`);
      return Bn(u.chunks[0]);
    }
  }
  return Fn.reset(), _s(Fn, n, e, r), Fn.toBytes(true);
}
function vn(t, e) {
  return e = Object.assign({}, kl, e), Ll(t, ks, e);
}
a();
var Pl = { strict: false, allowIndefinite: true, allowUndefined: true, allowBigInt: true }, kn = class {
  constructor(e, r = {}) {
    this.pos = 0, this.data = e, this.options = r;
  }
  done() {
    return this.pos >= this.data.length;
  }
  next() {
    let e = this.data[this.pos], r = ye[e];
    if (r === void 0) {
      let n = D[e];
      if (!n)
        throw new Error(`${C} no decoder for major type ${e >>> 5} (byte 0x${e.toString(16).padStart(2, "0")})`);
      let o = e & 31;
      r = n(this.data, this.pos, o, this.options);
    }
    return this.pos += r.encodedLength, r;
  }
}, jt = Symbol.for("DONE"), Cr = Symbol.for("BREAK");
function Rl(t, e, r) {
  let n = [];
  for (let o = 0; o < t.value; o++) {
    let i = Vt(e, r);
    if (i === Cr) {
      if (t.value === 1 / 0)
        break;
      throw new Error(`${C} got unexpected break to lengthed array`);
    }
    if (i === jt)
      throw new Error(`${C} found array but not enough entries (got ${o}, expected ${t.value})`);
    n[o] = i;
  }
  return n;
}
function Ml(t, e, r) {
  let n = r.useMaps === true, o = n ? void 0 : {}, i = n ? /* @__PURE__ */ new Map() : void 0;
  for (let s = 0; s < t.value; s++) {
    let u = Vt(e, r);
    if (u === Cr) {
      if (t.value === 1 / 0)
        break;
      throw new Error(`${C} got unexpected break to lengthed map`);
    }
    if (u === jt)
      throw new Error(`${C} found map but not enough entries (got ${s} [no key], expected ${t.value})`);
    if (n !== true && typeof u != "string")
      throw new Error(`${C} non-string keys not supported (got ${typeof u})`);
    let h = Vt(e, r);
    if (h === jt)
      throw new Error(`${C} found map but not enough entries (got ${s} [no value], expected ${t.value})`);
    n ? i.set(u, h) : o[u] = h;
  }
  return n ? i : o;
}
function Vt(t, e) {
  if (t.done())
    return jt;
  let r = t.next();
  if (r.type === l.break)
    return Cr;
  if (r.type.terminal)
    return r.value;
  if (r.type === l.array)
    return Rl(r, t, e);
  if (r.type === l.map)
    return Ml(r, t, e);
  if (r.type === l.tag) {
    if (e.tags && typeof e.tags[r.value] == "function") {
      let n = Vt(t, e);
      return e.tags[r.value](n);
    }
    throw new Error(`${C} tag not supported (${r.value})`);
  }
  throw new Error("unsupported");
}
function _n(t, e) {
  if (!(t instanceof Uint8Array))
    throw new Error(`${C} data to decode must be a Uint8Array`);
  e = Object.assign({}, Pl, e);
  let r = e.tokenizer || new kn(t, e), n = Vt(r, e);
  if (n === jt)
    throw new Error(`${C} did not find any content to decode`);
  if (n === Cr)
    throw new Error(`${C} got unexpected break`);
  if (!r.done())
    throw new Error(`${C} too many terminals, data makes no sense`);
  return n;
}
Q();
var Ns = 42;
function zl(t) {
  if (t.asCID !== t)
    return null;
  let e = x.asCID(t);
  if (!e)
    return null;
  let r = new Uint8Array(e.bytes.byteLength + 1);
  return r.set(e.bytes, 1), [new b(l.tag, Ns), new b(l.bytes, r)];
}
function ql() {
  throw new Error("`undefined` is not supported by the IPLD Data Model and cannot be encoded");
}
function Hl(t) {
  if (Number.isNaN(t))
    throw new Error("`NaN` is not supported by the IPLD Data Model and cannot be encoded");
  if (t === 1 / 0 || t === -1 / 0)
    throw new Error("`Infinity` and `-Infinity` is not supported by the IPLD Data Model and cannot be encoded");
  return null;
}
var jl = { float64: true, typeEncoders: { Object: zl, undefined: ql, number: Hl } };
function Vl(t) {
  if (t[0] !== 0)
    throw new Error("Invalid CID for CBOR tag 42; expected leading 0x00");
  return x.decode(t.subarray(1));
}
var $s = { allowIndefinite: false, coerceUndefinedToNull: true, allowNaN: false, allowInfinity: false, allowBigInt: true, strict: true, useMaps: false, tags: [] };
$s.tags[Ns] = Vl;
var Ls = (t) => vn(t, jl), Ps = (t) => _n(t, $s);
function $n(t) {
  let e = Ls({ version: 1, roots: t }), r = Nn.default.encode(e.length), n = new Uint8Array(r.length + e.length);
  return n.set(r, 0), n.set(e, r.length), n;
}
function Rs(t) {
  return { async setRoots(e) {
    let r = $n(e);
    await t.write(r);
  }, async writeBlock(e) {
    let { cid: r, bytes: n } = e;
    await t.write(new Uint8Array(Nn.default.encode(r.bytes.length + n.length))), await t.write(r.bytes), n.length && await t.write(n);
  }, async close() {
    await t.end();
  } };
}
a();
function Br() {
}
function Ms() {
  let t = [], e = null, r = Br, n = false, o = null, i = Br, s = () => (e || (e = new Promise((w) => {
    r = () => {
      e = null, r = Br, w();
    };
  })), e), u = { write(w) {
    t.push(w);
    let c = s();
    return i(), c;
  }, async end() {
    n = true;
    let w = s();
    i(), await w;
  } }, h = { async next() {
    let w = t.shift();
    return w ? (t.length === 0 && r(), { done: false, value: w }) : n ? (r(), { done: true, value: void 0 }) : (o || (o = new Promise((c) => {
      i = () => (o = null, i = Br, c(h.next()));
    })), o);
  } };
  return { writer: u, iterator: h };
}
a();
var He = J(pt(), 1);
Q();
Le();
a();
var qe = { Null: (t) => t === null, Int: (t) => Number.isInteger(t), Float: (t) => typeof t == "number" && Number.isFinite(t), String: (t) => typeof t == "string", Bool: (t) => typeof t == "boolean", Bytes: (t) => t instanceof Uint8Array, Link: (t) => !qe.Null(t) && typeof t == "object" && t.asCID === t, List: (t) => Array.isArray(t), Map: (t) => !qe.Null(t) && typeof t == "object" && t.asCID !== t && !qe.List(t) && !qe.Bytes(t) }, Et = { Int: qe.Int, "CarHeader > version": (t) => Et.Int(t), "CarHeader > roots (anon) > valueType (anon)": qe.Link, "CarHeader > roots (anon)": (t) => qe.List(t) && Array.prototype.every.call(t, Et["CarHeader > roots (anon) > valueType (anon)"]), "CarHeader > roots": (t) => Et["CarHeader > roots (anon)"](t), CarHeader: (t) => {
  let e = t && Object.keys(t);
  return qe.Map(t) && ["version"].every((r) => e.includes(r)) && Object.entries(t).every(([r, n]) => Et["CarHeader > " + r] && Et["CarHeader > " + r](n));
} }, Os = Et.CarHeader;
var Ln = { SHA2_256: 18, LENGTH: 32, DAG_PB: 112 }, zs = 16 + 8 + 8 + 8;
async function Ar(t) {
  let e = await t.upTo(8);
  if (!e.length)
    throw new Error("Unexpected end of data");
  let r = He.default.decode(e);
  return t.seek(He.default.decode.bytes), r;
}
async function Gl(t) {
  let e = await t.exactly(zs), r = new DataView(e.buffer, e.byteOffset, e.byteLength), n = 0, o = { version: 2, characteristics: [r.getBigUint64(n, true), r.getBigUint64(n += 8, true)], dataOffset: Number(r.getBigUint64(n += 8, true)), dataSize: Number(r.getBigUint64(n += 8, true)), indexOffset: Number(r.getBigUint64(n += 8, true)) };
  return t.seek(zs), o;
}
async function Tr(t, e) {
  let r = await Ar(t);
  if (r === 0)
    throw new Error("Invalid CAR header (zero length)");
  let n = await t.exactly(r);
  t.seek(r);
  let o = Ps(n);
  if (!Os(o))
    throw new Error("Invalid CAR header format");
  if (o.version !== 1 && o.version !== 2 || e !== void 0 && o.version !== e)
    throw new Error(`Invalid CAR version: ${o.version}${e !== void 0 ? ` (expected ${e})` : ""}`);
  let i = Array.isArray(o.roots);
  if (o.version === 1 && !i || o.version === 2 && i)
    throw new Error("Invalid CAR header format");
  if (o.version === 1)
    return o;
  let s = await Gl(t);
  t.seek(s.dataOffset - t.pos);
  let u = await Tr(t, 1);
  return Object.assign(u, s);
}
async function Wl(t) {
  let e = await t.upTo(8);
  He.default.decode(e);
  let r = He.default.decode.bytes, n = He.default.decode(e.subarray(He.default.decode.bytes)), o = He.default.decode.bytes, i = r + o + n, s = await t.exactly(i);
  return t.seek(i), s;
}
async function Jl(t) {
  let e = await t.exactly(2);
  if (e[0] === Ln.SHA2_256 && e[1] === Ln.LENGTH) {
    let s = await t.exactly(34);
    t.seek(34);
    let u = ft(s);
    return x.create(0, Ln.DAG_PB, u);
  }
  let r = await Ar(t);
  if (r !== 1)
    throw new Error(`Unexpected CID version (${r})`);
  let n = await Ar(t), o = await Wl(t), i = ft(o);
  return x.create(r, n, i);
}
async function qs(t) {
  let e = t.pos, r = await Ar(t);
  if (r === 0)
    throw new Error("Invalid CAR section (zero length)");
  r += t.pos - e;
  let n = await Jl(t), o = r - Number(t.pos - e);
  return { cid: n, length: r, blockLength: o };
}
async function Xl(t) {
  let { cid: e, blockLength: r } = await qs(t), n = await t.exactly(r);
  return t.seek(r), { bytes: n, cid: e };
}
async function Yl(t) {
  let e = t.pos, { cid: r, length: n, blockLength: o } = await qs(t), i = { cid: r, length: n, blockLength: o, offset: e, blockOffset: t.pos };
  return t.seek(i.blockLength), i;
}
function Hs(t) {
  let e = (async () => {
    let r = await Tr(t);
    if (r.version === 2) {
      let n = t.pos - r.dataOffset;
      t = Zl(t, r.dataSize - n);
    }
    return r;
  })();
  return { header: () => e, async *blocks() {
    for (await e; (await t.upTo(8)).length > 0; )
      yield await Xl(t);
  }, async *blocksIndex() {
    for (await e; (await t.upTo(8)).length > 0; )
      yield await Yl(t);
  } };
}
function Ir(t) {
  let e = 0;
  return { async upTo(r) {
    return t.subarray(e, e + Math.min(r, t.length - e));
  }, async exactly(r) {
    if (r > t.length - e)
      throw new Error("Unexpected end of data");
    return t.subarray(e, e + r);
  }, seek(r) {
    e += r;
  }, get pos() {
    return e;
  } };
}
function Ql(t) {
  let e = 0, r = 0, n = 0, o = new Uint8Array(0), i = async (s) => {
    r = o.length - n;
    let u = [o.subarray(n)];
    for (; r < s; ) {
      let w = await t();
      if (w == null)
        break;
      r < 0 ? w.length > r && u.push(w.subarray(-r)) : u.push(w), r += w.length;
    }
    o = new Uint8Array(u.reduce((w, c) => w + c.length, 0));
    let h = 0;
    for (let w of u)
      o.set(w, h), h += w.length;
    n = 0;
  };
  return { async upTo(s) {
    return o.length - n < s && await i(s), o.subarray(n, n + Math.min(o.length - n, s));
  }, async exactly(s) {
    if (o.length - n < s && await i(s), o.length - n < s)
      throw new Error("Unexpected end of data");
    return o.subarray(n, n + s);
  }, seek(s) {
    e += s, n += s;
  }, get pos() {
    return e;
  } };
}
function js(t) {
  let e = t[Symbol.asyncIterator]();
  async function r() {
    let n = await e.next();
    return n.done ? null : n.value;
  }
  return Ql(r);
}
function Zl(t, e) {
  let r = 0;
  return { async upTo(n) {
    let o = await t.upTo(n);
    return o.length + r > e && (o = o.subarray(0, e - r)), o;
  }, async exactly(n) {
    let o = await t.exactly(n);
    if (o.length + r > e)
      throw new Error("Unexpected end of data");
    return o;
  }, seek(n) {
    r += n, t.seek(n);
  }, get pos() {
    return t.pos;
  } };
}
var Qe = class {
  constructor(e, r) {
    this._encoder = r, this._mutex = r.setRoots(e), this._ended = false;
  }
  async put(e) {
    if (!(e.bytes instanceof Uint8Array) || !e.cid)
      throw new TypeError("Can only write {cid, bytes} objects");
    if (this._ended)
      throw new Error("Already closed");
    let r = x.asCID(e.cid);
    if (!r)
      throw new TypeError("Can only write {cid, bytes} objects");
    return this._mutex = this._mutex.then(() => this._encoder.writeBlock({ cid: r, bytes: e.bytes })), this._mutex;
  }
  async close() {
    if (this._ended)
      throw new Error("Already closed");
    return await this._mutex, this._ended = true, this._encoder.close();
  }
  static create(e) {
    e = Kl(e);
    let { encoder: r, iterator: n } = Vs(), o = new Qe(e, r), i = new Sr(n);
    return { writer: o, out: i };
  }
  static createAppender() {
    let { encoder: e, iterator: r } = Vs();
    e.setRoots = () => Promise.resolve();
    let n = new Qe([], e), o = new Sr(r);
    return { writer: n, out: o };
  }
  static async updateRootsInBytes(e, r) {
    let n = Ir(e);
    await Tr(n);
    let o = $n(r);
    if (Number(n.pos) !== o.length)
      throw new Error(`updateRoots() can only overwrite a header of the same length (old header is ${n.pos} bytes, new header is ${o.length} bytes)`);
    return e.set(o, 0), e;
  }
}, Sr = class {
  constructor(e) {
    this._iterator = e;
  }
  [Symbol.asyncIterator]() {
    if (this._iterating)
      throw new Error("Multiple iterator not supported");
    return this._iterating = true, this._iterator;
  }
};
function Vs() {
  let t = Ms(), { writer: e, iterator: r } = t;
  return { encoder: Rs(e), iterator: r };
}
function Kl(t) {
  if (t === void 0)
    return [];
  if (!Array.isArray(t)) {
    let r = x.asCID(t);
    if (!r)
      throw new TypeError("roots must be a single CID or an array of CIDs");
    return [r];
  }
  let e = [];
  for (let r of t) {
    let n = x.asCID(r);
    if (!n)
      throw new TypeError("roots must be a single CID or an array of CIDs");
    e.push(n);
  }
  return e;
}
a();
var na = J(Zs(), 1), oa = J(ea(), 1);
a();
var rd = /(-?(?:\d+\.?\d*|\d*\.?\d+)(?:e[-+]?\d+)?)\s*([\p{L}]*)/uig;
T.nanosecond = T.ns = 1 / 1e6;
T.\u00B5s = T.\u03BCs = T.us = T.microsecond = 1 / 1e3;
T.millisecond = T.ms = T[""] = 1;
T.second = T.sec = T.s = T.ms * 1e3;
T.minute = T.min = T.m = T.s * 60;
T.hour = T.hr = T.h = T.m * 60;
T.day = T.d = T.h * 24;
T.week = T.wk = T.w = T.d * 7;
T.month = T.b = T.d * (365.25 / 12);
T.year = T.yr = T.y = T.d * 365.25;
function T(t = "", e = "ms") {
  var r = null;
  return t = (t + "").replace(/(\d)[,_](\d)/g, "$1$2"), t.replace(rd, function(n, o, i) {
    i = ta(i), i && (r = (r || 0) + parseFloat(o, 10) * i);
  }), r && r / (ta(e) || 1);
}
function ta(t) {
  return T[t] || T[t.toLowerCase().replace(/s$/, "")];
}
var ra = T;
a();
var ve = class extends Error {
  constructor(e = "request timed out") {
    super(e), this.name = "TimeoutError", this.code = ve.code;
  }
};
ve.code = "ERR_TIMEOUT";
function le(t, e) {
  return (...r) => {
    let n = r[e != null ? e : r.length - 1];
    if (!n || !n.timeout)
      return t(...r);
    let o = typeof n.timeout == "string" ? ra(n.timeout) : n.timeout, i = new na.TimeoutController(o);
    n.signal = (0, oa.anySignal)([n.signal, i.signal]);
    let s = t(...r), u = new Promise((c, g) => {
      i.signal.addEventListener("abort", () => {
        g(new ve());
      });
    }), h = Date.now(), w = () => {
      if (i.signal.aborted)
        throw new ve();
      if (Date.now() - h > o)
        throw i.abort(), new ve();
    };
    return s[Symbol.asyncIterator] ? async function* () {
      let c = s[Symbol.asyncIterator]();
      try {
        for (; ; ) {
          let { value: g, done: B } = await Promise.race([c.next(), u]);
          if (B)
            break;
          w(), yield g;
        }
      } catch (g) {
        throw w(), g;
      } finally {
        i.clear(), c.return && c.return();
      }
    }() : (async () => {
      try {
        let c = await Promise.race([s, u]);
        return w(), c;
      } catch (c) {
        throw w(), c;
      } finally {
        i.clear();
      }
    })();
  };
}
a();
var Be = J(ca(), 1);
Re();
ht();
zn();
Be.default.formatters.b = (t) => t == null ? "undefined" : Y.baseEncode(t);
Be.default.formatters.t = (t) => t == null ? "undefined" : Me.baseEncode(t);
Be.default.formatters.m = (t) => t == null ? "undefined" : Mn.baseEncode(t);
Be.default.formatters.p = (t) => t == null ? "undefined" : t.toString();
Be.default.formatters.c = (t) => t == null ? "undefined" : t.toString();
Be.default.formatters.k = (t) => t == null ? "undefined" : t.toString();
function kr(t) {
  return Object.assign((0, Be.default)(t), { error: (0, Be.default)(`${t}:error`), trace: (0, Be.default)(`${t}:trace`) });
}
qn();
Hn();
a();
Re();
var jn = async ({ cid: t, load: e, seen: r }) => {
  r = r || /* @__PURE__ */ new Set();
  let n = t.toString(Y);
  if (r.has(n))
    return;
  let o = await e(t);
  if (r.add(n), o !== null)
    for (let [, i] of o.links())
      await jn({ cid: i, load: e, seen: r });
};
var pa = kr("ipfs:components:dag:import"), gd = [fa, da];
function ma({ repo: t, preload: e, codecs: r }) {
  async function* n(o, i = {}) {
    i.preload !== false && e(o);
    let s = x.asCID(o);
    if (!s)
      throw new Error(`Unexpected error converting CID type: ${o}`);
    pa(`Exporting ${s} as car`);
    let { writer: u, out: h } = await Qe.create([s]), w = null;
    (async () => {
      try {
        let c = Dd(t, u, { signal: i.signal, timeout: i.timeout }, r);
        await jn({ cid: s, load: c });
      } catch (c) {
        w = c;
      } finally {
        u.close();
      }
    })();
    for await (let c of h) {
      if (w)
        break;
      yield c;
    }
    if (w)
      throw w;
  }
  return le(n);
}
function Dd(t, e, r, n) {
  return async (o) => {
    let i = await n.getCodec(o.code);
    if (!i)
      throw new Error(`Can't decode links in block with codec 0x${o.code.toString(16)} to form complete DAG`);
    let s = await t.blocks.get(o, r);
    return pa(`Adding block ${o} to car`), await e.put({ cid: o, bytes: s }), gd.includes(o.code) ? null : bi({ bytes: s, cid: o, codec: i });
  };
}
a();
var ic = J(wa(), 1), sc = J(Da(), 1);
a();
J(Ku(), 1);
Q();
a();
a();
a();
var ec = (t = 21) => crypto.getRandomValues(new Uint8Array(t)).reduce((e, r) => (r &= 63, r < 36 ? e += r.toString(36) : r < 62 ? e += (r - 26).toString(36).toUpperCase() : r > 62 ? e += "-" : e += "_", e), "");
Ke();
fo();
var ke = "/", tc = new TextEncoder().encode(ke), Vr = tc[0], G = class {
  constructor(e, r) {
    if (typeof e == "string")
      this._buf = co(e);
    else if (e instanceof Uint8Array)
      this._buf = e;
    else
      throw new Error("Invalid key, should be String of Uint8Array");
    if (r == null && (r = true), r && this.clean(), this._buf.byteLength === 0 || this._buf[0] !== Vr)
      throw new Error("Invalid key");
  }
  toString(e = "utf8") {
    return so(this._buf, e);
  }
  uint8Array() {
    return this._buf;
  }
  get [Symbol.toStringTag]() {
    return `Key(${this.toString()})`;
  }
  static withNamespaces(e) {
    return new G(e.join(ke));
  }
  static random() {
    return new G(ec().replace(/-/g, ""));
  }
  static asKey(e) {
    return e instanceof Uint8Array || typeof e == "string" ? new G(e) : e.uint8Array ? new G(e.uint8Array()) : null;
  }
  clean() {
    if ((!this._buf || this._buf.byteLength === 0) && (this._buf = tc), this._buf[0] !== Vr) {
      let e = new Uint8Array(this._buf.byteLength + 1);
      e.fill(Vr, 0, 1), e.set(this._buf, 1), this._buf = e;
    }
    for (; this._buf.byteLength > 1 && this._buf[this._buf.byteLength - 1] === Vr; )
      this._buf = this._buf.subarray(0, -1);
  }
  less(e) {
    let r = this.list(), n = e.list();
    for (let o = 0; o < r.length; o++) {
      if (n.length < o + 1)
        return false;
      let i = r[o], s = n[o];
      if (i < s)
        return true;
      if (i > s)
        return false;
    }
    return r.length < n.length;
  }
  reverse() {
    return G.withNamespaces(this.list().slice().reverse());
  }
  namespaces() {
    return this.list();
  }
  baseNamespace() {
    let e = this.namespaces();
    return e[e.length - 1];
  }
  list() {
    return this.toString().split(ke).slice(1);
  }
  type() {
    return Lh(this.baseNamespace());
  }
  name() {
    return Ph(this.baseNamespace());
  }
  instance(e) {
    return new G(this.toString() + ":" + e);
  }
  path() {
    let e = this.parent().toString();
    return e.endsWith(ke) || (e += ke), e += this.type(), new G(e);
  }
  parent() {
    let e = this.list();
    return e.length === 1 ? new G(ke) : new G(e.slice(0, -1).join(ke));
  }
  child(e) {
    return this.toString() === ke ? e : e.toString() === ke ? this : new G(this.toString() + e.toString(), false);
  }
  isAncestorOf(e) {
    return e.toString() === this.toString() ? false : e.toString().startsWith(this.toString());
  }
  isDecendantOf(e) {
    return e.toString() === this.toString() ? false : this.toString().startsWith(e.toString());
  }
  isTopLevel() {
    return this.list().length === 1;
  }
  concat(...e) {
    return G.withNamespaces([...this.namespaces(), ...Rh(e.map((r) => r.namespaces()))]);
  }
};
function Lh(t) {
  let e = t.split(":");
  return e.length < 2 ? "" : e.slice(0, -1).join(":");
}
function Ph(t) {
  let e = t.split(":");
  return e[e.length - 1];
}
function Rh(t) {
  return [].concat(...t);
}
var _o = J(Yt(), 1);
a();
Q();
var ko = J(Yt(), 1), rc = "/ipfs/";
function Gr(t) {
  if (t instanceof Uint8Array)
    try {
      t = x.decode(t);
    } catch (o) {
      throw (0, ko.default)(o, "ERR_INVALID_CID");
    }
  let e = x.asCID(t);
  if (e)
    return { cid: e, path: void 0 };
  t = t.toString(), t.startsWith(rc) && (t = t.substring(rc.length));
  let r = t.split("/"), n;
  try {
    e = x.parse(r.shift() || "");
  } catch (o) {
    throw (0, ko.default)(o, "ERR_INVALID_CID");
  }
  return r.length && (n = `/${r.join("/")}`), { cid: e, path: n };
}
a();
Q();
a();
new TextDecoder();
a();
new TextEncoder();
a();
Q();
new TextEncoder();
var nc = 112;
new G("/local/filesroot");
var oc = async function(t, e, r, n = {}) {
  let { cid: o, path: i } = Gr(r);
  i && (n.path = i);
  let s = o, u = n.path || "";
  if (u.startsWith("/") && (u = u.substring(1)), n.path)
    try {
      for await (let { value: h, remainderPath: w } of Wr(o, n.path, e, t, { signal: n.signal })) {
        if (!x.asCID(h))
          break;
        u = w, s = h;
      }
    } catch (h) {
      throw h.message.startsWith("Object has no property") && (h.message = `no link named "${u.split("/")[0]}" under ${s}`, h.code = "ERR_NO_LINK"), h;
    }
  return { cid: s, remainderPath: u || "" };
};
var Wr = async function* (t, e, r, n, o) {
  let i = async (w) => {
    let c = await r.getCodec(w.code), g = await n.blocks.get(w, o);
    return c.decode(g);
  }, s = e.split("/").filter(Boolean), u = await i(t), h = t;
  for (; s.length; ) {
    let w = s.shift();
    if (!w)
      throw (0, _o.default)(new Error(`Could not resolve path "${e}"`), "ERR_INVALID_PATH");
    if (t.code === nc && Array.isArray(u.Links)) {
      let c = u.Links.find((g) => g.Name === w);
      if (c) {
        yield { value: c.Hash, remainderPath: s.join("/") }, u = await i(c.Hash), h = c.Hash;
        continue;
      }
    }
    if (Object.prototype.hasOwnProperty.call(u, w))
      u = u[w], yield { value: u, remainderPath: s.join("/") };
    else
      throw (0, _o.default)(new Error(`no link named "${w}" under ${h}`), "ERR_NO_LINK");
    x.asCID(u) && (h = u, u = await i(u));
  }
  yield { value: u, remainderPath: "" };
};
var ac = J(Yt(), 1);
function uc({ codecs: t, repo: e, preload: r }) {
  return le(async function(i, s = {}) {
    if (s.preload !== false && r(i), s.path) {
      let g = s.localResolve ? await (0, ic.default)(Wr(i, s.path, t, e, s)) : await (0, sc.default)(Wr(i, s.path, t, e, s));
      if (!g)
        throw (0, ac.default)(new Error("Not found"), "ERR_NOT_FOUND");
      return g;
    }
    let u = await t.getCodec(i.code), h = await e.blocks.get(i, s);
    return { value: u.decode(h), remainderPath: "" };
  });
}
a();
a();
var Jr = class {
  constructor(e, r, n) {
    this._version = e, this._roots = r, this._iterable = n, this._decoded = false;
  }
  get version() {
    return this._version;
  }
  async getRoots() {
    return this._roots;
  }
}, tt = class extends Jr {
  [Symbol.asyncIterator]() {
    if (this._decoded)
      throw new Error("Cannot decode more than once");
    if (!this._iterable)
      throw new Error("Block iterable not found");
    return this._decoded = true, this._iterable[Symbol.asyncIterator]();
  }
  static async fromBytes(e) {
    let { version: r, roots: n, iterator: o } = await cc(e);
    return new tt(r, n, o);
  }
  static async fromIterable(e) {
    let { version: r, roots: n, iterator: o } = await fc(e);
    return new tt(r, n, o);
  }
};
async function cc(t) {
  if (!(t instanceof Uint8Array))
    throw new TypeError("fromBytes() requires a Uint8Array");
  return lc(Ir(t));
}
async function fc(t) {
  if (!t || typeof t[Symbol.asyncIterator] != "function")
    throw new TypeError("fromIterable() requires an async iterable");
  return lc(js(t));
}
async function lc(t) {
  let e = Hs(t), { version: r, roots: n } = await e.header();
  return { version: r, roots: n, iterator: e.blocks() };
}
var gc = J(hc(), 1), Dc = J(mc(), 1), bc = J(wc(), 1);
var Ec = kr("ipfs:components:dag:import");
function xc({ repo: t }) {
  async function* e(r, n = {}) {
    let o = await t.gcLock.readLock();
    try {
      let i = { signal: n.signal, timeout: n.timeout }, s = (0, gc.default)(r), { value: u, done: h } = await s.peek();
      if (h)
        return;
      u && s.push(u);
      let w;
      u instanceof Uint8Array ? w = [s] : w = s;
      for await (let c of w) {
        let g = await jh(t, i, c);
        if (n.pinRoots !== false)
          for (let B of g) {
            let k = "";
            try {
              await t.blocks.has(B) ? (Ec(`Pinning root ${B}`), await t.pins.pinRecursively(B)) : k = "blockstore: block not found";
            } catch (I) {
              k = I.message;
            }
            yield { root: { cid: B, pinErrorMsg: k } };
          }
      }
    } finally {
      o();
    }
  }
  return le(e);
}
async function jh(t, e, r) {
  let n = await tt.fromIterable(r), o = await n.getRoots();
  return await (0, Dc.default)(t.blocks.putMany((0, bc.default)(n, ({ cid: i, bytes: s }) => (Ec(`Import block ${i}`), { key: i, value: s })), { signal: e.signal })), o;
}
a();
Q();
function Cc({ repo: t, codecs: e, hashers: r, preload: n }) {
  async function o(i, s = {}) {
    let u = s.pin ? await t.gcLock.readLock() : null;
    try {
      let h = await e.getCodec(s.storeCodec || "dag-cbor");
      if (!h)
        throw new Error(`Unknown storeCodec ${s.storeCodec}, please configure additional BlockCodecs for this IPFS instance`);
      if (s.inputCodec) {
        if (!(i instanceof Uint8Array))
          throw new Error("Can only inputCodec on raw bytes that can be decoded");
        let I = await e.getCodec(s.inputCodec);
        if (!I)
          throw new Error(`Unknown inputCodec ${s.inputCodec}, please configure additional BlockCodecs for this IPFS instance`);
        i = I.decode(i);
      }
      let w = s.version != null ? s.version : 1, c = await r.getHasher(s.hashAlg || "sha2-256");
      if (!c)
        throw new Error(`Unknown hash algorithm ${s.hashAlg}, please configure additional MultihashHashers for this IPFS instance`);
      let g = h.encode(i), B = await c.digest(g), k = x.create(w, h.code, B);
      return await t.blocks.put(k, g, { signal: s.signal }), s.pin && await t.pins.pinRecursively(k), s.preload !== false && n(k), k;
    } finally {
      u && u();
    }
  }
  return le(o);
}
a();
function Bc({ repo: t, codecs: e, preload: r }) {
  async function n(o, i = {}) {
    let { cid: s } = Gr(o);
    return i.preload !== false && r(s), oc(t, e, o, i);
  }
  return le(n);
}
var Ac = class {
  constructor({ repo: e, codecs: r, hashers: n, preload: o }) {
    this.export = ma({ repo: e, preload: o, codecs: r }), this.get = uc({ codecs: r, repo: e, preload: o }), this.import = xc({ repo: e }), this.resolve = Bc({ repo: e, codecs: r, preload: o }), this.put = Cc({ repo: e, codecs: r, hashers: n, preload: o });
  }
};
/*!
* The buffer module from node.js, for the browser.
*
* @author   Feross Aboukhadijeh <https://feross.org>
* @license  MIT
*/
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
const code$1 = 0;
const name$1 = "identity";
const encode$2 = coerce;
const digest = (input) => create$1(code$1, encode$2(input));
const identity$1 = {
  code: code$1,
  name: name$1,
  encode: encode$2,
  digest
};
const identity$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  identity: identity$1
}, Symbol.toStringTag, { value: "Module" }));
const identity = from$1({
  prefix: "\0",
  name: "identity",
  encode: (buf) => toString(buf),
  decode: (str) => fromString(str)
});
const identityBase = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  identity
}, Symbol.toStringTag, { value: "Module" }));
const base2 = rfc4648({
  prefix: "0",
  name: "base2",
  alphabet: "01",
  bitsPerChar: 1
});
const base2$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base2
}, Symbol.toStringTag, { value: "Module" }));
const base8 = rfc4648({
  prefix: "7",
  name: "base8",
  alphabet: "01234567",
  bitsPerChar: 3
});
const base8$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base8
}, Symbol.toStringTag, { value: "Module" }));
const base10 = baseX({
  prefix: "9",
  name: "base10",
  alphabet: "0123456789"
});
const base10$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base10
}, Symbol.toStringTag, { value: "Module" }));
const base16 = rfc4648({
  prefix: "f",
  name: "base16",
  alphabet: "0123456789abcdef",
  bitsPerChar: 4
});
const base16upper = rfc4648({
  prefix: "F",
  name: "base16upper",
  alphabet: "0123456789ABCDEF",
  bitsPerChar: 4
});
const base16$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base16,
  base16upper
}, Symbol.toStringTag, { value: "Module" }));
const base36 = baseX({
  prefix: "k",
  name: "base36",
  alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
});
const base36upper = baseX({
  prefix: "K",
  name: "base36upper",
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});
const base36$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base36,
  base36upper
}, Symbol.toStringTag, { value: "Module" }));
const base64 = rfc4648({
  prefix: "m",
  name: "base64",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  bitsPerChar: 6
});
const base64pad = rfc4648({
  prefix: "M",
  name: "base64pad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  bitsPerChar: 6
});
const base64url = rfc4648({
  prefix: "u",
  name: "base64url",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
  bitsPerChar: 6
});
const base64urlpad = rfc4648({
  prefix: "U",
  name: "base64urlpad",
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
  bitsPerChar: 6
});
const base64$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base64,
  base64pad,
  base64url,
  base64urlpad
}, Symbol.toStringTag, { value: "Module" }));
const alphabet = Array.from("\u{1F680}\u{1FA90}\u2604\u{1F6F0}\u{1F30C}\u{1F311}\u{1F312}\u{1F313}\u{1F314}\u{1F315}\u{1F316}\u{1F317}\u{1F318}\u{1F30D}\u{1F30F}\u{1F30E}\u{1F409}\u2600\u{1F4BB}\u{1F5A5}\u{1F4BE}\u{1F4BF}\u{1F602}\u2764\u{1F60D}\u{1F923}\u{1F60A}\u{1F64F}\u{1F495}\u{1F62D}\u{1F618}\u{1F44D}\u{1F605}\u{1F44F}\u{1F601}\u{1F525}\u{1F970}\u{1F494}\u{1F496}\u{1F499}\u{1F622}\u{1F914}\u{1F606}\u{1F644}\u{1F4AA}\u{1F609}\u263A\u{1F44C}\u{1F917}\u{1F49C}\u{1F614}\u{1F60E}\u{1F607}\u{1F339}\u{1F926}\u{1F389}\u{1F49E}\u270C\u2728\u{1F937}\u{1F631}\u{1F60C}\u{1F338}\u{1F64C}\u{1F60B}\u{1F497}\u{1F49A}\u{1F60F}\u{1F49B}\u{1F642}\u{1F493}\u{1F929}\u{1F604}\u{1F600}\u{1F5A4}\u{1F603}\u{1F4AF}\u{1F648}\u{1F447}\u{1F3B6}\u{1F612}\u{1F92D}\u2763\u{1F61C}\u{1F48B}\u{1F440}\u{1F62A}\u{1F611}\u{1F4A5}\u{1F64B}\u{1F61E}\u{1F629}\u{1F621}\u{1F92A}\u{1F44A}\u{1F973}\u{1F625}\u{1F924}\u{1F449}\u{1F483}\u{1F633}\u270B\u{1F61A}\u{1F61D}\u{1F634}\u{1F31F}\u{1F62C}\u{1F643}\u{1F340}\u{1F337}\u{1F63B}\u{1F613}\u2B50\u2705\u{1F97A}\u{1F308}\u{1F608}\u{1F918}\u{1F4A6}\u2714\u{1F623}\u{1F3C3}\u{1F490}\u2639\u{1F38A}\u{1F498}\u{1F620}\u261D\u{1F615}\u{1F33A}\u{1F382}\u{1F33B}\u{1F610}\u{1F595}\u{1F49D}\u{1F64A}\u{1F639}\u{1F5E3}\u{1F4AB}\u{1F480}\u{1F451}\u{1F3B5}\u{1F91E}\u{1F61B}\u{1F534}\u{1F624}\u{1F33C}\u{1F62B}\u26BD\u{1F919}\u2615\u{1F3C6}\u{1F92B}\u{1F448}\u{1F62E}\u{1F646}\u{1F37B}\u{1F343}\u{1F436}\u{1F481}\u{1F632}\u{1F33F}\u{1F9E1}\u{1F381}\u26A1\u{1F31E}\u{1F388}\u274C\u270A\u{1F44B}\u{1F630}\u{1F928}\u{1F636}\u{1F91D}\u{1F6B6}\u{1F4B0}\u{1F353}\u{1F4A2}\u{1F91F}\u{1F641}\u{1F6A8}\u{1F4A8}\u{1F92C}\u2708\u{1F380}\u{1F37A}\u{1F913}\u{1F619}\u{1F49F}\u{1F331}\u{1F616}\u{1F476}\u{1F974}\u25B6\u27A1\u2753\u{1F48E}\u{1F4B8}\u2B07\u{1F628}\u{1F31A}\u{1F98B}\u{1F637}\u{1F57A}\u26A0\u{1F645}\u{1F61F}\u{1F635}\u{1F44E}\u{1F932}\u{1F920}\u{1F927}\u{1F4CC}\u{1F535}\u{1F485}\u{1F9D0}\u{1F43E}\u{1F352}\u{1F617}\u{1F911}\u{1F30A}\u{1F92F}\u{1F437}\u260E\u{1F4A7}\u{1F62F}\u{1F486}\u{1F446}\u{1F3A4}\u{1F647}\u{1F351}\u2744\u{1F334}\u{1F4A3}\u{1F438}\u{1F48C}\u{1F4CD}\u{1F940}\u{1F922}\u{1F445}\u{1F4A1}\u{1F4A9}\u{1F450}\u{1F4F8}\u{1F47B}\u{1F910}\u{1F92E}\u{1F3BC}\u{1F975}\u{1F6A9}\u{1F34E}\u{1F34A}\u{1F47C}\u{1F48D}\u{1F4E3}\u{1F942}");
const alphabetBytesToChars = alphabet.reduce((p2, c, i) => {
  p2[i] = c;
  return p2;
}, []);
const alphabetCharsToBytes = alphabet.reduce((p2, c, i) => {
  p2[c.codePointAt(0)] = i;
  return p2;
}, []);
function encode$1(data) {
  return data.reduce((p2, c) => {
    p2 += alphabetBytesToChars[c];
    return p2;
  }, "");
}
function decode$1(str) {
  const byts = [];
  for (const char of str) {
    const byt = alphabetCharsToBytes[char.codePointAt(0)];
    if (byt === void 0) {
      throw new Error(`Non-base256emoji character: ${char}`);
    }
    byts.push(byt);
  }
  return new Uint8Array(byts);
}
const base256emoji = from$1({
  prefix: "\u{1F680}",
  name: "base256emoji",
  encode: encode$1,
  decode: decode$1
});
const base256emoji$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  base256emoji
}, Symbol.toStringTag, { value: "Module" }));
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();
const name = "json";
const code = 512;
const encode = (node) => textEncoder.encode(JSON.stringify(node));
const decode = (data) => JSON.parse(textDecoder.decode(data));
const json = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  name,
  code,
  encode,
  decode
}, Symbol.toStringTag, { value: "Module" }));
({
  ...identityBase,
  ...base2$1,
  ...base8$1,
  ...base10$1,
  ...base16$1,
  ...base32$1,
  ...base36$1,
  ...base58,
  ...base64$1,
  ...base256emoji$1
});
const hashes = {
  ...sha2,
  ...identity$2
};
const codecs = {
  raw,
  json
};
async function* makeIterable(array) {
  let nextIndex = 0;
  while (nextIndex < array.length) {
    yield array[nextIndex++];
  }
}
class DagRepo extends Ac {
  constructor({ repo, codecs: codecs2, options }) {
    const multihashHashers = Object.values(hashes);
    (options.ipld && options.ipld.hashers ? options.ipld.hashers : []).forEach((hasher) => multihashHashers.push(hasher));
    const hashers = new Multihashes({
      hashers: multihashHashers,
      loadHasher: options.ipld && options.ipld.loadHasher
    });
    super({
      repo,
      codecs: codecs2,
      hashers,
      preload: (cid) => {
        return;
      }
    });
    Object.assign(this, mitt());
    this.repo = repo;
    this.rootCID;
    this.tx = {
      pending: Transaction.create(),
      checkSize: async (data) => {
        const t = Transaction.create();
        await t.add(data);
        return t.size;
      },
      getExistingTx: async () => {
        let existingTx = {};
        try {
          let last = this.tx.pending.last;
          if (!last)
            return;
          let lastBlock = await this.tx.pending.get(last);
          existingTx = lastBlock.value;
        } catch (error) {
          return existingTx;
        }
        return existingTx;
      },
      addData: async (data) => {
        return await this.tx.pending.add(data);
      },
      addTag: async (tag, tagNode) => {
        return await this.tx.add(tag, tagNode);
      },
      add: async (tag, tagNode) => {
        if (!tagNode)
          return;
        tagNode = Object.fromEntries(Object.entries(tagNode).map(([k, v]) => v === void 0 ? [k, null] : [k, v]));
        let prev = false;
        let existingTx = await this.tx.getExistingTx() || null;
        if (existingTx && existingTx[tag]) {
          prev = !!existingTx[tag] ? existingTx[tag] : false;
        } else if (this.rootCID) {
          try {
            let rootObj = (await this.get(this.rootCID)).value;
            prev = !!rootObj[tag] ? rootObj[tag] : false;
          } catch (msg) {
          }
        }
        let tagNodeCid = await this.tx.pending.add(tagNode);
        let filtered = existingTx && Object.keys(existingTx).length !== 0 ? Object.fromEntries(Object.entries(existingTx).filter(([k, v]) => v.hasOwnProperty("obj") && v.hasOwnProperty("prev"))) : null;
        let newBlock = filtered && Object.keys(filtered).length !== 0 ? Object.assign({}, filtered, { [tag]: { obj: tagNodeCid, prev } }) : { [tag]: { obj: tagNodeCid, prev } };
        let txCid = await this.tx.pending.add(newBlock);
        this.emit("added", txCid);
        return txCid;
      },
      commit: async () => {
        let existingTx = await this.tx.getExistingTx();
        let currentDag = {};
        try {
          if (this.rootCID)
            currentDag = (await this.get(this.rootCID)).value;
          let merged = Object.assign({}, currentDag, Object.fromEntries(Object.entries(existingTx).filter(([k, v]) => v.hasOwnProperty("obj") && v.hasOwnProperty("prev"))));
          this.rootCID = await this.tx.pending.add(merged);
        } catch (error) {
          if (this.rootCID)
            console.log("thats odd", { error });
        }
        const buffer = await this.tx.pending.commit();
        await this.importBuffer(buffer);
        this.tx.pending = Transaction.create();
        if (this.rootCID)
          this.emit("rootCID", this.rootCID.toString());
        return buffer;
      }
    };
  }
  async latest(tag, path) {
    const append = path ? `/${path}` : "";
    const res = await this.get(this.rootCID, { path: `/${tag}/obj${append}` });
    return res.value;
  }
  async importBuffers(buffers) {
    let root;
    for (const buffer of buffers) {
      root = await this.importBuffer(buffer);
    }
    return root;
  }
  async importBuffer(buffer) {
    return importBuffer(this, buffer);
  }
}
async function importBuffer(dag2, buffer) {
  const it = await makeIterable([buffer]);
  const [{ root }] = await itAll(dag2.import(it));
  return root.cid;
}
async function createDagRepo(options = {}) {
  const id = {
    name: identity$1.name,
    code: identity$1.code,
    encode: (id2) => id2,
    decode: (id2) => id2
  };
  const blockCodecs = Object.values(codecs);
  [dagCBOR, dagJSON, dagJOSE, id].concat(options.ipld && options.ipld.codecs || []).forEach((codec) => blockCodecs.push(codec));
  const multicodecs = new Multicodecs({
    codecs: blockCodecs,
    loadCodec: options.ipld && options.ipld.loadCodec
  });
  const repoPath = options.path || "ipfs";
  let repo;
  if (options == null ? void 0 : options.persist) {
    repo = createRepo(console.log, multicodecs, {
      path: repoPath,
      autoMigrate: true
    });
  } else {
    repo = createRepo$1(repoPath, (codeOrName) => multicodecs.getCodec(codeOrName), {
      blocks: new MemoryBlockstore(),
      datastore: new MemoryDatastore(),
      root: new MemoryDatastore(),
      keys: new MemoryDatastore(),
      pins: new MemoryDatastore()
    }, options);
  }
  const initConfig = {};
  try {
    await repo.init(initConfig);
    await repo.open();
  } catch (err) {
    throw err;
  }
  const repoConfig = await repo.config.getAll();
  return new DagRepo({
    repo,
    codecs: multicodecs,
    options: { ...options, repoConfig }
  });
}
let dag;
let p2pcf;
const defaultOptions = {
  stateHeartbeatWindowMs: 9e4,
  fastPollingRateMs: 1e3,
  slowPollingRateMs: 6e4,
  workerUrl: "https://p2pcf.douganderson444.workers.dev"
};
const connect = ({
  username = "user-" + Math.floor(Math.random() * 1e5),
  topic = "peerpiper",
  options = defaultOptions,
  handleConnect = () => {
  },
  handleClose = () => {
  },
  handleMsg = () => {
  }
}) => {
  p2pcf = new P2PCF(username, topic, options);
  window.p2pcf = p2pcf;
  p2pcf.on("peerconnect", handleConnect);
  p2pcf.on("peerclose", handleClose);
  p2pcf.on("msg", handleMsg);
};
const disconnect = () => {
  p2pcf.destroy();
  console.log("Disconnected.");
};
const createDag = async ({ persist } = { persist: true }) => {
  if (!dag && !globalThis.dag) {
    dag = await createDagRepo({ persist });
    globalThis.dag = dag;
  } else {
    dag = globalThis.dag;
  }
  return dag;
};
const commitTagData = async ({ dag: dag2, tag, data, key = "compiled", tagNode = {} }) => {
  if (!dag2)
    throw new Error("No dag repo");
  if (!tag)
    throw new Error("No tag");
  if (!data)
    throw new Error("No value");
  const cid = await dag2.tx.addData({ value: data });
  const newTagNode = {
    ...tagNode,
    [key]: cid
  };
  await dag2.tx.addTag(tag, newTagNode);
  const buffer = await dag2.tx.commit();
  return buffer;
};
export {
  commitTagData,
  connect,
  createDag,
  disconnect
};
//# sourceMappingURL=lib-1e1277cc.js.map
