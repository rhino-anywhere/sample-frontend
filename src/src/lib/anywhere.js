import { initializeLocalConnection } from './initializers/initializeLocalConnection';
import { setupEvents } from './inputHandlers';

export class RhinoAnywhere {
  _videoElement = null;
  _sendChannel = null;
  onMessageReceived = (data) => { console.log("Not subscribed, but you sent " + data)}

  /**
   * Bind to a video element
   * @param {*} videoElement 
   */
  bind(videoElement){
    this._videoElement = videoElement;
  }

  /**
   * Connect to rhino
   * @param {*} url URl to connect to
   */
  async connect(url){
    console.log('Setting up RhinoAnywhere');

    setupEvents(this._videoElement, (data) => {
      this._sendData('input', data);
    });

    // TODO: Setup connection

    // TODO: TODO create public methods to allow us to send command and mouse movements
    let signalChannel;
    let localConnection;

    signalChannel = new WebSocket(url, []);
    localConnection = await initializeLocalConnection(
      signalChannel,
      this._videoElement,
      this.onMessageReceived
    ); //Need to establish vars for data input and output 

    this._sendChannel = localConnection.createDataChannel("sendDataChannel", null);
  }

  /**
   * Execute a command
   * @param {*} string 
   */
  sendCommand(string) {
    this._sendData('command', {
      command: string
    });
  }

  sendResize(w, h) {
    this._sendData('resize', {
      width: w,
      height: h
    });
  }

  sendScroll(y) {
    this._sendData('scroll', {
      amount: y
    });
  }

  /**
   * Send data to connection
   * @param {string} type "input" or "command"
   * @param {Object} data
   */
  _sendData(type, data) {
    var toSend = {
      type: type,
      data: data,
    };

    if("value" in data){
      toSend.data.value = toSend.data.value.toString();
      
    }

    var oldx = toSend.data.x;
    var oldy = toSend.data.y;

    if("x" in data){
      toSend.data.x = oldy;
    }

    if("y" in data){
      toSend.data.y = oldx;
    }

    this._sendChannel.send(JSON.stringify(toSend));
  }
}
