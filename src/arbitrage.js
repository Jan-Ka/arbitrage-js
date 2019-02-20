document.addEventListener("DOMContentLoaded", () => {
    renderView(
        [
            [
                "button",
                (elem) => {
                    elem.textContent = "Start Game";
                    elem.onclick = onGameStartButtonClick.bind(document.gameState);
                }
            ]
        ],
        (gameState) => {
            gameState.money = 20000;
        }
    );
});

/**
 * @this {Object} gameState
 */
function onGameStartButtonClick() {
    const goodsForLocation = getGoods();

    renderView(
        [
            [
                "span",
                (elem) => {
                    elem.textContent = `You have ${this.money}¤`;
                }
            ],
            ["br"],
            [
                "span",
                (elem) => {
                    elem.textContent = `You are at ${this.location}.`;
                }
            ],
            ["br"],
            ...goodsForLocation.reduce((acc, good, i, ar) => {

                acc.push([
                    "button",
                    (elem) => {
                        elem.textContent = `Buy ${good[0]} for ${good[1]}¤`;
                        elem.onclick = getOnBuyGoodClick.apply(this, good);
                    }
                ]);

                if(i < ar.length - 1) {
                    acc.push(["br"]);
                }


                return acc;
                // return ;
            }, [])
        ],
        (gameState) => {
            gameState.location = "Location A";
            gameState.goods = getGoods();
        }
    );
}

function getOnBuyGoodClick(goodName) {
    return () => {
        if (!this.hasOwnProperty("inventory")) {
            this.inventory = {};
        }

        if (this.inventory.hasOwnProperty(goodName)) {
            this.inventory[goodName] += 1;
        } else {
            this.inventory[goodName] = 1;
        }
    };
}

// Game

function getGoods() {
    return [
        [
            "Drug A",
            10
        ],
        [
            "Drug B",
            175
        ]
    ];
}

// Utils

function renderView(newElementArgs, gameStateChange) {
    let that = this;

    resetView();

    if (!that.hasOwnProperty("gameState")) {
        if (!document.hasOwnProperty("gameState")) {
            document.gameState = {};
        }

        that = document.gameState;
    }

    if (typeof gameStateChange === "function") {
        gameStateChange(that);
    }

    for (const newElemArg of newElementArgs) {
        newElement.apply(that, newElemArg);
    }
}

function resetView() {
    const range = document.createRange();
    range.selectNodeContents(getBody());
    range.deleteContents();
    range.detach();
}

/**
 *
 * @this {Object} gameState
 * @param {*} tagName
 * @param {*} attachProperties
 * @param {*} parent
 */
function newElement(tagName, attachProperties, parent) {
    const element = document.createElement(tagName);

    if (typeof attachProperties === "function") {
        attachProperties(element);
    }

    if (!(parent instanceof Node)) {
        parent = getBody();
    }

    parent.appendChild(element);
}

function getBody() {
    return document.getElementsByTagName("body")[0];
}
