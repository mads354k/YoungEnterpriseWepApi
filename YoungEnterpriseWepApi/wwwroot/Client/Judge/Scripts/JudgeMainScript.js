var judgeTeam;
var teamName;
var counter = 0;

window.onload = function () {
    judgeTeam = window.location.hash.substring(1);

    $.ajax({
        method: "GET",
        url: "http://localhost:8419/api/timeSchedules",
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            var index = 0;
            for (var i = 0; i < data.length;i++) {
                if (data[i].judgeTeam === judgeTeam) {
                    $("#tblSchedule").append("<tr><td>" + data[i].time + "</td><td>" + data[i].teamName + "</td></tr>");
                    if (index == counter) {
                        teamName = data[i].teamName;
                    }
                    index++;
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
        counter++;
        $("#bEvaluateTeam").val("Evaluate next team");
        window.location.href = "EvaluateTeamPage.html" + "#" + teamName;
    });
});