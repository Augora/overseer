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
      Activite: {
        Row: {
          AvantMandat: number | null
          created_at: string | null
          DateDeDebut: string | null
          DateDeFin: string | null
          DeputeSlug: string | null
          Id: string
          MedianeCommission: number | null
          MedianeHemicycle: number | null
          MedianeTotal: number | null
          NumeroDeSemaine: number | null
          ParticipationEnHemicycle: number | null
          ParticipationsEnCommission: number | null
          PresenceEnHemicycle: number | null
          PresencesEnCommission: number | null
          Question: number | null
          Vacances: number | null
        }
        Insert: {
          AvantMandat?: number | null
          created_at?: string | null
          DateDeDebut?: string | null
          DateDeFin?: string | null
          DeputeSlug?: string | null
          Id: string
          MedianeCommission?: number | null
          MedianeHemicycle?: number | null
          MedianeTotal?: number | null
          NumeroDeSemaine?: number | null
          ParticipationEnHemicycle?: number | null
          ParticipationsEnCommission?: number | null
          PresenceEnHemicycle?: number | null
          PresencesEnCommission?: number | null
          Question?: number | null
          Vacances?: number | null
        }
        Update: {
          AvantMandat?: number | null
          created_at?: string | null
          DateDeDebut?: string | null
          DateDeFin?: string | null
          DeputeSlug?: string | null
          Id?: string
          MedianeCommission?: number | null
          MedianeHemicycle?: number | null
          MedianeTotal?: number | null
          NumeroDeSemaine?: number | null
          ParticipationEnHemicycle?: number | null
          ParticipationsEnCommission?: number | null
          PresenceEnHemicycle?: number | null
          PresencesEnCommission?: number | null
          Question?: number | null
          Vacances?: number | null
        }
        Relationships: []
      }
      Depute: {
        Row: {
          Adresses: Json[] | null
          Age: number | null
          AncienMandat: Json[] | null
          AutreMandat: Json[] | null
          Collaborateurs: string[] | null
          created_at: string | null
          DateDeNaissance: string | null
          DebutDuMandat: string | null
          Emails: string[] | null
          EstEnMandat: boolean | null
          GroupeParlementaire: string | null
          IDAssembleeNationale: string | null
          LieuDeNaissance: string | null
          Nom: string | null
          NombreMandats: number | null
          NomCirconscription: string | null
          NomDepartement: string | null
          NomRegion: string | null
          NumeroCirconscription: number | null
          NumeroDepartement: string | null
          NumeroRegion: string | null
          PlaceEnHemicycle: string | null
          Prenom: string | null
          Profession: string | null
          RattachementFinancier: string | null
          ResponsabiliteGroupe: Json | null
          Sexe: string | null
          SitesWeb: string[] | null
          Slug: string
          Suppleant: string | null
          Twitter: string | null
          URLAssembleeNationale: string | null
          URLFacebook: string | null
          URLGouvernement: string | null
          URLInstagram: string | null
          URLLinkedIn: string | null
          URLPhotoAssembleeNationale: string | null
          URLPhotoAugora: string | null
          URLTwitter: string | null
        }
        Insert: {
          Adresses?: Json[] | null
          Age?: number | null
          AncienMandat?: Json[] | null
          AutreMandat?: Json[] | null
          Collaborateurs?: string[] | null
          created_at?: string | null
          DateDeNaissance?: string | null
          DebutDuMandat?: string | null
          Emails?: string[] | null
          EstEnMandat?: boolean | null
          GroupeParlementaire?: string | null
          IDAssembleeNationale?: string | null
          LieuDeNaissance?: string | null
          Nom?: string | null
          NombreMandats?: number | null
          NomCirconscription?: string | null
          NomDepartement?: string | null
          NomRegion?: string | null
          NumeroCirconscription?: number | null
          NumeroDepartement?: string | null
          NumeroRegion?: string | null
          PlaceEnHemicycle?: string | null
          Prenom?: string | null
          Profession?: string | null
          RattachementFinancier?: string | null
          ResponsabiliteGroupe?: Json | null
          Sexe?: string | null
          SitesWeb?: string[] | null
          Slug: string
          Suppleant?: string | null
          Twitter?: string | null
          URLAssembleeNationale?: string | null
          URLFacebook?: string | null
          URLGouvernement?: string | null
          URLInstagram?: string | null
          URLLinkedIn?: string | null
          URLPhotoAssembleeNationale?: string | null
          URLPhotoAugora?: string | null
          URLTwitter?: string | null
        }
        Update: {
          Adresses?: Json[] | null
          Age?: number | null
          AncienMandat?: Json[] | null
          AutreMandat?: Json[] | null
          Collaborateurs?: string[] | null
          created_at?: string | null
          DateDeNaissance?: string | null
          DebutDuMandat?: string | null
          Emails?: string[] | null
          EstEnMandat?: boolean | null
          GroupeParlementaire?: string | null
          IDAssembleeNationale?: string | null
          LieuDeNaissance?: string | null
          Nom?: string | null
          NombreMandats?: number | null
          NomCirconscription?: string | null
          NomDepartement?: string | null
          NomRegion?: string | null
          NumeroCirconscription?: number | null
          NumeroDepartement?: string | null
          NumeroRegion?: string | null
          PlaceEnHemicycle?: string | null
          Prenom?: string | null
          Profession?: string | null
          RattachementFinancier?: string | null
          ResponsabiliteGroupe?: Json | null
          Sexe?: string | null
          SitesWeb?: string[] | null
          Slug?: string
          Suppleant?: string | null
          Twitter?: string | null
          URLAssembleeNationale?: string | null
          URLFacebook?: string | null
          URLGouvernement?: string | null
          URLInstagram?: string | null
          URLLinkedIn?: string | null
          URLPhotoAssembleeNationale?: string | null
          URLPhotoAugora?: string | null
          URLTwitter?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Depute_GroupeParlementaire_fkey"
            columns: ["GroupeParlementaire"]
            isOneToOne: false
            referencedRelation: "GroupeParlementaire"
            referencedColumns: ["Slug"]
          },
        ]
      }
      Depute_OrganismeParlementaire: {
        Row: {
          created_at: string | null
          DeputeSlug: string
          Fonction: string | null
          Id: string
          OrganismeSlug: string
        }
        Insert: {
          created_at?: string | null
          DeputeSlug: string
          Fonction?: string | null
          Id: string
          OrganismeSlug: string
        }
        Update: {
          created_at?: string | null
          DeputeSlug?: string
          Fonction?: string | null
          Id?: string
          OrganismeSlug?: string
        }
        Relationships: [
          {
            foreignKeyName: "Depute_OrganismeParlementaire_DeputeSlug_fkey"
            columns: ["DeputeSlug"]
            isOneToOne: false
            referencedRelation: "Depute"
            referencedColumns: ["Slug"]
          },
          {
            foreignKeyName: "Depute_OrganismeParlementaire_OrganismeSlug_fkey"
            columns: ["OrganismeSlug"]
            isOneToOne: false
            referencedRelation: "OrganismeParlementaire"
            referencedColumns: ["Slug"]
          },
        ]
      }
      GroupeParlementaire: {
        Row: {
          Actif: boolean | null
          Couleur: string | null
          CouleurDetail: Json | null
          created_at: string | null
          DescriptionWikipedia: string | null
          IDAssembleeNationale: string | null
          IDWikipedia: string | null
          NomComplet: string | null
          Ordre: number | null
          Sigle: string | null
          Slug: string
        }
        Insert: {
          Actif?: boolean | null
          Couleur?: string | null
          CouleurDetail?: Json | null
          created_at?: string | null
          DescriptionWikipedia?: string | null
          IDAssembleeNationale?: string | null
          IDWikipedia?: string | null
          NomComplet?: string | null
          Ordre?: number | null
          Sigle?: string | null
          Slug: string
        }
        Update: {
          Actif?: boolean | null
          Couleur?: string | null
          CouleurDetail?: Json | null
          created_at?: string | null
          DescriptionWikipedia?: string | null
          IDAssembleeNationale?: string | null
          IDWikipedia?: string | null
          NomComplet?: string | null
          Ordre?: number | null
          Sigle?: string | null
          Slug?: string
        }
        Relationships: []
      }
      Ministere: {
        Row: {
          Nom: string | null
          Slug: string
        }
        Insert: {
          Nom?: string | null
          Slug: string
        }
        Update: {
          Nom?: string | null
          Slug?: string
        }
        Relationships: []
      }
      Ministre: {
        Row: {
          Charge: string | null
          Fonction: string | null
          FonctionLong: string | null
          Ministere: string | null
          Nom: string | null
          NomDeFamille: string | null
          Prenom: string | null
          Slug: string
        }
        Insert: {
          Charge?: string | null
          Fonction?: string | null
          FonctionLong?: string | null
          Ministere?: string | null
          Nom?: string | null
          NomDeFamille?: string | null
          Prenom?: string | null
          Slug: string
        }
        Update: {
          Charge?: string | null
          Fonction?: string | null
          FonctionLong?: string | null
          Ministere?: string | null
          Nom?: string | null
          NomDeFamille?: string | null
          Prenom?: string | null
          Slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "Ministre_Ministere_fkey"
            columns: ["Ministere"]
            isOneToOne: false
            referencedRelation: "Ministere"
            referencedColumns: ["Slug"]
          },
        ]
      }
      OrganismeParlementaire: {
        Row: {
          created_at: string | null
          EstPermanent: boolean | null
          Nom: string | null
          Slug: string
          Url: string | null
        }
        Insert: {
          created_at?: string | null
          EstPermanent?: boolean | null
          Nom?: string | null
          Slug: string
          Url?: string | null
        }
        Update: {
          created_at?: string | null
          EstPermanent?: boolean | null
          Nom?: string | null
          Slug?: string
          Url?: string | null
        }
        Relationships: []
      }
      Session: {
        Row: {
          BannerState: string | null
          created_at: string | null
          Depute: string | null
          id: number
          Ministre: string | null
          Overview: boolean
          Question: string | null
        }
        Insert: {
          BannerState?: string | null
          created_at?: string | null
          Depute?: string | null
          id?: number
          Ministre?: string | null
          Overview?: boolean
          Question?: string | null
        }
        Update: {
          BannerState?: string | null
          created_at?: string | null
          Depute?: string | null
          id?: number
          Ministre?: string | null
          Overview?: boolean
          Question?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Session_Ministre_fkey"
            columns: ["Ministre"]
            isOneToOne: false
            referencedRelation: "Ministre"
            referencedColumns: ["Slug"]
          },
        ]
      }
      UserRole: {
        Row: {
          created_at: string | null
          id: string
          Role: string | null
          UserId: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          Role?: string | null
          UserId: string
        }
        Update: {
          created_at?: string | null
          id?: string
          Role?: string | null
          UserId?: string
        }
        Relationships: [
          {
            foreignKeyName: "UserRole_UserId_fkey"
            columns: ["UserId"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: {
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
