export interface TacticalDivision {
  id: string;
  divisionNumber: string;
  name: string;
  shortDesc: string;
  fullTitle: string;
  category: string;
  desc: string;
  status: string;
  ref: string;
  image: string;
  iconName: string;
  features: {
    title: string;
    desc: string;
  }[];
  specSheetSize: string;
}

export interface EnterpriseOperation {
  id: string;
  category: string;
  title: string;
  desc: string;
  features: string[];
  actionLabel: string;
  iconName: string;
}

export interface TrainingPillar {
  step: string;
  title: string;
  desc: string;
}

export interface MetricItem {
  value: string;
  label: string;
  sublabel: string;
}

export interface ConsultationFormData {
  corporateEntity: string;
  officerName: string;
  email: string;
  phone: string;
  service: string;
  requirements: string;
  ndaRequired: boolean;
}
