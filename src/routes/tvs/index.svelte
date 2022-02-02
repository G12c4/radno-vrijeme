<script>
    import { goto } from '$app/navigation';
    import { workerSelected } from '../../stores/store.js';
    
    let workerList = []

    let getInicials = (name) => {
        let names = name.split(" ")
        let inicials = ""
        for (let i = 0; i < names.length; i++) {
            inicials += names[i][0]
        }
        return inicials
    }

    async function readSpreadsheet () {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const requestOptions = {
            method: "get",
            headers: myHeaders,
            redirect: "follow",
            
        };

        fetch("https://v1.nocodeapi.com/g12c4/google_sheets/RqIzWOgETgBYAvvs?tabId=TV-Sibenik(popis radnika)&perPage=20&page=1", requestOptions)
            .then(response => response.text())
            .then(result => {
                const res = JSON.parse(result)  
                let workerData= res.data.map(element => element.RADNICI)
                workerList = []
                workerList.push(...workerData)
                // console.log(`External: ${workerData}`)
                // console.log(`Internal: ${workerList}`)
            })
            .catch(error => console.log('error', error));
            }
    readSpreadsheet()
</script>

<div class="container">
    <h2>TV Šibenik</h2>
    <h3>Izaberite vaše ime:</h3>

    <div id="grid">
        <div id="areaA">
            {#each workerList as d}
            <p data-letters={getInicials(d)} on:click="{() => {
                $workerSelected = d
                goto("/tvs/id")
                console.log($workerSelected)
            }}">
		<span>{d}</span>
            </p>
            {/each}
        </div>
    </div>
</div>


<style>
.container {
    margin-top: 1rem;
    background: #f6f6f9;
    padding:0;
}

#grid {
    background: #f6f6f9;
    display: block;
    width: 100%;
    }

#areaA {
    background-color: white;
    width: 80%;
    border-radius: 2rem;
    padding: 1.8rem;
    text-align: justify;
    box-shadow: 0 2rem 3rem lightgray;
    transition: all 300ms ease;
}

#areaA p{
        padding-left: 0.5rem;
        font-size: 0.8rem;
        height: 4.8rem;
        border-bottom: 1px solid gray;
        color: #363949;
}

#areaA p:last-child {
    border: none;
}

span {
    font-size:1.7em;
    margin-left: -10px;
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;
    color: black;
}

h2 {
    margin:0;
    padding:0;
    font-size: 2.5rem;
    margin-bottom: 0.2rem;
    margin-left: 2rem;
}

h3 {
    margin-bottom: 0.8rem;
    margin-left: 2rem;
}

[data-letters]:before {
    content:attr(data-letters);
    display:inline-block;
    font-size:2em;
    width:2.2em;
    height:2.2em;
    line-height:2.3em;
    text-align:center;
    border-radius:50%;
    background:orange;
    vertical-align:left;
    margin-right:1em;
    color:white;
    }
</style>