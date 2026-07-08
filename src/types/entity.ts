/**
 * PARTI Entity Types · 統一型別
 *
 * 對應 docs/05-內容架構/entity-types.md
 */

export type EntityType =
  | "architect"
  | "building"
  | "movement"
  | "school"
  | "firm"
  | "book"
  | "exhibition"
  | "award"
  | "theorist";

export type WordCount = 200 | 300 | 500 | 800 | 1000;
export type Importance = 1 | 2 | 3 | 4 | 5;

export interface BaseEntity {
  id: string;
  type: EntityType;
  name: {
    zh: string;
    en: string;
    native?: string;
  };
  wordCount: WordCount;
  bodyText: string;
  imageUrl?: string;
  tags: string[];
  relatedIds: string[];
  importance: Importance;
}

export interface MovementPeriod {
  id: string;
  period: [number, number];
  weight: "primary" | "secondary";
}

export interface Architect extends BaseEntity {
  type: "architect";
  lifespan: [number, number];
  nationality: string[];
  movements: MovementPeriod[];
  buildings: string[];
  firms?: string[];
  schools?: Array<{
    id: string;
    role: "student" | "faculty" | "founder";
    period: [number, number];
  }>;
  influences?: {
    from: string[];
    to: string[];
  };
  books?: string[];
  awards?: Array<{
    id: string;
    year: number;
  }>;
  isPritzker?: boolean;
}

export interface Building extends BaseEntity {
  type: "building";
  architect: string;
  coArchitects?: string[];
  firm?: string;
  movement?: string;
  year: {
    design?: number;
    completed: number;
    demolished?: number;
  };
  location: {
    country: string;
    city: string;
    lat: number;
    lng: number;
  };
  events?: Array<{
    year: number;
    label: string;
  }>;
  buildingType?:
    | "religious"
    | "residential"
    | "public"
    | "commercial"
    | "cultural"
    | "educational"
    | "memorial"
    | "infrastructure";
}

export interface Movement extends BaseEntity {
  type: "movement";
  era: [number, number];
  originLocation: {
    country: string;
    city: string;
    lat: number;
    lng: number;
  };
  coreArchitects: string[];
  keyBuildings: string[];
  manifestoBook?: string;
  colorTheme: string;
  opposingMovements?: string[];
  derivativeMovements?: string[];
}

export type Entity = Architect | Building | Movement;
