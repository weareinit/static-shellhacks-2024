import Papa from "papaparse";

export async function parseCSV<T>(
  filepath: string,
  header: boolean = true
): Promise<T[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(filepath, {
      download: true,
      header: header,
      complete: (results: Papa.ParseResult<T>) => {
        console.log(results);
        return resolve(results.data);
      },
      error: (error) => {
        return reject(error);
      },
    });
  });
}
