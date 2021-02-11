function handleSubmit(event) {
    event.preventDefault();
    // check what text was put into the form field
    let formText = document.getElementById("url").value;
    if (Client.checkForURL(formText)) {
        console.log("::: Form Submitted :::");
        postData("http://localhost:8114/add", { url: formText }).then(function (res) {
            document.getElementById("polarity").innerHTML = res.score_tag;
            document.getElementById("agreement").innerHTML = res.agreement;
            document.getElementById("subjectivity").innerHTML = res.subjectivity;
            document.getElementById("confidence").innerHTML = res.confidence;
            document.getElementById("irony").innerHTML = res.irony;
        });
    } else {
        alert("WRONG URL, TRY AGAIN");
    }
}
const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

export { handleSubmit };
