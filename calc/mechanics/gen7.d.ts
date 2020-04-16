import { Field } from '../field';
import { Move } from '../move';
import { Pokemon } from '../pokemon';
import { Result } from '../result';
export declare function makeCalculate(gen: 5 | 6 | 7): (attacker: Pokemon, defender: Pokemon, move: Move, field: Field) => Result;
export declare const calculateSM: (attacker: Pokemon, defender: Pokemon, move: Move, field: Field) => Result;
