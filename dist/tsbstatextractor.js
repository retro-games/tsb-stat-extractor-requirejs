define("definitions/game-stats",[],function(){function e(){return{home:{team:undefined,player:undefined},away:{team:undefined,player:undefined}}}return e}),define("definitions/team-stats",[],function(){function e(){return{firstDowns:undefined,score:{firstQuarter:undefined,secondQuarter:undefined,thirdQuarter:undefined,fourthQuarter:undefined,"final":undefined},teamId:undefined}}return e}),define("locations/nes/original",[],function(){return{FIRST_DOWNS:6429,SCORES:973,TEAM_IDS:164}}),define("mappers/team-stats",["definitions/team-stats","locations/nes/original"],function(e,t){function n(e,n){e.home.team.firstDowns=n[t.FIRST_DOWNS],e.away.team.firstDowns=n[t.FIRST_DOWNS+1]}function r(e,n){e.home.team.score.firstQuarter=parseInt(n[t.SCORES].toString(16)),e.home.team.score.secondQuarter=parseInt(n[t.SCORES+1].toString(16)),e.home.team.score.thirdQuarter=parseInt(n[t.SCORES+2].toString(16)),e.home.team.score.fourthQuarter=parseInt(n[t.SCORES+3].toString(16)),e.home.team.score.final=parseInt(n[t.SCORES+4].toString(16)),e.away.team.score.firstQuarter=parseInt(n[t.SCORES+5].toString(16)),e.away.team.score.secondQuarter=parseInt(n[t.SCORES+6].toString(16)),e.away.team.score.thirdQuarter=parseInt(n[t.SCORES+7].toString(16)),e.away.team.score.fourthQuarter=parseInt(n[t.SCORES+8].toString(16)),e.away.team.score.final=parseInt(n[t.SCORES+9].toString(16))}function i(e,n){e.home.team.teamId=n[t.TEAM_IDS],e.away.team.teamId=n[t.TEAM_IDS+1]}return{mapTeamStats:function(t,s){t.home.team=new e,t.away.team=new e,n(t,s),r(t,s),i(t,s)}}}),define("main",["definitions/game-stats","mappers/team-stats"],function(e,t){return{create:function(n){var r=new e;return t.mapTeamStats(r,n),r}}}),define(["main"],function(e){return e});