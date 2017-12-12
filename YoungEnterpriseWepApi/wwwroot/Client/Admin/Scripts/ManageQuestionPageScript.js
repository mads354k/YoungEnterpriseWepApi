var activeQuestionId = 0;
var activeQuestionnarie = 1;

function addQuestion() {
    var questionInformation = { questionId: activeQuestionId, questionnarieId: activeQuestionnarie };

    $.ajax({
        method: "POST",
        url: "http://localhost:8419/api/questioninformations",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(questionInformation),
        success: function (data) {

        },
        error: function (data) {
            alert(JSON.stringify(data));
        }
    });
}

$(document).ready(function () {
    $("#bCreateQuestion").click(function () {
        var question = { textDescription: $("#taQuestionContent").val(), track: $("#cbTrack").val(), weightValue: $("#tfWeight").val() };

        $.ajax({
            method: "POST",
            url: "http://localhost:8419/api/questions",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(question),
            success: function (data) {
                alert("Question created!");
                activeQuestionId = data["questionId"];
            },
            error: function (data) {
                alert(JSON.stringify(data));
            }
        });
    });

    $("#bGetQuestion").click(function () {
        var questionId = activeQuestionId + 1;

        $.ajax({
            method: "GET",
            url: "http://localhost:8419/api/questions/" + escape(questionId),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                $("#taQuestionContent").text(data["textDescription"]);
                $("#cbTrack").val(data["track"]);
                $("#tfWeight").val(data["weightValue"]);
            },
            error: function (data) {
                alert("Reached the end of questions.\nReseting pointer.");
                activeQuestionId = 0;
            }
        });

        $("#bGetQuestion").text("Get next question");
    });

    $("#bUpdateQuestion").click(function () {
        var question = { textDescription: $("#taQuestionContent").val(), track: $("#cbTrack").val(), weightValue: $("#tfWeight").val() };

        $.ajax({
            method: "PUT",
            url: "http://localhost:8419/api/questions/" + escape(activeQuestionId),
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(question),
            success: function (data) {
                alert("Question updated!");
            },
            error: function (data) {
                alert(JSON.stringify(data));
            }
        });
    });

    $("#bDeleteQuestion").click(function () {
        $.ajax({
            method: "DELETE",
            url: "http://localhost:8419/api/questions/" + escape(activeQuestionId),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                $("#taQuestionContent").text("");
                $("#tfWeight").val("");
                alert("Question Deleted!");
            },
            error: function (data) {
                alert(JSON.stringify(data));
            }
        });
    });

    $("#bAddQuestion1").click(function () {
        addQuestion();
        $("#bAddQuestion1").hide(true);
        $("#taQuestion1").val($("#taQuestionContent").val());
    });

    $("#bAddQuestion2").click(function () {
        addQuestion();
        $("#bAddQuestion2").hide(true);
        $("#taQuestion2").val($("#taQuestionContent").val());
    });

    $("#bAddQuestion3").click(function () {
        addQuestion();
        $("#bAddQuestion3").hide(true);
        $("#taQuestion3").val($("#taQuestionContent").val());
    });

    $("#bAddQuestion4").click(function () {
        addQuestion();
        $("#bAddQuestion4").hide(true);
        $("#taQuestion4").val($("#taQuestionContent").val());
    });

    $("#bAddQuestionnarieToTeam").click(function () {
        var questionnarie = { questionnarieId: activeQuestionnarie, valuation:"0.0", teamName: $("#tfTeamName").val()};
        $.ajax({
            method: "PUT",
            url: "http://localhost:8419/api/questionnaries/" + escape(activeQuestionnarie),
            dataType: "json",
            data: JSON.stringify(questionnarie),
            contentType: "application/json",
            success: function (data) {
                alert("Questinnaire Added!");
            },
            error: function (data) {
                alert(JSON.stringify(data));
            }
        });
    });

    $("#bCreateQuestionnarie").click(function () {
        var questionnarie = { valuation:"0.0"};

        $.ajax({
            method: "POST",
            url: "http://localhost:8419/api/questionnaries",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(questionnarie),
            success: function (data) {
                alert("Questionnaire created!");
                activeQuestionnarie = data["questionnarieId"];
            },
            error: function (data) {
                alert(JSON.stringify(data));
            }
        });
    });

    $("#bGetQuestionnarie").click(function () {
        var teamName = $("#tfTeamName").val();

        $.ajax({
            method: "GET",
            url: "http://localhost:8419/api/teamscores",
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].teamName === teamName) {
                        activeQuestionnarie = data[i].questionnarieId;
                        $.ajax({
                            method: "GET",
                            url: "http://localhost:8419/api/questioninformations",
                            dataType: "json",
                            contentType: "application/json",
                            success: function (data) {
                                var x = 1;
                                for (var i = 0; i < data.length; i++) {
                                    if (data[i].questionnarieId == activeQuestionnarie) {
                                        switch (x) {
                                            case 1:
                                                $.ajax({
                                                    method: "GET",
                                                    url: "http://localhost:8419/api/questions/" + escape(data[i].questionId),
                                                    dataType: "json",
                                                    contentType: "application/json",
                                                    success: function (data) {
                                                        $("#bAddQuestion1").hide(true);
                                                        $("#taQuestion1").val(data["textDescription"]);
                                                    },
                                                    error: function (data) {
                                                        alert(JSON.stringify(data));
                                                    }
                                                });
                                                x++;
                                                break;
                                            case 2:
                                                $.ajax({
                                                    method: "GET",
                                                    url: "http://localhost:8419/api/questions/" + escape(data[i].questionId),
                                                    dataType: "json",
                                                    contentType: "application/json",
                                                    success: function (data) {
                                                        $("#bAddQuestion2").hide(true);
                                                        $("#taQuestion2").val(data["textDescription"]);
                                                    },
                                                    error: function (data) {
                                                        alert(JSON.stringify(data));
                                                    }
                                                });
                                                x++;
                                                break;
                                            case 3:
                                                $.ajax({
                                                    method: "GET",
                                                    url: "http://localhost:8419/api/questions/" + escape(data[i].questionId),
                                                    dataType: "json",
                                                    contentType: "application/json",
                                                    success: function (data) {
                                                        $("#bAddQuestion3").hide(true);
                                                        $("#taQuestion3").val(data["textDescription"]);
                                                    },
                                                    error: function (data) {
                                                        alert(JSON.stringify(data));
                                                    }
                                                });
                                                x++;
                                                break;
                                            case 4:
                                                $.ajax({
                                                    method: "GET",
                                                    url: "http://localhost:8419/api/questions/" + escape(data[i].questionId),
                                                    dataType: "json",
                                                    contentType: "application/json",
                                                    success: function (data) {
                                                        $("#bAddQuestion4").hide(true);
                                                        $("#taQuestion4").val(data["textDescription"]);
                                                    },
                                                    error: function (data) {
                                                        alert(JSON.stringify(data));
                                                    }
                                                });
                                                x++;
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                }
                            },
                            error: function (data) {
                                alert(JSON.stringify(data));
                            }
                        });
                        break;
                    }
                }
            },
            error: function (data) {
                alert(JSON.stringify(data));
            }
        });
    });

    $("#bAddQuestionnarieToReport").click(function () {
        
    });
});