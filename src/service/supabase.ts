import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPA_PROJECT;
const supabaseKey = import.meta.env.VITE_SUPA_PROJECT_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getAllTeams() {
  try {
    const { data, error } = await supabase.from("team").select(
      `id,
       name, 
       short_form, 
       logo, 
       theme`
    );
    if (error) throw error;
    return data;
  } catch (err: any) {
    console.error("Error fetching teams:", err.message);
    return [];
  }
}

export async function addMatch(matchData: {
  team1: number;
  team2: number;
  description: string;
  match_schedule: string;
}) {
  const { data, error } = await supabase
    .from("matches")
    .insert({
      team1_id: matchData.team1,
      team2_id: matchData.team2,
      description: matchData.description,
      match_schedule: matchData.match_schedule,
      status: "upcoming",
    })
    .select()
    .single();

  if (error) {
    console.error("Error inserting match:", error.message);
    throw error;
  }

  return data;
}

export async function getAllMatches() {
  try {
    const { data, error } = await supabase
      .from("matches")
      .select(
        `
      id,
      description,
      team1:team1_id ( id, name, short_form, logo ),
      team2:team2_id ( id, name, short_form, logo ),
      team1_goal,
      team2_goal,
      match_schedule,
      match_start_time,
      half_time, 
      end_time,
      status,
      location,
      is_live
    `
      )
      .order("is_live", { ascending: true })
      .order("match_schedule", { ascending: true });
    if (error) throw error;
    return data;
  } catch (err: any) {
    console.error("Error fetching matches:", err.message);
    return [];
  }
}

export async function getMatchDetailById(id: number) {
  try {
    const { data, error } = await supabase
      .from("matches")
      .select(
        `id,
        description,
        team1:team1_id ( id, name, short_form, logo ),
        team2:team2_id ( id, name, short_form, logo ),
        team1_goal,
        team2_goal,
        match_start_time,
        half_time, 
        end_time,
        status,
        location, 
        team1_events,
        team2_events,
        match_schedule`
      )
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  } catch (err: any) {
    console.error("Error fetching matches:", err.message);
    return [];
  }
}

export async function startMatch(payload: any) {
  const query = supabase
    .from("matches")
    .update(payload)
    .eq("id", payload.id)
    .select()
    .single();
  const { data, error } = await query;

  if (error) {
    console.error("Error inserting match:", error.message);
    throw error;
  }

  return data;
}

export async function getPlayeListByTeam(id: number | string) {
  try {
    const { data, error } = await supabase
      .from("players")
      .select("id, name")
      .eq("team_id", id);
    if (error) throw error;
    return data;
  } catch (err: any) {
    console.error("Error fetching player list:", err.message);
    return [];
  }
}

export async function addMatchEvent(payload: any) {
  try {
    const matchEvents = await supabase
      .from("matches")
      .select(
        `team1_events,
         team2_events`
      )
      .eq("id", payload.id)
      .single();
    const query = supabase
      .from("matches")
      .update(payload)
      .eq("id", payload.id)
      .select()
      .single();
    const { data, error } = await query;
    return data;
  } catch (error: any) {
    console.error("Error inserting match:", error.message);
    throw error;
  }
}
