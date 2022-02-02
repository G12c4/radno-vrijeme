<script>
    import { workerSelected } from "../../stores/store.js";
    import { elasticInOut } from "svelte/easing";
    import { scale } from "svelte/transition";
    import { goto } from '$app/navigation';
    let today = new Date();
    let date = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
    let time = today.getHours() + ":" + today.getMinutes();
    let inOutSelected = "";
    let dataSaved = false;
    let savebtnclicked = false;

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
                $workerSelected,
                inOutSelected.toUpperCase(),
                time
            ]
        ])}

    fetch("https://v1.nocodeapi.com/g12c4/google_sheets/RqIzWOgETgBYAvvs?tabId=TV-SIBENIK(radno-vrijeme)", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error))
    }
</script>

<div class="container">
    <div id="areaB">
        <button class="bckbtn" on:click={() => goto("/tvs")}>
            ⬅ Povratak
        </button>
        <h1>{$workerSelected}</h1>
        <div class="in-out">
        <p
            class:active={inOutSelected === "ulaz"}
            on:click={() => (inOutSelected = "ulaz")}
        >
            ULAZ
        </p>
        <p
            class:active={inOutSelected === "izlaz"}
            on:click={() => (inOutSelected = "izlaz")}
        >
            IZLAZ
        </p>
        </div>
        {#if inOutSelected}
        <div class="datendtime">
            <p><b>{inOutSelected.toUpperCase()}:</b></p>
            <p>Datum:{date}</p>
            <p>Vrijeme:{time}</p>
        </div>
        {#if !savebtnclicked}
            <div class="savebtn">
            <button
                on:click={() => {
                dataSaved = true;
                savebtnclicked = true;
                accessSpreadsheet()
                setTimeout(function(){
                goto("/tvs")
                }, 5000)
                }}
            >
                SPREMI
            </button>
            </div>
        {/if}
        {#if dataSaved}
            <div
            class="animation"
            transition:scale={{ duration: 2000, easing: elasticInOut }}
            >
            <p>✅</p>
            </div>
        {/if}
        {/if}
    </div>
</div>

<style>
    .container {
        overflow: hidden;
        height: 100vh;
    }
    #areaB {
        background-color: white;
        width: 83%;
        border-radius: 2rem;
        padding: 1.8rem;
        text-align: center;
        box-shadow: 0 2rem 3rem lightgray;
        transition: all 300ms ease;
    }

    #areaB button.bckbtn{
        position: relative;
        left: -45%;
        margin-bottom: 2rem;
        font-size: 0.8rem;
        color: white;
        padding: 0.5rem;
        border-radius: 1rem;
        border-color: transparent;
        background: orange;
        box-shadow: none;
    }
    
    #areaB h1 {
        margin-top: -1px;
        font-size: 3rem;
        margin-bottom: 3rem;
    }
    
    #areaB .in-out {
        display: grid;
        grid-template-columns: 1fr 1fr;
        margin-bottom: 2rem;
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
    
    #areaB .in-out p.active {
        background: orange;
    }
    
    .datendtime {
        display: block;
    }
    
    .datendtime p{
        font-size: 1.4rem;
        font-weight: 500;
        color: black;
        text-align: center;
    }
    
    .savebtn {
        display: flex;
        justify-content: center;
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
    
    .animation {
        display: flex;
        justify-content: center;
        margin-top: -70px;
    }
    
    .animation p{
        font-size: 5rem;
        text-align: center;
    }
    </style>