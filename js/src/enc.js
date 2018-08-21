
import crypto from 'crypto';
import $ from "jquery"

window.aes_submit = aes_submit;

function aes_submit(oForm) {
    var params = {};
    for (var i = 0; i < oForm.length; i++) {
        var el = oForm.elements[i];
        if (el.name !== "submit")
            params[el.name] = el.value;
    }

    var encrypted = encrypt_params(params);
    console.log("Original params");
    console.log(params);
    console.log("Encrypted params");
    console.log(encrypted);
    var posting = $.ajax({
        type: oForm.method,
        url: oForm.action,
        data: encrypted,
        success: function (data) {
            console.log("Response after post = " + data);
        }
    });
}


/**
 * @return {string}
 */
function GetKey(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send();
    return xhr.responseText;
}


function encrypt_params(params) {
    const key = GetKey("http://localhost:8080/key_provider.php");
    // const options = {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.ZeroPadding};
    console.log("Fetched key = {" + key + "}");
    console.log("Key length = " + key.length);
    var encrypted = {};
    for (const param in params) {
        var val = params[param].toString();
        var cipher = crypto.createCipheriv('aes-128-ecb', key,'');
        var crypted = cipher.update(val, 'utf8');
        crypted += cipher.final('base64');
        console.log("Final = [" + crypted+']');
        encrypted[param] = crypted;
    }
    return encrypted;
}
