$(document).ready(function () {
    $("#bCancel").click(function () {
        window.location = "LoginPage.html";
    });
    $("#bCreateAccount").click(function () {
        var dummyPerson = { firstName: $("#tfFirstName").val(), lastName: $("#tflastName").val(), mail: $("#tfMail").val()}
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
            data: JSON.stringify(dummyPerson),
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

});