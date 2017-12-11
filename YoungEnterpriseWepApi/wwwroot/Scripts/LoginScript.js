$(document).ready(function () {
    $("#bSignUp").click(function () {
        window.location = "SignUpPage.html";
    });

    $("#formid").submit(function () {

        event.preventDefault();

        $.ajax({
            method: "GET",
            url: "http://localhost:8419/api/accounts",
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                var user = $("#tfUsername").val();
                var pass = $("#tfPassword").val();
                var personIdent;

                for (var i = 0; i < data.length; i++) {
                    if (data[i].userName === user) {
                        if (data[i].userPassword === pass) {
                            personIdent = data[i].personId;
                            $.ajax({
                                method: "GET",
                                url: "http://localhost:8419/api/people/" + escape(personIdent),
                                dataType: "json",
                                contentType: "application/json",
                                success: function (data) {
                                    if (data.length > 1) {
                                        alert("Username not found!");
                                        return;
                                    } else if (data["eventStatus"] === "Judge") {
                                        window.location = "JudgeMainPage.html";
                                    } else if (data["eventStatus"] === "Contestant") {
                                        window.location.href = "ContestantMainPage.html" + "#" + personIdent;
                                    } else if (data["eventStatus"] === "Administrator") {
                                        window.location = "AdminMainPage.html";
                                    }
                                },
                                error: function (data) {
                                    alert(JSON.stringify(data));
                                }
                            });
                            break;
                        } else {
                            alert("Incorrect password!");
                        }
                    }
                }
            },
            error: function (data) {
                alert(JSON.stringify(data));
            }
        });
    });
});