import { TacticalDivision, EnterpriseOperation, TrainingPillar, MetricItem } from '../types';
import companyLogoImg from '../assets/images/company_logo_1789214330912.jpg';
import headquartersMapImg from '../assets/images/headquarters_map_1789216400758.jpg';
import cashTransportImg from '../assets/images/CashAndHighValueAssetTransportation.png';
import electronicSurveillanceImg from '../assets/images/ElectronicSurvelliance.png';
import guardingServicesImg from '../assets/images/guardingservices.png';
import executiveVipImg from '../assets/images/ExecutiveVIP.png';
import zeroToleranceImg from '../assets/images/zerotolerance.png';

export const ASSETS = {
  crest: companyLogoImg,
  logo: companyLogoImg,
  logoPublic: '/company_logo.png',
  tacticalHeadquartersMap: headquartersMapImg,
  heroCommandCenter: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwov7BSa25cvEAZ4umHetxjZ8pCtYOs2g-Iagda-gFI8S1lGzjxIYgK_ylxv2o3Y1JUHZLO5PmhXL-LmtxRNHnsOY6rsg00ewTDZZup4jFJ6OFh14hAPLrVymUOjG9zEnya9lKrz7Cq9cMV8DkpDjECiNhjVFUwS86d2Fg6c5zwiEcHeZzsffnWxjrwU8QPx4FyeK42VUuHDPRxTzDPRoFU2Hpc4ddpBCp2ZyLCjMg_ZlGCyTwJJPY',
  tacticalCadre: zeroToleranceImg,
  cashTransport: cashTransportImg,
  electronicSurveillance: electronicSurveillanceImg,
  guardingServices: guardingServicesImg,
  executiveVip: executiveVipImg,
};

export const COMPANY_CONTACT = {
  legalName: '9 Armoured Cop Security Service Pvt. Ltd.',
  brandName: '9 Armoured Cop Security Service',
  website: 'www.9armouredcopsecurity.com',
  websiteUrl: 'https://www.9armouredcopsecurity.com',
  email: '9armouredcopsecurity@gmail.com',
  address: 'Shed No- 26, Maruti Industrial Estate - 2, SLM mill Compound, Nr. Vatva Rly station Vatva, Ahmedabad 382445.',
  addressShort: 'Maruti Industrial Estate - 2, Vatva, Ahmedabad 382445',
  landmark: 'Nr. Vatva Rly station, SLM mill Compound',
  pincode: '382445',
  city: 'Ahmedabad',
  state: 'Gujarat',
  country: 'India',
  phone: '+91-9157092555',
  phoneTel: '+919157092555',
  directors: [
    { name: 'D S Pandey', phone: '+91 9898557772', phoneTel: '+919898557772' },
    { name: 'Vinay Singh Parihar', phone: '+91 9081607192', phoneTel: '+919081607192' },
  ],
  infoEmail: 'info@9armouredcopsecurity.com',
  careersEmail: 'careers@9armouredcopsecurity.com',
  hrPhone: '+91 9898557772',
  hrPhoneTel: '+919898557772',
  mapsQueryUrl: 'https://www.google.com/maps/search/?api=1&query=Shed+No-+26,+Maruti+Industrial+Estate+-+2,+SLM+mill+Compound,+Nr.+Vatva+Rly+station+Vatva,+Ahmedabad+382445',
  hours: '24/7 Rapid Mobilization & Command Dispatch',
  socials: {
    instagramUrl: 'https://www.instagram.com/9armouredcopsecurity/',
    linkedinUrl: 'https://www.linkedin.com/in/9armouredcopsecurity-undefined-b033a4436/',
  }
};

/**
 * Build a Gmail web-compose URL so clicking an email always opens
 * Gmail's compose page (mailto: does nothing when no desktop mail
 * client is installed).
 */
export const gmailComposeUrl = (to: string, subject = '', body = '') => {
  const params = new URLSearchParams({ view: 'cm', fs: '1', to });
  if (subject) params.set('su', subject);
  if (body) params.set('body', body);
  return `https://mail.google.com/mail/?${params.toString()}`;
};

