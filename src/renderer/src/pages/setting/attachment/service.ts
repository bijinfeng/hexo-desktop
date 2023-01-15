import axios from 'axios';
import { handleStreamlinePluginName } from 'universal/utils';

interface INPMSearchResult {
  objects: PICGO.INPMSearchResultObject[];
}

function handleSearchResult(item: PICGO.INPMSearchResultObject): PICGO.IPicGoPlugin {
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
        .filter((item: PICGO.INPMSearchResultObject) => {
          return item.package.name.includes('picgo-plugin-');
        })
        .map((item: PICGO.INPMSearchResultObject) => handleSearchResult(item));
    });
};
