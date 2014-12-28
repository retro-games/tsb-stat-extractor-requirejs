define("definitions/game-stats",[],function(){function e(){return{home:{team:undefined,player:[]},away:{team:undefined,player:[]}}}return e}),define("definitions/team-stats",[],function(){function e(){return{firstDowns:undefined,score:{firstQuarter:undefined,secondQuarter:undefined,thirdQuarter:undefined,fourthQuarter:undefined,"final":undefined},teamId:undefined}}return e}),define("locations/nes/nestopia/original",[],function(){return{FIRST_DOWNS:6429,PLAYER_STATS:5781,SCORES:973,TEAM_IDS:164}}),define("mappers/team-stats",["definitions/team-stats","locations/nes/nestopia/original"],function(e,t){function n(e,n){var r=t.FIRST_DOWNS;e.home.team.firstDowns=n[r++],e.away.team.firstDowns=n[r]}function r(e,n){var r=t.SCORES;e.home.team.score.firstQuarter=parseInt(n[r++].toString(16)),e.home.team.score.secondQuarter=parseInt(n[r++].toString(16)),e.home.team.score.thirdQuarter=parseInt(n[r++].toString(16)),e.home.team.score.fourthQuarter=parseInt(n[r++].toString(16)),e.home.team.score.final=parseInt(n[r++].toString(16)),e.away.team.score.firstQuarter=parseInt(n[r++].toString(16)),e.away.team.score.secondQuarter=parseInt(n[r++].toString(16)),e.away.team.score.thirdQuarter=parseInt(n[r++].toString(16)),e.away.team.score.fourthQuarter=parseInt(n[r++].toString(16)),e.away.team.score.final=parseInt(n[r].toString(16))}function i(e,n){var r=t.TEAM_IDS;e.home.team.teamId=n[r++],e.away.team.teamId=n[r]}return{mapTeamStats:function(t,s){t.home.team=new e,t.away.team=new e,n(t,s),r(t,s),i(t,s)}}}),define("definitions/players/qb-stats",[],function(){function e(){return{passAttempts:undefined,passCompletions:undefined,passYards:undefined,passTouchdowns:undefined,passInterceptions:undefined,rushAttempts:undefined,rushYards:undefined,rushTouchdowns:undefined}}return e}),define("mappers/player-stats",["definitions/players/qb-stats","locations/nes/nestopia/original"],function(e,t){function n(t,n,i){var s;for(var o=0;o<=1;o++)s=new e,s.passAttempts=i[n++],s.passCompletions=i[n++],s.passTouchdowns=i[n++],s.passInterceptions=i[n++],s.passYards=r(i[n++],i[n++]),s.rushAttempts=i[n++],s.rushYards=r(i[n++],i[n++]),s.rushTouchdowns=i[n++],t.push(s);return n}function r(e,t){var n;return t<10?n=e+t*256:n=(new Int16Array(-(256-e))-(255-t)*256)[0],n}return{mapPlayerStats:function(e,r){var i=t.PLAYER_STATS;i=n(e.home.player,i,r)}}}),define("main",["definitions/game-stats","mappers/team-stats","mappers/player-stats"],function(e,t,n){return{create:function(r){var i=new e;return t.mapTeamStats(i,r),n.mapPlayerStats(i,r),i}}}),define(["main"],function(e){return e});