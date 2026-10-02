export type FamilyRole =
  | 'anne'
  | 'baba'
  | 'cocuk'
  | 'buyuk_cocuk'
  | 'ortanca_cocuk'
  | 'kucuk_cocuk'
  | 'dede'
  | 'babaanne'
  | 'anneanne';

export interface FamilyMember {
  id: string;
  name: string;
  role: FamilyRole;
  roleLabel: string; // 'Anne', 'Baba', 'Çocuk'
  avatarColor: string;
  favoriteDrink: string;
}

export interface Story {
  id: string;
  title: string;
  author: string;
  category: string;
  summary: string;
  paragraphs: string[];
  keyQuote: string;
  familyDiscussionPrompt: string;
}

export interface StoryDiscussionTopic {
  id: string;
  storyId: string;
  storyTitle: string;
  author: string;
  mainTheme: string;
  coreQuestion: string;
  questionsForParents: string;
  questionsForChildren: string;
  familyReflection: string;
  actionPrompt: string;
}

export interface WeeklyActivity {
  dayNumber: number;
  dayName: string;
  title: string;
  subtitle: string;
  duration: string;
  bookQuote: string;
  description: string;
  steps: string[];
  familyChatQuestion: string;
  treatSuggestion: string;
  iconType: string;
}

export interface DailyGame {
  id: string;
  title: string;
  subtitle: string;
  durationMinutes: number;
  materialsNeeded: string;
  howToPlay: string[];
  familyValue: string;
  funFactor: string;
}

export interface FamilyMeetingDecision {
  id: string;
  topic: string;
  decisionText: string;
  responsible: string;
  targetDate: string;
}

export interface FamilyMeetingRecord {
  id: string;
  meetingDate: string;
  meetingTime: string;
  moderator: string;
  scribe: string;
  attendees: string[];
  treats: string[];
  gratitudeSection: string;
  problemsAndNeeds: string;
  decisions: FamilyMeetingDecision[];
  nextMeetingDate: string;
}

export interface FamilyMessage {
  id: string;
  fromName: string;
  fromRole: string;
  toName: string;
  messageText: string;
  category: 'sevgi' | 'tesekkur' | 'ozur' | 'motivasyon' | 'hatirlatma';
  color: 'yellow' | 'rose' | 'blue' | 'green' | 'amber' | 'purple';
  createdAt: string;
  likes: number;
}

export interface FamilyTask {
  id: string;
  title: string;
  assignedTo: string;
  assignedRole: string;
  frequency: 'Her Gün' | 'Hafta Sonu' | 'Toplantı Günü' | 'Akşam';
  completed: boolean;
  category: 'mutfak' | 'salon' | 'toplanti' | 'sevgi';
}

export type MoodType =
  | 'cok_mutlu'
  | 'neseli'
  | 'sakin'
  | 'yorgun'
  | 'uzgun'
  | 'stresli';

export interface MoodEntry {
  id: string;
  date: string; // YYYY-MM-DD
  memberId: string;
  memberName: string;
  memberRole: string;
  mood: MoodType;
  emoji: string;
  moodLabel: string;
  note?: string;
  score: number; // 20 to 100 for happiness meter
}
