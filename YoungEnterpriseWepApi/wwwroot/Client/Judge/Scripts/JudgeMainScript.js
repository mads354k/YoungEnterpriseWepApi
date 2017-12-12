var judgeTeam;
var scheduleData;
var counter = 0;

window.onload = function () {
    judgeTeam = window.location.hash.substring(1);

    $.ajax({
        method: "GET",
        url: "http://localhost:8419/api/timeSchedules",
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            scheduleData = data;
            for (var i = 0; i < data.length;i++) {
                if (data[i].judgeTeam === judgeTeam) {
                    $("#tblSchedule").append("<tr><td>" + data[i].time + "</td><td>" + data[i].teamName + "</td></tr>");
                }
            }
        },
        error: function (data) {
            alert(JSON.stringify(data));
        }
    });
};

$(document).ready(function () {
    $("#bEvaluateTeam").click(function () {
        window.location.href = "EvaluateTeamPage.html" + "#" + scheduleData[counter].teamName;
    });
});