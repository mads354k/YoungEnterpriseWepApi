window.onload = function () {
    $.ajax({
        method: "GET",
        url: "http://localhost:8419/api/timeschedules",
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                $("#tblSchedule").append("<tr><td>"+data[i].eventTime+"</td><td>"+data[i].teamName+"</td><td>"+data[i].judgeTeam+"</td></tr>");
            }
        },
        error: function (data) {
            alert(JSON.stringify(data));
        }
    });
};

$(document).ready(function () {
    $("#bAddSchedule").click(function () {
        var timeSchedule = { judgeTeam: $("#cbJudgeTeam").val(), teamName: $("#tfTeam").val(), eventTime: $("#tfTime").val() };
        $.ajax({
            method: "POST",
            url: "http://localhos:8419/api/timeschedules",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(timeSchedule),
            success: function (data) {
                alert("Time slot added!");
            },
            error: function (data) {
                alert(JSON.stringify(data));
            }
        });
    });

    $("#bResetSchedule").click(function () {
        $.ajax({
            method: "GET",
            url: "http://localhost:8419/api/timeschedules",
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    var scheduleId = data[i].scheduleId;
                    $.ajax({
                        method: "DELETE",
                        url: "http://localhost:8419/api/timeschedules/" + escape(scheduleId),
                        dataType: "json",
                        contentType: "application/json",
                        data: JSON.stringify(data[i]),
                        success: function (data) {

                        },
                        error: function (data) {
                            alert(JSON.stringify(data));
                        }
                    });
                }
            },
            error: function (data) {
                alert(JSON.stringify(data));
            }
        });
    });
});