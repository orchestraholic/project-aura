// music21 is a Python library, so Node can't call it directly. The plan is a
// small Python script (using music21) that this file invokes as a child
// process, passing the wizard selection in and reading generated
// MusicXML/MIDI back out. Nothing below is wired up yet — this is the seam
// where that integration will land.
//
// import { spawn } from "node:child_process";
//
// export function generateComposition(brief) {
//   return new Promise((resolve, reject) => {
//     const proc = spawn("python", ["./python/generate.py", JSON.stringify(brief)]);
//     let output = "";
//     proc.stdout.on("data", (chunk) => (output += chunk));
//     proc.stderr.on("data", (chunk) => console.error(chunk.toString()));
//     proc.on("close", (code) => {
//       if (code !== 0) return reject(new Error(`generate.py exited with ${code}`));
//       resolve(JSON.parse(output));
//     });
//   });
// }

export async function generateComposition(_brief) {
  throw new Error("music21 bridge not implemented yet");
}
