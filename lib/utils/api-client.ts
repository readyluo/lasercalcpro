/**
 * API client utilities for frontend
 */

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Save a calculation to the database
 */
export async function saveCalculationToAPI(data: {
  tool_type: string;
  input_params: Record<string, any>;
  result: Record<string, any>;
}): Promise<ApiResponse<{ id: number }>> {
  try {
    const response = await fetch('/api/calculations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Failed to save calculation',
      };
    }

    return {
      success: true,
      data: { id: result.id },
    };
  } catch (error) {
    console.error('Error saving calculation:', error);
    return {
      success: false,
      error: 'Network error',
    };
  }
}

/**
 * Get site statistics
 */
export async function getSiteStats(): Promise<ApiResponse<{
  calculations: {
    total: number;
    today: number;
    this_week: number;
    this_month: number;
  };
  subscribers: {
    total: number;
    confirmed: number;
  };
  popular_tools: Array<{
    tool: string;
    count: number;
  }>;
}>> {
  try {
    const response = await fetch('/api/stats');
    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Failed to fetch stats',
      };
    }

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {
      success: false,
      error: 'Network error',
    };
  }
}









