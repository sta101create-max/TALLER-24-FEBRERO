function getAthletes() {
    return new Promise((resolve, reject) => {

        setTimeout(() => {

            const athletes = [
                { id: 1, user: "jUAn pErez", status: "inactive", points: 45 },
                { id: 2, user: "mArIa gArCiA", status: "active", points: 88 },
                { id: 3, user: "cArLoS rOdrIguEz", status: "inactive", points: 12 },
                { id: 4, user: "lUciA fErNAnDeZ", status: "active", points: 95 },
                { id: 5, user: "pAbLo mArTiN", status: "inactive", points: 30 }
            ];

            resolve(athletes);

        }, 1200);
    });
}


async function loadDashboard() {

    const container = document.getElementById("athletes-container");

    try {

        const data = await getAthletes();

        const formattedAthletes = data.map(athlete => {

            return {
                ...athlete,
                user: athlete.user.toUpperCase(),
                level: athlete.points > 50 ? "Elite" : "Amateur"
            };

        });

           formattedAthletes.forEach(athlete => {

            const card = document.createElement("div");
            card.classList.add("card");

            if (athlete.status === "active") {
                card.classList.add("active");
            }

            card.innerHTML = `
                <h4>${athlete.user}</h4>
                <p>Puntos: ${athlete.points}</p>
                <p>Nivel: ${athlete.level}</p>
                <p>Estado: <span class="status">${athlete.status}</span></p>
                <button>Comprar</button>
            `;

            const button = card.querySelector("button");

            button.addEventListener("click", () => {

                athlete.status = "active";

                card.classList.add("active");
                card.querySelector(".status").textContent = "active";
                button.textContent = "Activado";
                button.disabled = true;

            });

            container.appendChild(card);

        });

    } catch (error) {
        container.innerHTML = `<p>Error: ${error}</p>`;
        console.error(error);
    }
}

document.addEventListener("DOMContentLoaded", loadDashboard);