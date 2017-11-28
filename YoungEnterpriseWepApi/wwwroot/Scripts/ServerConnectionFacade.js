﻿// Use these parameters for the jQurey:
// data (to server), datatype (from server), type (request), url (server path), contentType: "application/json" , (password, username).

$(document).ready(function () {
    $("#createTeam").click(function () {
        var team = { teamName: $("#tfTeamName").val(), track: $("#tfTrack").val(), school: $("#tfSchool").val(), participant: false };

        $.ajax({
            method: "POST",
            url: "http://localhost:8419/api/teams",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(team),
            success: function (data) {
                alert(JSON.stringify(data));
            },
            error: function (data) {
                alert(JSON.stringify(data));
            }
        });
    });

    $("#createPerson").click(function () {
        var person = { firstName: $("#tfFirstName").val(), lastName: $("#tfLastName").val(), mail: $("#tfMail").val(), eventStatus: $("#lEventStatus").val(), teamName: null };

        $.ajax({
            method: "POST",
            url: "http://localhost:8419/api/people",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(person),
            success: function (data) {
                alert(JSON.stringify(data));
            },
            error: function (data) {
                alert(JSON.stringify(data));
            }
        });
    });

    $("#createQuestion").click(function () {
        var question = { textDescription: $("#tfTextDescription").val(), track: $("#tfTrack").val(), weightValue: $("#tfWeightValue").val()};

        $.ajax({
            method: "POST",
            url: "http://localhost:8419/api/questions",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(question),
            success: function (data) {
                alert(JSON.stringify(data));
            },
            error: function (data) {
                alert(JSON.stringify(data));
            }
        });
    });

    $("#createQuestionnarie").click(function () {
        var questionnaire = { valuation: $("#tfTotalScore").val() , teamName: $("#lTeamName").val() };

        $.ajax({
            method: "POST",
            url: "http://localhost:8419/api/questionnaries",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(questionnaire),
            success: function (data) {
                alert(JSON.stringify(data));
            },
            error: function (data) {
                alert(JSON.stringify(data));
            }
        });
    });

    $("#getTeam").click(function () {
        var teamName = $("#tfTeamName").val();
        $.ajax({
            method: "GET",
            url: "http://localhost:8419/api/teams/" + escape(teamName),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                $("#teamInformation").text(JSON.stringify(data));
            },
            error: function (data) {
                alert(JSON.stringify(data));
            }
        });
    });

    $("#getPerson").click(function () {
        var personId = $("#tfPersonId").val();
        $.ajax({
            method: "GET",
            url: "http://localhost:8419/api/people/"+escape(personId),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                $("#person").text(JSON.stringify(data));
            },
            error: function (data) {
                alert(JSON.stringify(data));
            }
        });
    });

    $("#getQuestion").click(function () {
        var questionId = $("#tfQuestionId").val();
        $.ajax({
            method: "GET",
            url: "http://localhost:8419/api/questions/"+escape(questionId),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                $("#question").text(JSON.stringify(data));
            },
            error: function (data) {
                alert(JSON.stringify(data));
            }
        });
    });

    $("#getQuestionnarie").click(function () {
        var questionnarieId = $("#tfQuestionnarieId").val();
        $.ajax({
            method: "GET",
            url: "http://localhost:8419/api/questionnaries/"+escape(questionnarieId),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                $("#questionnarie").text(JSON.stringify(data));
            },
            error: function (data) {
                alert(JSON.stringify(data));
            }
        });
    });

    $("#deleteTeam").click(function () {
        var teamName = $("#tfTeamName").val();
        if (teamName === "") {
            alert("No name given!");
            return;
        }

        $.ajax({
            method: "DELETE",
            url: "http://localhost:8419/api/teams/" + escape(teamName),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                
            },
            error: function (data) {
                alert(JSON.stringify(data));
            }
        });
    });

    $("#deletePerson").click(function () {
        var personId = $("#tfPersonId").val();
        if (personId === "") {
            alert("No ID given!");
            return;
        }

        $.ajax({
            method: "DELETE",
            url: "http://localhost:8419/api/teams/" + escape(personId),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {

            },
            error: function (data) {
                alert(JSON.stringify(data));
            }
        });
    });

    $("#deleteQuestion").click(function () {
        var questionId = $("#tfQuestionId").val();
        if (questionId === "") {
            alert("No ID given!");
            return;
        }

        $.ajax({
            method: "DELETE",
            url: "http://localhost:8419/api/teams/" + escape(questionId),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {

            },
            error: function (data) {
                alert(JSON.stringify(data));
            }
        });
    });

    $("#deleteQuestionarie").click(function () {
        var questionnarieId = $("#tfQuestionnarieId").val();
        if (questionnarieId === "") {
            alert("No ID given!");
            return;
        }

        $.ajax({
            method: "DELETE",
            url: "http://localhost:8419/api/teams/" + escape(questionnarieId),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {

            },
            error: function (data) {
                alert(JSON.stringify(data));
            }
        });
    });

    $("#updateTeam").click(function () {
        var oldTeamName = $("#tfOldTeamName").val();
        var newTeamName = $("#tfNewTeamName").val();
        var track = $("#tfTrack").val();
        var school = $("#tfSchool").val();
        var participating = $("#tfParticipating").val();

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
                alert(JSON.stringify(data));
            },
            error: function (data) {
                alert(JSON.stringify(data));
            }
        });
    });

    $("#updatePerson").click(function () {
        var personId = $("#tfPersonId").val();
        var person = { firstName: $("#tfFirstName").val(), lastName: $("#tfLastName").val(), mail: $("#tfMail"), eventStatus: $("#lEventStatus").val() , teamName: $("#tfTeamName").val()};

        $.ajax({
            method: "PUT",
            url: "http://localhost:8419/api/people/" + escape(personId),
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(person),
            success: function (data) {
                alert(JSON.stringify(data));
            },
            error: function (data) {
                alert(JSON.stringify(data));
            }
        });
    });

    $("#updateQuestion").click(function () {
        var questionId = $("#tfQuestionId").val();
        var question = { textDescription: $("#tfTextDescription").val(), track: $("#tfTrack").val(), weightValue: $("#tfWeightValue").val()};

        $.ajax({
            method: "PUT",
            url: "http://localhost:8419/api/questions/" + escape(questionId),
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(question),
            success: function (data) {
                alert(JSON.stringify(data));
            },
            error: function (data) {
                alert(JSON.stringify(data));
            }
        });
    });

    $("#updateQuestionnarie").click(function () {
        var questionnarieId = $("#tfQuestionnarieId").val();
        var questionnarie = { valuation: $("#tfTotalScore").val() , teamName: $("#tfTeamName").val() };

        $.ajax({
            method: "PUT",
            url: "http://localhost:8419/api/questionnaries/" + escape(questionnarieId),
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(questionnarie),
            success: function (data) {
                alert(JSON.stringify(data));
            },
            error: function (data) {
                alert(JSON.stringify(data));
            }
        });
    });
});