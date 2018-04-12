#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const [,, ...args] = process.argv;
const info = {};

args.forEach(arg => {
	const [name, value] = arg.split("=");

	info[name.replace("--", "")] = value;
});

info.path = info.path || "./coverage/lcov.info";
info.detail = (info.detail || "high,medium,low").split(",");

const detail = info.detail;
const dir = process.cwd();
const data = fs.readFileSync(path.resolve(dir, info.path));
const text = data.toString();


let length = 0;





function getCoverage(text) {
	const branches = {
		now: 0,
		all: 0,
	};
	const lines = {
		now: 0,
		all: 0,
	};
	const texts = text.split("\n");

	lines.all = texts.filter(text => /^DA/g.test(text));
	lines.now = lines.all.filter(text => text.indexOf(",0") === -1);
	branches.all = texts.filter(text => /^BRDA/g.test(text));
	branches.now = branches.all.filter(text => !/,0$/g.test(text));
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

	
	const filename = texts[0].replace(dir, "");


	length = Math.max(filename.length, length);
	return {
		lines,
		branches,
		coverage,
		filename,
	};
}

const {coverage, lines, branches} = getCoverage(text);

/*
Statements   : 66.42% ( 819/1233 )
Branches     : 58.1% ( 423/728 )
Functions    : 59.76% ( 49/82 )
Lines        : 66.23% ( 806/1217 ) 
*/
console.log("=============================== Coveralls summary ===============================");
console.log("\x1b[33m\x1B[1m" + `Branches      : ${branches.percent}% (${branches.now} / ${branches.all})`);
console.log("\x1b[33m\x1B[1m" + `Lines         : ${lines.percent}% (${lines.now} / ${lines.all})`);
console.log("\x1b[33m\x1B[1m" + `Coverage      : ${coverage.percent}% (${coverage.now} / ${coverage.all})`);
console.log("\x1b[0m" + "=================================================================================");
const files = text.split("SF:").map(t => getCoverage(t));

if (info.sort === "asc") {
	files.sort((a,b) => a.coverage.percent < b.coverage.percent ? -1 : 1);
} else if (info.sort === "desc") {
	files.sort((a,b) => a.coverage.percent > b.coverage.percent ? -1 : 1);
}

files.forEach(({filename, coverage}) => {
	if (!coverage.all) {
		return;
	}
	let color = "";
	const percent = coverage.percent;

	if (percent > 80) {
		color = "\x1b[32m";
		if (!~detail.indexOf("high")) {
			return;
		}
	} else if (percent > 60) {
		color = "\x1b[33m";
		if (!~detail.indexOf("medium")) {
			return;
		}
	} else {
		color = "\x1b[31m";
		if (!~detail.indexOf("low")) {
			return;
		}
	}
	const margin = new Array(length - filename.length + 10).fill(" ").join("");

	console.log("\x1b[0m\x1B[1m" + `${filename + margin}: ${color}${percent}% (${coverage.now} / ${coverage.all})`);
});
console.log("\x1b[0m" + "=================================================================================");
