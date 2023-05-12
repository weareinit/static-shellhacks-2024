import CSVParser from "csv-parser";

export async function parseCSV<T>(
  filepath: string,
  hasHeaders: boolean = false
): Promise<T[]> {
  const response = await fetch(filepath);
  const csvText = await response.text();

  return new Promise<T[]>((resolve, reject) => {
    const results: T[] = [];
    const parserOptions = hasHeaders ? {} : { headers: false };
    CSVParser(parserOptions)
      .on("data", (data: T) => {
        results.push(data);
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error: Error) => {
        reject(error);
      })
      .end(csvText);
  });
}
