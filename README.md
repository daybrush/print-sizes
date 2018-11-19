# print-sizes [![npm version](https://badge.fury.io/js/print-sizes.svg)](https://badge.fury.io/js/print-sizes)

Prints a list of files in the directory.

## Installation
```
$ npm install print-sizes
```

## How to use
```
print-sizes
print-sizes ./dist
print-sizes ./dist --exclude=\\.map
print-sizes ./dist --include=\\.js
print-sizes --include=\\.js
```


## Output

<img src="https://raw.githubusercontent.com/daybrush/print-sizes/master/assets/summary.png" style="max-width: 100%;">

```
================= Print Sizes =================
README.md                  : 1.69 KB
package-lock.json          : 364 B
package.json               : 740 B
===============================================
```
