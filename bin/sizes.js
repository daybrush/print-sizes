#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const filesize = require("filesize");
const [,, ...args] = process.argv;
const info = {};

args.forEach((arg, i) => {
	if (i === 0 && !~arg.indexOf("=")) {
		info.path = arg;
		return;
	}
	const [name, value] = arg.split("=");

	info[name.replace("--", "")] = value;
});

info.path = info.path || "./";
const dir = process.cwd();


const list = fs.readdirSync(path.resolve(dir, info.path)).map(file => {
	const stats = fs.statSync(path.resolve(dir, info.path, file));

	if (stats.isDirectory()) {
		return;
	}
	return [file, stats.size];
}).filter(file => file);


const length = list.reduce((v, [filename]) => Math.max(v, filename.length), 0);

const line1 = new Array(length).fill("=").join("");
const line2 = new Array(length  * 2 + 13).fill("=").join("");

console.log(`${line1} Print Sizes ${line1}`);

list.forEach(([filename, size]) => {
	if (info.exclude && new RegExp(info.exclude).test(filename)) {
		return;
	}
	if (info.include && !new RegExp(info.include).test(filename)) {
		return;
	}
	const margin = new Array(length - filename.length + 10).fill(" ").join("");
	console.log("\x1b[0m\x1B[1m" + `${filename + margin}: \x1b[32m${filesize(size)}`);
});
console.log("\x1b[0m" + line2);

