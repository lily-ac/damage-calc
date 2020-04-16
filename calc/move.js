"use strict";
exports.__esModule = true;
var util_1 = require("./util");
var Move = (function () {
    function Move(gen, name, options) {
        if (options === void 0) { options = {}; }
        this.originalName = name;
        var data = util_1.extend(true, { name: name }, gen.moves.get(util_1.toID(name)), options.overrides);
        if (options.useMax && 'maxPower' in data) {
            var maxMoveName = getMaxMoveName(data.type, options.species, !!(data.category === 'Status'));
            var maxMove = gen.moves.get(util_1.toID(maxMoveName));
            data = util_1.extend(true, {}, maxMove, {
                name: maxMoveName,
                bp: maxMove.bp === 10 ? getMaxMoveBasePower(data) : maxMove.bp,
                category: data.category
            });
            this.hits = 1;
        }
        if (options.useZ && 'zp' in data) {
            var zMoveName = getZMoveName(data.name, data.type, options.item);
            var zMove = gen.moves.get(util_1.toID(zMoveName));
            data = util_1.extend(true, {}, zMove, {
                name: zMoveName,
                bp: zMove.bp === 1 ? data.zp : zMove.bp,
                category: data.category
            });
            this.hits = 1;
        }
        else {
            this.hits = data.isMultiHit
                ? options.hits || (options.ability === 'Skill Link' || options.item === 'Grip Claw' ? 5 : 3)
                : data.isTwoHit
                    ? 2
                    : 1;
            this.metronomeCount = options.metronomeCount;
        }
        this.usedTimes = (data.dropsStats && options.usedTimes) || 1;
        this.gen = gen;
        this.name = data.name;
        this.ability = options.ability;
        this.item = options.item;
        this.useZ = options.useZ;
        this.useMax = options.useMax;
        this.overrides = options.overrides;
        this.bp = data.bp;
        this.type = data.type;
        this.category = data.category || 'Status';
        this.hasSecondaryEffect = !!data.hasSecondaryEffect;
        this.isSpread = data.isSpread === 'allAdjacent' ? data.isSpread : !!data.isSpread;
        this.makesContact = !!data.makesContact;
        this.hasRecoil = data.hasRecoil;
        this.isCrit = !!options.isCrit || !!data.alwaysCrit;
        this.givesHealth = !!data.givesHealth;
        this.percentHealed = data.percentHealed;
        this.ignoresBurn = !!data.ignoresBurn;
        this.isPunch = !!data.isPunch;
        this.isBite = !!data.isBite;
        this.isBullet = !!data.isBullet;
        this.isSound = !!data.isSound;
        this.isPulse = !!data.isPulse;
        this.hasPriority = !!data.hasPriority;
        this.dropsStats = data.dropsStats;
        this.ignoresDefenseBoosts = !!data.ignoresDefenseBoosts;
        this.dealsPhysicalDamage = !!data.dealsPhysicalDamage;
        this.bypassesProtect = !!data.bypassesProtect;
        this.isZ = !!data.isZ;
        this.isMax = !!data.isMax;
        this.usesHighestAttackStat = !!data.usesHighestAttackStat;
    }
    Move.prototype.clone = function () {
        return new Move(this.gen, this.originalName, {
            ability: this.ability,
            item: this.item,
            species: this.species,
            useZ: this.useZ,
            useMax: this.useMax,
            isCrit: this.isCrit,
            hits: this.hits,
            usedTimes: this.usedTimes,
            metronomeCount: this.metronomeCount,
            overrides: this.overrides
        });
    };
    return Move;
}());
exports.Move = Move;
function getZMoveName(moveName, moveType, item) {
    item = item || '';
    if (moveName.indexOf('Hidden Power') !== -1)
        return 'Breakneck Blitz';
    if (moveName === 'Clanging Scales' && item === 'Kommonium Z')
        return 'Clangorous Soulblaze';
    if (moveName === 'Darkest Lariat' && item === 'Incinium Z')
        return 'Malicious Moonsault';
    if (moveName === 'Giga Impact' && item === 'Snorlium Z')
        return 'Pulverizing Pancake';
    if (moveName === 'Moongeist Beam' && item === 'Lunalium Z')
        return 'Menacing Moonraze Maelstrom';
    if (moveName === 'Photon Geyser' && item === 'Ultranecrozium Z') {
        return 'Light That Burns the Sky';
    }
    if (moveName === 'Play Rough' && item === 'Mimikium Z')
        return "Let's Snuggle Forever";
    if (moveName === 'Psychic' && item === 'Mewnium Z')
        return 'Genesis Supernova';
    if (moveName === 'Sparkling Aria' && item === 'Primarium Z')
        return 'Oceanic Operetta';
    if (moveName === 'Spectral Thief' && item === 'Marshadium Z') {
        return 'Soul-Stealing 7-Star Strike';
    }
    if (moveName === 'Spirit Shackle' && item === 'Decidium Z')
        return 'Sinister Arrow Raid';
    if (moveName === 'Stone Edge' && item === 'Lycanium Z')
        return 'Splintered Stormshards';
    if (moveName === 'Sunsteel Strike' && item === 'Solganium Z')
        return 'Searing Sunraze Smash';
    if (moveName === 'Volt Tackle' && item === 'Pikanium Z')
        return 'Catastropika';
    if (moveName === "Nature's Madness" && item === 'Tapunium Z')
        return 'Guardian of Alola';
    if (moveName === 'Thunderbolt') {
        if (item === 'Aloraichium Z')
            return 'Stoked Sparksurfer';
        if (item === 'Pikashunium Z')
            return '10,000,000 Volt Thunderbolt';
    }
    return ZMOVES_TYPING[moveType];
}
exports.getZMoveName = getZMoveName;
var ZMOVES_TYPING = {
    Bug: 'Savage Spin-Out',
    Dark: 'Black Hole Eclipse',
    Dragon: 'Devastating Drake',
    Electric: 'Gigavolt Havoc',
    Fairy: 'Twinkle Tackle',
    Fighting: 'All-Out Pummeling',
    Fire: 'Inferno Overdrive',
    Flying: 'Supersonic Skystrike',
    Ghost: 'Never-Ending Nightmare',
    Grass: 'Bloom Doom',
    Ground: 'Tectonic Rage',
    Ice: 'Subzero Slammer',
    Normal: 'Breakneck Blitz',
    Poison: 'Acid Downpour',
    Psychic: 'Shattered Psyche',
    Rock: 'Continental Crush',
    Steel: 'Corkscrew Crash',
    Water: 'Hydro Vortex'
};
function getMaxMoveName(moveType, pokemonSpecies, isStatus) {
    if (isStatus)
        return 'Max Guard';
    if (moveType === 'Fire') {
        if (pokemonSpecies === 'Charizard-Gmax')
            return 'G-Max Wildfire';
        if (pokemonSpecies === 'Centiskorch-Gmax')
            return 'G-Max Centiferno';
    }
    if (moveType === 'Normal') {
        if (pokemonSpecies === 'Eevee-Gmax')
            return 'G-Max Cuddle';
        if (pokemonSpecies === 'Meowth-Gmax')
            return 'G-Max Gold Rush';
        if (pokemonSpecies === 'Snorlax-Gmax')
            return 'G-Max Replenish';
    }
    if (moveType === 'Fairy') {
        if (pokemonSpecies === 'Alcremie-Gmax')
            return 'G-Max Finale';
        if (pokemonSpecies === 'Hatterene-Gmax')
            return 'G-Max Smite';
    }
    if (moveType === 'Steel') {
        if (pokemonSpecies === 'Copperajah-Gmax')
            return 'G-Max Steelsurge';
        if (pokemonSpecies === 'Melmetal-Gmax')
            return 'G-Max Meltdown';
    }
    if (moveType === 'Electric') {
        if (pokemonSpecies === 'Pikachu-Gmax')
            return 'G-Max Volt Crash';
        if (pokemonSpecies === 'Toxtricity-Gmax')
            return 'G-Max Stun Shock';
    }
    if (moveType === 'Grass') {
        if (pokemonSpecies === 'Appletun-Gmax')
            return 'G-Max Sweetness';
        if (pokemonSpecies === 'Flapple-Gmax')
            return 'G-Max Tartness';
    }
    if (moveType === 'Water') {
        if (pokemonSpecies === 'Drednaw-Gmax')
            return 'G-Max Stonesurge';
        if (pokemonSpecies === 'Kingler-Gmax')
            return 'G-Max Foam Burst';
    }
    if (moveType === 'Poison' && pokemonSpecies === 'Garbodor-Gmax')
        return 'G-Max Malodor';
    if (moveType === 'Fighting' && pokemonSpecies === 'Machamp-Gmax')
        return 'G-Max Chi Strike';
    if (moveType === 'Ghost' && pokemonSpecies === 'Gengar-Gmax')
        return 'G-Max Terror';
    if (moveType === 'Ice' && pokemonSpecies === 'Lapras-Gmax')
        return 'G-Max Resonance';
    if (moveType === 'Flying' && pokemonSpecies === 'Corviknight-Gmax')
        return 'G-Max Wind Rage';
    if (moveType === 'Dragon' && pokemonSpecies === 'Duraludon-Gmax')
        return 'G-Max Depletion';
    if (moveType === 'Psychic' && pokemonSpecies === 'Orbeetle-Gmax')
        return 'G-Max Gravitas';
    if (moveType === 'Rock' && pokemonSpecies === 'Coalossal-Gmax')
        return 'G-Max Volcalith';
    if (moveType === 'Ground' && pokemonSpecies === 'Sandaconda-Gmax')
        return 'G-Max Sandblast';
    if (moveType === 'Dark' && pokemonSpecies === 'Grimmsnarl-Gmax')
        return 'G-Max Snooze';
    return 'Max ' + MAXMOVES_TYPING[moveType];
}
exports.getMaxMoveName = getMaxMoveName;
var MAXMOVES_TYPING = {
    Bug: 'Flutterby',
    Dark: 'Darkness',
    Dragon: 'Wyrmwind',
    Electric: 'Lightning',
    Fairy: 'Starfall',
    Fighting: 'Knuckle',
    Fire: 'Flare',
    Flying: 'Airstream',
    Ghost: 'Phantasm',
    Grass: 'Overgrowth',
    Ground: 'Quake',
    Ice: 'Hailstorm',
    Normal: 'Strike',
    Poison: 'Ooze',
    Psychic: 'Mindstorm',
    Rock: 'Rockfall',
    Steel: 'Steelspike',
    Water: 'Geyser'
};
function getMaxMoveBasePower(move) {
    var movePower = 10;
    if (move.maxPower)
        movePower = move.maxPower;
    if (!move.maxPower && move.category !== 'Status') {
        if (!move.bp) {
            movePower = 100;
        }
        else if (move.type === 'Fighting' || move.type === 'Poison') {
            if (move.bp >= 150) {
                movePower = 100;
            }
            else if (move.bp >= 110) {
                movePower = 95;
            }
            else if (move.bp >= 75) {
                movePower = 90;
            }
            else if (move.bp >= 65) {
                movePower = 85;
            }
            else if (move.bp >= 55) {
                movePower = 80;
            }
            else if (move.bp >= 45) {
                movePower = 75;
            }
            else {
                movePower = 70;
            }
        }
        else {
            if (move.bp >= 150) {
                movePower = 150;
            }
            else if (move.bp >= 110) {
                movePower = 140;
            }
            else if (move.bp >= 75) {
                movePower = 130;
            }
            else if (move.bp >= 65) {
                movePower = 120;
            }
            else if (move.bp >= 55) {
                movePower = 110;
            }
            else if (move.bp >= 45) {
                movePower = 100;
            }
            else {
                movePower = 90;
            }
        }
    }
    return movePower;
}
//# sourceMappingURL=move.js.map