# angular-activity
An angularjs module to create the the activity graph which is similar to the github contribution activity.

![demo](https://mskimizd.github.io/2018/04/12/angular-activity/angular-activity.jpg)

## Dependencies
* [AngularJS](https://angularjs.org) (tested with 1.6.9)

## Usage

### Import Resource

```javascript
    <script type="text/javascript" src="angular-activity.js"></script>
    <link rel="stylesheet" href="angular-activity.css" type="text/css" />
```

### Data Format

Activity has 5 levels ( 1 - 5 )

```javascript
    $scope.data = {
        '2018-04-12':3,
        '2018-03-28':4,
        '2018-03-27':1,
        '2018-03-26':3,
        '2018-03-01':1,
        '2018-02-03':5,
        '2018-01-31':1,
        '2018-01-01':2
    };
```

Check full demo code in `demo.html`

## Enjoy :smile:
