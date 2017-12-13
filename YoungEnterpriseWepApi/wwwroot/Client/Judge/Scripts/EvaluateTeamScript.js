var teamName;
var questionnarieId;
var question1;
var question2;
var question3;
var question4;

window.onload = function () {
    teamName = window.location.hash.substring(1);

    $.ajax({
        method: "GET",
        url: "http://localhost:8419/api/teamscores",
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].teamName === teamName) {
                    questionnarieId = data[i].questionnarieId;
                    $.ajax({
                        method: "GET",
                        url: "http://localhost:8419/api/questioninformations",
                        dataType: "json",
                        contentType: "application/json",
                        success: function (data) {
                            var x = 1;
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].questionnarieId == questionnarieId) {
                                    if (x == 1) {
                                        question1 = data[i].questionId;
                                        $.ajax({
                                            method: "GET",
                                            url: "http://localhost:8419/api/questions/" + escape(question1),
                                            dataType: "json",
                                            contentType: "application/json",
                                            success: function (data) {
                                                $("#taQuestion1").val(data.textDescription);
                                                $("#tfTrack").val(data.track);
                                            },
                                            error: function (data) {
                                                alert(JSON.stringify(data));
                                            }
                                        });
                                    } else if (x == 2) {
                                        question2 = data[i].questionId;
                                        $.ajax({
                                            method: "GET",
                                            url: "http://localhost:8419/api/questions/" + escape(question2),
                                            dataType: "json",
                                            contentType: "application/json",
                                            success: function (data) {
                                                $("#taQuestion2").val(data.textDescription);
                                            },
                                            error: function (data) {
                                                alert(JSON.stringify(data));
                                            }
                                        });
                                    } else if (x == 3) {
                                        question3 = data[i].questionId;
                                        $.ajax({
                                            method: "GET",
                                            url: "http://localhost:8419/api/questions/" + escape(question3),
                                            dataType: "json",
                                            contentType: "application/json",
                                            success: function (data) {
                                                $("#taQuestion3").val(data.textDescription);
                                            },
                                            error: function (data) {
                                                alert(JSON.stringify(data));
                                            }
                                        });
                                    } else if (x == 4){
                                        question4 = data[i].questionId;
                                        $.ajax({
                                            method: "GET",
                                            url: "http://localhost:8419/api/questions/" + escape(question4),
                                            dataType: "json",
                                            contentType: "application/json",
                                            success: function (data) {
                                                $("#taQuestion4").val(data.textDescription);
                                            },
                                            error: function (data) {
                                                alert(JSON.stringify(data));
                                            }
                                        });
                                    }

                                    x++;

                                    if (x == 5) {
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

    $("#tfTeamName").val(teamName);
};

$(document).ready(function () {
    $("#bConfirm").click(function () {
        $.ajax({
            method: "GET",
            url: "http://localhost:8419/api/questions/" + escape(question1),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                var result = $("#tfScore1").val() * data.weightValue;
                $.ajax({
                    method: "GET",
                    url: "http://localhost:8419/api/questions/" + escape(question2),
                    dataType: "json",
                    contentType: "application/json",
                    success: function (data) {
                        result += $("#tfScore2").val() * data.weightValue;
                        $.ajax({
                            method: "GET",
                            url: "http://localhost:8419/api/questions/" + escape(question3),
                            dataType: "json",
                            contentType: "application/json",
                            success: function (data) {
                                result += $("#tfScore3").val() * data.weightValue;
                                $.ajax({
                                    method: "GET",
                                    url: "http://localhost:8419/api/questions/" + escape(question4),
                                    dataType: "json",
                                    contentType: "application/json",
                                    success: function (data) {
                                        result += $("#tfScore4").val() * data.weightValue;
                                        var valuation = { questionnarieId: questionnarieId, valuation: result };
                                        $.ajax({
                                            method: "PUT",
                                            url: "http://localhost:8419/api/questionnaries/" + escape(questionnarieId),
                                            dataType: "json",
                                            contentType: "application/json",
                                            data: JSON.stringify(valuation),
                                            success: function (data) {
                                                
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
            },
            error: function (data) {
                alert(JSON.stringify(data));
            }
        });
    });
});