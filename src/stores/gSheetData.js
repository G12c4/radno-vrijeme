async function accessSpreadsheet () {
    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    const requestOptions = {
        method: "post",
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify([
            [
                "1/1/2020",
                "Ante Storić",
                "ULAZ",
                "12:00"
            ]
        ])}

fetch("https://v1.nocodeapi.com/g12c4/google_sheets/RqIzWOgETgBYAvvs?tabId=TV-SIBENIK(radno-vrijeme)", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error))
}