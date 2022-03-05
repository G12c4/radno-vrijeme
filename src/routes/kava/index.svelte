<script>
    import { goto } from '$app/navigation';
    import { Circle2 } from 'svelte-loading-spinners'
    import { workerSelected } from '../../stores/store.js';
    
    let workerList = []
    let animation = true

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

        fetch("https://v1.nocodeapi.com/g12c4/google_sheets/RqIzWOgETgBYAvvs?tabId=KAVA(popis-radnika)&perPage=20&page=1", requestOptions)
            .then(response => response.text())
            .then(result => {
                const res = JSON.parse(result)  
                let workerData= res.data.map(element => element.RADNICI)
                workerList = []
                workerList.push(...workerData)
                animation = false
            })
            .catch(error => console.log('error', error));
            }
    readSpreadsheet()
</script>

<div class="container">
    <h2>Caffe bar Kava</h2>
    <h3>Izaberite vaše ime:</h3>

    <div id="grid">
        <div id="areaA">
            {#if animation}
            <div class="animation">
                <Circle2 size="60" unit="px"/>
            </div>
            {/if}
            {#each workerList as d}
            <p data-letters={getInicials(d)} on:click="{() => {
                $workerSelected = d
                goto("/kava/id")
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
    height: 100vh;
    margin-top: 1rem;
    background: #f6f6f9;
    padding:0;
}

#grid {
    margin: auto auto;
    background: #f6f6f9;
    display: block;
    width: 70%;
    }

#areaA {
    margin: auto auto;
    background-color: white;
    border-radius: 2rem;
    padding: 1.8rem;
    text-align: justify;
    box-shadow: 0 2rem 3rem lightgray;
    transition: all 300ms ease;
}

#areaA p{
    text-align: justify;
    font-size: 1.8rem;
    height: 8.8rem;
    border-bottom: 1px solid gray;
    color: #363949;
}

#areaA p:last-child {
    border: none;
}

.animation {
    margin-top: 1rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
}

span {
    font-size:1.7em;
    margin-left: -17px;
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