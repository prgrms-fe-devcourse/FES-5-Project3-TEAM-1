export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '13.0.4';
  };
  public: {
    Tables: {
      balance: {
        Row: {
          created_at: string | null;
          end_date: string;
          feed_id: string;
          id: string;
          option_1: string;
          option_2: string;
          start_date: string;
          status: Database['public']['Enums']['status'];
        };
        Insert: {
          created_at?: string | null;
          end_date: string;
          feed_id: string;
          id?: string;
          option_1: string;
          option_2: string;
          start_date?: string;
          status?: Database['public']['Enums']['status'];
        };
        Update: {
          created_at?: string | null;
          end_date?: string;
          feed_id?: string;
          id?: string;
          option_1?: string;
          option_2?: string;
          start_date?: string;
          status?: Database['public']['Enums']['status'];
        };
        Relationships: [
          {
            foreignKeyName: 'balance_feed_id_fkey';
            columns: ['feed_id'];
            isOneToOne: false;
            referencedRelation: 'feeds';
            referencedColumns: ['id'];
          },
        ];
      };
      balance_result: {
        Row: {
          balance_id: string;
          created_at: string | null;
          id: string;
          option_choice: number;
          token: string;
        };
        Insert: {
          balance_id: string;
          created_at?: string | null;
          id?: string;
          option_choice: number;
          token: string;
        };
        Update: {
          balance_id?: string;
          created_at?: string | null;
          id?: string;
          option_choice?: number;
          token?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'balance_result_balance_id_fkey';
            columns: ['balance_id'];
            isOneToOne: false;
            referencedRelation: 'balance';
            referencedColumns: ['id'];
          },
        ];
      };
      comment: {
        Row: {
          content: string;
          created_at: string | null;
          feed_id: string;
          id: string;
          nickname: string;
          token: string;
        };
        Insert: {
          content: string;
          created_at?: string | null;
          feed_id: string;
          id?: string;
          nickname?: string;
          token: string;
        };
        Update: {
          content?: string;
          created_at?: string | null;
          feed_id?: string;
          id?: string;
          nickname?: string;
          token?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'comment_feed_id_fkey';
            columns: ['feed_id'];
            isOneToOne: false;
            referencedRelation: 'feeds';
            referencedColumns: ['id'];
          },
        ];
      };
      drawing: {
        Row: {
          created_at: string | null;
          feed_id: string;
          id: string;
          url: string;
        };
        Insert: {
          created_at?: string | null;
          feed_id: string;
          id?: string;
          url: string;
        };
        Update: {
          created_at?: string | null;
          feed_id?: string;
          id?: string;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'drawing_feed_id_fkey';
            columns: ['feed_id'];
            isOneToOne: false;
            referencedRelation: 'feeds';
            referencedColumns: ['id'];
          },
        ];
      };
      emoji_counts: {
        Row: {
          counts: number;
          emoji: string;
          feed_id: string;
        };
        Insert: {
          counts?: number;
          emoji: string;
          feed_id: string;
        };
        Update: {
          counts?: number;
          emoji?: string;
          feed_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'emoji_counts_feed_id_fkey';
            columns: ['feed_id'];
            isOneToOne: false;
            referencedRelation: 'feeds';
            referencedColumns: ['id'];
          },
        ];
      };
      emoji_reactions: {
        Row: {
          created_at: string | null;
          emoji: string;
          feed_id: string;
          id: string;
          token: string;
        };
        Insert: {
          created_at?: string | null;
          emoji: string;
          feed_id: string;
          id?: string;
          token: string;
        };
        Update: {
          created_at?: string | null;
          emoji?: string;
          feed_id?: string;
          id?: string;
          token?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'emoji_reactions_feed_id_fkey';
            columns: ['feed_id'];
            isOneToOne: false;
            referencedRelation: 'feeds';
            referencedColumns: ['id'];
          },
        ];
      };
      feeds: {
        Row: {
          comment_count: number;
          content: string;
          created_at: string;
          drawing_url: string | null;
          id: string;
          nickname: string;
          thread_id: string;
          token: string;
          type: Database['public']['Enums']['feed_type'];
        };
        Insert: {
          comment_count?: number;
          content: string;
          created_at?: string;
          drawing_url?: string | null;
          id?: string;
          nickname?: string;
          thread_id: string;
          token: string;
          type?: Database['public']['Enums']['feed_type'];
        };
        Update: {
          comment_count?: number;
          content?: string;
          created_at?: string;
          drawing_url?: string | null;
          id?: string;
          nickname?: string;
          thread_id?: string;
          token?: string;
          type?: Database['public']['Enums']['feed_type'];
        };
        Relationships: [
          {
            foreignKeyName: 'feeds_thread_id_fkey';
            columns: ['thread_id'];
            isOneToOne: false;
            referencedRelation: 'threads';
            referencedColumns: ['id'];
          },
        ];
      };
      image: {
        Row: {
          created_at: string | null;
          feed_id: string;
          id: string;
          url: string;
        };
        Insert: {
          created_at?: string | null;
          feed_id: string;
          id?: string;
          url: string;
        };
        Update: {
          created_at?: string | null;
          feed_id?: string;
          id?: string;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'image_feed_id_fkey';
            columns: ['feed_id'];
            isOneToOne: false;
            referencedRelation: 'feeds';
            referencedColumns: ['id'];
          },
        ];
      };
      poll_options: {
        Row: {
          created_at: string | null;
          id: string;
          option_order: number;
          option_text: string;
          poll_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          option_order: number;
          option_text: string;
          poll_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          option_order?: number;
          option_text?: string;
          poll_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'poll_options_poll_id_fkey';
            columns: ['poll_id'];
            isOneToOne: false;
            referencedRelation: 'polls';
            referencedColumns: ['id'];
          },
        ];
      };
      polls: {
        Row: {
          created_at: string;
          end_date: string;
          feed_id: string;
          id: string;
          multiple_choice: boolean | null;
          start_date: string;
          status: Database['public']['Enums']['status'];
          title: string;
        };
        Insert: {
          created_at?: string;
          end_date: string;
          feed_id: string;
          id?: string;
          multiple_choice?: boolean | null;
          start_date?: string;
          status?: Database['public']['Enums']['status'];
          title: string;
        };
        Update: {
          created_at?: string;
          end_date?: string;
          feed_id?: string;
          id?: string;
          multiple_choice?: boolean | null;
          start_date?: string;
          status?: Database['public']['Enums']['status'];
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'polls_feed_id_fkey';
            columns: ['feed_id'];
            isOneToOne: false;
            referencedRelation: 'feeds';
            referencedColumns: ['id'];
          },
        ];
      };
      threads: {
        Row: {
          created_at: string | null;
          description: string;
          id: string;
          isPrivate: boolean;
          link: string;
          owner_id: string;
          password: string | null;
          title: string;
        };
        Insert: {
          created_at?: string | null;
          description: string;
          id?: string;
          isPrivate: boolean;
          link: string;
          owner_id: string;
          password?: string | null;
          title: string;
        };
        Update: {
          created_at?: string | null;
          description?: string;
          id?: string;
          isPrivate?: boolean;
          link?: string;
          owner_id?: string;
          password?: string | null;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'threads_owner_id_fkey';
            columns: ['owner_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      trigger_events: {
        Row: {
          created_at: string;
          id: string;
          thread_id: string;
          trigger_word: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          thread_id?: string;
          trigger_word: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          thread_id?: string;
          trigger_word?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'trigger_events_thread_id_fkey';
            columns: ['thread_id'];
            isOneToOne: false;
            referencedRelation: 'threads';
            referencedColumns: ['id'];
          },
        ];
      };
      users: {
        Row: {
          created_at: string | null;
          id: string;
          welcome_shown: boolean;
        };
        Insert: {
          created_at?: string | null;
          id: string;
          welcome_shown?: boolean;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          welcome_shown?: boolean;
        };
        Relationships: [];
      };
      votes: {
        Row: {
          created_at: string | null;
          id: string;
          option_id: string;
          poll_id: string;
          token: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          option_id: string;
          poll_id: string;
          token: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          option_id?: string;
          poll_id?: string;
          token?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'votes_option_id_fkey';
            columns: ['option_id'];
            isOneToOne: false;
            referencedRelation: 'poll_options';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'votes_poll_id_fkey';
            columns: ['poll_id'];
            isOneToOne: false;
            referencedRelation: 'polls';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_feeds_with_reaction_totals: {
        Args: {
          p_limit?: number;
          p_offset?: number;
          p_order_by?: string;
          p_order_desc?: boolean;
          p_thread_id: string;
        };
        Returns: {
          comment_count: number;
          content: string;
          created_at: string;
          drawing_id: string;
          drawing_url: string;
          id: string;
          nickname: string;
          thread_id: string;
          token: string;
          total_reactions: number;
          type: string;
        }[];
      };
    };
    Enums: {
      feed_type: 'text' | 'poll' | 'drawing' | 'balance' | 'image';
      status: 'active' | 'closed';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  'public'
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      feed_type: ['text', 'poll', 'drawing', 'balance', 'image'],
      status: ['active', 'closed'],
    },
  },
} as const;
