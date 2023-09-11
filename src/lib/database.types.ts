export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Participant: {
        Row: {
          participant_id: string
          survey_id: string
        }
        Insert: {
          participant_id?: string
          survey_id: string
        }
        Update: {
          participant_id?: string
          survey_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Participant_survey_id_fkey"
            columns: ["survey_id"]
            referencedRelation: "Survey"
            referencedColumns: ["survey_id"]
          }
        ]
      }
      Response: {
        Row: {
          comp_choice: string | null
          participant_id: string | null
          response_id: string
          section_id: string | null
          survey_id: string | null
          user_choice: string
        }
        Insert: {
          comp_choice?: string | null
          participant_id?: string | null
          response_id?: string
          section_id?: string | null
          survey_id?: string | null
          user_choice: string
        }
        Update: {
          comp_choice?: string | null
          participant_id?: string | null
          response_id?: string
          section_id?: string | null
          survey_id?: string | null
          user_choice?: string
        }
        Relationships: [
          {
            foreignKeyName: "Response_participant_id_fkey"
            columns: ["participant_id"]
            referencedRelation: "Participant"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "Response_section_id_fkey"
            columns: ["section_id"]
            referencedRelation: "Section"
            referencedColumns: ["section_id"]
          },
          {
            foreignKeyName: "Response_survey_id_fkey"
            columns: ["survey_id"]
            referencedRelation: "Survey"
            referencedColumns: ["survey_id"]
          }
        ]
      }
      Section: {
        Row: {
          paper_prob: number
          rock_prob: number
          scissor_prob: number
          section_id: string
          survey_id: string
          trial_no: number
        }
        Insert: {
          paper_prob: number
          rock_prob: number
          scissor_prob: number
          section_id?: string
          survey_id: string
          trial_no: number
        }
        Update: {
          paper_prob?: number
          rock_prob?: number
          scissor_prob?: number
          section_id?: string
          survey_id?: string
          trial_no?: number
        }
        Relationships: [
          {
            foreignKeyName: "Section_survey_id_fkey"
            columns: ["survey_id"]
            referencedRelation: "Survey"
            referencedColumns: ["survey_id"]
          }
        ]
      }
      Survey: {
        Row: {
          section_count: number
          survey_id: string
        }
        Insert: {
          section_count: number
          survey_id?: string
        }
        Update: {
          section_count?: number
          survey_id?: string
        }
        Relationships: []
      }
      test: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
