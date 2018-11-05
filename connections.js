//Fuentes consultadas https://scotch.io/tutorials/how-to-use-the-javascript-fetch-api-to-get-data
// Oscar sanchez, 15803
function getChats() {
    fetch('http://34.210.35.174:7000')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);

            // render 
            var chat = document.getElementById("area_mensajes");
            
            while (chat.firstChild) {
                chat.removeChild(chat.firstChild);
            }

            for (var i = 0; i < data.length; i++) {
                var div = document.createElement("div");
                div.style.width = "50%";
                div.style.height = "auto";
                div.style.background = "#043644";
                div.style.padding = "10px";
                div.style.borderRadius = "5px";
                div.style.marginBottom = "10px";
                div.style.fontFamily = "Arial";
                div.style.fontSize = "15px";
                div.style.color = "#fff";
                

                var node = document.createTextNode(data[i].nombre + ": " + data[i].text);

                div.appendChild(node);

                // check if text has urls
                var urls = getUrls(data[i].text);

                if (urls.length > 0) {
                    for (var j = 0; j < urls.length; j++) {
                        var url = urls[j];
                        var frame = document.createElement("iframe");
                        frame.setAttribute("id", url);
                        frame.setAttribute("src", url);
                        frame.style.marginTop = "10px";
                        frame.style.borderRadius = "5px";

                        div.appendChild(frame);
                    }
                }

                chat.appendChild(div);
            }
        })
}

// POST: sends the message
function sendMessage() {
    var _id = document.getElementById("id-entradas").value;
    var text = document.getElementById("text-entradas").value;
    var nombre = document.getElementById("nombre-entradas").value;

    // verify fields

    if (_id === "" || nombre === "" || text === "") {
        // empty fields
        alert("porfavor ingrese todos los campos");
    } else {
        //evitar mas de 140 caracteres

        if (text.length <= 140) {
            console.log('preparando para enviar');
            
            // POST request
            var fd = new FormData();

            fd.append("_id", _id);
            fd.append("text", text);
            fd.append("nombre", nombre);

            var request = new XMLHttpRequest();
            request.open("POST", "http://34.210.35.174:7000");
            request.send(fd);
            
            // refresh
            getChats();

        } else {
            // solo entra si tiene mas de 140 caracteres
            alert("Texto muy largo")
        }
    }    

}

// chequeo de URL
function getUrls(text) {
    var regex = /(https?:\/\/[^\s]+)/g;
    var rawtext = (text || '').toString();
    var urls = [];
    var url;
    var matches = [];

    while ((matches = regex.exec(rawtext)) !== null) {
        var matchUrl = matches[0];
        urls.push(matchUrl);
    }

    return urls;
}