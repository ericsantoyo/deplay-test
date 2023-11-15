export interface Database {
  public: {
    Tables: {
      matches: {
        Row: {
          localScore: number;
          localTeamID: number;
          matchDate: string;
          matchID: number;
          matchState: number;
          visitorScore: number;
          visitorTeamID: number;
          week: number;
        };
        Insert: {
          localScore?: number;
          localTeamID?: number;
          matchDate?: string;
          matchID: number;
          matchState?: number;
          visitorScore?: number;
          visitorTeamID?: number;
          week?: number;
        };
        Update: {
          localScore?: number;
          localTeamID?: number;
          matchDate?: string;
          matchID?: number;
          matchState?: number;
          visitorScore?: number;
          visitorTeamID?: number;
          week?: number;
        };
        Relationships: [];
      };
      players: {
        Row: {
          averagePoints: number;
          image: string;
          lastMarketChange: number;
          marketValue: number;
          marketValues: Array<{
            lfpId: number;
            marketValue: number;
            date: string;
            bids: number;
          }>;
          name: string;
          nickname: string;
          playerID: number;
          points: number;
          position: string;
          positionID: number;
          previousMarketValue: number;
          status: string;
          teamID: number;
          teamName: string;
        };
        Insert: {
          averagePoints?: number;
          image?: string;
          lastMarketChange?: number;
          marketValue?: number;
          marketValues?: Array<{
            lfpId: number;
            marketValue: number;
            date: string;
            bids: number;
          }>;
          name?: string;
          nickname?: string;
          playerID: number;
          points?: number;
          position?: string;
          positionID?: number;
          previousMarketValue?: number;
          status?: string;
          teamID?: number;
          teamName?: string;
        };
        Update: {
          averagePoints?: number;
          image?: string;
          lastMarketChange?: number;
          marketValue?: number;
          marketValues?: Array<{
            lfpId: number;
            marketValue: number;
            date: string;
            bids: number;
          }>;
          name?: string;
          nickname?: string;
          playerID?: number;
          points?: number;
          position?: string;
          positionID?: number;
          previousMarketValue?: number;
          status?: string;
          teamID?: number;
          teamName?: string;
        };
        Relationships: [];
      };
      stats: {
        Row: {
          ball_recovery: [number, number];
          effective_clearance: [number, number];
          goal_assist: [number, number];
          goals: [number, number];
          goals_conceded: [number, number];
          isInIdealFormation: boolean;
          marca_points: [number, number];
          mins_played: [number, number];
          offtarget_att_assist: [number, number];
          own_goals: [number, number];
          pen_area_entries: [number, number];
          penalty_conceded: [number, number];
          penalty_failed: [number, number];
          penalty_save: [number, number];
          penalty_won: [number, number];
          playerID: number;
          poss_lost_all: [number, number];
          red_card: [number, number];
          saves: [number, number];
          second_yellow_card: [number, number];
          total_scoring_att: [number, number];
          totalPoints: number;
          week: number;
          won_contest: [number, number];
          yellow_card: [number, number];
        };
        Insert: {
          ball_recovery?: [number, number];
          effective_clearance?: [number, number];
          goal_assist?: [number, number];
          goals?: [number, number];
          goals_conceded?: [number, number];
          isInIdealFormation?: boolean;
          marca_points?: [number, number];
          mins_played?: [number, number];
          offtarget_att_assist?: [number, number];
          own_goals?: [number, number];
          pen_area_entries?: [number, number];
          penalty_conceded?: [number, number];
          penalty_failed?: [number, number];
          penalty_save?: [number, number];
          penalty_won?: [number, number];
          playerID: number;
          poss_lost_all?: [number, number];
          red_card?: [number, number];
          saves?: [number, number];
          second_yellow_card?: [number, number];
          total_scoring_att?: [number, number];
          totalPoints?: number;
          week: number;
          won_contest?: [number, number];
          yellow_card?: [number, number];
        };
        Update: {
          ball_recovery?: [number, number];
          effective_clearance?: [number, number];
          goal_assist?: [number, number];
          goals?: [number, number];
          goals_conceded?: [number, number];
          isInIdealFormation?: boolean;
          marca_points?: [number, number];
          mins_played?: [number, number];
          offtarget_att_assist?: [number, number];
          own_goals?: [number, number];
          pen_area_entries?: [number, number];
          penalty_conceded?: [number, number];
          penalty_failed?: [number, number];
          penalty_save?: [number, number];
          penalty_won?: [number, number];
          playerID?: number;
          poss_lost_all?: [number, number];
          red_card?: [number, number];
          saves?: [number, number];
          second_yellow_card?: [number, number];
          total_scoring_att?: [number, number];
          totalPoints?: number;
          week?: number;
          won_contest?: [number, number];
          yellow_card?: [number, number];
        };
        Relationships: [];
      };
      teams: {
        Row: {
          image: string;
          name: string;
          nickname: string;
          teamID: number;
        };
        Insert: {
          image?: string;
          name?: string;
          nickname?: string;
          teamID: number;
        };
        Update: {
          image?: string;
          name?: string;
          nickname?: string;
          teamID?: number;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
