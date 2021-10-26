//terminal by maki https://maki.cafe/
var username = ""
var msgTimer = false;
var commands = {
	"help": {
		desc: "Shows this page",
		action: function(c) {
			c.print("Here are the commands you can use:");
			for (var i=0; i<Object.keys(commands).length; i++) {
				let key = Object.keys(commands)[i];
				if (commands[key].hidden) continue;
				let usage = (commands[key].usage)? " "+commands[key].usage.trim(): "";
				let desc = (commands[key].desc)? commands[key].desc.trim(): "";
				c.print("    "+key+usage+": "+commands[key].desc);
			}
		}
	},
	"echo": {
		hidden: true,
		action: function(c) {
			if (!c.msg.trim()) {
				c.print("You didnt specify a message! Try \"echo (msg)\"");
				return;
			}

			c.print(c.msg);
		}
	},
	"clear": {
		desc: "Clears the terminal",
		action: function(c) {
			c.clear();
			c.motd();
		}
	},
	"motd": {
		desc: "Shows the message of the day",
		action: function(c) {
			c.motd();
		}
	},
	"name": {
		desc: "set your name",
		usage: "(name)",
		action: function(c) {
			if (!c.msg) { 
				if (!username) {
				c.print("What's your name?");
				terminalInput("name "); return;
				}
				c.print("Hi "+username+"! Type name (name) to change you name."); return;
			}
			username = c.msg.trim();
			c.print("Nice to meet you, "+username+"!")
		}
	},
	"msg": {
		alias: ["message"],
		desc: "Sends a message to me on discord!",
		usage: "(message)",
		action: function(c) {
			if (!username) { 
				c.print("What's your name?");
				terminalInput("name "); return;
			}
			if (!c.msg) {
				c.print("What's your message?");
				terminalInput("msg "); return;
			}
			if (!msgTimer) {
				msgTimer = true;
				//eeee don't abuse please
				// let img = document.createElement("div");
				// img.style.backgroundImage = "url(https://maki.cafe/discord-message?to=pea&name="+escape(username)+"&message="+escape(c.msg)+")";
				// document.body.appendChild(img);
				// setTimeout(function() { document.body.removeChild(img) }.bind(img), 8000);
				c.print("Your message might have been sent!");
				c.print("actually no it never got sent sorry lol");
				setTimeout(function() { msgTimer = false}, 2500); return;
			}
			c.print("AAAAAHHH Please don't spam me!!")
		}
	},
	"page": {
		desc: "Change the page, pagelist to show available pages",
		usage: "(page)",
		action: function(c) {
			switch(c.msg.trim()) {
				case "home": page("home"); break;
				case "about": page("about"); break;
				case "links": page("links"); break;
				case "secret": page("secret"); break;
				case "topsecret": page("topsecret"); break;
				case "": c.print("You need to specify a page"); break;
				default: c.print("That page doesn't exist, try pagelist");
			}
		}
	},
	"pagelist": {
		hidden: true,
		action: function(c) {
			c.print("these are the pages you can visit")
			c.print("    home: the home page")
			c.print("    about: about me!")
			c.print("    links: stuff to click on")
			c.print("    secret: super secret hidden page")
		}
	},
	"earthquake": {
		hidden: true,
		alias: ["shake"],
		action: function(c) {
			c.print("AAAAAAAAAAAAAAAAAAAAAAHHHHHHHHH")
			earthquakeToggle();
		}
	},
	"rainbow": {
		hidden: true,
		action: function(c) {
			rainbowToggle();
			if (!rainbowColorActive) {
				c.print("rainbow mode off :("); return;
			}
			c.print("COLORS!!!");
			// c.print("fuck chrome");
		},
		// block: ["firefox"],
		// block_action: function(c) {
		// 	c.print("get out dont use firefuck")
		// 	setTimeout(function() {
		// 		fuckFirefox(5)
		// 	}, 2000);
		// }
	},
	"rainbowspeed": {
		hidden: true,
		alias: ["speed"],
		usage: "(num)",
		action: function(c) {
			if (!c.msg){ c.print("You need to specify the speed, try speed (num)"); return; }
			let msgInt = parseInt(c.msg);
			rainbowSpeed(msgInt);
		},
		// block: ["firefox"],
		// block_action: function(c) {
		// 	c.print("why are you trying this you can't even use rainbow you firecuck")
		// 	setTimeout(function() {
		// 		fuckFirefox(5)
		// 	}, 3000);
		// }
	},
	"color": {
		alias: ["hue", "colour"],
		desc: "Change the color",
		usage: "(0-360)",
		action: function(c) {
			hueCommand(c.msg);
			c.print("color set to "+c.msg+" degrees");
			// c.print("fuck chrome");
		},
		// block: ["firefox"],
		// block_action: function(c) {
		// 	c.print("firefox more like firegay")
		// 	setTimeout(function() {
		// 		fuckFirefox(5)
		// 	}, 2000);
		// }		
	},
	"animations": {
		desc: "lists animations you can play",
		alias: ["animation"],
		action: function(c) {
			c.print("here is a list of animations you can play");
			c.print("    playall: Plays all animations at once");
			c.print("    akarin: Plays akarin");
			c.print("    tomato: Plays tomato");
			c.print("    ayano: Plays ayano");
		}
	},
	"fun": {
		desc: "lists fun commands",
		action: function(c) {
			c.print("here is a list of fun stuff!");
			c.print("    rainbow: toggles rainbow mode")
			c.print("    rainbowspeed (num): sets the rainbow speed, default is 1 ")
			c.print("    earthquake: AAAAAAAAAAAAAAAAAAAAAAHHHHHHHHH");
		}
	},
	"dumb": {
		desc: "lists dumb commands",
		action: function(c) {
			c.print("here is a list of dumb shit")
			c.print("    coinflip: flips a coin");
			c.print("    8ball: the all knowing 8ball in electric form. it is never wrong");
			c.print("    fortune: tells you your fortune");
			c.print("    flirt: flirts with the user");
			c.print("    lewd: lewds the user");
			c.print("    insult: insults the user");
			c.print("    lart: larts the user");
			c.print("    kill: kills the user");
		}
	},
	"playall": {
		hidden: true,
		action: function(c) {
			akarin(); tomato(); door();
			c.print("I hope you're not wearing headphones");

		}
	},
	"akarin": {
		hidden: true,
		action: function(c) {
			akarin();
			c.print("AKARIN!");
			setTimeout(function() {
				c.print("HI!!!")
			}, 1700);
		}
	},
	"tomato": {
		hidden: true,
		action: function(c) {
			tomato();
			c.print("TOMATO!");

		}
	},
	"ayano": {
		hidden: true,
		action: function(c) {
			door();
			c.print("TOSHINOU KYOUKO!");
		}
	},
	"hello": {
		alias: ["hi", "hey"],
		hidden: true,
		action: function(c) {
			if (!username == ""){
				let result = ['Hello ', 'Hey ', 'hi '][Math.floor(Math.random() * 3)];
				c.print(result+username+"!");
				return;
			}
			let result = ['Hello!', 'Hey cutie!', 'hi!'][Math.floor(Math.random() * 3)];
			c.print(result);
			c.exec("name");
		}
	},
	"same": {
		hidden: true,
		action: function(c) {
			if (Math.floor((Math.random() * 5) + 1) > 1){
				c.print("same"); return;
			}
			c.print("butts");
		}
	},
	"coinflip": {
		hidden: true,
		desc: "flips a coin",
		action: function(c) {
			let result = ['heads', 'tails'][Math.floor(Math.random() * 2)];
			c.print(result);
		}
	},
	"8ball": {
		hidden: true,
		action: function(c) {
			if (!c.msg) { 
			c.print("You need to ask a question!"); return;}
			c.print(c.msg)
			let result = vars.eightball[Math.floor(Math.random() * vars.eightball.length)];
			c.print(result);
		}
	},
	"fortune": {
		hidden: true,
		action: function(c) {
			let result = vars.fortune[Math.floor(Math.random() * vars.fortune.length)];
			c.print(result);
		}
	},
	"lewd": {
		hidden: true,
		action: function(c) {
			let result = vars.lewd[Math.floor(Math.random() * vars.lewd.length)];
			if (!username == ""){
				c.print(result.replace(/\[username\]/gi, username)); return;
			}
			c.print("You have to set a name first!");
			c.exec("name");
		}
	},	
	"insult": {
		hidden: true,
		action: function(c) {
			let result = vars.insult[Math.floor(Math.random() * vars.insult.length)];
			c.print(result);
		}
	},
	"flirt": {
		hidden: true,
		action: function(c) {
			let result = vars.flirt[Math.floor(Math.random() * vars.flirt.length)];
			c.print(result);
		}
	},
	"lart": {
		hidden: true,
		action: function(c) {
			let result = vars.lart[Math.floor(Math.random() * vars.lart.length)];
			if (username){
				c.print(result.replace(/\[username\]/gi, username)); return;
			}
			c.print("You have to set a name first!");
			c.exec("name");
		}
	},	
	"kill": {
		hidden: true,
		action: function(c) {
			let result = vars.kill[Math.floor(Math.random() * vars.kill.length)];
			if (!username == ""){
				c.print(result.replace(/\[username\]/gi, username)); return;
			}
			c.print("You have to set a name first!");
			c.exec("name");
		}
	},
	"game": {
		desc: "play a really cool video game made by me",
		action: function(c) {
			c.print("fuck chrome :c")
			//setTimeout( function() {
			//	document.location = "/game";
			//}, 500)
		}
	},
}

