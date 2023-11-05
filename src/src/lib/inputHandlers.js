var EMPTY = "NA";

var template = {
  method: EMPTY,
  action: EMPTY,
  x: 0,
  y: 0,
  deltax: 0,
  deltay: 0,
  value: EMPTY
}

/**
 * Setup events
 * @param {HTMLVideoElement} element 
 * @param {func} callback that receives the data object
 */
export function setupEvents(element, callback){
  /**
   * create object and send it
   * @param {} input data for the input
   */
  function push(input){
    //validate stuff
    if(!("method" in input)) {
      throw new Error("Missing method in pkg");
    }

    if(!("action" in input)) {
      throw new Error("Missing method in pkg");
    }

    var data = JSON.parse(JSON.stringify(template))

    for(var i in input){
      data[i] = input[i];
    }

    //send
    callback(data)
  }

  element.onmousemove = function (e) {
    push({ 
      method: "mouse", 
      action: "move",
      x: e.offsetX / element.clientWidth, 
      y: e.offsetY / element.clientHeight, 
      deltax: e.movementX / element.clientWidth,
      deltay: e.movementY / element.clientHeight
    });

    e.preventDefault();
  };

  element.onmousedown = function (e) {
    push({ 
      method: "mouse", 
      action: "down",
      x: e.offsetX / element.clientWidth, 
      y: e.offsetY / element.clientHeight, 
      value:e.button
    });
    
    e.preventDefault();
  };

  element.onmouseup = function (e) {
    push({ 
      method: "mouse", 
      action: "up",
      x: e.offsetX / element.clientWidth, 
      y: e.offsetY / element.clientHeight, 
      value:e.button
    });
  }

  element.oncontextmenu = function (e) {
    // This causes issues with mac not being able to use left button.
    //emitMouseUp(e.button, e.offsetX, e.offsetY);
    e.preventDefault();
  };

  window.onkeydown = e => {
    push({
      method: "keyboard", 
      action: "keydown",
      x: e.offsetX / element.clientWidth, 
      y: e.offsetY / element.clientHeight, 
      value: e.keyCode
    });
  }

  window.onkeyup = e => {
    push({
      method: "keyboard", 
      action: "keyup",
      x: e.offsetX / element.clientWidth, 
      y: e.offsetY / element.clientHeight, 
      value: e.keyCode
    });
  }

  if ("onmousewheel" in element) {
    element.onmousewheel = function (e) {
      push({ 
        method: "mouse", 
        action: "scroll",
        x: e.offsetX / element.clientWidth, 
        y: e.offsetY / element.clientHeight, 
        value:e.wheelDelta
      });
      e.preventDefault();
    };
  } else {
    element.addEventListener(
      "DOMMouseScroll",
      function (e) {
        push({ 
          method: "mouse", 
          action: "scroll",
          x: e.offsetX / element.clientWidth, 
          y: e.offsetY / element.clientHeight, 
          value:e.detail * -120
        });
        e.preventDefault();
      },
      false
    );
  }
}

// This is copied from UE. not used yet
function registerTouchEvents(playerElement) {
  // We need to assign a unique identifier to each finger.
  // We do this by mapping each Touch object to the identifier.
  var fingers = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
  var fingerIds = {};

  function rememberTouch(touch) {
    let finger = fingers.pop();
    if (finger === undefined) {
      console.log("exhausted touch indentifiers");
    }
    fingerIds[touch.identifier] = finger;
  }

  function forgetTouch(touch) {
    fingers.push(fingerIds[touch.identifier]);
    delete fingerIds[touch.identifier];
  }

  function emitTouchData(type, touches) {
    let data = new DataView(new ArrayBuffer(2 + 6 * touches.length));
    data.setUint8(0, type);
    data.setUint8(1, touches.length);
    let byte = 2;
    for (let t = 0; t < touches.length; t++) {
      let touch = touches[t];
      let x = touch.clientX - playerElement.offsetLeft;
      let y = touch.clientY - playerElement.offsetTop;
      if (print_inputs) {
        console.log(`F${fingerIds[touch.identifier]}=(${x}, ${y})`);
      }
      let coord = normalizeAndQuantizeUnsigned(x, y);
      data.setUint16(byte, coord.x, true);
      byte += 2;
      data.setUint16(byte, coord.y, true);
      byte += 2;
      data.setUint8(byte, fingerIds[touch.identifier], true);
      byte += 1;
      data.setUint8(byte, 255 * touch.force, true); // force is between 0.0 and 1.0 so quantize into byte.
      byte += 1;
    }
    sendInputData(data.buffer);
  }

  if (inputOptions.fakeMouseWithTouches) {
    var finger = undefined;

    playerElement.ontouchstart = function (e) {
      if (finger === undefined) {
        let firstTouch = e.changedTouches[0];
        finger = {
          id: firstTouch.identifier,
          x: firstTouch.clientX - playerElementClientRect.left,
          y: firstTouch.clientY - playerElementClientRect.top,
        };
        // Hack: Mouse events require an enter and leave so we just
        // enter and leave manually with each touch as this event
        // is not fired with a touch device.
        playerElement.onmouseenter(e);
        emitMouseDown(MouseButton.MainButton, finger.x, finger.y);
      }
      e.preventDefault();
    };

    playerElement.ontouchend = function (e) {
      for (let t = 0; t < e.changedTouches.length; t++) {
        let touch = e.changedTouches[t];
        if (touch.identifier === finger.id) {
          let x = touch.clientX - playerElementClientRect.left;
          let y = touch.clientY - playerElementClientRect.top;
          emitMouseUp(MouseButton.MainButton, x, y);
          // Hack: Manual mouse leave event.
          playerElement.onmouseleave(e);
          finger = undefined;
          break;
        }
      }
      e.preventDefault();
    };

    playerElement.ontouchmove = function (e) {
      for (let t = 0; t < e.touches.length; t++) {
        let touch = e.touches[t];
        if (touch.identifier === finger.id) {
          let x = touch.clientX - playerElementClientRect.left;
          let y = touch.clientY - playerElementClientRect.top;
          emitMouseMove(x, y, x - finger.x, y - finger.y);
          finger.x = x;
          finger.y = y;
          break;
        }
      }
      e.preventDefault();
    };
  } else {
    playerElement.ontouchstart = function (e) {
      // Assign a unique identifier to each touch.
      for (let t = 0; t < e.changedTouches.length; t++) {
        rememberTouch(e.changedTouches[t]);
      }

      if (print_inputs) {
        console.log("touch start");
      }
      emitTouchData(MessageType.TouchStart, e.changedTouches);
      e.preventDefault();
    };

    playerElement.ontouchend = function (e) {
      if (print_inputs) {
        console.log("touch end");
      }
      emitTouchData(MessageType.TouchEnd, e.changedTouches);

      // Re-cycle unique identifiers previously assigned to each touch.
      for (let t = 0; t < e.changedTouches.length; t++) {
        forgetTouch(e.changedTouches[t]);
      }
      e.preventDefault();
    };

    playerElement.ontouchmove = function (e) {
      if (print_inputs) {
        console.log("touch move");
      }
      emitTouchData(MessageType.TouchMove, e.touches);
      e.preventDefault();
    };
  }
}