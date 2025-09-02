// src/utils/iconMap.js
"use client"; // Important per si s'usa en components de servidor i client

import {
  MessageSquare, Share2, GraduationCap, Briefcase, Handshake, Bot, FolderInput, BarChart3,
  BrainCircuit, Mail, Database, Sparkles, Send, CalendarClock, Filter, ClipboardCheck,
  BellRing, Youtube, FileText, Camera, Video, Mic, Languages, Puzzle, Album, VenetianMask,
  Ticket, BotMessageSquare, FileCode2, Sheet, Presentation, BookCopy, Facebook, Instagram,
  Users, PlayCircle, ArrowDown, Code, Hammer, Building2, Home, CheckCircle, Target,
  Palette, Edit3, Rocket, Layers3, Fingerprint, X, Building, Clock, TrendingUp, Zap
} from 'lucide-react';

export const iconMap = {
  // Generals
  MessageSquare, Share2, GraduationCap, Briefcase, Handshake, Bot, FolderInput, BarChart3,
  BrainCircuit, Mail, Database, Sparkles, Send, CalendarClock, Filter, ClipboardCheck,
  BellRing, Youtube, FileText, Camera, Video, Mic, Languages, Puzzle, Album, VenetianMask,
  Ticket, BotMessageSquare, FileCode2, Sheet, Presentation, BookCopy, Facebook, Instagram,
  Users, PlayCircle, ArrowDown, Code, Hammer, Building2, Home, CheckCircle, Target,
  Palette, Edit3, Rocket, Layers3, Fingerprint, X, Building, Clock, TrendingUp, Zap,
  
  // Específics de 'TechnologyBadge' (mapejats a icones generals)
  'OpenAI': Sparkles,
  'Google Drive': FolderInput,
  'Gmail': Mail,
  'n8n': Code,
  'WhatsApp': MessageSquare,
  'Redis': Database,
  'PostgreSQL': Database,
  'DOGC API': FileText,
  'Make': Puzzle,
  'Airtable': Database,
  'HeyGen': VenetianMask,
  'Google Sheets': Sheet,
  'Google Slides': Presentation,
  'ElevenLabs': Mic,
  'Tally': FileText,
  'Telegram': Send,
  'Notion': BookCopy,
  'Zoom': Video,
  'Discord': MessageSquare,
  'PDF.co': FileText,
  'Supabase': Database,
  'Mistral AI': BrainCircuit,
  'Claude': Bot,
};