var terminal = new Term({
	id: "term",
	motd: [
		"Welcome!",
		"Type \"help\" for a list of commands.",
		"Type \"name (your name)\" to tell me your name!"
	],
	// block: {
	// 	"firefox": "fuck you use a better browser"
	// },
	error: "Command not found! Try \"help\"",
	cmds: (function() {
		let obj = {};
		for (var i=0; i<Object.keys(commands).length; i++) {
			let key = Object.keys(commands)[i];

			// let block happen
			// let block = false;
			// if (commands[key].block) {
			// 	let blocks = commands[key].block;
			// 	if (blocks.includes("opera")) if ((!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0) block = true;
			// 	if (blocks.includes("firefox")) if (typeof InstallTrigger !== 'undefined') block = true;
			// 	if (blocks.includes("safari")) if (/constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification))) block = true;
			// 	if (blocks.includes("ie")) if (/*@cc_on!@*/false || !!document.documentMode) block = true;
			// 	if (blocks.includes("edge")) if (!isIE && !!window.StyleMedia) block = true;
			// 	if (blocks.includes("chrome")) if (!!window.chrome && !!window.chrome.webstore) block = true;
			// 	if (blocks.includes("blink")) if ((isChrome || isOpera) && !!window.CSS) block = true;
			// }

			// set allias
			if (commands[key].alias) {
				for (var j=0; j<commands[key].alias.length; j++) {
					// if (block) {
					// 	obj[commands[key].alias[j]] = commands[key].block_action;
					// } else {
					obj[commands[key].alias[j]] = commands[key].action;
					// }
				}
			}

			// set action
			// if (block) { 
			// 	obj[key] = commands[key].block_action;
			// } else {
			obj[key] = commands[key].action;
			// }
			
		}; return obj;	
	})()
});

terminal.spawn();