export const TACTICAL_DIVISIONS: TacticalDivision[] = [
  {
    id: 'div-01',
    divisionNumber: 'Division 01',
    name: 'Guarding Services & Perimeter Defense',
    shortDesc: 'Rigorous access control, automated gate visitor ecosystems, and armed nocturnal perimeter patrolling.',
    fullTitle: 'Guarding Services: Corporate & High-Density Facilities',
    category: 'Executive Tier Specification',
    desc: 'Our static and patrol guarding operations exceed standard security mandates. We integrate visitor identity verification kiosks, non-lethal perimeter countermeasures, round-the-clock supervisor patrols, and real-time electronic incident telemetry directly logged to client headquarters.',
    status: 'Field Deployed · 24/7',
    ref: 'SV-SEC-01',
    image: ASSETS.guardingServices,
    iconName: 'Shield',
    features: [
      {
        title: 'Biometric Visitor Registry',
        desc: 'Automated photo/ID gate passes and vehicle scanning.'
      },
      {
        title: 'GPS Guard Tour Verification',
        desc: 'Wand checkpoints and automated patrol frequency logs.'
      },
      {
        title: 'De-escalation & Protocol',
        desc: 'Corporate courtesy certified, fluent in Gujarati, Hindi & English.'
      },
      {
        title: 'Armed Sentry Escorts',
        desc: 'Licensed defensive firearms handling with spotless records.'
      }
    ],
    specSheetSize: '3.4 MB'
  },
  {
    id: 'div-02',
    divisionNumber: 'Division 02',
    name: 'Executive VIP Protection (C-Suite & Dignitaries)',
    shortDesc: 'Close protection officers trained in threat neutralizing, advance reconnaissance, and discreet motorcade maneuvers.',
    fullTitle: 'Executive Protection: C-Suite, Dignitaries & High-Net-Worth Families',
    category: 'Executive VIP Protocol',
    desc: 'Close personal protection officers trained in evasive driving maneuvers, crowd risk dynamics, and discrete personal escort. Designed to provide total peace of mind for international trade delegations, corporate chairmen, and dignitaries traversing Gujarat and GIFT City.',
    status: 'Motorcade Active',
    ref: 'SV-VIP-02',
    image: ASSETS.executiveVip,
    iconName: 'UserCheck',
    features: [
      {
        title: 'Advance Route Reconnaissance',
        desc: 'Pre-screened travel corridors, emergency hospital links, and safe houses.'
      },
      {
        title: 'Armored Chauffeur Capabilities',
        desc: 'Trained in counter-ambush driving and high-speed convoy navigation.'
      },
      {
        title: 'Discrete Plainclothes Demeanor',
        desc: 'Blends seamlessly into boardrooms, five-star galas, and VIP airport lounges.'
      },
      {
        title: 'Close Threat Neutralization',
        desc: 'Ex-paramilitary armed personnel qualified in close-quarters defense.'
      }
    ],
    specSheetSize: '4.1 MB'
  },
  {
    id: 'div-03',
    divisionNumber: 'Division 03',
    name: 'Cash & High-Value Asset Transportation',
    shortDesc: 'Armored logistics with encrypted GPS telematics, dual-custody protocols, and bullion vaulting transit.',
    fullTitle: 'Cash & High-Value Asset Transportation (Bullion & Gems)',
    category: 'Armored Logistics',
    desc: 'Specialized transit units supporting banks, diamond merchants across Surat, and high-value precious metals refiners. Custom bullet-resistant vehicles outfitted with dual-key electronic lockboxes, live satellite geo-fencing, and armed guard escorts.',
    status: 'Secure Vault Transit',
    ref: 'SV-CASH-03',
    image: ASSETS.cashTransport,
    iconName: 'Truck',
    features: [
      {
        title: 'Class III Armored Carriers',
        desc: 'Reinforced ballistic steel cabins and run-flat tire systems.'
      },
      {
        title: 'Satellite Telematics & Remote Kill-Switch',
        desc: 'Continuous 5-second GPS tracking with remote engine disablement.'
      },
      {
        title: 'Dual-Custodian Interlock Protocols',
        desc: 'Digital authorization required from both client and command base.'
      },
      {
        title: '100% Comprehensive Transit Insurance',
        desc: 'Fully underwritten transit policies backed by leading national insurers.'
      }
    ],
    specSheetSize: '2.8 MB'
  },
  {
    id: 'div-04',
    divisionNumber: 'Division 04',
    name: 'Electronic Surveillance & Perimeter AI',
    shortDesc: 'Next-generation thermal CCTV arrays, biometrics, intrusion alarms, and centralized SOC command monitoring.',
    fullTitle: 'Electronic Security: AI Thermal Surveillance & Rapid Response Alarms',
    category: 'Surveillance Technology',
    desc: 'End-to-end hardware procurement, architectural system design, and 24/7 Security Operations Center (SOC) oversight. We eliminate blind spots across expansive factory footprints, solar parks, and multi-acre corporate estates with AI analytics.',
    status: 'SOC Center Online',
    ref: 'SV-ELEC-04',
    image: ASSETS.electronicSurveillance,
    iconName: 'Cctv',
    features: [
      {
        title: 'AI Perimeter Intrusion Detection',
        desc: 'Automated optical tripwires and facial recognition against blacklists.'
      },
      {
        title: 'Night-Vision & Thermal Optics',
        desc: 'Zero-lux night observation engineered for industrial perimeters.'
      },
      {
        title: 'Integrated Fire & Gas Sensors',
        desc: 'Early warning smoke, heat, and toxic vapor alarm telemetry.'
      },
      {
        title: 'Centralized Remote Monitoring SOC',
        desc: 'Gujarat-wide dispatch with 8-minute average emergency mobilization.'
      }
    ],
    specSheetSize: '5.2 MB'
  }
];

