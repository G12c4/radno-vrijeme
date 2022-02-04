<script>
    import { elasticInOut } from "svelte/easing";
    import { scale } from 'svelte/transition'
    import { Circle2 } from 'svelte-loading-spinners'
    let today = new Date()
    let date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()
    let time = today.getHours() + ":" + today.getMinutes()
    let workerList = []
    let workerSeleted = ""
    let inOutSelected = ""
    let dataSaved = false
    let savebtnclicked = false
    let animation = true

    let getInicials = (name) => {
        let names = name.split(" ")
        let inicials = ""
        for (let i = 0; i < names.length; i++) {
            inicials += names[i][0]
        }
        return inicials
    }

    async function accessSpreadsheet () {
    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    const requestOptions = {
        method: "post",
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify([
            [
                date,
                workerSeleted,
                inOutSelected.toUpperCase(),
                time
            ]
        ])}

    fetch("https://v1.nocodeapi.com/g12c4/google_sheets/RqIzWOgETgBYAvvs?tabId=KAVA(radno-vrijeme)", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error))
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
            {#each workerList as d}
            <p data-letters={getInicials(d)} on:click="{() => workerSeleted = d}">
		<span>{d}</span>
            </p>
            {/each}
            {#if animation}
            <div class="animation-load">
                <Circle2 size="60" unit="px"/>
            </div>
            {/if}
        </div>
        {#if workerSeleted}
            <div id="areaB">
                <h1>{workerSeleted}</h1>
                <div class="in-out">
                    <p class:active="{inOutSelected === 'ulaz'}"
                    on:click="{() => inOutSelected = 'ulaz'}">ULAZ</p>
                    <p class:active="{inOutSelected === 'izlaz'}"
                    on:click="{() => inOutSelected = 'izlaz'}">IZLAZ</p>
                </div>
                {#if inOutSelected}
                <div class="datendtime">
                    <p>{inOutSelected.toUpperCase()}:</p>
                    <p>Datum:{date}</p>
                    <p>Vrijeme:{time}</p>
                </div>
                {#if !savebtnclicked}
                    <div class="savebtn">
                        <button on:click={() => {
                            dataSaved = true 
                            savebtnclicked = true
                            accessSpreadsheet()
                            setTimeout(function(){
                                location.reload()
                            }, 5000)
                            }}>
                            SPREMI
                        </button>
                    </div>
                {/if}
                    {#if dataSaved}
                        <div class="animation" transition:scale={{duration: 2000, easing: elasticInOut}}>
                            <p>✅</p>
                        </div>
                    {/if}
                {/if}
            </div>
        {/if}
    </div>
</div>


<style>
.container {
    height: 100vh;
    background: #f6f6f9;
    margin:0;
    padding:0;
}
#grid {
    background: #f6f6f9;
    display: grid;
    width: 100%;
    grid-template-columns: 1.3fr 3fr;
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

#areaA p {
    height: 4.8rem;
    border-bottom: 1px solid gray;
    color: #363949;
}

#areaA p:last-child {
    border: none;
}

#areaA:hover {
    box-shadow: none;
}

.animation-load {
    margin-top: 1rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
}

#areaB {
    background-color: white;
    width: 80%;
    border-radius: 2rem;
    padding: 1.8rem;
    text-align: justify;
    box-shadow: 0 2rem 3rem lightgray;
    transition: all 300ms ease;
    /* display: none; */
}

#areaB h1 {
    font-size: 2.5rem;
}

#areaB .in-out {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

#areaB .in-out p {
    font-size: 2rem;
    color: white;
    text-align: center;
    margin: 2rem;
    padding: 1rem;
    border-radius: 1rem;
    background: gray;
}

#areaB .in-out p.active {
    background: orange;
}

.datendtime {
    display: flex;
    gap: 1rem;
    justify-content: center;
}

.datendtime p{
    font-size: 2rem;
    color: black;
    text-align: center;
}

.savebtn {
    display: flex;
    justify-content: center;
}

.savebtn button {
    font-size: 2rem;
    color: white;
    text-align: center;
    padding: 1rem;
    border-radius: 1rem;
    background: green;
}

.animation {
    display: flex;
    justify-content: center;
    margin-top: -95px;
}

.animation p{
    font-size: 5rem;
    text-align: center;
}

span {
    font-size:1.7em;
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

@media screen and (max-width: 768px) {
    .container {
        margin-top: 1rem;
    }
    #grid {
    background: #f6f6f9;
    display: block;
    width: 100%;
    }

    #areaA {
        display: none;
    }

    #areaA p{
        padding-left: 1.3rem;
        font-size: 0.8rem;
        height: 4.8rem;
        border-bottom: 1px solid gray;
        color: #363949;
    }

    #areaB {
        /* display: none; */
        width: 83%;
        /* padding: 1.8rem; */
        text-align: center;
    }

    #areaB h1 {
    margin-top: -10px;
    }

    #areaB .in-out p {
    font-size: 2rem;
    color: white;
    text-align: center;
    margin: 0.5rem;
    padding: 1.3rem;
    border-radius: 1rem;
    background: gray;
    }

    .datendtime p{
    margin-top: 1.5rem;
    font-size: 1.1rem;
    font-weight: 500;
    color: black;
    text-align: center;
    }

    .savebtn button {
    margin-top: 1.5rem;
    font-size: 1.5rem;
    color: white;
    text-align: center;
    padding: 1rem;
    border-radius: 1rem;
    background: green;
    }
}
</style>