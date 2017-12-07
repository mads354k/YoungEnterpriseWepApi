$(document).ready(function () {
    $("#bBack").click(function () {
        window.location = "AdminMainPage.html";
    });

    $("#bCreateAccount").click(function () {
        var dummyPerson = { firstName: $("#cbJudgeTeam").val(), eventStatus: $("#cbEventStatus").val() };

        var pass = $("#tfPassword").val();
        var passCon = $("#tfConfirmPass").val();

        if (!(pass === passCon)) {
            alert("Passwords do not match!");
            return;
        }

        $.ajax({
            method: "POST",
            url: "http://localhost:8419/api/people",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(dummyPerson),
            success: function (data) {
                var account = { userName: $("#tfUsername").val(), userPassword: pass, personId: data["personId"] };

                $.ajax({
                    method: "POST",
                    url: "http://localhost:8419/api/accounts",
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(account),
                    success: function (data) {
                        alert("account created!");
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