export const ENTERPRISE_OPERATIONS: EnterpriseOperation[] = [
  {
    id: 'op-01',
    category: 'Statutory Governance',
    title: 'Payroll & Compliance Records',
    desc: 'Flawless workforce payroll processing, Provident Fund (PF), ESIC, Professional Tax, and labor law compliance. Complete statutory enquiry/audit assurance across Gujarat industrial corridors.',
    features: [
      'Monthly automated biometric wage disbursement',
      'Form V, Form XII, & Factory Act compliance',
      'Dedicated legal and labor grievance liaison'
    ],
    actionLabel: 'EXPLORE GOVERNANCE',
    iconName: 'Database'
  },
  {
    id: 'op-02',
    category: 'Facility Excellence',
    title: 'Facility Housekeeping & Flex Staffing',
    desc: 'Five-star hotel grade facility upkeep, industrial deep-cleaning crews, and rapid temp staffing for peak seasonal manufacturing surges and corporate exhibitions.',
    features: [
      'Hospital-grade sanitization & eco-certified chemicals',
      'Rapid 24-hour turnaround on blue-collar staffing',
      'Uniformed, screened, and background-verified teams'
    ],
    actionLabel: 'VIEW LOGISTICS',
    iconName: 'Sparkles'
  },
  {
    id: 'op-03',
    category: 'Bespoke Hospitality',
    title: 'Healthcare & Corporate Guest Houses',
    desc: 'Turnkey guest house operations for executive directors, hospital patient-care support staff, front-desk concierge attendants, and bespoke pantry attendants.',
    features: [
      'End-to-end VIP guest house chef & housekeeping care',
      'NABH-oriented healthcare orderly and ward attendants',
      'Reception desk and telecommunications personnel'
    ],
    actionLabel: 'REQUEST BLUEPRINT',
    iconName: 'Hotel'
  }
];

export const TRAINING_PILLARS: TrainingPillar[] = [
  {
    step: '01',
    title: 'Threat Recognition & Micro-Expressions',
    desc: 'Instruction by retired defense specialists in identifying hostile surveillance, bag concealment, and suspicious behavior cues.'
  },
  {
    step: '02',
    title: 'Defensive Martial Arts & Unarmed Restraint',
    desc: 'Non-lethal neutralization of aggressive trespassers without causing corporate disruption or reputational damage.'
  },
  {
    step: '03',
    title: 'First Aid, CPR & Trauma Management',
    desc: 'Red Cross certified response for AED operation, cardiac emergencies, industrial crush injuries, and burn stabilization.'
  },
  {
    step: '04',
    title: 'Corporate Protocol & Concierge Etiquette',
    desc: 'Impeccable personal grooming, executive vocal modulation, English communication, and dignified escort decorum.'
  }
];

export const METRICS: MetricItem[] = [
  {
    value: 'EST. 2008',
    label: 'State Registered',
    sublabel: 'Govt. of Gujarat Licensed & Certified'
  },
  {
    value: 'A-Grade',
    label: 'Quality Assurance',
    sublabel: 'Standardized Security & Staffing Management Systems'
  },
  {
    value: '2,500+',
    label: 'Active Guard Force',
    sublabel: 'Deployed across Ahmedabad and Gujarat industrial corridors'
  },
  {
    value: '100%',
    label: 'Insured Indemnity',
    sublabel: 'Comprehensive fidelity and public liability insurance coverage'
  }
];

export const REGIONAL_HUBS = [
  'Ahmedabad Hub'
];
