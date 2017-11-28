// Use these parameters for the jQurey:
// data (to server), datatype (from server), type (request), url (server path), (password, username).

$(document).ready(function () {
    function createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {

            // Check if the XMLHttpRequest object has a "withCredentials" property.
            // "withCredentials" only exists on XMLHTTPRequest2 objects.
            xhr.open(method, url, true);

        } else if (typeof XDomainRequest != "undefined") {

            // Otherwise, check if XDomainRequest.
            // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
            xhr = new XDomainRequest();
            xhr.open(method, url);

        } else {

            // Otherwise, CORS is not supported by the browser.
            xhr = null;

        }

        return xhr;
    }

    $("#createTeam").click(function () {
        var team = { teamName: "None", track: "Society & Globalization", school: null, participant: false };

         $.ajax({
             type: "POST",
             data: JSON.parse(team),
             xhr: createCORSRequest("POST", "http://localhost:8419"),
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