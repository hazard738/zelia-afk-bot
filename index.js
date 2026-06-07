const mineflayer = require('mineflayer');

function launchBot() {
    console.log('Attempting Java 1.21.11 connection to moonvalesmp.xyz:19013...');

    const bot = mineflayer.createBot({
        host: 'moonvalesmp.xyz',
        port: 19013,
        username: 'zelia',
        auth: 'offline',
        version: '1.21.11' // <-- Strictly enforces version 1.21.11
    });

    bot.on('spawn', () => {
        console.log('Success: zelia has successfully spawned into moonvalesmp.xyz running 1.21.11!');
        
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

        // Clicks the center slot (Slot 13) to activate the password prompt
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
            // !!! REPLACE YOUR_PASSWORD_HERE WITH YOUR ACTUAL ACCOUNT PASSWORD !!!
            bot.chat('/login asdasd');
        }
    });

    // Error Reporting
    bot.on('kicked', (reason) => {
        console.log('The bot was actively kicked by MoonVale! Reason: ', reason);
    });

    bot.on('end', () => {
        console.log('Bot connection closed. Reconnecting to moonvalesmp.xyz in 15 seconds...');
        setTimeout(launchBot, 15000);
    });

    bot.on('error', (err) => console.log('System Connection Error Details: ', err.message));
}

launchBot();

