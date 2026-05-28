require('dotenv').config();

const express = require('express');
const app = express();
const fs = require('fs');

const ADMIN_PASSWORD = 'changestatus';
let botStatus = 'ONLINE';

if (fs.existsSync('./status.json')) {
    try {
        botStatus = JSON.parse(
            fs.readFileSync('./status.json', 'utf8')
        ).status || 'ONLINE';
    } catch {}
}

function saveStatus() {
    fs.writeFileSync(
        './status.json',
        JSON.stringify({ status: botStatus }, null, 2)
    );
}

const PORT = process.env.PORT || 3000;
app.get('/admin', (req, res) => {
    res.send(`
    <html>
    <body style="background:#111827;color:white;font-family:Arial;padding:40px;">
        <h1>LazR Verify Admin</h1>

        <form method="POST" action="/changestatus">
            <input
                type="password"
                name="password"
                placeholder="Password"
                style="padding:10px;"
            >

            <br><br>

            <button name="status" value="ONLINE">
                Set Online
            </button>

            <button name="status" value="OFFLINE">
                Set Offline
            </button>
        </form>

        <p>Current Status: ${botStatus}</p>
    </body>
    </html>
    `);
});

app.use(express.urlencoded({ extended: true }));

app.post('/changestatus', (req, res) => {

    const { password, status } = req.body;

    if (password !== ADMIN_PASSWORD) {
        return res.status(403).send('Wrong password');
    }

    if (status === 'ONLINE' || status === 'OFFLINE') {
        botStatus = status;
        saveStatus();
    }

    res.redirect('/admin');
});
app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>LazR Verify</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style>
        *{
            margin:0;
            padding:0;
            box-sizing:border-box;
            font-family:Arial, sans-serif;
        }

        body{
            background:linear-gradient(-45deg,#0f172a,#111827,#1e293b,#2563eb);
            background-size:400% 400%;
            animation:gradient 15s ease infinite;
            color:white;
            min-height:100vh;
            display:flex;
            justify-content:center;
            align-items:center;
            overflow:hidden;
        }

        @keyframes gradient{
            0%{background-position:0% 50%;}
            50%{background-position:100% 50%;}
            100%{background-position:0% 50%;}
        }

        .container{
            text-align:center;
            max-width:800px;
            padding:40px;
        }

        .logo{
            font-size:4rem;
            margin-bottom:10px;
        }

        h1{
            font-size:3rem;
            margin-bottom:10px;
        }

        .status{
            display:inline-block;
            background:#16a34a;
            padding:10px 20px;
            border-radius:999px;
            margin:15px 0;
            font-weight:bold;
        }

        .description{
            opacity:.9;
            margin-bottom:30px;
            line-height:1.6;
        }

        .buttons{
            display:flex;
            justify-content:center;
            gap:15px;
            flex-wrap:wrap;
        }

        .btn{
            text-decoration:none;
            color:white;
            background:#2563eb;
            padding:14px 28px;
            border-radius:12px;
            transition:.3s;
        }

        .btn:hover{
            transform:translateY(-3px);
        }

        .secondary{
            background:#111827;
            border:1px solid #374151;
        }

        .stats{
            display:flex;
            justify-content:center;
            gap:20px;
            flex-wrap:wrap;
            margin-top:40px;
        }

        .card{
            background:rgba(17,24,39,.8);
            backdrop-filter:blur(10px);
            padding:20px;
            border-radius:15px;
            min-width:180px;
        }

        .number{
            font-size:2rem;
            font-weight:bold;
            color:#60a5fa;
        }

        .footer{
            margin-top:40px;
            opacity:.7;
        }
    </style>
</head>
<body>

<div class="container">

    <div class="logo">🤖</div>

    <h1>LazR Bot</h1>

<div class="status" style="
background:${botStatus === 'ONLINE' ? '#16a34a' : '#dc2626'};
">
    ${botStatus === 'ONLINE'
        ? '✅ ONLINE'
        : '🔴 OFFLINE'}
</div>

    <p class="description">
        Powerful Discord verification, moderation and community protection bot.
        Running 24/7 on secure cloud hosting.
    </p>

    <div class="buttons">
        <a class="btn"
           href="https://discord.com/oauth2/authorize?client_id=1507918274535358644&scope=bot%20applications.commands&permissions=8"
           target="_blank">
           Invite Bot
        </a>

        <a class="btn secondary"
           href="https://discord.gg/uSdMgX2mwT"
           target="_blank">
           Support Server
        </a>
    </div>

    <div class="stats">
        <div class="card">
            <div class="number">24/7</div>
            <div>Uptime</div>
        </div>

        <div class="card">
            <div class="number">100%</div>
            <div>Verification</div>
        </div>

        <div class="card">
            <div class="number">Secure</div>
            <div>Protection</div>
        </div>
    </div>

    <div class="footer">
        LazR Verify © 2026
    </div>

</div>

</body>
</html>
    `);
});

app.listen(PORT, () => {
    console.log(`Web server running on port ${PORT}`);
});

const {
    Client,
    GatewayIntentBits,
    Collection
} = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();

// LOAD COMMANDS
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
    const commandFiles = fs
        .readdirSync(`./commands/${folder}`)
        .filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.data.name, command);
    }
}

// LOAD EVENTS
const eventFiles = fs
    .readdirSync('./events')
    .filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);

    if (event.once) {
        client.once(event.name, (...args) =>
            event.execute(...args, client)
        );
    } else {
        client.on(event.name, (...args) =>
            event.execute(...args, client)
        );
    }
}

client.login(process.env.TOKEN);