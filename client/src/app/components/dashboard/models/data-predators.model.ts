export class UserModel {
  id?: number;
  firstname?: string;
  lastname?: string;
}

export class PredatorItemModel {
  id?: number;
  name?: string;
}

export class WaterModel {
  id?: number;
  name?: string;
}

export class FishDistrictModel {
  id?: number;
  name?: string;
}

export class ActivityModel {
  id?: number;
  name?: string;
}

export class DataPredatorsModel {
  users?: UserModel;
  predators?: PredatorItemModel;
  waters?: WaterModel;
  fishDistrict?: FishDistrictModel;
  activities?: ActivityModel;
}
