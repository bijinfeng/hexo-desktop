import axios from 'axios';

interface INPMSearchResult {
  objects: INPMSearchResultObject[];
}

interface INPMSearchResultObject {
  package: {
    name: string;
    scope: string;
    version: string;
    description: string;
    keywords: string[];
    author: {
      name: string;
    };
    links: {
      npm: string;
      homepage: string;
    };
  };
}

/**
 * streamline the full plugin name to a simple one
 * for example:
 * 1. picgo-plugin-xxx -> xxx
 * 2. @xxx/picgo-plugin-yyy -> yyy
 * @param name pluginFullName
 */
export const handleStreamlinePluginName = (name: string) => {
  if (/^@[^/]+\/picgo-plugin-/.test(name)) {
    return name.replace(/^@[^/]+\/picgo-plugin-/, '');
  } else {
    return name.replace(/picgo-plugin-/, '');
  }
};

export function handleSearchResult(item: INPMSearchResultObject) {
  const name = handleStreamlinePluginName(item.package.name);
  let gui = false;
  if (item.package.keywords && item.package.keywords.length > 0) {
    if (item.package.keywords.includes('picgo-gui-plugin')) {
      gui = true;
    }
  }
  return {
    name,
    fullName: item.package.name,
    author: item.package.author.name,
    description: item.package.description,
    logo: `https://cdn.jsdelivr.net/npm/${item.package.name}/logo.png`,
    config: {},
    homepage: item.package.links ? item.package.links.homepage : '',
    // hasInstall: pluginNameList.value.some((plugin) => plugin === item.package.name),
    version: item.package.version,
    gui,
    ing: false, // installing or uninstalling
  };
}

export const getSearchResult = (text: string) => {
  return axios
    .get<INPMSearchResult>('https://registry.npmjs.com/-/v1/search?text=' + text)
    .then((res) => {
      return res.data.objects
        .filter((item: INPMSearchResultObject) => {
          return item.package.name.includes('picgo-plugin-');
        })
        .map((item: INPMSearchResultObject) => {
          return handleSearchResult(item);
        });
    });
};
