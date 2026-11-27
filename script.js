/* ============================================================
   РАНДОМАЙЗЕР НОВОГОДНИХ ПОДАРКОВ
   Реалистичные CSS-модели железа.
   ============================================================ */

(function () {
    "use strict";

    const PRIZES = [
        {
            id: "gpu",
            name: "GeForce RTX 5070 Ti",
            sub: "16GB GDDR7 · Triple Fan",
            weight: 3
        },
        {
            id: "ram",
            name: "G.Skill Trident Z5",
            sub: "DDR5 2×16GB 6000MHz",
            weight: 4
        },
        {
            id: "cpu",
            name: "AMD Ryzen 7 9800X3D",
            sub: "8C/16T · 3D V-Cache",
            weight: 3
        },
        {
            id: "mb",
            name: "ASUS ROG Strix X870E-E",
            sub: "ATX · AM5 · DDR5",
            weight: 3
        }
    ];

    function pickWeighted(items) {
        const total = items.reduce((s, i) => s + (i.weight || 1), 0);
        let roll = Math.random() * total;
        for (const item of items) {
            roll -= (item.weight || 1);
            if (roll <= 0) return item;
        }
        return items[items.length - 1];
    }

    /* ---------- HTML-модели призов ---------- */

    const MODELS = {
        /* Видеокарта: массивный кожух, 2 вентилятора, радиатор, RGB, бэкплейт, кронштейн */
        gpu: `
            <div class="model-gpu">
                <div class="gpu-top-rgb"></div>
                <div class="gpu-shroud">
                    <div class="gpu-fan">
                        <span class="gpu-blades"></span>
                        <span class="gpu-hub"></span>
                    </div>
                    <div class="gpu-fan">
                        <span class="gpu-blades"></span>
                        <span class="gpu-hub"></span>
                    </div>
                </div>
                <div class="gpu-fin-stack"></div>
                <div class="gpu-backplate">
                    <span class="gpu-logo">RTX</span>
                </div>
                <div class="gpu-bracket">
                    <span class="gpu-port"></span>
                    <span class="gpu-port"></span>
                    <span class="gpu-port"></span>
                </div>
            </div>
        `,

        /* ОЗУ: две планки с высокими радиаторами и RGB-диффузорами */
        ram: `
            <div class="model-ram">
                <div class="ram-stick ram-stick-1">
                    <div class="ram-rgb-bar"></div>
                    <div class="ram-heatsink">
                        <span class="ram-ridge"></span>
                        <span class="ram-ridge"></span>
                        <span class="ram-ridge"></span>
                        <span class="ram-ridge"></span>
                    </div>
                    <div class="ram-pcb"></div>
                    <div class="ram-gold-pins"></div>
                </div>
                <div class="ram-stick ram-stick-2">
                    <div class="ram-rgb-bar"></div>
                    <div class="ram-heatsink">
                        <span class="ram-ridge"></span>
                        <span class="ram-ridge"></span>
                        <span class="ram-ridge"></span>
                        <span class="ram-ridge"></span>
                    </div>
                    <div class="ram-pcb"></div>
                    <div class="ram-gold-pins"></div>
                </div>
            </div>
        `,

        /* Процессор: зелёная подложка, металлический IHS, гравировка, золотые контакты */
        cpu: `
            <div class="model-cpu">
                <div class="cpu-substrate">
                    <div class="cpu-ihs">
                        <span class="cpu-brand">AMD</span>
                        <span class="cpu-model">RYZEN 7</span>
                        <span class="cpu-spec">9800X3D</span>
                    </div>
                    <div class="cpu-notch"></div>
                </div>
                <div class="cpu-contact-pins"></div>
            </div>
        `,

        /* Материнская плата: текстолит, IO, DDR5, PCIe x16, чипсет с радиатором, VRM, конденсаторы */
        mb: `
            <div class="model-mb">
                <div class="mb-pcb">
                    <div class="mb-io-panel"></div>
                    <div class="mb-vrm-heatsink"></div>
                    <div class="mb-ddr5-slot"></div>
                    <div class="mb-ddr5-slot"></div>
                    <div class="mb-ddr5-slot"></div>
                    <div class="mb-ddr5-slot"></div>
                    <div class="mb-pcie-x16"></div>
                    <div class="mb-pcie-x4"></div>
                    <div class="mb-chipset-heatsink">
                        <span class="mb-rog-eye"></span>
                    </div>
                    <div class="mb-cap"></div>
                    <div class="mb-cap"></div>
                    <div class="mb-cap"></div>
                    <div class="mb-cap"></div>
                    <div class="mb-24pin"></div>
                    <div class="mb-battery"></div>
                </div>
            </div>
        `
    };

    function colorFor(id) {
        switch (id) {
            case "gpu": return "#00f5d4";
            case "ram": return "#ffd166";
            case "cpu": return "#ff0055";
            case "mb":  return "#7b2cbf";
            default:    return "#95f9c3";
        }
    }

    function renderPrize(prize) {
        const card = document.createElement("div");
        card.className = "prize-card prize-" + prize.id;

        const icon = document.createElement("span");
        icon.className = "prize-icon";
        icon.style.background = colorFor(prize.id);
        icon.style.boxShadow = "0 0 8px " + colorFor(prize.id);

        const model = document.createElement("div");
        model.className = "prize-model";
        model.innerHTML = MODELS[prize.id] || "";

        const name = document.createElement("span");
        name.className = "prize-name";
        name.textContent = prize.name;

        const sub = document.createElement("span");
        sub.className = "prize-sub";
        sub.textContent = prize.sub;

        card.appendChild(icon);
        card.appendChild(model);
        card.appendChild(name);
        card.appendChild(sub);
        return card;
    }

    function rollPrize() {
        const holder = document.getElementById("giftPrize");
        if (!holder) return;
        const prize = pickWeighted(PRIZES);
        holder.innerHTML = "";
        holder.appendChild(renderPrize(prize));
        holder.dataset.prize = prize.id;
        console.log("[Gift] Выпал приз:", prize.name, "—", prize.sub);
    }

    function init() {
        rollPrize();
        const toggle = document.getElementById("gift-toggle");
        if (toggle) {
            toggle.addEventListener("change", function () {
                if (this.checked) rollPrize();
            });
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();