import { PersonType } from './enums';

export type TDbCollection = 'objects' | 'contents' | 'persons';

export interface IObjectItemServer {
  _id: number;
  ObjObjectTitleTxt?: string; // Title
  ObjDateGrp_DateFromTxt?: string; // Designed / Entwurfsdatum
  ObjDesigner?: string; // Designer
  ObjHighlight?: string; // ?
  ObjMultimediaRel?: {
    [0]: {
      MulUrl: string; // Image
    };
  };
}

export interface IObjectServer extends IObjectItemServer {
  ObjCategoryVoc: string; // Object Type
  ObjDateTxt?: string; // Dating / Produktionsdatum von - bis
  ObjMaterialTechniqueTxt?: string; // Material
  ObjDimension?: string; // Dimensions
  ObjMarkdown?: string; // Description
  ObjDateGrp_Notes2Clb?: string; // First Production
  ObjObjectNumberGrp_Part1Txt?: string; // InventorNo
  ObjPersonRel?: IPersonRelation[];
  ObjObjectRel?: IObjectRelation[];
}

export interface IPersonRelation {
  PerId: number; // Id
  PerNameTxt: string; // Name
  PerTypeVoc: PersonType; // Type
  PerDatingTxt?: string; // Dating
  PerBirthPlaceCity?: string;
  PerBirthPlaceCountry?: string;
  PerUrl?: string; // Image
}
export interface IObjectRelation {
  ObjId: number; // Id
  ObjObjectTitleTxt?: string; // Title
  ObjObjectTitleSubTxt?: string; // Subtitle
  ObjDateGrp_DateFromTxt?: string; // Dating
  ObjDesigner?: string; // Designer
  ObjUrl?: string; // Image
}

export interface ISingleRecordServerResponse {
  document: unknown;
}
export interface IMultipleRecordsServerResponse {
  documents: unknown;
}

export interface IDesignerItemServer {
  _id: number;
  PerNameTxt?: string;
  PerNameSortedTxt?: string;
  PerDatingTxt?: string;
  PerMultimediaRel?: {
    [0]: {
      MulUrl: string; // Image
    };
  };
}
export interface IManufacturerItemServer {
  _id: number;
  PerNameTxt?: string;
  PerBirthPlaceCity?: string;
  PerNationalityTxt?: string;
  PerMultimediaRel?: {
    [0]: {
      MulUrl: string; // Image
    };
  };
}

export interface IPersonServer {
  _id: number;
  PerNameTxt?: string;
  PerDatingTxt?: string;
  PerNameSortedTxt: string;
  PerTypeVoc: PersonType;
  PerNationalityTxt: string;
  PerMarkdown: string;
  PerBirthPlaceCity: string;
  PerBirthPlaceCountry: string;
  PerDisplay: string;
  PerFullText: string;
  PerObjectRel?: IPersonObjectRelation[];
  PerMultimediaRel?: {
    [0]: {
      MulUrl: string; // Image
    };
  };
}

export interface IPersonObjectRelation {
  ObjId: number; // Id
  ObjObjectTitleTxt?: string; // Title
  ObjDateGrp_DateFromTxt?: string; // Dating
  ObjDesigner?: string; // Designer
  ObjUrl?: string; // Image
}
