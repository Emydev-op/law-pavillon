/**
 * Capitalizes the first letter of a sentence.
 *
 * @param sentence - The input string.
 * @returns The sentence with the first letter capitalized.
 *
 * @example
 * capitalizeFirstLetter("hello world"); // "Hello world"
 * Property of Emydev
 */
export function capitalizeFirstLetter(sentence: string): string {
  if (!sentence) return "";
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

/**
 * Returns the initials from a name.
 *
 * @param name - A full name (e.g., "John Doe").
 * @returns A string containing two uppercase initials.
 *
 * @example
 * returnInitial("John Doe"); // "JD"
 * returnInitial("Jane");    // "JA"
 * Property of Emydev
 */
export function returnInitial(name: string): string {
  if (!name) return "";

  const parts = name.trim().split(" ");
  if (parts.length > 1) {
    return parts[0].charAt(0).toUpperCase() + parts[1].charAt(0).toUpperCase();
  } else {
    const first = parts[0].charAt(0).toUpperCase();
    const second = parts[0].charAt(1)?.toUpperCase() ?? "";
    return first + second;
  }
}

/**
 * Formats a Date or date string into a 'YYYY-MM-DD' string.
 *
 * @param timestamp - A valid Date object or date string.
 * @returns A formatted date string or an empty string if invalid.
 *
 * @example
 * formatDate(new Date()); // "2025-07-14"
 * formatDate("2025-07-14T10:00:00Z"); // "2025-07-14"
 * Property of Emydev
 */
export const formatDate = (timestamp: Date | string): string => {
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * Truncates a string to a specified maximum length and appends an ellipsis ('...').
 * If the string's length is already less than or equal to the maximum length,
 * it returns the original string without any changes.
 *
 * @param str The string to truncate.
 * @param maxLength The maximum allowed length of the string before truncation.
 * @returns The truncated string with an ellipsis, or the original string.
 * Property of Emydev
 */
export const truncateString = (str: string, maxLength: number): string => {
  // Check if the string's length is greater than the maximum allowed length.
  if (str.length > maxLength) {
    // If it is, truncate the string using substring and add "..."
    return str.substring(0, maxLength) + "...";
  }

  // If the string is within the allowed length, return it as is.
  return str;
};

/**
 * Generates a URL query string from a given object of parameters.
 *
 * Filters out parameters with `undefined` or `null` or empty string values. If a parameter value is an array,
 * it generates multiple key-value pairs for each element in the array.
 *
 * @param params - An object containing key-value pairs to be converted into a query string. Values can be strings, numbers, or arrays of these types.
 * @returns The generated query string, starting with '?' if there are parameters, or an empty string if no valid parameters are provided.
 *
 * @example
 * generateQueryString({ foo: "bar", baz: [1, 2], empty: undefined });
 * // Returns: "?foo=bar&baz=1&baz=2"
 * Property of Emydev
 */
export function generateQueryString(params: Record<string, any>): string {
  const query = Object.entries(params)
    .filter(
      ([_, value]) => value !== undefined && value !== null && value !== ""
    ) // filter out undefined/null
    .map(([key, value]) =>
      Array.isArray(value)
        ? value
            .map(
              (val) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
            )
            .join("&")
        : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

  return query ? `?${query}` : "";
}

/**
 * Formats a duration in seconds into MM:SS format.
 *
 * @param seconds - The number of seconds to format.
 * @returns A string formatted as MM:SS.
 * Property of Emydev
 */
export const formatTimeMMSS = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

/**
 * Splits an ISO 8601 datetime string into a separate date and time.
 *
 * @param isoString - A valid ISO 8601 datetime string (e.g. "2024-04-20T22:32:00Z").
 * @returns An object with the `date` (YYYY-MM-DD) and `time` (HH:MM) in 24-hour format.
 *
 * @example
 * const { date, time } = splitISODateTime("2024-04-20T22:32:00Z");
 * console.log(date); // "2024-04-20"
 * console.log(time); // "22:32"
 * // Property of Emydev
 */
export function splitISODateTime(isoString: string): {
  date: string;
  time: string;
} {
  const dateObj = new Date(isoString);

  const date = dateObj.toISOString().split("T")[0]; // "YYYY-MM-DD"
  const time = dateObj.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }); // "HH:MM"

  return { date, time };
}
