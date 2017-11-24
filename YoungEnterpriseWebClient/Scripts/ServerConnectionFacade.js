// Use these parameters for the jQurey:
// data (to server), datatype (from server), type (request), url (server path), (password, username).

$(document).ready(function () {
    $("#createTeam").click(function () {
        var team = { teamName: "None", track: "Society & Globalization", school: null, participant: false };

         $.ajax({
             type: "POST",
             data: JSON.parse(team),
             url: "http://localhost:8419/api/teams"
         }).then(function (data) {
             alert(JSON.stringify(data));
         });
    });

    $("#createPerson").click(function () {
        var person = { personId: "", firstName: "", lastName: "", mail: "", eventStatus: "", teamName: "" };

        $.ajax({
            type: "POST",
            data: JSON.parse(person),
            url: "http://localhost:8419/api/people"
        }).then(function (data) {
            alert(JSON.stringify(data));
        });
    });

    $("#createQuestion").click(function () {
        var question = { questionId: "", textDescription: "", track: "", weightValue: "" };

        $.ajax({
            type: "POST",
            data: JSON.parse(question),
            url: "http://localhost:8419/api/questions"
        }).then(function (data) {
            alert(JSON.stringify(data));
        });
    });

    $("#createQuestionnaire").click(function () {
        var questionnaire = { questionnarieId: "", valuation: "", teamName: "" };

        $.ajax({
            type: "POST",
            data: JSON.parse(questionnaire),
            url: "http://localhost:8419/api/questionnaries"
        }).then(function (data) {
            alert(JSON.stringify(data));
        });
    });
});