const event = new CustomEvent("change");
export const zf_SetCanvasElemWidth = function (linkName) {
    var canvasElem = document.getElementById("drawingCanvas-" + linkName);
    if (canvasElem !== null && canvasElem.nodeName == 'CANVAS') {
        var imgElem = document.getElementById("img-" + linkName);
        var signContainerSignature = document.getElementById("signContainer-" + linkName);
        canvasElem.width = signContainerSignature.parentNode.offsetWidth;
        if (imgElem) {
            imgElem.setAttribute("class", "signImg");// No I18N
        }
    }
}

export const zf_AddEventListenersToCanvas = function (canvasElem) {
    canvasElem.addEventListener("mousedown", function (event) {
        var context = canvasElem.getContext("2d");// No I18N
        var position = zf_GetXYCoords(event, canvasElem, false);
        context.moveTo(position.X, position.Y);
        context.beginPath();
        var startScribble = function (event) {
            zf_StartScribbling(event, canvasElem, context, false);
        }
        var endScribble = function (event) {
            zf_EndScribbling(event, canvasElem, context, startScribble, endScribble);
        }
        this.addEventListener("mousemove", startScribble, false);
        this.addEventListener("mouseup", endScribble, false);
        this.addEventListener("mouseout", endScribble, false);
        this.addEventListener('touchstart', function (event) {
            position = zf_GetXYCoords(event, canvasElem, true);
            context.moveTo(position.X, position.Y);
            context.beginPath();
            event.preventDefault();
            zf_changeFlag(canvasElem);
        }, false);
        this.addEventListener('touchmove', function (event) {
            zf_StartScribbling(event, canvasElem, context, true);
            event.preventDefault();
            zf_changeFlag(canvasElem);
        }, false);
    });
    var userAgent = window.navigator.userAgent;
    var msie = userAgent.indexOf("MSIE ");
    if (msie > 0) {
        this.addEventListener("keypress", function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                zf_changeFlag(canvasElem);
            }
        });
    }

}

export const zf_ClearSignature = function (signElemID) {
    var signatureElem = document.getElementById(signElemID);
    var signContext = signatureElem.getContext("2d");// No I18N
    signContext.clearRect(0, 0, signatureElem.width, signatureElem.height);
    zf_changeFlag(signatureElem);
}

export const zf_GetXYCoords = function (event, signatureElem, isTouchEvent) {
    var xCoordinate, yCoordinate;
    var signElemLeftPos = zf_GetOffsetLeft(signatureElem);
    var signElemTopPos = zf_GetOffsetTop(signatureElem);

    var xPosition, yPosition;
    if (!isTouchEvent) {
        xPosition = event.clientX;
        yPosition = event.clientY;
    } else {
        xPosition = event.changedTouches[0].clientX;
        yPosition = event.changedTouches[0].clientY;
    }

    if (!isTouchEvent && (event.pageX || event.pageY)) {
        xCoordinate = event.pageX;
        yCoordinate = event.pageY;
    } else if (isTouchEvent && (event.changedTouches[0].pageX || event.changedTouches[0].pageY)) {
        xCoordinate = event.changedTouches[0].pageX;
        yCoordinate = event.changedTouches[0].pageY;
    } else {
        xCoordinate = xPosition + document.body.scrollLeft + document.documentElement.scrollLeft;
        yCoordinate = yPosition + document.body.scrollTop + document.documentElement.scrollTop;
    }
    var xVal = xCoordinate - signElemLeftPos;
    var yVal = yCoordinate - signElemTopPos;
    return {X: xVal, Y: yVal};
}

export const zf_GetOffsetLeft = function (signElem) {
    var rect = signElem.getBoundingClientRect();
    var offSetLeft = document.body.scrollLeft;
    if (offSetLeft == 0) {
        offSetLeft = offSetLeft + rect.left + document.documentElement.scrollLeft;
    } else {
        offSetLeft = offSetLeft + rect.left;
    }
    return offSetLeft;
}

export const zf_GetOffsetTop = function (signElem) {
    var rect = signElem.getBoundingClientRect();
    var offSetTop = document.body.scrollTop;
    if (offSetTop == 0) {
        offSetTop = offSetTop + rect.top + document.documentElement.scrollTop;
    } else {
        offSetTop = offSetTop + rect.top;
    }
    return offSetTop;
}

export const zf_StartScribbling = function (event, canvasElem, context, isTouchEvent) {
    var position = zf_GetXYCoords(event, canvasElem, isTouchEvent);
    context.lineTo(position.X, position.Y);
    context.stroke();
    context.strokeStyle = "#000000"; // No I18N
    zf_changeFlag(canvasElem);
}

export const zf_EndScribbling = function (event, canvasElem, context, startScribleEventListn, endScribleEventListn) {
    context.closePath();
    canvasElem.removeEventListener("mousemove", startScribleEventListn);
    canvasElem.removeEventListener("mouseup", endScribleEventListn);
    canvasElem.removeEventListener("mouseout", endScribleEventListn);
    zf_changeFlag(canvasElem);
}

export const zf_isCanvasEmpty = function (signElemID) {
    const cnv = document.getElementById(signElemID);
    const blank = document.createElement('canvas');
    blank.width = cnv.width;
    blank.height = cnv.height;
    return cnv.toDataURL() === blank.toDataURL();
}
export const zf_changeFlag = function (elm) {
    elm.dispatchEvent(event);
}
export const syncInputWithCanvas = function (input, canvasElem) {
    input.value = canvasElem.toDataURL();
}
export const zf_ValidateSignature = function (objElem) {
    // unused but is a part of it, maybe needs to be used in future
    var linkName = objElem.getAttribute("compname");
    var canvasElem = document.getElementById("drawingCanvas-" + linkName);
    var isValidSign = zf_IsSignaturePresent(objElem, linkName, canvasElem);
    var hiddenSignInputElem = document.getElementById("hiddenSignInput-" + linkName);
    if (isValidSign) {
        hiddenSignInputElem.value = canvasElem.toDataURL();
    } else {
        hiddenSignInputElem.value = "";// No I18N
    }
    return isValidSign;
}

export const zf_MandatoryCheckSignature = function (objElem) {
    // unused but is a part of it, maybe needs to be used in future
    var linkName = objElem.getAttribute("compname");
    var canvasElem = document.getElementById("drawingCanvas-" + linkName);
    var isValid = zf_IsSignaturePresent(objElem, linkName, canvasElem);
    return isValid;
}

export const zf_IsSignaturePresent = function (objElem, linkName, canvasElem) {
    // unused but is a part of it, maybe needs to be used in future
    var context = canvasElem.getContext('2d'); // No I18N
    var canvasWidth = canvasElem.width;
    var canvasHeight = canvasElem.height;
    var canvasData = context.getImageData(0, 0, canvasWidth, canvasHeight);
    var signLen = canvasData.data.length;
    var flag = false;
    for (var index = 0; index < signLen; index++) {
        if (!canvasData.data[index]) {
            flag = false;
        } else if (canvasData.data[index]) {
            flag = true;
            break;
        }
    }
    return flag;
}