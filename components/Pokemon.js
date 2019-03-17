class Pokemon {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.sprite = data.sprites.front_default;
        this.abilities = data.abilities;
        this.types = data.types; 
        this.stats = data.stats;
        this.moves = data.moves;
    }
}

export default Pokemon;
