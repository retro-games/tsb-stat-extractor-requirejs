define("save-states",[],function(){return{NES_NESTOPIA:{LENGTH:13165,TYPE:"NES - Nestopia",UID:"something"},UNKNOWN:{TYPE:"Unknown"}}}),define("detector",["save-states"],function(e){return{detect:function(t){var n=e.UNKNOWN;return t.length===e.NES_NESTOPIA.LENGTH&&(n=e.NES_NESTOPIA),n}}}),define("definitions/game-stats",[],function(){function e(e){return{saveStateType:e,home:{team:undefined,player:[]},away:{team:undefined,player:[]}}}return e}),define("attributes/condition",[],function(){return{AVERAGE:"average",BAD:"bad",EXCELLENT:"excellent",GOOD:"good",getValue:function(e){var t="";switch(e){case"00":t=this.BAD;break;case"01":t=this.AVERAGE;break;case"10":t=this.GOOD;break;case"11":t=this.EXCELLENT}return t}}}),define("attributes/health",[],function(){return{DOUBTFUL:"doubtful",HEALTHY:"healthy",PROBABLE:"probable",QUESTIONABLE:"questionable",getValue:function(e){var t="";switch(e){case"00":t=this.HEALTHY;break;case"01":t=this.PROBABLE;break;case"10":t=this.QUESTIONABLE;break;case"11":t=this.DOUBTFUL}return t}}}),define("definitions/players/qb-stats",[],function(){function e(){return{condition:undefined,health:undefined,passAttempts:undefined,passCompletions:undefined,passYards:undefined,passTouchdowns:undefined,passInterceptions:undefined,rushAttempts:undefined,rushYards:undefined,rushTouchdowns:undefined}}return e}),define("definitions/players/off-player-stats",[],function(){function e(){return{condition:undefined,health:undefined,rushAttempts:undefined,rushYards:undefined,rushTouchdowns:undefined,receptions:undefined,recYards:undefined,recTouchdowns:undefined,kickReturns:undefined,kickReturnYards:undefined,kickReturnTouchdowns:undefined,puntReturns:undefined,puntReturnYards:undefined,puntReturnTouchdowns:undefined}}return e}),define("definitions/players/def-player-stats",[],function(){function e(){return{condition:undefined,sacks:undefined,interceptions:undefined,intYards:undefined,intTouchdowns:undefined}}return e}),define("definitions/players/kick-stats",[],function(){function e(){return{condition:undefined,fieldGoalAttempts:undefined,fieldGoalsMade:undefined,extraPointAttempts:undefined,extraPointsMade:undefined}}return e}),define("definitions/players/punt-stats",[],function(){function e(){return{condition:undefined,punts:undefined,puntYards:undefined}}return e}),define("extractors/nes/player-stats",["attributes/condition","attributes/health","definitions/players/qb-stats","definitions/players/off-player-stats","definitions/players/def-player-stats","definitions/players/kick-stats","definitions/players/punt-stats"],function(e,t,n,r,i,s,o){function u(e,t){var n,r,i;return t<10?i=e+t*256:(r=Math.abs(256-e)*-1,n=Math.abs((255-t)*256)*-1,i=r+n),i}function a(e,t,r){var i,s;for(i=0;i<2;i++)s=new n,s.passAttempts=r[t++],s.passCompletions=r[t++],s.passTouchdowns=r[t++],s.passInterceptions=r[t++],s.passYards=u(r[t++],r[t++]),s.rushAttempts=r[t++],s.rushYards=u(r[t++],r[t++]),s.rushTouchdowns=r[t++],e.push(s);return t}function f(e,t,n){var i,s;for(i=0;i<10;i++)s=new r,s.receptions=n[t++],s.recYards=u(n[t++],n[t++]),s.recTouchdowns=n[t++],s.kickReturns=n[t++],s.kickReturnYards=u(n[t++],n[t++]),s.kickReturnTouchdowns=n[t++],s.puntReturns=n[t++],s.puntReturnYards=u(n[t++],n[t++]),s.puntReturnTouchdowns=n[t++],s.rushAttempts=n[t++],s.rushYards=u(n[t++],n[t++]),s.rushTouchdowns=n[t++],e.push(s);return t}function l(e,t,n){var r,s;for(r=0;r<11;r++)s=new i,s.sacks=n[t++],s.interceptions=n[t++],s.intYards=u(n[t++],n[t++]),s.intTouchdowns=n[t++],e.push(s);return t}function c(e,t,n){var r=new s;return r.fieldGoalAttempts=n[t++],r.fieldGoalsMade=n[t++],r.extraPointAttempts=n[t++],r.extraPointsMade=n[t++],e.push(r),t}function h(e,t,n){var r=new o;return r.punts=n[t++],r.puntYards=u(n[t++],n[t++]),e.push(r),t}function p(e,n,r){var i,s,o,u,a,f,l;f="";for(o=0;o<3;o++){i=r[n++].toString(2);for(u=i.length;u<8;u++)i="0"+i;f+=i}for(a=0;a<12;a++)l=a*2,s=l+2,e[a].health=t.getValue(f.substring(l,s));return n}function d(t,n,r){var i,s,o,u,a,f,l;f="";for(o=0;o<8;o++){i=r[n++].toString(2);for(u=i.length;u<8;u++)i="0"+i;f+=i}for(a=0;a<25;a++)l=a*2,s=l+2,t[a].condition=e.getValue(f.substring(l,s))}function v(e,t,n){t=a(e,t,n),t=f(e,t,n),t=l(e,t,n),t=c(e,t,n),t=h(e,t,n),t+=8,t=p(e,t,n),d(e,t,n)}return{mapPlayerStats:function(e,t,n){v(e.home.player,n.PLAYER_STATS_HOME,t),v(e.away.player,n.PLAYER_STATS_AWAY,t)}}}),define("definitions/team-stats",[],function(){function e(){return{firstDowns:undefined,score:{firstQuarter:undefined,secondQuarter:undefined,thirdQuarter:undefined,fourthQuarter:undefined,"final":undefined},teamId:undefined}}return e}),define("extractors/nes/team-stats",["definitions/team-stats"],function(e){function t(e,t,n){var r=n.FIRST_DOWNS;e.home.team.firstDowns=t[r++],e.away.team.firstDowns=t[r]}function n(e,t,n){var r=n.SCORES;e.home.team.score.firstQuarter=parseInt(t[r++].toString(16),10),e.home.team.score.secondQuarter=parseInt(t[r++].toString(16),10),e.home.team.score.thirdQuarter=parseInt(t[r++].toString(16),10),e.home.team.score.fourthQuarter=parseInt(t[r++].toString(16),10),e.home.team.score.final=parseInt(t[r++].toString(16),10),e.away.team.score.firstQuarter=parseInt(t[r++].toString(16),10),e.away.team.score.secondQuarter=parseInt(t[r++].toString(16),10),e.away.team.score.thirdQuarter=parseInt(t[r++].toString(16),10),e.away.team.score.fourthQuarter=parseInt(t[r++].toString(16),10),e.away.team.score.final=parseInt(t[r].toString(16),10)}function r(e,t,n){var r=n.TEAM_IDS;e.home.team.teamId=t[r++],e.away.team.teamId=t[r]}return{mapTeamStats:function(i,s,o){i.home.team=new e,i.away.team=new e,t(i,s,o),n(i,s,o),r(i,s,o)}}}),define("extractors/nes/nestopia/original",["definitions/game-stats","extractors/nes/player-stats","extractors/nes/team-stats"],function(e,t,n){return{LOCATION:{FIRST_DOWNS:6429,PLAYER_STATS_HOME:5781,PLAYER_STATS_AWAY:6042,SCORES:973,TEAM_IDS:164},inject:function(r,i,s){e=r,t=i,n=s},extract:function(r,i){var s=new e(i);return n.mapTeamStats(s,r,this.LOCATION),t.mapPlayerStats(s,r,this.LOCATION),s}}}),define("main",["detector","save-states","extractors/nes/nestopia/original"],function(e,t,n){return{inject:function(t,r){e=t,n=r},create:function(r){var i,s;s=e.detect(r);if(s!==t.NES_NESTOPIA)throw"Unexpected save state type.";return i=n.extract(r,s.TYPE),i}}}),define(["main"],function(e){return e});