var fileChooser = document.getElementsByTagName('input')[0];
var content = document.getElementById('content');
//var imageElement = document.getElementById('imageId');

if (typeof window.FileReader === 'undefined') {
    content.className = 'fail';
    content.innerHTML = 'File API &amp; FileReader API are not supported in your browser.  Try on a new-ish Android phone.';
}

fileChooser.onchange = function (e) {
    //e.preventDefault();

    var file = fileChooser.files[0],
        reader = new FileReader();

    reader.onerror = function (event) {
        content.innerHTML = "Error reading file";
    }

    reader.onload = function (event) {
        var img = new Image();

        // files from the Gallery need the URL adjusted
        if (event.target.result && event.target.result.match(/^data:base64/)) {
            img.src = event.target.result.replace(/^data:base64/, 'data:image/jpeg;base64');
        } else {
            img.src = event.target.result;
        }

        // Guess photo orientation based on device orientation, works when taking picture, fails when loading from gallery
        if (navigator.userAgent.match(/mobile/i) && window.orientation === 0) {
            img.height = 250;
            img.className = 'rotate';
            img.id= "imageId";
        } else {
            img.width = 400;
        }

        //imageElement.appendChild(img);
        content.innerHTML = '';
        content.appendChild(img);
    };

    reader.readAsDataURL(file);

    return false;
}

function goBack() {
    window.history.back();
}

saveImage = function (fileName) {
    var base64 = getBase64Image(content.getElementsByTagName("img")[0]);
    //link.setAttribute("href", imgData);
   // link.setAttribute("download", fileName); link.click();
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }
  
