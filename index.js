var noodlejs = require('noodlejs');

var heroUrls = [
  '/heroes/abaddon',
  '/heroes/alchemist',
  '/heroes/ancient-apparition',
  '/heroes/anti-mage',
  '/heroes/arc-warden',
  '/heroes/axe',
  '/heroes/bane',
  '/heroes/batrider',
  '/heroes/beastmaster',
  '/heroes/bloodseeker',
  '/heroes/bounty-hunter',
  '/heroes/brewmaster',
  '/heroes/bristleback',
  '/heroes/broodmother',
  '/heroes/centaur-warrunner',
  '/heroes/chaos-knight',
  '/heroes/chen',
  '/heroes/clinkz',
  '/heroes/clockwerk',
  '/heroes/crystal-maiden',
  '/heroes/dark-seer',
  '/heroes/dazzle',
  '/heroes/death-prophet',
  '/heroes/disruptor',
  '/heroes/doom',
  '/heroes/dragon-knight',
  '/heroes/drow-ranger',
  '/heroes/earth-spirit',
  '/heroes/earthshaker',
  '/heroes/elder-titan',
  '/heroes/ember-spirit',
  '/heroes/enchantress',
  '/heroes/enigma',
  '/heroes/faceless-void',
  '/heroes/gyrocopter',
  '/heroes/huskar',
  '/heroes/invoker',
  '/heroes/io',
  '/heroes/jakiro',
  '/heroes/juggernaut',
  '/heroes/keeper-of-the-light',
  '/heroes/kunkka',
  '/heroes/legion-commander',
  '/heroes/leshrac',
  '/heroes/lich',
  '/heroes/lifestealer',
  '/heroes/lina',
  '/heroes/lion',
  '/heroes/lone-druid',
  '/heroes/luna',
  '/heroes/lycan',
  '/heroes/magnus',
  '/heroes/medusa',
  '/heroes/meepo',
  '/heroes/mirana',
  '/heroes/morphling',
  '/heroes/naga-siren',
  '/heroes/natures-prophet',
  '/heroes/necrophos',
  '/heroes/night-stalker',
  '/heroes/nyx-assassin',
  '/heroes/ogre-magi',
  '/heroes/omniknight',
  '/heroes/oracle',
  '/heroes/outworld-devourer',
  '/heroes/phantom-assassin',
  '/heroes/phantom-lancer',
  '/heroes/phoenix',
  '/heroes/puck',
  '/heroes/pudge',
  '/heroes/pugna',
  '/heroes/queen-of-pain',
  '/heroes/razor',
  '/heroes/riki',
  '/heroes/rubick',
  '/heroes/sand-king',
  '/heroes/shadow-demon',
  '/heroes/shadow-fiend',
  '/heroes/shadow-shaman',
  '/heroes/silencer',
  '/heroes/skywrath-mage',
  '/heroes/slardar',
  '/heroes/slark',
  '/heroes/sniper',
  '/heroes/spectre',
  '/heroes/spirit-breaker',
  '/heroes/storm-spirit',
  '/heroes/sven',
  '/heroes/techies',
  '/heroes/templar-assassin',
  '/heroes/terrorblade',
  '/heroes/tidehunter',
  '/heroes/timbersaw',
  '/heroes/tinker',
  '/heroes/tiny',
  '/heroes/treant-protector',
  '/heroes/troll-warlord',
  '/heroes/tusk',
  '/heroes/undying',
  '/heroes/ursa',
  '/heroes/vengeful-spirit',
  '/heroes/venomancer',
  '/heroes/viper',
  '/heroes/visage',
  '/heroes/warlock',
  '/heroes/weaver',
  '/heroes/windranger',
  '/heroes/winter-wyvern',
  '/heroes/witch-doctor',
  '/heroes/wraith-king',
  '/heroes/zeus'
];

function getAllHeroes() {
	var query = {
	  "url": "http://www.dotabuff.com/heroes",
	  "type": "html",
	  "selector": ".hero-grid a",
	  "extract": "href",
	  "userAgent": "User-Agent:Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.110 Safari/537.36",
	  "resultsCachePurgeTime": -1,
	  "pageCachePurgeTime": -1,
	  "cache": false
	};

	noodlejs.query(query).then(function(response) {
		var heroUrls = response.results[0].results;

		if (heroUrls.length > 100) {
			getTopPlayers(heroUrls);
		} else {
			console.error('problem with response.');
		}
	});
}

function getTopPlayers(heroUrls) {
	for (var i = 0; i < 1; i++) {
	// for (var i = 0; i < heroUrls.length; i++) {
		heroUrl = heroUrls[i];

		var query = {
			"url": "http://www.dotabuff.com" + heroUrl + "/players",
			"type": "html",
			"selector": "a.link-type-player",
			"extract": "href",
			// "selector": "tr[data-link-to]",
			// "extract": "data-link-to",
			"userAgent": "User-Agent:Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.110 Safari/537.36",
			"resultsCachePurgeTime": -1,
			"pageCachePurgeTime": -1,
			"cache": false
		}

		noodlejs.query(query).then(function(response) {
			console.log('second', response);
		});
	}
}

function main() {
	// getAllHeroes();
	getTopPlayers(heroUrls);
}

main();