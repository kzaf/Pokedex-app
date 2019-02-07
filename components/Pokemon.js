class Pokemon {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.sprite = data.sprites.front_default;
        this.abilities = data.abilities; // More than one (arrow)
        this.types = data.types; // More than one (arrow)
        this.stats = data.stats; // More than one (arrow)
        this.moves = data.moves; // More than one (arrow, many items)
    }
}

export default Pokemon;