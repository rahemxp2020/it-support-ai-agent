export type ProblemCategory =
  | 'internet'
  | 'internal_network'
  | 'printer'
  | 'slow_pc'
  | 'login'
  | 'email'
  | 'software'
  | 'file_sharing'
  | 'other';

export type PriorityLevel = 'منخفض' | 'متوسط' | 'مرتفع' | 'حرج';

export type TicketStatus = 'جديد' | 'قيد المعالجة' | 'تم الحل' | 'مغلق';

export interface DiagnosticStep {
  step: string;
  command?: string;
  expected: string;
  done?: boolean;
}

export interface SolutionItem {
  title: string;
  action: string;
  badge?: string;
}

export interface DiagnosisData {
  analysis: string;
  rootCauses: string[];
  diagnosticSteps: DiagnosticStep[];
  solutions: SolutionItem[];
  recommendedPriority: string;
  preventiveTips: string[];
  quickCommands?: string[];
}

export interface TicketFollowUpMessage {
  id: string;
  author: string;
  role: 'user' | 'technician' | 'system';
  message: string;
  timestamp: string;
  type?: 'message' | 'remote_request' | 'visit_request' | 'status_update';
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  createdAt: string;
  updatedAt?: string;
  userName: string;
  department: string;
  deviceType: string;
  os: string;
  category: ProblemCategory;
  categoryLabel: string;
  description: string;
  priority: PriorityLevel;
  status: TicketStatus;
  technicianName?: string;
  technicians?: string[];
  diagnosisSummary?: string;
  suggestedSolution?: string;
  resolutionNotes?: string;
  assistanceType?: 'self' | 'remote' | 'on_site';
  requiresSpecialistIntervention?: boolean;
  followUpHistory?: TicketFollowUpMessage[];
}

export interface ProblemCategoryInfo {
  id: ProblemCategory;
  title: string;
  titleEn?: string;
  shortDesc: string;
  shortDescEn?: string;
  iconName: string;
  badgeColor: string;
  typicalSymptoms: string[];
  typicalSymptomsEn?: string[];
  samplePreset: {
    userName?: string;
    department: string;
    deviceType: string;
    os: string;
    description: string;
    priority: PriorityLevel;
  };
  samplePresetEn?: {
    userName?: string;
    department: string;
    deviceType: string;
    os: string;
    description: string;
    priority: PriorityLevel;
  };
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
}

export interface NotificationChannelSettings {
  whatsappEnabled: boolean;
  whatsappNumber: string;
  emailEnabled: boolean;
  emailAddress: string;
  telegramEnabled: boolean;
  telegramBotToken: string;
  telegramChatId: string;
  autoDispatchOnNewTicket: boolean;
  notifyOnStatusChange: boolean;
}

