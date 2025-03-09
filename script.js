const ws = new WebSocket("http://localhost:3000/ws");

const logsElement = document.getElementById("logs");

ws.onmessage = (e) => {
    const log = JSON.parse(e.data);
    log.body = JSON.parse(log.body);
    log.headers = JSON.parse(log.headers);

    const innerHtml = getNetworkTrafficLogHtml(log);

    logsElement.innerHTML += innerHtml;
};

function getNetworkTrafficLogHtml(log) {
    const caretHtml = "<p>&rsaquo;</p>";
    const timestampHtml = "<p>" + convertUnixToFormattedDate(log.timestamp) + "</p>";
    const requestHtml = "<p>" + log.method + " " + log.path + "</p>";

    return "<div class='network-traffic'>" + caretHtml + timestampHtml + requestHtml + "</div>";
}

function convertUnixToFormattedDate(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString('en-US', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
}