export class PredatorModel {
  id: number;
  id_activity: number;
  id_fish_district: number;
  id_predator: number;
  id_user: number;
  id_water: number;
  including_female_animals: number;
  including_male_animals: number;
  including_young_animals: number;
  latitude: Float32Array;
  longitude: Float32Array;
  completed: number;
  total_number: number;
  comment: string;
  gallery: string;
  activity: string;
  fish_district: string;
  client_name: string;
  completed_date: Date;
  distance_to_water: number;
  predator_name: string;
  water_name: string;
}
