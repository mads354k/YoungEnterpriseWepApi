var personId;

window.onload = function () {
    personId = window.location.hash.substring(1);
};

$(document).ready(function () {
    $("#bCreateTeam").click(function () {
        var team = { teamName: $("#tfTeamName").val(), track: $("#cbTrack").val(), school: $("#tfSchool").val(), participant: false };

        $.ajax({
            method: "POST",
            url: "http://localhost:8419/api/teams",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(team),
            success: function (data) {
                $.ajax({
                    method: "GET",
                    url: "http://localhost:8419/api/people/"+escape(personId),
                    dataType: "json",
                    contentType: "application/json",
                    success: function (data) {
                        data["teamName"] = $("#tfTeamName").val();
                        $.ajax({
                            method: "PUT",
                            url: "http://localhost:8419/api/people/" + escape(personId),
                            dataType: "json",
                            contentType: "application/json",
                            data: JSON.stringify(data),
                            success: function (data) {
                                alert("Team Created!");
                            },
                            error: function (data) {
                                alert("An error ocurred!");
                            }
                        });
                    },
                    error: function (data) {
                        alert("An error ocurred!");
                    }
                });
            },
            error: function (data) {
                alert("An error ocurred!");
            }
        });
    });
});