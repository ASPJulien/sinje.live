function fetch (url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.responseText);
}

function idtohash(id) {
    let cleanid = id.replace("custom_level_", "");
    return fetch("https://api.beatsaver.com/maps/hash/"+cleanid).id;
}


let socket = new WebSocket("ws://localhost:2947/socket");

//socket.addEventListener("message", (handshake) => {
 //   let user = fetch("https://scoresaber.com/api/player/basic" + JSON.parse(event.data).playerPlatformId); // or beatleader but FUCK CORS OMG I HATE THIS THING SO MUCH WHERE IS MY 1990 UNSECURE INTERNET
 //   document.getElementById("playerimg").src =  user.avatar;
  //  document.getElementById("playername").innerHTML = user.name;
  //  document.getElementById("playerank").innerHTML =  "#"+user.rank;
  //  document.getElementById("playerpp").innerHTML = user.pp+"pp"; 
//});


socket.addEventListener("message", (event) => {
    console.log(event.data)
    if (JSON.parse(event.data)._event == "mapInfo") {
        map = JSON.parse(event.data).mapInfoChanged;
        document.getElementById("songimg").src =  'data:image/png;base64,' + map.coverRaw;
        document.getElementById("songtitle").innerHTML =  map.name;
        document.getElementById("songsubtitle").innerHTML = `${map.difficulty} | ${map.mapper} (${idtohash(map.level_id)})`;
    }
});

