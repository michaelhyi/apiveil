const ws = new WebSocket("http://localhost:3000/ws");

const logs = [];
const logsElement = document.getElementById("logs");

ws.onmessage = (e) => {
    const log = JSON.parse(e.data);

    try {
        log.body = JSON.parse(log.body);
    } catch (e) {
        log.body = log.body;
    }

    log.headers = JSON.parse(log.headers);
    log.id = logs.length;

    console.log(log);

    logs.push(log);
    const innerHtml = getNetworkTrafficLogHtml(log);

    logsElement.innerHTML += innerHtml;
};

function getNetworkTrafficLogHtml(log) {
    const caretHtml = "<p>&rsaquo;</p>";
    const timestampHtml = "<p>" + convertUnixToFormattedDate(log.timestamp) + "</p>";
    const requestHtml = "<p>" + log.method + " " + log.path + "</p>";
    const statusCodeHtml = "<p>" + log.status_code + "</p>";

    return "<div class='network-traffic'>" + caretHtml + timestampHtml + requestHtml + statusCodeHtml + "<button class='analyze-btn' onclick='analyzeLog(" + log.id +  ")'>Analyze</button></div>";
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

async function analyzeLog(logId) {
    const networkLogs = logs.slice(logId-1, logId+1)

    console.log("Analyzing logs: ", networkLogs);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer ",
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    "role": "system",
                    "content": "You are a helpful assistant."
                },
                {
                    "role": "user",
                    "content": "Given the following network request and response logs, can you help me analyze the traffic and provide me tips on debugging?" + JSON.stringify(networkLogs)
                }
            ],
        })
    });

    console.log((await response.json()).choices[0].message.content);
}