export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          cpf: string | null
          created_at: string | null
          email: string
          id: string
          name: string
          phone: string | null
          role: string | null
        }
        Insert: {
          cpf?: string | null
          created_at?: string | null
          email: string
          id: string
          name: string
          phone?: string | null
          role?: string | null
        }
        Update: {
          cpf?: string | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string | null
          role?: string | null
        }
        Relationships: []
      }
      proposals: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          message: string | null
          name: string | null
          phone: string | null
          status: Database["public"]["Enums"]["proposal_status"] | null
          vehicle_id: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          message?: string | null
          name?: string | null
          phone?: string | null
          status?: Database["public"]["Enums"]["proposal_status"] | null
          vehicle_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          message?: string | null
          name?: string | null
          phone?: string | null
          status?: Database["public"]["Enums"]["proposal_status"] | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "proposals_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "v_proposals_with_vehicles"
            referencedColumns: ["vehicle_id"]
          },
          {
            foreignKeyName: "proposals_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      sellers: {
        Row: {
          city: string | null
          created_at: string | null
          email: string
          id: string
          name: string
          phone: string | null
          state: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string | null
          email: string
          id?: string
          name: string
          phone?: string | null
          state?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string | null
          state?: string | null
        }
        Relationships: []
      }
      vehicles: {
        Row: {
          brand: string
          created_at: string | null
          description: string | null
          features: string | null
          fuel: string | null
          id: string
          images: string | null
          location: Json | null
          mileage: number | null
          model: string
          price: number | null
          seller_id: string | null
          status: Database["public"]["Enums"]["vehicle_status"] | null
          transmission: string | null
          updated_at: string | null
          year: number
        }
        Insert: {
          brand: string
          created_at?: string | null
          description?: string | null
          features?: string | null
          fuel?: string | null
          id?: string
          images?: string | null
          location?: Json | null
          mileage?: number | null
          model: string
          price?: number | null
          seller_id?: string | null
          status?: Database["public"]["Enums"]["vehicle_status"] | null
          transmission?: string | null
          updated_at?: string | null
          year: number
        }
        Update: {
          brand?: string
          created_at?: string | null
          description?: string | null
          features?: string | null
          fuel?: string | null
          id?: string
          images?: string | null
          location?: Json | null
          mileage?: number | null
          model?: string
          price?: number | null
          seller_id?: string | null
          status?: Database["public"]["Enums"]["vehicle_status"] | null
          transmission?: string | null
          updated_at?: string | null
          year?: number
        }
        Relationships: []
      }
    }
    Views: {
      v_proposals_with_vehicles: {
        Row: {
          brand: string | null
          customer_email: string | null
          customer_name: string | null
          customer_phone: string | null
          message: string | null
          model: string | null
          price: number | null
          proposal_created_at: string | null
          proposal_id: string | null
          proposal_status: Database["public"]["Enums"]["proposal_status"] | null
          seller_email: string | null
          seller_id: string | null
          seller_name: string | null
          vehicle_id: string | null
          year: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      proposal_status: "pending" | "contacted" | "accepted" | "rejected"
      vehicle_status: "available" | "reserved" | "sold"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      proposal_status: ["pending", "contacted", "accepted", "rejected"],
      vehicle_status: ["available", "reserved", "sold"],
    },
  },
} as const
