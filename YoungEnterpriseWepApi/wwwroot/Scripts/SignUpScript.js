$(document).ready(function () {
    $("#bCancel").click(function () {
        window.location = "LoginPage.html";
    });

    $("#bCreateAccount").click(function () {
        var contestant = { firstName: $("#tfFirstName").val(), lastName: $("#tfLastName").val(), mail: $("#tfMail").val(), eventStatus:"Contestant" };
        var passWord = $("#tfPassword").val();
        var passCon = $("#tfConfirmPassword").val();

        if (!(passWord === passCon)) {
            alert("Passwords do not match!");
            return;
        }

        $.ajax({
            method: "POST",
            url: "http://localhost:8419/api/people",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(contestant),
            success: function (data) {
                var account = { userName: $("#tfUserName").val(), userPassword: passWord, personId: data["personId"] };

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