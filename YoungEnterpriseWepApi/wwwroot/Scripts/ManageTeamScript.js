var contestant;

$(document).ready(function () {
    $("#bChangeTeam").click(function () {
        var oldTeamName = "Custom";



        var newTeamName = $("#tfTeamName").val();
        var track = $("#tfTrack").val();
        var school = $("#tfSchool").val();
        var participating = false;


        if (oldTeamName === newTeamName) {
            var team = { teamName: newTeamName, track: track, school: school, participant: participating };

            $.ajax({
                method: "PUT",
                url: "http://localhost:8419/api/teams/" + escape(oldteamName),
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(team),
                success: function (data) {
                    alert("Team Updated!");
                },
                error: function (data) {
                    alert(JSON.stringify(data));
                }
            });
        } else {
            $.ajax({
                method: "DELETE",
                url: "http://localhost:8419/api/teams/" + escape(oldteamName),
                dataType: "json",
                contentType: "application/json",
                success: function (data) {

                },
                error: function (data) {
                    alert(JSON.stringify(data));
                }
            });

            var team = { teamName: newTeamName, track: track, school: school, participant: participating };

            $.ajax({
                method: "POST",
                url: "http://localhost:8419/api/teams",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(team),
                success: function (data) {
                    alert("Team Updated!");
                },
                error: function (data) {
                    alert(JSON.stringify(data));
                }
            });
        }
    });

    $("#bApply").click(function () {
        var teamName = "Custom";

        var participating = { teamName:teamName, participant:"true" };

        $.ajax({
            method: "PUT",
            url: "http://localhost:8419/api/teams/" + escape(teamName),
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(participating),
            success: function (data) {
                alert("Team Applied for event!");
            },
            error: function (data) {
                alert(JSON.stringify(data));
            }
        });
    });

    $("#bCancel").click(function () {
        var teamName = "Custom";

        var participating = { teamName: teamName, participant: "false" };

        $.ajax({
            method: "PUT",
            url: "http://localhost:8419/api/teams/" + escape(teamName),
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(participating),
            success: function (data) {
                alert("Team Applied for event!");
            },
            error: function (data) {
                alert(JSON.stringify(data));
            }
        });
    });
});