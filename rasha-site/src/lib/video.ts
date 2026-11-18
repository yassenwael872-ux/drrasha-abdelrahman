import type { VideoItem } from "./site-data";

export function youtubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/))([\w-]{11})/);
  return m ? m[1] : null;
}

export function embedUrl(v: VideoItem): string | null {
  if (!v.url) return null;
  if (v.platform === "youtube") {
    const id = youtubeId(v.url);
    return id ? `https://www.youtube.com/embed/${id}` : null;
  }
  if (/facebook\.com|fb\.watch/.test(v.url)) {
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(v.url)}&show_text=false`;
  }
  return null;
}

export function thumbUrl(v: VideoItem): string {
  if (v.thumbnail) return v.thumbnail;
  if (v.platform === "youtube" && v.url) {
    const id = youtubeId(v.url);
    if (id) return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  }
  return "";
}
