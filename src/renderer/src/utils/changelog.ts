import { marked } from 'marked';

const emoji: marked.TokenizerExtension & marked.RendererExtension = {
  name: 'emoji',
  level: 'inline',
  start(src) {
    return src.indexOf(':');
  },
  tokenizer(src) {
    const rule = /^:(\w+):/;
    const match = rule.exec(src);
    if (match) {
      return {
        type: 'emoji',
        raw: match[0],
        emoji: match[1],
      };
    }
  },
  renderer(token) {
    return `<span className="emoji ${token}" />`;
  },
};

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" rel="noopener noreferrer" href="${href}" ${
    title ? `title=${title}` : ''
  }>${text}</a>`;
};
marked.use({ extensions: [emoji] });

export async function getChangelog(tag: string) {
  try {
    if (!tag) return 'No changelog found.';

    const url = `https://api.github.com/repos/bijinfeng/hexo-desktop/releases/tags/v${tag}`;
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) return 'No changelog found.';

    const release = await response.json();
    if (!release || !release.body) return 'No changelog found.';

    const { body } = release;
    return await marked.parse(body, { async: true, renderer, gfm: true });
  } catch (e) {
    console.error(e);
    return 'No changelog found.';
  }
}
