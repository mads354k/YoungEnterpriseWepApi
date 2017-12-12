var judgeTeam;
var counter = 0;

window.onload = function () {
    judgeTeam = window.location.hash.substring(1);

    $.ajax({
        method: "GET",
        url: "http://localhost:8419/api/timeSchedules",
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            for (var key in data) {
                if (key["judgeTeam"] === judgeTeam) {
                    $("#tblSchedule").append("<tr><td>" + key["time"] + "</td><td>" + key["teamName"] + "</td></tr>");
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
        window.location = "EvaluateTeamPage.html";
    });
});