/* This is Revolt bot.js example for use with NodeJS.

 ========= Program startup sequence and execution =========
    3. General Bot start
    4. General Bot information
    5. Bot Status Change
    6. Reply to Guild Messages
    _________Program Startup_____________
    0. Import Libraries
    1. Command Line Token Insertion Support `node bot.js YOUR_BOT_TOKEN` 
    2. Start the bot and login to Revolt
======================================================================== */

/* ----------------------- 0. Import Libraries  ------------------------- */

const { Client } = require("revolt.js");

let client = new Client();

/* ----------------------- 3. General Bot start  ------------------------- */

client.on("ready", async () => {

	// Checks if bot joined any servers yet. Opens a browser tab in Windows 10; Uses bot user id, opens bot invite url 
	if (client.servers.size < 1) {
		const { spawn } = require('node:child_process')
		const command = spawn('explorer', ["https://app.revolt.chat/bot/" + client.user._id])
	}
	
/* ----------------------- 4. General Bot information ------------------------- */
	console.log(`________________________________________`);
	console.log();
	console.log(`Running Revolt Bot.`);
	console.log("Official repository: https://github.com/publicdomain-nocopyright/Portable-NodeJS-Revolt-Bot-Example");
	console.log(`________________________________________`);
	console.log(`Running: ${__filename}`);
	console.log(" |-NodeJS version: " + process.version);
	console.log(`  |-revolt.js version: ${require(__dirname + '/node_modules/revolt.js/package.json').version}`);
	console.log(`  |-revolt.js repository: ${require(__dirname + '/node_modules/revolt.js/package.json').repository}`);
	console.info(`   |-Client API URL: ${client.api.baseURL}`)
	console.info(`   |-Client API version: ${client.configuration.revolt}`)
	
	console.info(`User ID: ${client.user.id}!`);
	console.info(`Logged in as ${client.user.username}!`);
	console.info(`Bot online: ${client.user.online}!`);
	console.info(`Bot is currently in ${client.servers.size()} ${client.servers.size() > 1 ? 'servers' : 'server'}.`);
	console.log(`Invite into more servers: ` + "https://app.revolt.chat/bot/" + client.user.id );
	
/* ----------------------- 5. Bot Status Change ------------------------- */
	
	client.user.edit({
		status: {
			text: "Listening to you.",
			presence: "Idle",
		},
	});
	
	
// Bot set self nickname on all the servers.
	//Split Bot name into two words before displaying
	//const splitWord = client.user.username.replace(/([a-z])([A-Z])/g, '$1 $2'); // nickname: `${splitWord}`
	
	client.servers.forEach(async (values, keys, objects) => {
		await values.member.edit({
			
			nickname: `${values.name}`
			
		});	
	});
	
	
});



/* ----------------------- 6. Reply to Guild Messages  ------------------------- */
// Wait for messages and respond with a message in the guilds where this Bot Exists.
client.on("messageCreate", async (message) => {
	if (message.content === "Hello") {
		
		await message.channel.sendMessage("World");
		
		// Bot Needs permission "ManageMessages"
		//await message.delete();
		return;
	}
	
	// Support for @BotUsername in the chat
	// TODO: Add permissions check
	if (message.authorId !== client.user.id){
		if (message.content.includes(`<@${client.user.id}> ` + "write")) {
			const includedText = message.content.split(`<@${client.user.id}> ` + "write")[1];
			await message.channel.sendMessage(includedText);
			return;

		}
	
		if (message.content.includes(client.user.id)) {
			await message.channel.sendMessage("Hey");
			console.log("Hey");
			return;

		}
	}
});

/* -------------------- 1. Command Line Token Insertion Support --------------------- */
//  SYNTAX: `node bot.js YOUR_BOT_TOKEN` 
//  NOTE: Ignored if bot_token.txt token exists | Inserted into bot_token.txt if file is empty
let bot_token;

(function initializeBotToken() {
	bot_token = process.argv[2];
	
	// Create bot_token.txt file if does not exist.
	const fs = require('fs');
	if (!fs.existsSync("./bot_token.txt")) {
		const stream = fs.createWriteStream('./bot_token.txt');
		stream.write("");
		stream.end();
	}
	
	// Read Bot Token from bot_token.txt file
	if (fs.statSync('./bot_token.txt').size == 0) {
		console.log("NOTE: " + "./bot_token.txt file is empty")
	} else {
		console.log("NOTE: " + "./bot_token.txt file is not empty")
		bot_token = fs.readFileSync('./bot_token.txt','utf8');
		console.log("NOTE: " + "Using bot_token from ./bot_token.txt file")
	}
	
	// Check if bot_token is not undefined
	console.log("Bot token entered: ", bot_token);
	if (bot_token == undefined) {
		console.log("NOTE " + bot_token + " bot token undefined?");
		process.exit(0);
	}
})();
/* ------------------------ 2. Start the bot and login to Revolt------------------------ */
client.loginBot(bot_token);
const readline = require('readline');

// Create a readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



function restartScript() {
  const spawn = require('child_process').spawn;

  const node = process.argv[0]; // Get the path to the Node.js executable
  const script = process.argv[1]; // Get the path to the current script

  spawn(node, [script], { stdio: 'inherit' });
  //process.exit();
}


// Start your bot's work
startBot();

// Function to start your bot's work
function startBot() {
  // Your bot's code and logic goes here
  
  // Example: Display a message every second
}

// Handle user input in the command prompt
rl.on('line', (input) => {
  // Process the user input as needed
  
  // Example: Stop the bot if the user enters "stop"
  if (input === "stop") {
    console.log("Stopping the bot...");
    rl.close(); // Close the readline interface
  }
  
  // Example: Stop the bot if the user enters "stop"
  if (input === "restart") {
  console.log("restarting...");
  restartScript();
  }
  
});



// Handle the readline close event
rl.on('close', () => {
  console.log("Exiting...");
  //process.exit(0); // Exit the Node.js process
});
