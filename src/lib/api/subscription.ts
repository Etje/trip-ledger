import { supabase } from "../supabase";
import type { Subscription } from "../types";

type SubscriptionRow = {
  name: string;
  monthly_cost: number;
};

function rowToSubscription(row: SubscriptionRow): Subscription {
  return {
    name: row.name,
    monthlyCost: row.monthly_cost,
  };
}

export async function fetchSubscription(): Promise<Subscription> {
  const { data, error } = await supabase
    .from("subscription")
    .select("name, monthly_cost")
    .eq("id", 1)
    .single();

  if (error) throw error;
  return rowToSubscription(data as SubscriptionRow);
}

export async function saveSubscription(subscription: Subscription): Promise<void> {
  const { error } = await supabase
    .from("subscription")
    .upsert({ id: 1, name: subscription.name, monthly_cost: subscription.monthlyCost });

  if (error) throw error;
}
