import { WiseEntityBase } from '../WiseEntityBase';
import type { WiseSDK } from '../WiseSDK';
import type { Control } from '../types';
import type { Simulation, SimulationLoadMatch, SimulationListMatch, SimulationCreateData } from '../WiseTypes';
declare class SimulationEntity extends WiseEntityBase<Simulation> {
    constructor(client: WiseSDK, entopts: any);
    make(this: SimulationEntity): SimulationEntity;
    load(this: any, reqmatch?: SimulationLoadMatch, ctrl?: Control): Promise<SimulationEntity>;
    list(this: any, reqmatch?: SimulationListMatch, ctrl?: Control): Promise<SimulationEntity[]>;
    create(this: any, reqdata?: SimulationCreateData, ctrl?: Control): Promise<SimulationEntity>;
}
export { SimulationEntity };
