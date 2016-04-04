var Xray = require('x-ray');
var x = Xray();
var fs = require('fs');

// Global config
var playersPerHero = 15;
var matchesPerPlayer = 15;

function getAllHeroes() {
	var query = {
		"url": "http://www.dotabuff.com/heroes",
		"scope": ".hero-grid",
		"selector": ["a@href"],
	};

	x(query.url, query.scope, query.selector)(function(err, response) {
		var heroUrls = response;

		if (heroUrls.length > 100) {
			getTopPlayers(heroUrls);
		} else {
			console.error('problem with response.');
		}
	});
}

function getTopPlayers(heroUrls) {
	var i = 0;

	function getTopPlayer(heroUrl) {
		var query = {
			"url": heroUrl + "/players",
			"scope": "table.sortable",
			"selector": ["tr@data-link-to"],
		}

		x(query.url, query.scope, query.selector)(function(err, response) {
			response.splice(0, 1); // (remove useless value picked up.)
			getPlayerMatches(response);
			i++;
			if (heroUrls[i]) {
				getTopPlayer(heroUrls[i]);
			}
		});
	}

	getTopPlayer(heroUrls[i]);
}

function getPlayerMatches(playersMatches) {
	var i = 0;

	function getPlayerMatch(playerMatches) {
		var query = {
			"url": "http://www.dotabuff.com" + playerMatches,
			"scope": "td.cell-large",
			"selector": ["a@href"],
		}

		x(query.url, query.scope, query.selector)(function(err, response) {
			var matchUrls = response;

			if (matchUrls) {
				for (var j = 0; j < matchesPerPlayer; j++) {
					var matchUrl = matchUrls[j];
					var matchId = matchUrl.split("matches/").pop().trim();
					fs.appendFileSync("./top-player-match-ids.txt", matchId + "\r\n");
				}
			}

			i++;

			if (playersMatches[i] && i < playersPerHero) {
				getPlayerMatch(playersMatches[i]);
			}

			// console.log('third', response);
		});
	}

	getPlayerMatch(playersMatches[i]);
}

function main() {
	fs.writeFileSync("./top-player-match-ids.txt", ""); // clear the match ids
	getAllHeroes();
}

main();