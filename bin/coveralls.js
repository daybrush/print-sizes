#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const args = process.argv[2] || "./coverage/lcov.info";

const branches = {
	now: 0,
	all: 0,
};
const lines = {
	now: 0,
	all: 0,
};
const data = fs.readFileSync(path.resolve(process.cwd(), args));
const texts = data.toString().split("\n");


lines.all = texts.filter(text => /^DA/g.test(text));
lines.now = lines.all.filter(text => text.indexOf(",0") === -1);
branches.all = texts.filter(text => /^BRDA/g.test(text));
branches.now = branches.all.filter(text => !/,0$/g.test(text));

console.log(branches.now.length, branches.all.length);

lines.now = lines.now.length;
lines.all = lines.all.length;
branches.now = branches.now.length;
branches.all = branches.all.length;
const coverage = {
	now: branches.now + lines.now,
	all: branches.all + lines.all,
}

lines.percent = parseInt(lines.now / lines.all * 10000) / 100;
branches.percent = parseInt(branches.now / branches.all * 10000) / 100;
coverage.percent = parseInt(coverage.now / coverage.all * 10000) / 100;

/*
Statements   : 66.42% ( 819/1233 )
Branches     : 58.1% ( 423/728 )
Functions    : 59.76% ( 49/82 )
Lines        : 66.23% ( 806/1217 ) 
*/
console.log("=============================== Coverage summary ===============================");
console.log("\x1b[33m\x1B[1m" + `Branches      : ${branches.percent}% (${branches.now} / ${branches.all})`);
console.log("\x1b[33m\x1B[1m" + `Lines         : ${lines.percent}% (${lines.now} / ${lines.all})`);
console.log("\x1b[33m\x1B[1m" + `Coverage      : ${coverage.percent}% (${coverage.now} / ${coverage.all})`);
console.log("\x1b[0m" + "================================================================================");
