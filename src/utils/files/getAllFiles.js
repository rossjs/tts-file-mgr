export default async function getAllFiles() {
  const resp = await fetch('/api/files');
  const data = await resp.json();
  return data;
}
