import { PicGo as PicGoCore } from 'picgo';

export enum IPicGoHelperType {
  afterUploadPlugins = 'afterUploadPlugins',
  beforeTransformPlugins = 'beforeTransformPlugins',
  beforeUploadPlugins = 'beforeUploadPlugins',
  uploader = 'uploader',
  transformer = 'transformer',
}

export const handleConfigWithFunction = (config: any[]) => {
  for (const i in config) {
    if (typeof config[i].default === 'function') {
      config[i].default = config[i].default();
    }
    if (typeof config[i].choices === 'function') {
      config[i].choices = config[i].choices();
    }
  }
  return config;
};

// get uploader or transformer config
export const getConfig = (name: string, type: IPicGoHelperType, ctx: PicGoCore) => {
  let config: any[] = [];
  if (name === '') {
    return config;
  } else {
    const handler = ctx.helper[type].get(name);
    if (handler) {
      if (handler.config) {
        config = handler.config(ctx);
      }
    }
    return config;
  }
};
