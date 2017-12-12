window.onload = function () {
    $.ajax({
        method: "GET",
        url: "http://localhost:8419/api/teams",
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            for (var i = 0; i < data.length;i++) {
                if (data[i].participant == true) {
                    $("#tblPaticipatingTeams").append("<tr><td>" + data[i].teamName + "</td><td>" + data[i].track + "</td><td>" + data[i].school + "</td></tr>");
                }
            }
        },
        error: function (data) {
            alert(JSON.stringify(data));
        }
    });
};