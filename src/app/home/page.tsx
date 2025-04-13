"use client"

import { getCookie } from "cookies-next"


function Home() {

    const acessToken = getCookie("acessToken");
    console.log(acessToken)

    return (
        <div>
            Bogenk
        </div>
    )
}

export default Home
