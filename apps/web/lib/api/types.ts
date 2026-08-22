// Standard API Responses
export interface StandardResponse<T> {
  success: boolean;
  data: T;
  meta?: Record<string, any>;
}

export interface PaginationMeta {
  page: number;
  page_size: number;
  total: number;
}

export interface StandardListResponse<T> {
  success: boolean;
  data: T[];
  meta: PaginationMeta;
}

export interface ErrorDetails {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export interface ErrorResponse {
  success: boolean;
  error: ErrorDetails;
}

// Domain Models

// 1. Dashboard
export interface DashboardSummary {
  total_study_hours: number;
  overall_academic_risk: string;
  active_skills_building: number;
}
export interface Insight {
  id: string;
  title: string;
  description: string;
  action_url?: string;
}
export interface ModuleStatus {
  name: string;
  status: string;
  last_active?: string;
}
export interface DashboardOverviewResponse {
  greeting: string;
  summary: DashboardSummary;
  insights: Insight[];
  modules: ModuleStatus[];
}

// 2. Study
export interface StudyGoal {
  id: string;
  title: string;
  target_hours: number;
  completed_hours: number;
}
export interface StudyPlan {
  id: string;
  title: string;
  goals: StudyGoal[];
}
export interface StudyPerformance {
  average_focus: number;
  total_sessions: number;
  total_minutes: number;
}
export interface StudyInsight {
  id: string;
  message: string;
  confidence: number;
}

// 3. Academic
export interface AcademicRisk {
  risk_level: string;
  score: number;
  confidence: number;
  factors: string[];
  recommendations: string[];
}
export interface AcademicInsight {
  factor: string;
  impact: string;
}
export interface AcademicOverview {
  gpa: number;
  attendance_rate: number;
  risk_profile: AcademicRisk;
  insights: AcademicInsight[];
}

// 4. Career
export interface Skill {
  name: string;
  proficiency: number;
}
export interface TargetRole {
  title: string;
  required_skills: string[];
}
export interface SkillGap {
  skill_name: string;
  current_level: number;
  required_level: number;
}
export interface SkillProfile {
  id: string;
  current_skills: Skill[];
  target_role?: TargetRole;
  gaps: SkillGap[];
}

// 5. Safety
export interface SafetyScore {
  overall_score: number;
  categories: any[];
}
export interface SafetyRecommendation {
  id: string;
  action: string;
  priority: string;
}
export interface SafetyAssessmentResponse {
  score: SafetyScore;
  recommendations: SafetyRecommendation[];
}

// 6. Threat
export interface ThreatSignal {
  type: string;
  severity: string;
  explanation: string;
}
export interface ThreatAnalysisResponse {
  classification: "safe" | "suspicious" | "scam" | "unknown";
  risk_score: number;
  confidence: number;
  signals: ThreatSignal[];
  recommendations: string[];
}

// 7. Chat
export interface ChatQueryResponse {
  answer?: string;
  source: "faq" | "fallback" | "llm";
  confidence: number;
  matched_faq_id?: string;
  fallback?: {
    type: string;
    message: string;
  };
}
