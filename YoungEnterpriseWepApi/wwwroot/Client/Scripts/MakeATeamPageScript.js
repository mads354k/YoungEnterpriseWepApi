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
                
            },
            error: function (data) {
                alert("An error ocurred!");
            }
        });

        // becomes one string
        var members = $("#taTeamMembers").val();

        if () {
            // todo add members to team ...
        }
    });
});