import { NextRequest, NextResponse } from "next/server";

interface KeywordData {
  keyword: string;
  search_volume: number | null;
  competition: string | null;
  competition_index: number | null;
  cpc: number | null;
  monthly_searches: { year: number; month: number; search_volume: number }[];
}

interface DataForSEOResult {
  keyword: string;
  search_volume?: number;
  competition?: string;
  competition_index?: number;
  cpc?: number;
  monthly_searches?: { year: number; month: number; search_volume: number }[];
}

export async function POST(request: NextRequest) {
  try {
    const { keyword, location_code, language_code } = await request.json();

    if (!keyword || typeof keyword !== "string") {
      return NextResponse.json(
        { error: "Keyword is required" },
        { status: 400 }
      );
    }

    const login = process.env.DATAFORSEO_LOGIN;
    const password = process.env.DATAFORSEO_PASSWORD;

    if (!login || !password) {
      return NextResponse.json(
        { error: "DataForSEO credentials not configured" },
        { status: 500 }
      );
    }

    const credentials = Buffer.from(`${login}:${password}`).toString("base64");

    const response = await fetch(
      "https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            keywords: [keyword],
            location_code: location_code || 2752,
            language_code: language_code || "sv",
          },
        ]),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("DataForSEO API error:", errorText);
      return NextResponse.json(
        { error: "Failed to fetch keyword data" },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (data.status_code !== 20000) {
      return NextResponse.json(
        { error: data.status_message || "API request failed" },
        { status: 400 }
      );
    }

    const result = data.tasks?.[0]?.result?.[0] as DataForSEOResult | undefined;

    if (!result) {
      return NextResponse.json(
        { error: "No data found for this keyword" },
        { status: 404 }
      );
    }

    const keywordData: KeywordData = {
      keyword: result.keyword,
      search_volume: result.search_volume ?? null,
      competition: result.competition ?? null,
      competition_index: result.competition_index ?? null,
      cpc: result.cpc ?? null,
      monthly_searches: result.monthly_searches ?? [],
    };

    return NextResponse.json(keywordData);
  } catch (error) {
    console.error("Keyword search error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
