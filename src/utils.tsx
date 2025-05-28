export function formatDotNetDate(dateString: string): string {
    // Handle null or empty dates
    if (!dateString) return 'N/A';

    // Extract the timestamp from the /Date(timestamp-offset)/ format
    const match = dateString.match(/\/Date\((\d+)([+-]\d+)?\)\//);
    if (!match) return dateString;

    const timestamp = parseInt(match[1]);
    const date = new Date(timestamp);

    // Format the date as YYYY-MM-DD
    return date.toISOString().split('T')[0];
}
