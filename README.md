# print-coveralls [![npm version](https://badge.fury.io/js/print-coveralls.svg)](https://badge.fury.io/js/print-coveralls)


## Installation
```
$ npm install print-coveralls
```

## How to use
```
print-coveralls
print-coveralls --path=./coverage/lcov.info
print-coveralls --detail=high,medium,low
print-coveralls --detail=medium,low
print-coveralls --sort=asc
print-coveralls --sort=desc
```

* path : coverage information's path.
* detail : show files' coverage to the (high, medium, low)
* sort : Sort files by coverage. (none, asc, desc)

## Output
* Coverage is coveralls's coverage
<img src="https://raw.githubusercontent.com/daybrush/print-coveralls/master/assets/summary.png" style="max-width: 100%;">

```
=============================== Coveralls summary ===============================
Branches      : 58.1% (423 / 728)
Lines         : 66.22% (806 / 1217)
Coverage      : 63.18% (1229 / 1945)
================================================================================
/src/Animator.js                : 43.61% (99 / 227)
/src/EventTrigger.js            : 45% (27 / 60)
/src/Frame.js                   : 97% (162 / 167)
/src/FrameTimeline.js           : 78.43% (40 / 51)
/src/PropertyObject.js          : 65.38% (34 / 52)
/src/SceneItem.js               : 76.16% (262 / 344)
/src/Timeline.js                : 90.24% (37 / 41)
/src/consts.js                  : 100% (15 / 15)
/src/cubicBezier.js             : 15.78% (3 / 19)
/src/utils.js                   : 64.44% (29 / 45)
/src/css/Frame.js               : 93.54% (29 / 31)
/src/css/SceneItem.js           : 46.82% (192 / 410)
/src/css/consts.js              : 57.14% (12 / 21)
/src/css/utils.js               : 17.94% (7 / 39)
/src/utils/color.js             : 7.69% (5 / 65)
/src/utils/dot.js               : 82.03% (105 / 128)
/src/utils/property.js          : 74.34% (171 / 230)
================================================================================
```
