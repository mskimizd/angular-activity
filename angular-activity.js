'use strict';

(function() {

    var dateFormatTmp = function(day){
        var year = day.getFullYear();
        var month = day.getMonth() + 1;
        month = month<10 ? "0"+month : month;
        var day = day.getDate();
        day = day<10 ? "0"+day : day;
        
        return year+"-"+month+"-"+day;
    }

    angular.module('angular-activity', []).

    directive('ngActivity', [function () {
        return {
            restrict: "E",
            template:"<div class=\"ng-activiy\">"+
                        "<div ng-repeat=\"row in days\" style=\"display: flex;\">"+
                            "<div ng-repeat=\"d in row\" ng-class=\"{'empty':d.empty}\" style=\"background-color:{{d.color}}\" title=\"{{ d.date }}\" class=\"date-block\">"+
                                "<div ng-if=\"d.lattach\" class=\"attach left\">"+
                                    "<span>{{ ::d.lcontent }}</span>"+
                                "</div>"+
                                "<div ng-if=\"d.tattach\" class=\"attach top\">"+
                                    "<span>{{ ::d.tcontent }}</span>"+
                                "</div>"+
                            "</div>"+
                        "</div>"+
                        "<div class=\"scaleplate\">"+
                            "<span class=\"low\">Inactive</span>"+
                            "<div ng-repeat=\"c in colors\" style=\"background-color:{{c}}\" class=\"date-block\"></div>"+
                            "<span class=\"high\">Active</span>"+
                        "</div>"+
                    "</div>",
            scope: {
                data: '='
            },
            link: function(scope, element, attrs) {

                var today = new Date();
                var oneYearAgo = new Date((today.getTime() - 365 * 24 * 3600 * 1000 ));
                var daysInFirstCol = 7 - oneYearAgo.getDay();
                var daysInLastCol = today.getDay();
                var fullColNums = (365-daysInLastCol-daysInFirstCol) / 7;

                var weekMap = ['','Mon','','Wed','','Fri',''];
                var monthMap = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                var colors = ['#ededed','#d6e585','#8bc571','#40a23d','#236427'];

                scope.colors = colors;
                scope.days = [[],[],[],[],[],[],[]];

                var dayCursor = oneYearAgo;
                var weekdayCursor = oneYearAgo.getDay();
                var monthCursor = oneYearAgo.getMonth();

                // Set empty block in first colum
                for(var i=0;i<weekdayCursor;i++){
                    scope.days[i][0] = {
                        date:"",
                        empty:true,
                        lattach:true,
                        lcontent:weekMap[i]
                    }
                }

                // Set left-top Mark 
                scope.days[0][0].tattach = true;
                scope.days[0][0].tcontent = monthMap[oneYearAgo.getMonth()];  

                var rowNo = 0;
                var colNo = 0;
                for(var i=0; i<365; i++){
                    rowNo = weekdayCursor % 7;
                    colNo = parseInt(weekdayCursor / 7); 
                    scope.days[rowNo][colNo] = {
                        date: dateFormatTmp(dayCursor),
                        empty:false,
                        color:colors[ scope.data[dateFormatTmp(dayCursor)] ],
                    }
                    
                    if(colNo==0){
                        scope.days[rowNo][colNo].lattach=true;
                        scope.days[rowNo][colNo].lcontent=weekMap[rowNo];
                    } 
                    
                    if(rowNo==6 && monthCursor != dayCursor.getMonth()){
                        scope.days[0][colNo].tattach=true;
                        scope.days[0][colNo].tcontent= monthMap[dayCursor.getMonth()];
                        monthCursor = dayCursor.getMonth();    
                    }

                    dayCursor = new Date(dayCursor.getTime() + 24 * 3600 * 1000);
                    weekdayCursor = weekdayCursor + 1;

                }

            }
        }
    }]);
    
})();