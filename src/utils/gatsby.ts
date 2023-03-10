import type { Actions, Store } from 'gatsby';

export const setPluginOptionsDynamically = (
  actions: Actions,
  store: Store,
  pluginName: string,
  options: object
) => {
  const state = store.getState();

  const { setPluginStatus } = actions;

  const plugin = state.flattenedPlugins.find(
    (item: any) => item.name === pluginName
  );

  if (plugin) {
    plugin.pluginOptions = {
      ...plugin.pluginOptions,
      ...options,
    };

    setPluginStatus({ pluginOptions: plugin.pluginOptions }, plugin);
  }
};
