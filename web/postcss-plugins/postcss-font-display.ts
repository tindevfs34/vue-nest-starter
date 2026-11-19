import type { PluginCreator } from 'postcss';

const fontDisplayPlugin: PluginCreator<any> = () => {
  return {
    postcssPlugin: 'postcss-font-display',
    AtRule: {
      'font-face'(atRule) {
        let hasFontDisplay = false;
        atRule.walkDecls('font-display', (decl) => {
          decl.value = 'swap';
          hasFontDisplay = true;
        });
        if (!hasFontDisplay) {
          atRule.append({ prop: 'font-display', value: 'swap' });
        }
      },
    },
  };
};

fontDisplayPlugin.postcss = true;
export default fontDisplayPlugin;
