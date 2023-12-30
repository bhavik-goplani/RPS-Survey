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
            isOneToOne: false
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
            isOneToOne: false
            referencedRelation: "Participant"
            referencedColumns: ["participant_id"]
          },
          {
            foreignKeyName: "Response_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "Section"
            referencedColumns: ["section_id"]
          },
          {
            foreignKeyName: "Response_survey_id_fkey"
            columns: ["survey_id"]
            isOneToOne: false
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
            isOneToOne: false
            referencedRelation: "Survey"
            referencedColumns: ["survey_id"]
          }
        ]
      }
      Survey: {
        Row: {
          description: string | null
          name: string
          section_count: number
          survey_id: string
        }
        Insert: {
          description?: string | null
          name: string
          section_count: number
          survey_id?: string
        }
        Update: {
          description?: string | null
          name?: string
          section_count?: number
          survey_id?: string
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
