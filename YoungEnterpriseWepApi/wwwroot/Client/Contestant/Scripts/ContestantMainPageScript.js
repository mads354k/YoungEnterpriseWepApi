var personId;
var teamName;

window.onload = function () {
    personId = window.location.hash.substring(1);

    $.ajax({
        method: "GET",
        url: "http://localhost:8419/api/people/" + escape(personId),
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            var name = data["firstName"] + " " + data["lastName"];
            var mail = data["mail"];
            teamName = data["teamName"];
            $("#taContestantInfo").val("Name: " + name + "\nE-Mail: " + mail + "\nTeam: " + teamName);

            if (teamName != null) {
                $.ajax({
                    method: "GET",
                    url: "http://localhost:8419/api/teams/" + escape(teamName),
                    dataType: "json",
                    contentType: "application/json",
                    success: function (data) {
                        var track = data["track"];
                        var school = data["school"];
                        $.ajax({
                            method: "GET",
                            url: "http://localhost:8419/api/people",
                            dataType: "json",
                            contentType: "application/json",
                            success: function (data) {            
                                var teamMembers = "";

                                for (var key in data) {
                                    if (key["teamName"] === teamName) {
                                        teamMembers += key["firstName"] + " " + key["lastName"] + "\n";
                                    }
                                }

                                $("#taTeamInfo").val("Track: " + track + "\nSchool: " + school + "\nTeam members: "+teamMembers);
                            },
                            error: function (data) {
                                alert(JSON.stringify(data));
                            }
                        });
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
};

$(document).ready(function () {
    $("#bCreateTeam").click(function () {
        window.location.href = "MakeATeamPage.html" + "#" + personId;
    });

    $("#bManageTeam").click(function () {
        window.location.href = "ManageTeam.html"+"#"+teamName;
    });
});