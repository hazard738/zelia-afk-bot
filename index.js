const mineflayer = require('mineflayer');

function launchBot() {
    const bot = mineflayer.createBot({
        host: 'moonvalesmp.xyz',
        port: 19013,
        username: 'zelia',
        auth: 'offline',
        version: '1.21.1' // <-- Add this line to enforce the server version matching
    });
    bot.on('spawn', () => {
        console.log('Success: zelia has successfully spawned into moonvalesmp.xyz!');
        
        // Anti-AFK Routine: Simulates jumping every 12 seconds
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 400);
        }, 12000);
    });

    // LISTENER FOR THE LOGIN UI INTERFACE (CHEST GUI)
    bot.on('windowOpen', async (window) => {
        console.log(`Login UI detected! Title: ${window.title || 'Inventory Menu'}`);
        
        // Wait 1.5 seconds for safety so the server handles the screen load properly
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Most servers put the login barrier item right in the middle (Slot 13). 
        try {
            await bot.clickWindow(13, 0, 0); 
            console.log('Clicked the Login UI button.');
        } catch (err) {
            console.log('Failed to click UI slot:', err.message);
        }
    });

    // Auto-Login Response: Executes your login text password right after the UI prompts it
    bot.on('chat', (username, message) => {
        const msg = message.toLowerCase();
        if (msg.includes('/register') || msg.includes('/login')) {
            // CHANGE YOUR_PASSWORD_HERE TO YOUR ACTUAL ACCOUNT PASSWORD:
            bot.chat('/login asdasd');
        }
    });

    bot.on('end', () => {
        console.log('Bot disconnected. Reconnecting to moonvalesmp.xyz in 10 seconds...');
        setTimeout(launchBot, 10000);
    });

    bot.on('error', (err) => console.log('Error encountered: ', err));
}

launchBot();
