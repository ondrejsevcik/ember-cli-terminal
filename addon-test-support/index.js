export async function runCmd(cmd) {
  let response = await fetch(`/terminal?cmd=${encodeURIComponent(cmd)}`);
  return await response.text();
}
