window.onload = function () {
    var teams;

    $.ajax({
        method: "GET",
        url: "http://localhost:8419/api/teamscores",
        dataType: "json",
        contentType: "application/json",
        async: false,
        success: function (data) {
            teams = data;
        },
        error: function (data) {
           alert(JSON.stringify(data));
        }
    });

    for (var i = 0; i < teams.length; i++) {
        $.ajax({
            method: "GET",
            url: "http://localhost:8419/api/questionnaries/"+escape(teams[i].questionnarieId),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                $("#tblTeamScore").append("<tr><td>" + teams[i].teamName + "</td><td>" + data.valuation + "</td></tr>");
            },
            error: function (data) {
                alert(JSON.stringify(data));
            }
        });
    }
};